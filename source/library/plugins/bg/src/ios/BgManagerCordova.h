#import <Cordova/CDVPlugin.h>
#import "BGHeader.h"
@interface BgManagerCordova :CDVPlugin


- (void) sendCallBackSomeJsonData:(NSDictionary*)dataDic commandID:(NSString*)commandID;

- (BG5*) getBG5withMac:(NSString *)mac;

// return:msg(discovery doing),address,name
- (void) startDiscovery:(CDVInvokedUrlCommand*)command;
// Not Support
- (void) stopDiscovery:(CDVInvokedUrlCommand*)command;
// Not Support
- (void) connectDevice:(CDVInvokedUrlCommand*)command;
//retun:msg(IDPS),HardwareVersion,FirmwareVersion,address
- (void) getIDPS:(CDVInvokedUrlCommand*)command;
//input:unit(1:mmol/L  2:mg/dL)   return: msg(setUnit),address
- (void) setUnit:(CDVInvokedUrlCommand*)command;
//input:BottleId  return: msg(setBottleId),address
- (void) setBottleId:(CDVInvokedUrlCommand*)command;
//retun:msg(bottleID),bottleID,address
- (void) getBottleId:(CDVInvokedUrlCommand*)command;
//input: qr(format：024C565F4C5614322D1200A02F3485B6F314378BACD619011F72003608A9), leftNum, time(format：2015-09-03 00:00:00) 
//return: msg(setBottleMessage),BGOpenMode(1:OpenWithStrip 2:normal open),address
- (void) setBottleMessage:(CDVInvokedUrlCommand*)command;
//retun:msg(code),bottleid,address,leftnum,expiretime(format:04 56 2002)
- (void) getBottleMessage:(CDVInvokedUrlCommand*)command;
//retun:msg(battery),battery,address,(More than BG5 6.0.0 version support)
- (void) getBattery:(CDVInvokedUrlCommand*)command;
//retun:msg(historyDataCount),count,address
//retun:msg(historyData),history(ResultList[Result(144),Date(2015-10-30 16:33:00),address
- (void) getOfflineData:(CDVInvokedUrlCommand*)command;
//retun:msg(deleteOfflineData),address
- (void) deleteOfflineData:(CDVInvokedUrlCommand*)command;
//retun:msg(holdLink),address
- (void) holdLink:(CDVInvokedUrlCommand*)command;
//retun:msg(strip in),address
//retun:msg(get blood),address
//retun:msg(value),value(BG test Result),address
- (void) startMeasure:(CDVInvokedUrlCommand*)command;
//retun:msg(disconnect),address
- (void) disConnectDevice:(CDVInvokedUrlCommand*)command;
// No return
- (void) setDisconnectCallback:(CDVInvokedUrlCommand*)command;
//input:codeStr retun:msg(codeInfo),codeInfo(BottleID,StripNum,DueDate(2015-11-18 23:59:59),OpenDate(2015-10-30 16:43:33),CodeDueDateOfOpen(2016-01-28 16:43:33)
- (void) codeStripStrAnalysis:(CDVInvokedUrlCommand*)command;

@end


      
        
           
       
 