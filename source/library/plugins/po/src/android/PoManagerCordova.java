package com.ihealth.plugin.po;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.cordova.*;
import org.json.JSONException;
import org.json.JSONObject;

import com.ihealth.plugin.base.BaseManager;
import com.ihealth.plugin.po.AcInsSet;
import com.ihealth.plugin.po.PoManager;

import android.content.Context;
import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.IntentFilter;

public class PoManagerCordova extends CordovaPlugin {

    private Context mContext;
    private static final String MSG_NO_METHOD = "no such method";
    private CallbackContext mCallbackContext;
    private PoManager mPoManager;
    
    @Override
    public void initialize(final CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        mContext = webView.getContext();
        mPoManager = new PoManager(mContext);
        initReceiver();
        mapCallback = new HashMap<String, List<CallbackContext>>();
        mapdisconnectCallback = new HashMap<String, CallbackContext>();
        mCallbackContext_Connection = new HashMap<String, CallbackContext>(); 
        mCallbackContext_StartMeasure = new HashMap<String, CallbackContext>();
        mCallbackContext_DisConnectDevice = new HashMap<String, CallbackContext>();
        mCallbackContext_GetBattery  = new HashMap<String, CallbackContext>();
        mCallbackContext_GetOfflineData = new HashMap<String, CallbackContext>();
        BaseManager.getInstance().init(mContext);
    }

    @Override
    public void onDestroy() {
        mPoManager = null;
        unReceiver();
        BaseManager.getInstance().destory();
    }
    
    private void initReceiver() {
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(AcInsSet.MSG_PO3_BATTERY);
        intentFilter.addAction(AcInsSet.MSG_PO3_REALTIME_DATA);
        intentFilter.addAction(AcInsSet.MSG_PO3_RESULT_DATA);
        intentFilter.addAction(AcInsSet.MSG_PO3_HISTORY_NUM);
        intentFilter.addAction(AcInsSet.MSG_PO3_HISTORY_DATA);
        intentFilter.addAction(BaseManager.MSG_DISCOVER_DEVICE);
        intentFilter.addAction(BaseManager.MSG_DISCOVER_FINISHED);
        intentFilter.addAction(BaseManager.MSG_IHEALTH_CONNECTING);
        intentFilter.addAction(BaseManager.MSG_IHEALTH_CONNECTED);
        intentFilter.addAction(BaseManager.MSG_IHEALTH_DISCONNECT);
        intentFilter.addAction(BaseManager.MSG_IHEALTH_CONNECTIONFAIL);
        mContext.registerReceiver(mReceiver, intentFilter);
    }
    
    private void unReceiver(){
        mContext.unregisterReceiver(mReceiver);
    }

