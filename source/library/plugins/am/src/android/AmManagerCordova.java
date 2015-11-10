package com.ihealth.plugin.am;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.ihealth.plugin.am.AaInsSet;
import com.ihealth.plugin.am.AmManager;
import com.ihealth.plugin.base.BaseManager;

import android.content.Context;
import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;

public class AmManagerCordova extends CordovaPlugin {

    private Context mContext;
    private static final String MSG_NO_METHOD = "no such method";
    private CallbackContext mCallbackContext;
    private AmManager mAmManager;
    
    @Override
    public void initialize(final CordovaInterface cordova,
            CordovaWebView webView) {
        super.initialize(cordova, webView);
        mContext = webView.getContext();
        mAmManager = new AmManager(mContext);
        initReceiver();
        mapCallback = new HashMap<String, List<CallbackContext>>();
        mapdisconnectCallback = new HashMap<String, CallbackContext>();
        mCallbackContext_Connection = new HashMap<String, CallbackContext>();
        mCallbackContext_Reset = new HashMap<String, CallbackContext>();
        mCallbackContext_GetUserId = new HashMap<String, CallbackContext>();
        mCallbackContext_SetUserId = new HashMap<String, CallbackContext>();
        mCallbackContext_SetUserMessage = new HashMap<String, CallbackContext>();
        mCallbackContext_GetUserMessage = new HashMap<String, CallbackContext>();
        mCallbackContext_GetClocktotal = new HashMap<String, CallbackContext>();
        mCallbackContext_GetClockDetail = new HashMap<String, CallbackContext>();
        mCallbackContext_SetClock = new HashMap<String, CallbackContext>();
        mCallbackContext_DeleteClock = new HashMap<String, CallbackContext>();
        mCallbackContext_GetRemind = new HashMap<String, CallbackContext>();
        mCallbackContext_SetRemind = new HashMap<String, CallbackContext>();
        mCallbackContext_GetActivityMessage = new HashMap<String, CallbackContext>();
        mCallbackContext_GetSleepMessage = new HashMap<String, CallbackContext>();
        mCallbackContext_GetAlarmClock = new HashMap<String, CallbackContext>();
        mCallbackContext_GetRealTimeMessage = new HashMap<String, CallbackContext>();
        mCallbackContext_GetHourType = new HashMap<String, CallbackContext>();
        mCallbackContext_SetHourType = new HashMap<String, CallbackContext>();
        mCallbackContext_SetRandom = new HashMap<String, CallbackContext>();
        mCallbackContext_GetStageMessage = new HashMap<String, CallbackContext>();
        mCallbackContext_GetBattery = new HashMap<String, CallbackContext>();
        BaseManager.getInstance().init(mContext);
    }

    @Override
    public void onDestroy() {
        mAmManager = null;
        unReceiver();
        BaseManager.getInstance().destory();
    }

    private void initReceiver() {
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(AaInsSet.MSG_AM_RESET);
        intentFilter.addAction(AaInsSet.MSG_AM_USERID);
        intentFilter.addAction(AaInsSet.MSG_AM_SETUSERID);
        intentFilter.addAction(AaInsSet.MSG_AM_ACTIVITY);
        intentFilter.addAction(AaInsSet.MSG_AM_SLEEP);
        intentFilter.addAction(AaInsSet.MSG_AM_REALTIME);
        intentFilter.addAction(AaInsSet.MSG_AM_STAGE_FORMS);
        intentFilter.addAction(AaInsSet.MSG_AM_ALARM_NUM);
        intentFilter.addAction(AaInsSet.MSG_AM_ALARM_DATA);
        intentFilter.addAction(AaInsSet.MSG_AM_ALARM_SETOK);
        intentFilter.addAction(AaInsSet.MSG_AM_REMIND);
        intentFilter.addAction(AaInsSet.MSG_AM_SETREMIND);
        intentFilter.addAction(AaInsSet.MSG_AM_HOUR);
        intentFilter.addAction(AaInsSet.MSG_AM_USER_INFO);
        intentFilter.addAction(AaInsSet.MSG_AM_USER_SETINFO);
        intentFilter.addAction(AaInsSet.MSG_AM_BATTERY);
        intentFilter.addAction(AaInsSet.MSG_AM_RANDOM);
        intentFilter.addAction(BaseManager.MSG_DISCOVER_DEVICE);
        intentFilter.addAction(BaseManager.MSG_DISCOVER_FINISHED);
        intentFilter.addAction(BaseManager.MSG_IHEALTH_CONNECTING);
        intentFilter.addAction(BaseManager.MSG_IHEALTH_CONNECTED);
        intentFilter.addAction(BaseManager.MSG_IHEALTH_DISCONNECT);
        intentFilter.addAction(BaseManager.MSG_IHEALTH_CONNECTIONFAIL);
        mContext.registerReceiver(mReceiver, intentFilter);
    }

