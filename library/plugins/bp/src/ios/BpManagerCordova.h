#import <Cordova/CDVPlugin.h>
#import "BPHeader.h"

@interface BpManagerCordova :CDVPlugin

- (void) sendCallBackSomeJsonData:(NSDictionary*)dataDic commandID:(NSString*)commandID;

- (NSString*) isBP5OrBP3LwithMac:(NSString *)mac;

- (BP5*) getBP5withMac:(NSString *)mac;

- (BP7*) getBP7withMac:(NSString *)mac;

- (BP3L*) getBP3LwithMac:(NSString *)mac;

- (void) getIDPS:(CDVInvokedUrlCommand*)command;

- (void) startDiscovery:(CDVInvokedUrlCommand*)command;

- (void) connectDevice:(CDVInvokedUrlCommand*)command;

- (void) stopDiscovery:(CDVInvokedUrlCommand*)command;

- (void) startMeasure:(CDVInvokedUrlCommand*)command;

- (void) stopMeasure:(CDVInvokedUrlCommand*)command;

- (void) enableOffline:(CDVInvokedUrlCommand*)command;

- (void) disenableOffline:(CDVInvokedUrlCommand*)command;

- (void) getOfflineNum:(CDVInvokedUrlCommand*)command ;

- (void) getOfflineData:(CDVInvokedUrlCommand*)command;

- (void) getBattery:(CDVInvokedUrlCommand*)command;

- (void) isEnableOffline:(CDVInvokedUrlCommand*)command;

- (void) setDisconnectCallback:(CDVInvokedUrlCommand*)command;

- (void) disConnectDevice:(CDVInvokedUrlCommand*)command;

- (void) confirmAngle:(CDVInvokedUrlCommand*)command;


@end


      
        
           
       
 