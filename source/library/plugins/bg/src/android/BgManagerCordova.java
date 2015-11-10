package com.ihealth.plugin.bg;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.cordova.*;
import org.json.JSONException;
import org.json.JSONObject;

import com.ihealth.plugin.base.BaseManager;
import com.ihealth.plugin.bg.A2InsSet;
import com.ihealth.plugin.bg.BgManager;

import android.content.Context;
import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.IntentFilter;

public class BgManagerCordova extends CordovaPlugin {

    private BgManager mBg5Manager;
    private Context mContext;
    private static final String MSG_NO_METHOD = "no such method";
    private CallbackContext mCallbackContext;

    @Override
    public void initialize(final CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        mContext = webView.getContext();
        mBg5Manager = new BgManager(mContext);
        initReceiver();
        mapCallback = new HashMap<String, List<CallbackContext>>();
        mapdisconnectCallback = new HashMap<String, CallbackContext>();       
        mCallbackContext_Connection = new HashMap<String, CallbackContext>(); 
        mCallbackContext_Idps = new HashMap<String, CallbackContext>();
        mCallbackContext_SetUnit = new HashMap<String, CallbackContext>();
        mCallbackContext_GetBattery = new HashMap<String, CallbackContext>();
        mCallbackContext_SetBottleMessage = new HashMap<String, CallbackContext>();
        mCallbackContext_GetBottleMessage = new HashMap<String, CallbackContext>();
        mCallbackContext_StartMeasure = new HashMap<String, CallbackContext>();
        mCallbackContext_GetOfflineData = new HashMap<String, CallbackContext>();
        mCallbackContext_DisConnectDevice = new HashMap<String, CallbackContext>();
        mCallbackContext_SetBottleId = new HashMap<String, CallbackContext>();
        mCallbackContext_GetBottleId = new HashMap<String, CallbackContext>();
        mapdisconnectCallback = new HashMap<String, CallbackContext>();
        mCallbackContext_DeleteOfflineData = new HashMap<String, CallbackContext>();
        BaseManager.getInstance().init(mContext);
    }

    @Override
    public void onDestroy() {
        mBg5Manager = null;
        unReceiver();
        BaseManager.getInstance().destory();
    }
    
    private void initReceiver() {
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(BaseManager.MSG_IHEALTH_CONNECTED);
        intentFilter.addAction(BaseManager.MSG_IHEALTH_DISCONNECT);
        intentFilter.addAction(BaseManager.MSG_DISCOVER_DEVICE);
        intentFilter.addAction(BaseManager.MSG_DISCOVER_FINISHED);
        intentFilter.addAction(A2InsSet.MSG_GET_BOTTLEID);
        intentFilter.addAction(A2InsSet.MSG_GET_CODE);
        intentFilter.addAction(A2InsSet.MSG_GET_BATTERY);
        intentFilter.addAction(A2InsSet.MSG_ERROR);
        intentFilter.addAction(A2InsSet.MSG_STRIP_IN);
        intentFilter.addAction(A2InsSet.MSG_GET_BLOOD);
        intentFilter.addAction(A2InsSet.MSG_GET_VALUE);
        intentFilter.addAction(A2InsSet.MSG_STRIP_OUT);
        intentFilter.addAction(A2InsSet.MSG_GET_HISTORY);
        intentFilter.addAction(A2InsSet.MSG_SET_UNIT);
        intentFilter.addAction(A2InsSet.MSG_SET_CODE);
        intentFilter.addAction(A2InsSet.MSG_SET_BOTTLEID);
        intentFilter.addAction(BaseManager.MSG_IHEALTH_CONNECTIONFAIL);
        mContext.registerReceiver(mReceiver, intentFilter);
    }
    
    private void unReceiver(){
        mContext.unregisterReceiver(mReceiver);
    }

