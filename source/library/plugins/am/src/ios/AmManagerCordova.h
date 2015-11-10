#import <Cordova/CDVPlugin.h>
#import "AMHeader.h"
@interface AmManagerCordova :CDVPlugin


- (void) sendCallBackSomeJsonData:(NSDictionary*)dataDic commandID:(NSString*)commandID;

- (AM3S*) getAM3SwithMac:(NSString *)mac;
// return:msg(discovery doing),address,name
- (void) startDiscovery:(CDVInvokedUrlCommand*)command;
// return:msg(discovery done),name
- (void) stopDiscovery:(CDVInvokedUrlCommand*)command;
//return:msg(connected),address,name
- (void) connectDevice:(CDVInvokedUrlCommand*)command;
//retun:msg(IDPS),HardwareVersion,FirmwareVersion,address
- (void) getIDPS:(CDVInvokedUrlCommand*)command;
//return:msg(resetDevice),address
- (void) resetDevice:(CDVInvokedUrlCommand*)command;
//return: msg(user id),value(userID),address
- (void) getUserId:(CDVInvokedUrlCommand*)command;
//input:userId    return: msg(setUserIdOK),address
- (void) setUserId:(CDVInvokedUrlCommand*)command;
//input:age, weight, height, sex, lengthType, activityLevel, target, hourType
//return: msg(setUserMessageOK),address
- (void) setUserMessage:(CDVInvokedUrlCommand*)command;
//input:userId    
//return: msg(user info),address,value(TotalStep1,TotalStep2,TotalStep3,Step,Gender(Male:1 female:0),Weight,Unit(Metric system metric 0 x01 imperial 0 x00),Height,Age)
- (void) getUserMessage:(CDVInvokedUrlCommand*)command;
//return:msg(alarmclock number),address,value(clock number)
- (void) getClocktotal:(CDVInvokedUrlCommand*)command;
//return:msg(alarmclock detail),address,value()
- (void) getClockDetail:(CDVInvokedUrlCommand*)command;
//input:clockID, hour, min, repeat, weeks, open  return:msg(setClockOK)
- (void) setClock:(CDVInvokedUrlCommand*)command;
//input:clockID return:msg(deleteClockOK),address
- (void) deleteClock:(CDVInvokedUrlCommand*)command;
//return:msg(remindInfo),address,value(Switch(false/true),Time(12:00))
- (void) getRemind:(CDVInvokedUrlCommand*)command;
//input:Switch(false/true),Time(12:00) return:msg(setRemindOK),address
- (void) setRemind:(CDVInvokedUrlCommand*)command;
//return:msg(activity),address,value([(AMstepNum,Start,AMstepSize,dataID,AMcalorie,AMDate,Day)])
- (void) getActivityMessage:(CDVInvokedUrlCommand*)command;
//return:msg(sleep),address,value([(SleepData,dataID,AMDate(2015-09-04 06:00:21))])
- (void) getSleepMessage:(CDVInvokedUrlCommand*)command;
//return:msg(realtime),address,value(Step,Calories)
- (void) getRealTimeMessage:(CDVInvokedUrlCommand*)command;
//return:msg(getHourType),value(0:TimeFormat_HH 24  1:TimeFormat_hh 12)
- (void) getHourType:(CDVInvokedUrlCommand*)command;
//input：hourType(0:TimeFormat_HH 24  1:TimeFormat_hh 12)  return:msg(alarmclock number),address,
- (void) setHourType:(CDVInvokedUrlCommand*)command;
//return:msg(setRandomOK),address
- (void) setRandom:(CDVInvokedUrlCommand*)command;
//return:msg(stage forms),address,value()
- (void) getStageMessage:(CDVInvokedUrlCommand*)command;
//failure
- (void) getPicture:(CDVInvokedUrlCommand*)command;
//failure
- (void) setPicture:(CDVInvokedUrlCommand*)command;
//return:msg(battery),address,value(0-100)
- (void) getBattery:(CDVInvokedUrlCommand*)command;
//return:msg(disconnect),address
- (void) disConnectDevice:(CDVInvokedUrlCommand*)command;
// No return
- (void) setDisconnectCallback:(CDVInvokedUrlCommand*)command;
          

@end


      
        
           
       
 