    private Map<String, List<CallbackContext>> mapCallback;
    private CallbackContext mCallbackContext_Discovery;
    private Map<String, CallbackContext> mCallbackContext_Connection;
    private Map<String, CallbackContext> mCallbackContext_StartMeasure;
    private Map<String, CallbackContext> mCallbackContext_GetOfflineData;
    private Map<String, CallbackContext> mCallbackContext_DisConnectDevice;
    private Map<String, CallbackContext> mCallbackContext_GetBattery;
    private Map<String, CallbackContext> mapdisconnectCallback;
    @Override
    public boolean execute(String action, CordovaArgs args, CallbackContext callbackContext) throws JSONException {
        this.mCallbackContext = callbackContext;
        if (action.equals("startDiscovery")) {
            String appsecret = args.getString(0);
            int req = BaseManager.getInstance().startDiscovery(appsecret, BaseManager.TYPE_PO3_BIT);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_Discovery = callbackContext;
            }else{
                error(callbackContext, null, req);
            }
            return true;
            
        } else if(action.equals("stopDiscovery")){
            String appsecret = args.getString(0);
            int req = BaseManager.getInstance().stopDiscovery(appsecret, BaseManager.TYPE_PO3_BIT);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_Discovery = callbackContext;
            }else{
                error(callbackContext, null, req);
            }
            return true;
            
        } else if(action.equals("connectDevice")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            int req = BaseManager.getInstance().connectDevice(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_Connection.put(mac, callbackContext);
            }else{
                error(callbackContext, null, req);
            }
            return true;
            
        } else if(action.equals("getIDPS")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            int req = mPoManager.getIdps(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_Connection.put(mac, callbackContext);
            }else {
                error(callbackContext, mac, req);
            }
            return true;
            
        } else if (action.equals("startMeasure")) {
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            addCallbacklist(callbackContext, mac);
            int req = mPoManager.measureOnline(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_StartMeasure.put(mac, callbackContext);
            }else{
                error(callbackContext, null, req);
            }
            return true;
            
        } else if (action.equals("getOfflineData")) {
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            addCallbacklist(callbackContext, mac);
            int req = mPoManager.getHistoryData(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_GetOfflineData.put(mac, callbackContext);
            }else{
                error(callbackContext, null, req);
            }
            return true;
            
        } else if(action.equals("disConnectDevice")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            int req = BaseManager.getInstance().disconnectDevice(appsecret, mac, BaseManager.TYPE_PO3);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_DisConnectDevice.put(mac, callbackContext);
            }else{
                error(callbackContext, mac, req);
            }
            return true;
            
        } else if(action.equals("setDisconnectCallback")){
//          String appsecret = args.getString(0);
            String mac = args.getString(1);
            mapdisconnectCallback.put(mac, callbackContext);
            return true;
            
        } else if(action.equals("getBattery")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            int req = mPoManager.getBattery(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_GetBattery.put(mac, callbackContext);
            }else if(BaseManager.MSG_UNAUTHORIZED == req){
                error(callbackContext, null, BaseManager.MSG_UNAUTHORIZED);
            }else if(BaseManager.MSG_NO_DEVICE == req){
                error(callbackContext, null, BaseManager.MSG_NO_DEVICE);
            }
            return true;
            
        } else {
            mCallbackContext.error(MSG_NO_METHOD);
            return false;
        }
    }
    
    private void addCallbacklist(CallbackContext callbackContext, String mac){
        List<CallbackContext> list = mapCallback.get(mac);
        if(list != null){
            list.add(callbackContext);
        }else{
            List<CallbackContext> listtemp = new ArrayList<CallbackContext>();
            listtemp.add(callbackContext);
            mapCallback.put(mac, listtemp);
        }
    }

    private void error(CallbackContext callbackcontext, String mac, int id){
        JSONObject o = null;
        try {
            o = new JSONObject();
            o.put("msg", "error");
            o.put("errorID", id + "");
            o.put("ProductType", "PO");
            o.put("ProductModel", "PO3");
            if(mac != null){
                o.put("address", mac);
            }
        } catch (Exception e) {                   
            e.printStackTrace();
        }
        keepCallback(callbackcontext, o.toString());
    }
    
    private void keepCallback(final CallbackContext callbackContext, String message) {
        PluginResult r = new PluginResult(PluginResult.Status.OK, message);
        r.setKeepCallback(true);
        callbackContext.sendPluginResult(r);
    }
    
  
    private BroadcastReceiver mReceiver = new BroadcastReceiver() {
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();
            if(AcInsSet.MSG_PO3_REALTIME_DATA.equals(action)) {
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String realtime = intent.getStringExtra(AcInsSet.MSG_PO3_REALTIME_DATA_EXTRA);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "realtime");
                    o.put("address", mac);
                    o.put("value", realtime);
                } catch (Exception e) {                   
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mCallbackContext_StartMeasure.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if(AcInsSet.MSG_PO3_HISTORY_DATA.equals(action)) {
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String history = intent.getStringExtra(AcInsSet.MSG_PO3_HISTORY_DATA_EXTRA);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "history");
                    o.put("address", mac);
                    o.put("value", history);
                } catch (Exception e) {                   
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mCallbackContext_GetOfflineData.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());

            } else if(AcInsSet.MSG_PO3_RESULT_DATA.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String value = intent.getStringExtra(AcInsSet.MSG_PO3_RESULT_DATA_EXTRA);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "result");
                    o.put("address", mac);
                    o.put("value", value);
                } catch (Exception e) {                   
                    e.printStackTrace();
                } 
                CallbackContext callbackContext = mCallbackContext_StartMeasure.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());

            } else if(AcInsSet.MSG_PO3_BATTERY.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                int battery = intent.getIntExtra(AcInsSet.MSG_PO3_BATTERY_EXTRA, 0);
                 JSONObject o = null;
                 try {
                     o = new JSONObject();
                     o.put("msg", "battery");
                     o.put("address", mac);
                     o.put("battery", battery + "");
                 } catch (Exception e) {                   
                     e.printStackTrace();
                 }
                 CallbackContext callbackContext = mCallbackContext_GetBattery.get(mac);
                 if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());

            } else if(BaseManager.MSG_DISCOVER_DEVICE.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "discovery doing");
                    o.put("address", mac);
                    o.put("name", name);
                } catch (Exception e) {                   
                    e.printStackTrace();
                }         
                keepCallback(mCallbackContext_Discovery, o.toString());
                
            } else if(BaseManager.MSG_IHEALTH_CONNECTING.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "connecting");
                    o.put("address", mac);
                    o.put("name", name);
                } catch (Exception e) {                   
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mCallbackContext_Connection.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if(BaseManager.MSG_IHEALTH_CONNECTED.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String type = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "connected");
                    o.put("name", type);
                    o.put("address", mac);
                } catch (Exception e) {                   
                    e.printStackTrace();
                }         
                CallbackContext callbackContext = mCallbackContext_Connection.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());

            } else if(BaseManager.MSG_DISCOVER_FINISHED.equals(action)){
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "discovery done");
                } catch (Exception e) {                   
                    e.printStackTrace();
                }         
                keepCallback(mCallbackContext_Discovery, o.toString());
                
            } else if(BaseManager.MSG_IHEALTH_IDPS.equals(action)){
                String type = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                if(!type.equals(BaseManager.TYPE_PO3)){
                    return;
                }
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String str1 = intent.getStringExtra(BaseManager.MSG_IHEALTH_PROTOCOLSTRING);
                String str2 = intent.getStringExtra(BaseManager.MSG_IHEALTH_ACCESSORYNAME);
                String str3 = intent.getStringExtra(BaseManager.MSG_IHEALTH_FVERSION);
                String str4 = intent.getStringExtra(BaseManager.MSG_IHEALTH_HVERSION);
                String str5 = intent.getStringExtra(BaseManager.MSG_IHEALTH_MODENUMBER);
                String str6 = intent.getStringExtra(BaseManager.MSG_IHEALTH_MANUFACTURE);
                String str7 = intent.getStringExtra(mac);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "idps");
                    o.put("address", mac);
                    o.put("potocol", str1);
                    o.put("accessoryname", str2);
                    o.put("firmware", str3);
                    o.put("hardware", str4);
                    o.put("modenumber", str5);
                    o.put("manufacture", str6);
                    o.put("serialnumber", str7);
                } catch (Exception e) {                   
                    e.printStackTrace();
                }         
                keepCallback(mCallbackContext, o.toString());
            } else if(BaseManager.MSG_IHEALTH_DISCONNECT.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String type = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "disconnect");
                    o.put("address", mac);
                    o.put("name", type);
                } catch (Exception e) {                   
                    e.printStackTrace();
                } 
                CallbackContext callbackContext = mapdisconnectCallback.get(mac);
                if(callbackContext != null){
                    keepCallback(callbackContext, o.toString());
                    mapdisconnectCallback.remove(mac);
                }
                if(mapCallback != null && mapCallback.get(mac) != null){
                    for(CallbackContext callback : mapCallback.get(mac)){
                        if(callback != null){
                            keepCallback(callback, o.toString());
                        }
                    }
                    mapCallback.remove(mac);
                }
            }else if(BaseManager.MSG_IHEALTH_CONNECTIONFAIL.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "connection fail");
                    o.put("address", mac);
                    o.put("name", name);
                } catch (Exception e) {                   
                    e.printStackTrace();
                } 
                CallbackContext callbackContext = mCallbackContext_Connection.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
            }
        }
    };
    
}