    private Map<String, List<CallbackContext>> mapCallback;
    private CallbackContext mCallbackContext_Discovery;
    private Map<String, CallbackContext> mCallbackContext_Connection;
    private Map<String, CallbackContext> mCallbackContext_Idps;
    private Map<String, CallbackContext> mCallbackContext_SetUnit;
    private Map<String, CallbackContext> mCallbackContext_GetBattery;
    private Map<String, CallbackContext> mCallbackContext_SetBottleMessage;
    private Map<String, CallbackContext> mCallbackContext_GetBottleMessage;
    private Map<String, CallbackContext> mCallbackContext_StartMeasure;
    private Map<String, CallbackContext> mCallbackContext_GetOfflineData;
    private Map<String, CallbackContext> mCallbackContext_DisConnectDevice;
    private Map<String, CallbackContext> mCallbackContext_SetBottleId;
    private Map<String, CallbackContext> mCallbackContext_GetBottleId;
    private Map<String, CallbackContext> mapdisconnectCallback;
    private Map<String, CallbackContext> mCallbackContext_DeleteOfflineData;
    @Override
    public boolean execute(String action, CordovaArgs args, CallbackContext callbackContext) throws JSONException {
        this.mCallbackContext = callbackContext;
        if (action.equals("startDiscovery")) {
            String appsecret = args.getString(0);
            int req = BaseManager.getInstance().startDiscovery(appsecret, BaseManager.TYPE_BG5_BIT);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_Discovery = callbackContext;
            }else{
                error(callbackContext, null, req);
            }
            return true;
            
        } else if(action.equals("stopDiscovery")){
            String appsecret = args.getString(0);
            int req = BaseManager.getInstance().stopDiscovery(appsecret, BaseManager.TYPE_BG5_BIT);
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
            
        } else if (action.equals("setUnit")) {
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            int unit = args.getInt(2);
            addCallbacklist(callbackContext, mac);
            int req = mBg5Manager.setUnit(appsecret, mac, unit);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_SetUnit.put(mac, callbackContext);
            }else{
                error(callbackContext, null, req);
            }
            return true;
            
        } else if(action.equals("getBattery")) {
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            addCallbacklist(callbackContext, mac);
            int req = mBg5Manager.getBattery(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_GetBattery.put(mac, callbackContext);
            }else{
                error(callbackContext, null, req);
            }
            return true;
            
        } else if(action.equals("setBottleMessage")) {
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            String qr = args.getString(2);
            int leftNum = args.getInt(3);
            String timeTs = args.getString(4);
            addCallbacklist(callbackContext, mac);
            int req = 0;
            req = mBg5Manager.setBottleMessage(appsecret, mac, qr, leftNum, timeTs);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_SetBottleMessage.put(mac, callbackContext);
            }else{
                error(callbackContext, null, req);
            }
            return true;
            
        } else if(action.equals("getBottleMessage")) {
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            addCallbacklist(callbackContext, mac);
            int req = mBg5Manager.getBottleMessage(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_GetBottleMessage.put(mac, callbackContext);
            }else{
                error(callbackContext, null, req);
            }
            return true;
            
        } else if (action.equals("startMeasure")) {
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            addCallbacklist(callbackContext, mac);
            int req = mBg5Manager.startMeasure(appsecret, mac);
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
            int req = mBg5Manager.getOfflineData(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_GetOfflineData.put(mac, callbackContext);
            }else{
                error(callbackContext, null, req);
            }
            return true;

        } else if(action.equals("deleteOfflineData")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            int req = mBg5Manager.deleteOfflineData(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_DeleteOfflineData.put(mac, callbackContext);
            }else{
                error(callbackContext, null, req);
            }
            return true;
            
        } else if(action.equals("disConnectDevice")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            int req = mBg5Manager.disConnectDevice(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_DisConnectDevice.put(mac, callbackContext);
            }else{
                error(callbackContext, null, req);
            }
            return true;
            
        } else if(action.equals("setDisconnectCallback")){
//          String appsecret = args.getString(0);
            String mac = args.getString(1);
            mapdisconnectCallback.put(mac, callbackContext);
            return true;
            
        } else if(action.equals("setBottleId")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            int bottleid = args.getInt(2);
            addCallbacklist(callbackContext, mac);
            int req = mBg5Manager.setBottleId(appsecret, mac, bottleid);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_SetBottleId.put(mac, callbackContext);
            }else{
                error(callbackContext, null, req);
            }
            return true;

        } else if(action.equals("getBottleId")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            addCallbacklist(callbackContext, mac);
            int req = mBg5Manager.getBottleId(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_GetBottleId.put(mac, callbackContext);
            }else{
                error(callbackContext, null, req);
            }
            return true;

        } else if(action.equals("getIDPS")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            addCallbacklist(callbackContext, mac);
            int req = mBg5Manager.getIdps(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_Idps.put(mac, callbackContext);
            }else{
                error(callbackContext, null, req);
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
            o.put("ProductType", "BG");
            o.put("ProductModel", "BG5");
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
            if(A2InsSet.MSG_GET_BATTERY.equals(action)) {
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                int battery = intent.getIntExtra(A2InsSet.MSG_GET_BATTERY_EXTRA, 0);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "battery");
                    o.put("address", mac);
                    o.put("name", name);
                    o.put("battery", battery + "");
                } catch (Exception e) {                   
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mCallbackContext_GetBattery.get(mac);
                if(callbackContext != null){
                    keepCallback(callbackContext, o.toString());
                }
            } else if(A2InsSet.MSG_GET_BOTTLEID.equals(action)) {
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                int bottleid = intent.getIntExtra(A2InsSet.MSG_GET_BOTTLEID_EXTRA, 0);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "bottleid");
                    o.put("address", mac);
                    o.put("name", name);
                    o.put("bottleid", bottleid + "");
                } catch (Exception e) {                   
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mCallbackContext_GetBottleId.get(mac);
                if(callbackContext != null){
                    keepCallback(callbackContext, o.toString());
                }
                
            } else if(A2InsSet.MSG_GET_CODE.equals(action)) {
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                String code = intent.getStringExtra(A2InsSet.MSG_GET_CODE_EXTRA);
                int leftnum = intent.getIntExtra(A2InsSet.MSG_GET_LEFTNUM, 0);
                String expiretime = intent.getStringExtra(A2InsSet.MSG_GET_EXPIRECTIME);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "code");
                    o.put("address", mac);
                    o.put("name", name);
                    o.put("code", code);
                    o.put("leftnum", leftnum + "");
                    o.put("expiretime", expiretime);
                } catch (Exception e) {                   
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mCallbackContext_GetBottleMessage.get(mac);
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
                if(callbackContext != null){
                    keepCallback(callbackContext, o.toString());
                }
                
            }else if(BaseManager.MSG_IHEALTH_CONNECTED.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                List<CallbackContext> list = mapCallback.get(mac);
                if(list != null){
                    list.add(mCallbackContext);
                }else{
                    List<CallbackContext> listtemp = new ArrayList<CallbackContext>();
                    listtemp.add(mCallbackContext);
                    mapCallback.put(mac, listtemp);
                }
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "connected");
                    o.put("address", mac);
                    o.put("name", name);
                } catch (Exception e) {                   
                    e.printStackTrace();
                } 
                CallbackContext callbackContext = mCallbackContext_Connection.get(mac);
                if(callbackContext != null){
                    keepCallback(callbackContext, o.toString());
                }
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
                if(!type.equals(BaseManager.TYPE_BG5)){
                    return;
                }
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String str1 = intent.getStringExtra(BaseManager.MSG_IHEALTH_PROTOCOLSTRING);
                String str2 = intent.getStringExtra(BaseManager.MSG_IHEALTH_ACCESSORYNAME);
                String str3 = intent.getStringExtra(BaseManager.MSG_IHEALTH_FVERSION);
                String str4 = intent.getStringExtra(BaseManager.MSG_IHEALTH_HVERSION);
                String str5 = intent.getStringExtra(BaseManager.MSG_IHEALTH_MODENUMBER);
                String str6 = intent.getStringExtra(BaseManager.MSG_IHEALTH_MANUFACTURE);
                String str7 = intent.getStringExtra(BaseManager.MSG_IHEALTH_SERIALNUMBER);
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
                
                CallbackContext callbackContext = mCallbackContext_Idps.get(mac);
                if(callbackContext != null){
                    keepCallback(callbackContext, o.toString());
                }

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
                    mapdisconnectCallback.put(mac, null);
                }
                if(mapCallback != null && mapCallback.get(mac) != null){
                    for(CallbackContext callback : mapCallback.get(mac)){
                        if(callback != null){
                            keepCallback(callback, o.toString());
                            callback = null;
                        }
                    }   
                }
                mapCallback.remove(mac);
                
            } else if(A2InsSet.MSG_SET_UNIT.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "unit");
                    o.put("address", mac);
                } catch (Exception e) {                   
                    e.printStackTrace();
                } 
                CallbackContext callbackContext = mCallbackContext_SetUnit.get(mac);
                if(callbackContext != null){
                    keepCallback(callbackContext, o.toString());
                }

            } else if(A2InsSet.MSG_STRIP_IN.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "strip in");
                    o.put("address", mac);
                    o.put("name", name);
                } catch (Exception e) {                   
                    e.printStackTrace();
                } 
                CallbackContext callbackContext = mCallbackContext_StartMeasure.get(mac);
                if(callbackContext != null){
                    keepCallback(callbackContext, o.toString());
                }

            } else if(A2InsSet.MSG_GET_BLOOD.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "get blood");
                    o.put("address", mac);
                    o.put("name", name);
                } catch (Exception e) {                   
                    e.printStackTrace();
                } 
                CallbackContext callbackContext = mCallbackContext_StartMeasure.get(mac);
                if(callbackContext != null){
                    keepCallback(callbackContext, o.toString());
                }

            } else if(A2InsSet.MSG_STRIP_OUT.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "strip out");
                    o.put("address", mac);
                    o.put("name", name);
                } catch (Exception e) {                   
                    e.printStackTrace();
                } 
                CallbackContext callbackContext = mCallbackContext_StartMeasure.get(mac);
                if(callbackContext != null){
                    keepCallback(callbackContext, o.toString());
                }

            } else if(A2InsSet.MSG_GET_VALUE.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                int value = intent.getIntExtra(A2InsSet.MSG_GET_VALUE_EXTRA, 0);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "value");
                    o.put("address", mac);
                    o.put("name", name);
                    o.put("value", value);
                } catch (Exception e) {                   
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mCallbackContext_StartMeasure.get(mac);
                if(callbackContext != null){
                    keepCallback(callbackContext, o.toString());
                }
                
            } else if(A2InsSet.MSG_GET_HISTORY.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                String history = intent.getStringExtra(A2InsSet.MSG_GET_HISTORY_EXTRA);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "value");
                    o.put("address", mac);
                    o.put("name", name);
                    o.put("history", history);
                } catch (Exception e) {                   
                    e.printStackTrace();
                } 
                CallbackContext callbackContext = mCallbackContext_GetOfflineData.get(mac);
                if(callbackContext != null){
                    keepCallback(callbackContext, o.toString());
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
                
            }else if(A2InsSet.MSG_SET_CODE.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "setBottleMessage");
                    o.put("address", mac);
                } catch (Exception e) {                   
                    e.printStackTrace();
                } 
                CallbackContext callbackContext = mCallbackContext_SetBottleMessage.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            }else if(A2InsSet.MSG_SET_BOTTLEID.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "setBottleId");
                    o.put("address", mac);
                } catch (Exception e) {                   
                    e.printStackTrace();
                } 
                CallbackContext callbackContext = mCallbackContext_SetBottleId.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());

            }else if(A2InsSet.MSG_ERROR.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                int error = intent.getIntExtra(A2InsSet.MSG_ERROR_EXTRA, 0);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "error");
                    o.put("address", mac);
                    o.put("name", name);
                    o.put("value", error);
                } catch (Exception e) {                   
                    e.printStackTrace();
                }  
                keepCallback(mCallbackContext, o.toString());
                
            }
        }
    };
    
}