    private void unReceiver() {
        mContext.unregisterReceiver(mReceiver);
    }

    private Map<String, List<CallbackContext>> mapCallback;
    private Map<String, CallbackContext> mapdisconnectCallback;
    private CallbackContext mCallbackContext_Discovery;
    private Map<String, CallbackContext> mCallbackContext_Connection;
    private Map<String, CallbackContext> mCallbackContext_Reset;
    private Map<String, CallbackContext> mCallbackContext_GetUserId;
    private Map<String, CallbackContext> mCallbackContext_SetUserId;
    private Map<String, CallbackContext> mCallbackContext_SetUserMessage;
    private Map<String, CallbackContext> mCallbackContext_GetUserMessage;
    private Map<String, CallbackContext> mCallbackContext_GetClocktotal;
    private Map<String, CallbackContext> mCallbackContext_GetClockDetail;
    private Map<String, CallbackContext> mCallbackContext_SetClock;
    private Map<String, CallbackContext> mCallbackContext_DeleteClock;
    private Map<String, CallbackContext> mCallbackContext_GetRemind;
    private Map<String, CallbackContext> mCallbackContext_SetRemind;
    private Map<String, CallbackContext> mCallbackContext_GetActivityMessage;
    private Map<String, CallbackContext> mCallbackContext_GetSleepMessage;
    private Map<String, CallbackContext> mCallbackContext_GetAlarmClock;
    private Map<String, CallbackContext> mCallbackContext_GetRealTimeMessage;
    private Map<String, CallbackContext> mCallbackContext_GetHourType;
    private Map<String, CallbackContext> mCallbackContext_SetHourType;
    private Map<String, CallbackContext> mCallbackContext_SetRandom;
    private Map<String, CallbackContext> mCallbackContext_GetStageMessage;
    private Map<String, CallbackContext> mCallbackContext_GetBattery;
    
