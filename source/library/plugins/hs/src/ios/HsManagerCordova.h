#import <Cordova/CDVPlugin.h>
#import "HSHeader.h"
@interface HsManagerCordova :CDVPlugin



- (void) sendCallBackSomeJsonData:(NSDictionary*)dataDic commandID:(NSString*)commandID;

- (HS4*) getHS4withMac:(NSString *)mac;

- (void) getIDPS:(CDVInvokedUrlCommand*)command;

- (void) startDiscovery:(CDVInvokedUrlCommand*)command;

- (void) stopDiscovery:(CDVInvokedUrlCommand*)command;

- (void) connectDevice:(CDVInvokedUrlCommand*)command;

- (void) startMeasure:(CDVInvokedUrlCommand*)command;

- (void) getOfflineData:(CDVInvokedUrlCommand*)command;

- (void) disConnectDevice:(CDVInvokedUrlCommand*)command;

- (void) setDisconnectCallback:(CDVInvokedUrlCommand*)command;



@end


      
        
           
       
 