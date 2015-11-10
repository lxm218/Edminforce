package com.ihealth.plugin.bp;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.cordova.*;
import org.json.JSONException;
import org.json.JSONObject;

import com.ihealth.plugin.base.BaseManager;
import com.ihealth.plugin.bp.A1InsSet;
import com.ihealth.plugin.bp.BpManager;

import android.content.Context;
import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;

public class BpManagerCordova extends CordovaPlugin {

    private static final String TAG = "BaseManager";
    private BpManager mBpManager;
    private Context mContext;
    private static final String MSG_NO_METHOD = "no such method";
    private CallbackContext mCallbackContext;
    
    @Override
    public void initialize(final CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        mContext = webView.getContext();
        mBpManager = new BpManager(mContext);
        initReceiver();
        mapCallback = new HashMap<String, List<CallbackContext>>();
        mapdisconnectCallback = new HashMap<String, CallbackContext>();
        mapCallbackContext_ConnectDevice = new HashMap<String, CallbackContext>();
        mapCallbackContext_StartMeasure  = new HashMap<String, CallbackContext>();
//        mapCallbackContext_EnableOffline = new HashMap<String, CallbackContext>();
//        mapCallbackContext_DisenableOffline = new HashMap<String, CallbackContext>();
        mapCallbackContext_GetOfflineNum = new HashMap<String, CallbackContext>();
        mapCallbackContext_GetOfflineData = new HashMap<String, CallbackContext>();
        mapCallbackContext_GetBattery = new HashMap<String, CallbackContext>();
        mapCallbackContext_IsEnableOffline = new HashMap<String, CallbackContext>();
        mapCallbackContext_DisConnectDevice = new HashMap<String, CallbackContext>();
        mapCallbackContext_ConfirmAngle = new HashMap<String, CallbackContext>();
        mapCallbackContext_Error = new HashMap<String, CallbackContext>();
        mapCallbackContext_GetIDPS = new HashMap<String, CallbackContext>();
        BaseManager.getInstance().init(mContext);
    }

    @Override
    public void onDestroy() {
        mBpManager = null;
        unReceiver();
        BaseManager.getInstance().destory();
    }
    
    private void initReceiver() {
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(A1InsSet.MSG_BP_ZOREING);
        intentFilter.addAction(A1InsSet.MSG_BP_ZOREOVER);
        intentFilter.addAction(A1InsSet.MSG_BP_ANGLE);
        intentFilter.addAction(A1InsSet.MSG_BP_MEASURE);
        intentFilter.addAction(A1InsSet.MSG_BP_PRESSURE);
        intentFilter.addAction(A1InsSet.MSG_BP_RESULT);
        intentFilter.addAction(A1InsSet.MSG_BP_OFFLINE_NUM);
        intentFilter.addAction(A1InsSet.MSG_BP_OFFLINE_DATA);
        intentFilter.addAction(A1InsSet.MSG_BP_ERROR);
        intentFilter.addAction(A1InsSet.MSG_BP_BATTERY);
        intentFilter.addAction(A1InsSet.MSG_BP_FUNCTION_INFO);
        intentFilter.addAction(BaseManager.MSG_DISCOVER_DEVICE);
        intentFilter.addAction(BaseManager.MSG_DISCOVER_FINISHED);
        intentFilter.addAction(BaseManager.MSG_IHEALTH_CONNECTING);
        intentFilter.addAction(BaseManager.MSG_IHEALTH_DISCONNECT);
        intentFilter.addAction(BaseManager.MSG_IHEALTH_CONNECTED);
        intentFilter.addAction(BaseManager.MSG_IHEALTH_CONNECTIONFAIL);
        mContext.registerReceiver(mReceiver, intentFilter);
    }
    
    private void unReceiver(){
        mContext.unregisterReceiver(mReceiver);
    }