    @Override
    public boolean execute(String action, CordovaArgs args,
            CallbackContext callbackContext) throws JSONException {
        this.mCallbackContext = callbackContext;
        if (action.equals("startDiscovery")) {
            String appsecret = args.getString(0);
            int req = BaseManager.getInstance().startDiscovery(appsecret, BaseManager.TYPE_AM3S_BIT);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_Discovery = callbackContext;
            }else {
                error(callbackContext, null, req);
            }
            return true;
            
        } else if (action.equals("stopDiscovery")) {
            String appsecret = args.getString(0);
            int req = BaseManager.getInstance().stopDiscovery(appsecret, BaseManager.TYPE_AM3S_BIT);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_Discovery = callbackContext;
            }else {
                error(callbackContext, null, req);
            }
            return true;
            
        } else if (action.equals("connectDevice")) {
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            int req = BaseManager.getInstance().connectDevice(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_Connection.put(mac, callbackContext);
            }else {
                error(callbackContext, mac, req);
            }
            return true;
            
        } else if(action.equals("getIDPS")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            int req = mAmManager.getIdps(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_Connection.put(mac, callbackContext);
            }else {
                error(callbackContext, mac, req);
            }
            return true;
            
        } else if (action.equals("resetDevice")) {
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            setDisconnectCallbacklist(callbackContext, mac);
            int req = mAmManager.reset(appsecret, mac, 0);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_Reset.put(mac, callbackContext);
            }else {
                error(callbackContext, mac, req);
            }
            return true;
            
        } else if(action.equals("getUserId")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            setDisconnectCallbacklist(callbackContext, mac);
            int req = mAmManager.getUserId(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_GetUserId.put(mac, callbackContext);
            }else {
                error(callbackContext, mac, req);
            }
            return true;
            
        } else if(action.equals("setUserId")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            int userId = args.getInt(2);
            setDisconnectCallbacklist(callbackContext, mac);
            int req = mAmManager.setUser(appsecret, mac , userId);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_SetUserId.put(mac, callbackContext);
            }else {
                error(callbackContext, mac, req);
            }
            return true;
            
        } else if(action.equals("setUserMessage")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            int age = args.getInt(2);
            float weight = (float)args.getDouble(3);
            float height = (float)args.getDouble(4);
            int sex = args.getInt(5);
            int lengthType = args.getInt(6);
            int activityLevel = args.getInt(7);
            int target = args.getInt(8);
            int hourType = args.getInt(9);
            setDisconnectCallbacklist(callbackContext, mac);
            int req = mAmManager.setUserMessage(appsecret, mac, weight, lengthType, height, age, sex, activityLevel, target, hourType);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_SetUserMessage.put(mac, callbackContext);
            }else{
                error(callbackContext, mac, req);
            }
            return true;
            
        } else if(action.equals("getUserMessage")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            setDisconnectCallbacklist(callbackContext, mac);
            int req = mAmManager.getUserMessage(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_GetUserMessage.put(mac, callbackContext);
            }else{
                error(callbackContext, mac, req);
            }
            return true;
            
        } else if(action.equals("getClocktotal")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            setDisconnectCallbacklist(callbackContext, mac);
            int req = mAmManager.getAlarmClock(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_GetClocktotal.put(mac, callbackContext);
            }else{
                error(callbackContext, mac, req);
            }
            return true;
            
        } else if(action.equals("getClockDetail")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            setDisconnectCallbacklist(callbackContext, mac);
            int req = mAmManager.getAlarmClock(appsecret, mac, 1);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_GetClockDetail.put(mac, callbackContext);
            }else{
                error(callbackContext, mac, req);
            }
            return true;
            
        } else if(action.equals("setClock")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            int id = args.getInt(2);
            int hour = args.getInt(3);
            int min = args.getInt(4);
            boolean isRepeat = args.getBoolean(5);
            byte[] weeks = args.getArrayBuffer(6);
            boolean isOpen = args.getBoolean(7);
            setDisconnectCallbacklist(callbackContext, mac);
            int req = mAmManager.setAlarmClock(appsecret, mac, id, hour, min, isRepeat, weeks, isOpen);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_SetClock.put(mac, callbackContext);
            }else{
                error(callbackContext, mac, req);
            }
            return true;
            
        } else if(action.equals("deleteClock")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            int id = args.getInt(2);
            setDisconnectCallbacklist(callbackContext, mac);
            int req = mAmManager.deleteAlarmClock(appsecret, mac, id);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_DeleteClock.put(mac, callbackContext); 
            }else{
                error(callbackContext, mac, req);
            }
            return true;
            
        } else if(action.equals("getRemind")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            setDisconnectCallbacklist(callbackContext, mac);
            int req = mAmManager.getActivityRemind(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_GetRemind.put(mac, callbackContext);
            }else{
                error(callbackContext, mac, req);
            }
            return true;
            
        } else if(action.equals("setRemind")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            int mins = args.getInt(2);
            boolean isOpen = args.getBoolean(3);
            setDisconnectCallbacklist(callbackContext, mac);
            int hour = mins/60;
            int min = mins%60;
            int req = mAmManager.setActivityRemind(appsecret, mac, hour, min, isOpen);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_SetRemind.put(mac, callbackContext);
            }else{
                error(callbackContext, mac, req);
            }
            return true;
            
        } else if(action.equals("getActivityMessage")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            setDisconnectCallbacklist(callbackContext, mac);
            int req = mAmManager.syncActivityDatas(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_GetActivityMessage.put(mac, callbackContext);
            }else{
                error(callbackContext, mac, req);
            }
            return true;
            
        } else if(action.equals("getSleepMessage")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            setDisconnectCallbacklist(callbackContext, mac);
            int req = mAmManager.syncSeepDatas(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_GetSleepMessage.put(mac, callbackContext);
            }else{
                error(callbackContext, mac, req);
            }
            return true;
            
        } else if(action.equals("getRealTimeMessage")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            setDisconnectCallbacklist(callbackContext, mac);
            int req = mAmManager.syncRealTimeDatas(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_GetRealTimeMessage.put(mac, callbackContext);
            }else{
                error(callbackContext, mac, req);
            }
            return true;
            
        } else if(action.equals("getHourType")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            setDisconnectCallbacklist(callbackContext, mac);
            int req = mAmManager.gethourType(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_GetHourType.put(mac, callbackContext);
            }else{
                error(callbackContext, mac, req);
            }
            return true;
            
        } else if(action.equals("setHourType")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            int index = args.getInt(2);
            setDisconnectCallbacklist(callbackContext, mac);
            int req = mAmManager.setHourType(appsecret, mac, index);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_SetHourType.put(mac, callbackContext);
            }else{
                error(callbackContext, mac, req);
            }
            return true;
            
        } else if(action.equals("setRandom")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            setDisconnectCallbacklist(callbackContext, mac);
            int req = mAmManager.sendRandom(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_SetRandom.put(mac, callbackContext);
            }else{
                error(callbackContext, mac, req);
            }
            return true;
            
        } else if(action.equals("getStageMessage")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            setDisconnectCallbacklist(callbackContext, mac);
            int req = mAmManager.syncStageReportData(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_GetStageMessage.put(mac, callbackContext);
            }else{
                error(callbackContext, mac, req);
            }
            return true;
            
        } else if(action.equals("getBattery")){
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            setDisconnectCallbacklist(callbackContext, mac);
            int req = mAmManager.getBattery(appsecret, mac);
            if(BaseManager.MSG_OK == req){
                mCallbackContext_GetBattery.put(mac, callbackContext);
            }else{
                error(callbackContext, mac, req);
            }
            return true;
            
        } else if (action.equals("disConnectDevice")) {
            String appsecret = args.getString(0);
            String mac = args.getString(1);
            int req = mAmManager.disconnect(appsecret, mac);
            if(BaseManager.MSG_OK == req){
            }else{
                error(callbackContext, mac, req);
            }
            return true;
            
        } else if (action.equals("setDisconnectCallback")) {
//          String appsecret = args.getString(0);
            String mac = args.getString(1);
            mapdisconnectCallback.put(mac, callbackContext);
            return true;
            
        } else {
            mCallbackContext.error(MSG_NO_METHOD);
            return false;
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
    
    private void setDisconnectCallbacklist(CallbackContext callbackContext, String mac){
        List<CallbackContext> list = mapCallback.get(mac);
        if (list != null) {
            list.add(callbackContext);
        } else {
            List<CallbackContext> listtemp = new ArrayList<CallbackContext>();
            listtemp.add(callbackContext);
            mapCallback.put(mac, listtemp);
        }
    }
    
    private void keepCallback(final CallbackContext callbackContext,
            String message) {
        PluginResult r = new PluginResult(PluginResult.Status.OK, message);
        r.setKeepCallback(true);
        callbackContext.sendPluginResult(r);
    }

    private BroadcastReceiver mReceiver = new BroadcastReceiver() {
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();
            if (AaInsSet.MSG_AM_USERID.equals(action)) {
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                int userId = intent.getIntExtra(AaInsSet.MSG_AM_USERID_EXTRA, 0);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "user id");
                    o.put("address", mac);
                    o.put("name", name);
                    o.put("value", userId + "");
                } catch (Exception e) {
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mCallbackContext_GetUserId.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if(AaInsSet.MSG_AM_SETUSERID.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "setUserIdOK");
                    o.put("address", mac);
                    o.put("name", name);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mCallbackContext_SetUserId.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if(AaInsSet.MSG_AM_USER_SETINFO.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "setUserMessageOK");
                    o.put("address", mac);
                    o.put("name", name);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mCallbackContext_SetUserMessage.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if (AaInsSet.MSG_AM_USER_INFO.equals(action)) {
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                String userInfo = intent.getStringExtra(AaInsSet.MSG_AM_USER_INFO_EXTRA);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "user info");
                    o.put("address", mac);
                    o.put("name", name);
                    o.put("value", userInfo);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mCallbackContext_GetUserMessage.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if(AaInsSet.MSG_AM_HOUR.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                int hour = intent.getIntExtra(AaInsSet.MSG_AM_HOUR_EXTRA, 0);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "hour");
                    o.put("address", mac);
                    o.put("name", name);
                    o.put("value", hour + "");
                } catch (Exception e) {
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mCallbackContext_GetHourType.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if (AaInsSet.MSG_AM_ALARM_NUM.equals(action)) {
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                int value = intent.getIntExtra(AaInsSet.MSG_AM_ALARM_NUM_EXTRA,
                        0);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "alarmclock number");
                    o.put("address", mac);
                    o.put("name", name);
                    o.put("value", value);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mCallbackContext_GetClocktotal.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if (AaInsSet.MSG_AM_ALARM_DATA.equals(action)) {
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                String detail = intent.getStringExtra(AaInsSet.MSG_AM_ALARM_DATA_EXTRA);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "alarmclock detail");
                    o.put("address", mac);
                    o.put("name", name);
                    o.put("value", detail);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mCallbackContext_GetClockDetail.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if (AaInsSet.MSG_AM_ALARM_SETOK.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "setClockOK");
                    o.put("address", mac);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mCallbackContext_SetClock.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if (AaInsSet.MSG_AM_REMIND.equals(action)) {
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                String remind = intent.getStringExtra(AaInsSet.MSG_AM_REMIND_EXTRA);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "remid");
                    o.put("address", mac);
                    o.put("name", name);
                    o.put("value", remind);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mCallbackContext_GetRemind.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if(AaInsSet.MSG_AM_SETREMIND.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "setRemindOK");
                    o.put("address", mac);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mCallbackContext_SetRemind.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if (AaInsSet.MSG_AM_ACTIVITY.equals(action)) {
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                List<String> activity = intent.getStringArrayListExtra(AaInsSet.MSG_AM_ACTIVITY_EXTRA);
                JSONObject o = null;
                JSONArray array = new JSONArray();
                for (String str : activity) {
                    array.put(str);
                }
                try {
                    o = new JSONObject();
                    o.put("msg", "activity");
                    o.put("address", mac);
                    o.put("name", name);
                    o.put("value", array);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mCallbackContext_GetActivityMessage.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if (AaInsSet.MSG_AM_SLEEP.equals(action)) {
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                List<String> sleeps = intent.getStringArrayListExtra(AaInsSet.MSG_AM_SLEEP_EXTRA);
                JSONObject o = null;
                JSONArray array = new JSONArray();
                for (String str : sleeps) {
                    array.put(str);
                }
                try {
                    o = new JSONObject();
                    o.put("msg", "sleep");
                    o.put("address", mac);
                    o.put("name", name);
                    o.put("value", array);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mCallbackContext_GetSleepMessage.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if (AaInsSet.MSG_AM_STAGE_FORMS.equals(action)) {
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                List<String> stageforms = intent.getStringArrayListExtra(AaInsSet.MSG_AM_STAGE_FORMS_EXTRA);
                JSONObject o = null;
                JSONArray array = new JSONArray();
                for (String str : stageforms) {
                    array.put(str);
                }
                try {
                    o = new JSONObject();
                    o.put("msg", "stage forms");
                    o.put("address", mac);
                    o.put("name", name);
                    o.put("value", array);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mCallbackContext_GetStageMessage.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if(AaInsSet.MSG_AM_REALTIME.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                String realtime = intent.getStringExtra(AaInsSet.MSG_AM_REALTIME_EXTRA);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "realtime");
                    o.put("address", mac);
                    o.put("name", name);
                    o.put("value", realtime);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mCallbackContext_GetRealTimeMessage.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if(AaInsSet.MSG_AM_RESET.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "resetDevice");
                    o.put("address", mac);
                    o.put("name", name);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mCallbackContext_Reset.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if (AaInsSet.MSG_AM_BATTERY.equals(action)) {
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                int battery = intent.getIntExtra(AaInsSet.MSG_AM_BATTERY_EXTRA,0);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "battery");
                    o.put("address", mac);
                    o.put("name", name);
                    o.put("value", battery);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mCallbackContext_GetBattery.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if(AaInsSet.MSG_AM_RANDOM.equals(action)){
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                String random = intent.getStringExtra(AaInsSet.MSG_AM_RANDOM_EXTRA);
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "setRandomOK");
                    o.put("address", mac);
                    o.put("name", name);
                    o.put("value", random);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                CallbackContext callbackContext = mCallbackContext_SetRandom.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if (BaseManager.MSG_IHEALTH_CONNECTING.equals(action)) {
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
                
            } else if (BaseManager.MSG_IHEALTH_CONNECTED.equals(action)) {
                String mac = intent.getStringExtra(BaseManager.MSG_IHEALTH_MAC);
                String name = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
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
                
            } else if (BaseManager.MSG_DISCOVER_FINISHED.equals(action)) {
                JSONObject o = null;
                try {
                    o = new JSONObject();
                    o.put("msg", "discovery done");
                } catch (Exception e) {
                    e.printStackTrace();
                }
                keepCallback(mCallbackContext_Discovery, o.toString());
                
            } else if (BaseManager.MSG_IHEALTH_IDPS.equals(action)) {
                String type = intent.getStringExtra(BaseManager.MSG_IHEALTH_TYPE);
                if(!type.equals(BaseManager.TYPE_AM3S)){
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
                CallbackContext callbackContext = mCallbackContext_Connection.get(mac);
                if(callbackContext != null)
                    keepCallback(callbackContext, o.toString());
                
            } else if (BaseManager.MSG_IHEALTH_DISCONNECT.equals(action)) {
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
                if (callbackContext != null) {
                    keepCallback(callbackContext, o.toString());
                    mapdisconnectCallback.remove(mac);
                }
                if(mapCallback != null && mapCallback.get(mac) != null){
                    for (CallbackContext callback : mapCallback.get(mac)) {
                        if (callback != null) {
                            keepCallback(callback, o.toString());
                        }
                    }
                    mapCallback.remove(mac);
                }
                
                mCallbackContext_Connection.remove(mac);
                mCallbackContext_Reset.remove(mac);
                mCallbackContext_GetUserId.remove(mac);
                mCallbackContext_SetUserId.remove(mac);
                mCallbackContext_SetUserMessage.remove(mac);
                mCallbackContext_GetUserMessage.remove(mac);
                mCallbackContext_GetClocktotal.remove(mac);
                mCallbackContext_GetClockDetail.remove(mac);
                mCallbackContext_SetClock.remove(mac);
                mCallbackContext_DeleteClock.remove(mac);
                mCallbackContext_GetRemind.remove(mac);
                mCallbackContext_SetRemind.remove(mac);
                mCallbackContext_GetActivityMessage.remove(mac);
                mCallbackContext_GetSleepMessage.remove(mac);
                mCallbackContext_GetAlarmClock.remove(mac);
                mCallbackContext_GetRealTimeMessage.remove(mac);
                mCallbackContext_GetHourType.remove(mac);
                mCallbackContext_SetHourType.remove(mac);
                mCallbackContext_SetRandom.remove(mac);
                mCallbackContext_GetStageMessage.remove(mac);
                mCallbackContext_GetBattery.remove(mac);
                
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