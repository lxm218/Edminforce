#import <Cordova/CDVPlugin.h>
#import "POHeader.h"
@interface POManagerCordova :CDVPlugin



- (void) sendCallBackSomeJsonData:(NSDictionary*)dataDic commandID:(NSString*)commandID;

- (PO3*) getPO3withMac:(NSString *)mac;

- (void) getIDPS:(CDVInvokedUrlCommand*)command;

- (void) startDiscovery:(CDVInvokedUrlCommand*)command;

- (void) stopDiscovery:(CDVInvokedUrlCommand*)command;

- (void) connectDevice:(CDVInvokedUrlCommand*)command;

- (void) startMeasure:(CDVInvokedUrlCommand*)command;

- (void) getOfflineData:(CDVInvokedUrlCommand*)command;

- (void) getBattery:(CDVInvokedUrlCommand*)command;

- (void) disConnectDevice:(CDVInvokedUrlCommand*)command;

- (void) setDisconnectCallback:(CDVInvokedUrlCommand*)command;


@end


      
        
           
       
 