    private Map<String, List<CallbackContext>> mapCallback;
    private Map<String, CallbackContext> mapdisconnectCallback;
    private CallbackContext mCallbackContext_Discovery;
    private Map<String, CallbackContext> mapCallbackContext_ConnectDevice;
    private Map<String, CallbackContext> mapCallbackContext_StartMeasure;
//    private Map<String, CallbackContext> mapCallbackContext_EnableOffline;
//    private Map<String, CallbackContext> mapCallbackContext_DisenableOffline;
    private Map<String, CallbackContext> mapCallbackContext_GetOfflineNum;
    private Map<String, CallbackContext> mapCallbackContext_GetOfflineData;
    private Map<String, CallbackContext> mapCallbackContext_GetBattery;
    private Map<String, CallbackContext> mapCallbackContext_IsEnableOffline;
    private Map<String, CallbackContext> mapCallbackContext_DisConnectDevice;
    private Map<String, CallbackContext> mapCallbackContext_ConfirmAngle;
    private Map<String, CallbackContext> mapCallbackContext_Error;
    private Map<String, CallbackContext> mapCallbackContext_GetIDPS;
    
    @Override
    public boolean execute(String action, CordovaArgs args, CallbackContext callbackContext) throws JSONException {
        this.mCallbackContext = callbackContext;
        if (action.equals("startDiscovery")) {
            String appsecret = args.getString(0);
            int req = BaseManager.getInstance().startDiscovery(appsecret, BaseManager.TYPE_BP5_BIT | BaseManager.TYPE_BP3L_BIT);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_Discovery = callbackContext;
            }else {
                error(callbackContext, null, req);
            }
            return true;
            
        } else if(action.equals("stopDiscovery")){
            String appsecret = args.getString(0);
            int req = BaseManager.getInstance().stopDiscovery(appsecret, BaseManager.TYPE_BP5_BIT | BaseManager.TYPE_BP3L_BIT);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_Discovery = callbackContext;
            }else {
                error(callbackContext, null, req);
            }
            return true;
            
        } else if(action.equals("connectDevice")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            int req = BaseManager.getInstance().connectDevice(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mapCallbackContext_ConnectDevice.put(mac, callbackContext);
            }else{
                error(callbackContext, null, req);
            }
            return true;
            
        } else if(action.equals("getIDPS")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            int req = mBpManager.getIdps(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mapCallbackContext_GetIDPS.put(mac, callbackContext);
            }else{
                error(callbackContext, null, req);
            }
            return true;
            
        } else if (action.equals("startMeasure")) {
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            addCallbacklist(callbackContext, mac);
            int req = mBpManager.startMeasure(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mapCallbackContext_StartMeasure.put(mac, callbackContext);
            }else{
                error(callbackContext, null, req);
            }
            return true;
            
        } else if(action.equals("stopMeasure")) {
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            addCallbacklist(callbackContext, mac);
            int req = mBpManager.interruptMeasure(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mapCallbackContext_StartMeasure.put(mac, callbackContext);
            }else{
                error(callbackContext, null, req);
            }
            return true;
            
        } else if(action.equals("enableOffline")) {
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            addCallbacklist(callbackContext, mac);
            int req = mBpManager.enbleOffline(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "enableOffline");
                    o.put("address", mac);
                } catch (Exception e) {                   
                    e.printStackTrace();
                }
                keepCallback(callbackContext, o.toString());
            }else{
                error(callbackContext, null, req);
            }
            return true;
            
        } else if(action.equals("disenableOffline")) {
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            addCallbacklist(callbackContext, mac);
            int req = mBpManager.disenbleOffline(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "disenableOffline");
                    o.put("address", mac);
                } catch (Exception e) {                   
                    e.printStackTrace();
                }
                keepCallback(callbackContext, o.toString());
            }else{
                error(callbackContext, null, req);
            }
            return true;
            
        } else if(action.equals("getOfflineNum")) {
            String appsecret = args.getString(0);
            String mac = args.getString(1);            
            addCallbacklist(callbackContext, mac);
            int req = mBpManager.getOfflineNum(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mapCallbackContext_GetOfflineNum.put(mac, callbackContext);
            }else{
                error(callbackContext, null, req);
            }
            return true;
            
        } else if(action.equals("getOfflineData")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);        
            addCallbacklist(callbackContext, mac);
            int req = mBpManager.getOfflineData(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mapCallbackContext_GetOfflineData.put(mac, callbackContext);
            }else{
                error(callbackContext, null, req);
            }
            return true;
            
        } else if(action.equals("getBattery")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            int req = mBpManager.getBattery(appsecret, mac);
            addCallbacklist(callbackContext, mac);
            if(BaseManager.MSG_OK == req){
                mapCallbackContext_GetBattery.put(mac, callbackContext);
            }else{
                error(callbackContext, null, req);
            }
            return true;
            
        } else if(action.equals("isEnableOffline")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            int req = mBpManager.isEnableOffline(appsecret, mac);
            addCallbacklist(callbackContext, mac);
            if(BaseManager.MSG_OK == req){
                mapCallbackContext_IsEnableOffline.put(mac, callbackContext);
            }else{
                error(callbackContext, null, req);
            }
            return true;
            
        } else if(action.equals("disConnectDevice")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            int req = BaseManager.getInstance().disconnectDevice(appsecret, mac, BaseManager.TYPE_BP5);
            if(BaseManager.MSG_OK == req){
                mapCallbackContext_DisConnectDevice.put(mac, callbackContext);
            }else{
                error(callbackContext, null, req);
            }
            return true;
            
        } else if(action.equals("setDisconnectCallback")){
            String mac = args.getString(1);
            mapdisconnectCallback.put(mac, callbackContext);
            return true;
            
        } else if(action.equals("confirmAngle")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            int req = mBpManager.confirmAngle(appsecret, mac);
            addCallbacklist(callbackContext, mac);
            if(BaseManager.MSG_OK == req){
                mapCallbackContext_ConfirmAngle.put(mac, callbackContext);
            }else{
                error(callbackContext, null, req);
            }
            return true;
            
        } 
//        else if(action.equals("getErrorDetailWithID")){
//          int id = args.getInt(0);
//          String error = "no such error";
//          switch (id) {
//          case 0x00:
//              error = error00;
//              break;
//          case 0x01:
//              error = error01;
//              break;
//          case 0x02:
//              error = error02;
//              break;
//          case 0x03:
//              error = error03;
//              break;
//          case 0x04:
//              error = error04;
//              break;
//          case 0x05:
//              error = error05;
//              break;
//          case 0x06:
//              error = error06;
//              break;
//          case 0x07:
//              error = error07;
//              break;
//          case 0x08:
//              error = error08;
//              break;
//          case 0x0a:
//              error = error0a;
//              break;
//          case 0x0d:
//              error = error0d;
//              break;
//          case 0x0c:
//              error = error0c;
//              break;
//          case 0x0f:
//              error = error0f;
//              break;
//          case 0x10:
//              error = error10;
//              break;
//          case 0x11:
//              error = error11;
//              break;
//          default:
//              break;
//          }
//          JSONObject o = null;
//            try {
//                o = new JSONObject();
//                o.put("msg", "ErrorMessage");
//                o.put("value", error);
//            } catch (Exception e) {                   
//                e.printStackTrace();
//            }
//            keepCallback(mCallbackContext, o.toString());
//          return true;
//          
//        } 
        else {
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
    
//    private static final String error00 = "Keep your arm stable, stay still and try again";
//    private static final String error01 = "Fasten the cuff over bare arm, stay still and try again";
//    private static final String error02 = "Fasten the cuff over bare arm, stay still and try again";
//    private static final String error03 = "Loosen the cuff and try again";
//    private static final String error04 = "Fasten the cuff over bare arm, stay still and try again";
//    private static final String error05 = "Rest for 5 minutes and try again. Keep your arm stable and";
//    private static final String error06 = "Fasten the cuff over bare arm, stay still and try again";
//    private static final String error07 = "Fasten the cuff over bare arm, stay still and try again";
//    private static final String error08 = "Fasten the cuff over bare arm, stay still and try again";
//    private static final String error0a = "Fasten the cuff over bare arm, stay still and try again";
//    private static final String error0c = "Bluetooth connection error. Please reconnect Bluetooth";
//    private static final String error0d = "Low battery";
//    private static final String error0f = "Reading is out of range. Rest for 5 minutes and try again with bare arm";
//    private static final String error10 = "Systolic below 60mmHg or diastolic below 40mmHg";
//    private static final String error11 = "Keep your arm stable and stay still during measurement";

    private void keepCallback(final CallbackContext callbackContext, String message) {
        PluginResult r = new PluginResult(PluginResult.Status.OK, message);
        r.setKeepCallback(true);
        callbackContext.sendPluginResult(r);
    }
    
    private void error(CallbackContext callbackcontext, String mac, int id){
        JSONObject o = null;
        try {
            o = new JSONObject();
            o.put("msg", "error");
            o.put("errorID", id + "");
            o.put("ProductType", "BP");
            o.put("ProductModel", "BP5");
            if(mac != null){
                o.put("address", mac);
            }
        } catch (Exception e) {                   
            e.printStackTrace();
        }
        keepCallback(callbackcontext, o.toString());
    }

    private int[] mBPmeasureResult;
    private BroadcastReceiver mReceiver = new BroadcastReceiver() {
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();
            if(A1InsSet.MSG_BP_ZOREING.equals(action)) {
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                String message = "zero doing";
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", message);
                    o.put("address", mac);
                    o.put("name", name);
                } catch (Exception e) {                   
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mapCallbackContext_StartMeasure.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if(A1InsSet.MSG_BP_ZOREOVER.equals(action)) {
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                String message = "zero done";
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", message);
                    o.put("address", mac);
                    o.put("name", name);
                } catch (Exception e) {                   
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mapCallbackContext_StartMeasure.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());

            } else if(A1InsSet.MSG_BP_MEASURE.equals(action)) {
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String str = intent.getStringExtra(A1InsSet.MSG_BP_MEASURE_EXTRA);
                CallbackContext callbackContext = mapCallbackContext_StartMeasure.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, str);
                
            } else if(A1InsSet.MSG_BP_PRESSURE.equals(action)) {
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                byte[] bs = intent.getByteArrayExtra(A1InsSet.MSG_BP_PRESSURE_EXTRA);
                int pressure = (((bs[0] & 0xff) * 256 + (bs[1] & 0xff)) * 300 + 150) / 4096;
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "measure doing");
                    o.put("address", mac);
                    o.put("pressure", pressure + "");
                    o.put("name", name);
                } catch (Exception e) {                   
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mapCallbackContext_StartMeasure.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if(A1InsSet.MSG_BP_RESULT.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                byte[] bs = intent.getByteArrayExtra(A1InsSet.MSG_BP_RESULT_EXTRA);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                mBPmeasureResult = new int[4];
                mBPmeasureResult[0] = (bs[0] & 0xff);
                mBPmeasureResult[1] = (bs[1] & 0xff);
                mBPmeasureResult[2] = (bs[2] & 0xff);
                mBPmeasureResult[3] = (bs[3] & 0xff);
                float sys = mBPmeasureResult[1] + mBPmeasureResult[0];
                float dia = mBPmeasureResult[1];
                int heart = mBPmeasureResult[2];
                int isIHB = (mBPmeasureResult[3] == (byte)0x00?0:1);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "measure done");
                    o.put("address", mac);
                    o.put("name", name);
                    o.put("highpressure", sys + "");
                    o.put("lowpressure", dia + "");
                    o.put("heartrate", heart + "");
                    if(isIHB == 0){
                        o.put("arrhythmia", "false");
                    }else{
                        o.put("arrhythmia", "true");
                    } 
                } catch (Exception e) {                   
                    e.printStackTrace();
                } 
                CallbackContext callbackContext = mapCallbackContext_StartMeasure.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if(A1InsSet.MSG_BP_ERROR.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                int error = intent.getIntExtra(A1InsSet.MSG_BP_ERROR_EXTRA, 0);
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
                CallbackContext callbackContext = mapCallbackContext_Error.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if(BaseManager.MSG_DISCOVER_DEVICE.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String type = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "discovery doing");
                    o.put("address", mac);
                    o.put("name", type);
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
                CallbackContext callbackContext = mapCallbackContext_Error.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if(BaseManager.MSG_IHEALTH_CONNECTED.equals(action)){
                Log.i(TAG, "BaseManager.MSG_IHEALTH_CONNECTED");
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String type = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "connected");
                    o.put("address", mac);
                    o.put("name", type);
                } catch (Exception e) {                   
                    e.printStackTrace();
                }   
                CallbackContext callbackContext = mapCallbackContext_ConnectDevice.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if(A1InsSet.MSG_BP_OFFLINE_NUM.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                int num = intent.getIntExtra(A1InsSet.MSG_BP_OFFLINE_NUM_EXTRA, 0);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "offlineNum");
                    o.put("address", mac);
                    o.put("name", name);
                    o.put("value", num + "");
                } catch (Exception e) {                   
                    e.printStackTrace();
                } 
                CallbackContext callbackContext = mapCallbackContext_GetOfflineNum.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if(A1InsSet.MSG_BP_OFFLINE_DATA.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                String msg = intent.getStringExtra(A1InsSet.MSG_BP_OFFLINE_DATA_EXTRA);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "offlineData");
                    o.put("address", mac);
                    o.put("name", name);
                    o.put("value", msg);
                } catch (Exception e) {                   
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mapCallbackContext_GetOfflineData.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if(A1InsSet.MSG_BP_ANGLE.equals(action)) {
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                int angle = intent.getIntExtra(A1InsSet.MSG_BP_ANGLE_EXTRA, 0);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "angle");
                    o.put("address", mac);
                    o.put("value", angle + "");
                } catch (Exception e) {                   
                    e.printStackTrace();
                }  
                CallbackContext callbackContext = mapCallbackContext_ConfirmAngle.get(mac);
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
                
            } else if(A1InsSet.MSG_BP_BATTERY.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                int battery = intent.getIntExtra(A1InsSet.MSG_BP_BATTERY_EXTRA, 0);
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
                CallbackContext callbackContext = mapCallbackContext_GetBattery.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if(A1InsSet.MSG_BP_FUNCTION_INFO.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                boolean bool = intent.getBooleanExtra(A1InsSet.MSG_BP_FUNCTION_INFO_EXTRA, false);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "isEnableOffline");
                    o.put("address", mac);
                    o.put("name", name);
                    o.put("isEnableOffline", bool + "");
                } catch (Exception e) {                   
                    e.printStackTrace();
                }  
                CallbackContext callbackContext = mapCallbackContext_IsEnableOffline.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if(BaseManager.MSG_IHEALTH_IDPS.equals(action)){
                String type = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                if(!(type.equals(BaseManager.TYPE_BP5) || type.equals(BaseManager.TYPE_BP3L))){
                    return;
                }
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String str1 = intent.getStringExtra(BaseManager.MSG_IHEALTH_PROTOCOLSTRING);
                String str2 = intent.getStringExtra(BaseManager.MSG_IHEALTH_ACCESSORYNAME);
                String str3 = intent.getStringExtra(BaseManager.MSG_IHEALTH_FVERSION);
                str3 = Integer.parseInt(str3.substring(0, 2)) + "." + Integer.parseInt(str3.substring(2, 4)) + "." + Integer.parseInt(str3.substring(4, 6));
                String str4 = intent.getStringExtra(BaseManager.MSG_IHEALTH_HVERSION);
                str4 = Integer.parseInt(str4.substring(0, 2)) + "." + Integer.parseInt(str4.substring(2, 4)) + "." + Integer.parseInt(str4.substring(4, 6));
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
                CallbackContext callbackContext = mapCallbackContext_GetIDPS.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
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
                CallbackContext callbackContext = mapCallbackContext_ConnectDevice.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
            } 
        }
    };
    
}