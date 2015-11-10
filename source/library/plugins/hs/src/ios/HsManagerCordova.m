#import "HsManagerCordova.h"

@implementation HsManagerCordova{
    
    HS4Controller *controller;

    NSMutableDictionary *callbackList;

    NSMutableDictionary *deviceIDPSList;
    
    NSNumber*commandState;
}



#pragma mark -
#pragma mark Cordova Methods


- (void)pluginInitialize {

    NSLog(@"Bluetooth Serial Cordova Plugin - BLE version");

    [super pluginInitialize];

    callbackList = [[NSMutableDictionary alloc]init];

    controller = [HS4Controller shareIHHs4Controller];

    deviceIDPSList = [[NSMutableDictionary alloc]init];

    commandState=[NSNumber numberWithInt:0];

     [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceDisconnected:) name:@"HS4DisConnectNoti" object:nil];

}


- (id)init
{
    self = [super init];

     controller = [HS4Controller shareIHHs4Controller];

     deviceIDPSList = [[NSMutableDictionary alloc]init];

    commandState=[NSNumber numberWithInt:0];

    return self;
}


#pragma mark -
#pragma mark My Methods


-(void)sendCallBackSomeJsonData:(NSDictionary*)dataDic commandID:(NSString*)commandID{

    CDVPluginResult* pluginResult = nil;
    
    NSError *error = Nil;
    
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dataDic options:(NSJSONWritingPrettyPrinted) error:&error];

    NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: jsonString];

    [pluginResult setKeepCallbackAsBool:YES];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:commandID];

    
}



- (HS4*) getHS4withMac:(NSString *)mac{


    controller = [HS4Controller shareIHHs4Controller];

    NSArray *hsDeviceArray = [controller getAllCurrentHS4Instace];

    if (hsDeviceArray.count>0 && mac.length>0)
    {
        for(HS4 *tempHS4 in hsDeviceArray){

          if([mac isEqualToString:tempHS4.deviceID]){
            
            return tempHS4;

            break;
          
          }
        }
    }

         return nil;
   

}

-(void)deviceConnected:(NSNotification *)tempNoti{

    NSDictionary *infoDic = [tempNoti userInfo];

     NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    NSString *serialNumber = [infoDic objectForKey:@"SerialNumber"];

     [message setObject:@"discovery doing" forKey:@"msg"];

     [message setObject:serialNumber forKey:@"address"];

     [message setObject:@"HS4" forKey:@"name"];

     [deviceIDPSList setObject:infoDic forKey:serialNumber];

    [self sendCallBackSomeJsonData:message commandID:[callbackList valueForKey:@"deviceConnected"]];

}


-(void)deviceDisconnected:(NSNotification *)tempNoti{


    NSDictionary *infoDic = [tempNoti userInfo];

     NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    NSString *serialNumber = [infoDic objectForKey:@"SerialNumber"];
    
    if (serialNumber.length>0) {

         [message setObject:serialNumber forKey:@"address"];

    }

     [message setObject:@"disconnect" forKey:@"msg"];


    [message setObject:@"HS4" forKey:@"type"];

    [self sendCallBackSomeJsonData:message commandID:[callbackList valueForKey:@"deviceDicConnected"]];
    
}

#pragma mark -
#pragma mark some Methods

- (void) getIDPS:(CDVInvokedUrlCommand*)command{

     NSString* mac = [command.arguments objectAtIndex:1];

     NSMutableDictionary* message = [[NSMutableDictionary alloc] init];
   
    if (mac.length>0)
     {
        if ([deviceIDPSList valueForKey:mac]!=nil)
        {
            NSDictionary*myDic=[deviceIDPSList valueForKey:mac];

             [message setObject:@"IDPS" forKey:@"msg"];

             [message setObject:mac forKey:@"address"];

             [message setObject:[myDic valueForKey:@"FirmwareVersion"] forKey:@"FirmwareVersion"];
             
             [message setObject:[myDic valueForKey:@"HardwareVersion"] forKey:@"HardwareVersion"];
             
             [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
        }else{

            [message setObject:@"error" forKey:@"msg"];

            [message setObject:@400 forKey:@"errorID"];

            [message setObject:mac forKey:@"address"];

            [message setObject:@"HS" forKey:@"ProductType"];

            [message setObject:@"HS4" forKey:@"ProductModel"];
           

            [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        }
        

     }else{

         [message setObject:@"error" forKey:@"msg"];

         [message setObject:@600 forKey:@"errorID"];

         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
     }


}

- (void) startDiscovery:(CDVInvokedUrlCommand*)command{


    controller = [HS4Controller shareIHHs4Controller];


     NSArray *hsDeviceArray = [controller getAllCurrentHS4Instace];

    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    if (hsDeviceArray.count>0)
    {

              for (int i = 0; i < hsDeviceArray.count; i++) {
        
               HS4*myHS4=[hsDeviceArray objectAtIndex:i];
        
       
               [message setObject:@"discovery doing" forKey:@"msg"];

               [message setObject:myHS4.deviceID forKey:@"address"];

               [message setObject:@"HS4" forKey:@"name"];


               [self sendCallBackSomeJsonData:message commandID:command.callbackId];

               }
          
    }else{

         [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceConnected:) name:@"HS4ConnectNoti" object:nil];

         [callbackList setObject:command.callbackId forKey: @"deviceConnected"];
    }

   

}



- (void) stopDiscovery:(CDVInvokedUrlCommand*)command{


    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    [message setObject:@"discovery done" forKey:@"msg"];


    [self sendCallBackSomeJsonData:message commandID:command.callbackId];

}

- (void) connectDevice:(CDVInvokedUrlCommand*)command{

     NSString* mac = [command.arguments objectAtIndex:1];

    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];
   
    [message setObject:@"connected" forKey:@"msg"];

    [message setObject:mac forKey:@"address"];

    [message setObject:@"HS4" forKey:@"name"];
          
    [self sendCallBackSomeJsonData:message commandID:command.callbackId];


}


- (void) startMeasure:(CDVInvokedUrlCommand*)command{

  NSString* appsecret = [command.arguments objectAtIndex:0];

  NSString* mac = [command.arguments objectAtIndex:1];

  NSNumber* unit = [command.arguments objectAtIndex:2];


  NSMutableDictionary* message = [[NSMutableDictionary alloc] init];
   
  HS4 *hsInstance = [self getHS4withMac:mac];


  if ([commandState intValue]==1) {
        
        [message removeAllObjects];
        
        [message setObject:@"error" forKey:@"msg"];
        
        [message setObject:[NSNumber numberWithInt:500] forKey:@"errorID"];
        
        [message setObject:@"HS" forKey:@"ProductType"];
            
        [message setObject:@"HS4" forKey:@"ProductModel"];
        
        [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
        return;
        
    }

    if(hsInstance!=nil){

        [message setObject:hsInstance.deviceID forKey:@"address"];

            commandState=@1;

         [hsInstance commandMeasureWithAppSecret:appsecret Uint:unit Weight:^(NSNumber *unStableWeight) {

            [message setObject:@"realtime" forKey:@"msg"];

            [message setObject:unStableWeight forKey:@"value"];

            [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
         } StableWeight:^(NSNumber *StableWeight) {

             commandState=@0;

             [message setObject:@"weight" forKey:@"msg"];

             [message setObject:StableWeight forKey:@"value"];

             [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
         } DisposeErrorBlock:^(HS4DeviceError errorID) {

            commandState=@0;

             if (errorID==HS4DeviceDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:hsInstance.deviceID forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];

                 }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:errorID] forKey:@"errorID"];

                 [message setObject:@"HS" forKey:@"ProductType"];

                 [message setObject:@"HS4" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
             
             
                 }
        
         }];

        

    }else{

         commandState=@0;

        [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"HS" forKey:@"ProductType"];
            
         [message setObject:@"HS4" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    }

}

- (void) getOfflineData:(CDVInvokedUrlCommand*)command{


     NSString* appsecret = [command.arguments objectAtIndex:0];

     NSString* mac = [command.arguments objectAtIndex:1];

     NSMutableDictionary* message = [[NSMutableDictionary alloc] init];
   
      HS4 *hsInstance = [self getHS4withMac:mac];

      if ([commandState intValue]==1) {
        
        [message removeAllObjects];
        
        [message setObject:@"error" forKey:@"msg"];
        
        [message setObject:[NSNumber numberWithInt:500] forKey:@"errorID"];
        
        [message setObject:@"HS" forKey:@"ProductType"];
            
        [message setObject:@"HS4" forKey:@"ProductModel"];
        
        [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
        return;
        
    }

     if(hsInstance!=nil){


        [message setObject:hsInstance.deviceID forKey:@"address"];


        [hsInstance commandTransferWithAppSecret:appsecret MemorryData:^(NSDictionary *startDataDictionary) {
        
        } DisposeProgress:^(NSNumber *progress) {
        
        } MemorryData:^(NSArray *historyDataArray) {

         [message setObject:@"history" forKey:@"msg"];

         [message setObject:historyDataArray forKey:@"history"];

         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
        } FinishTransmission:^{
        
        } DisposeErrorBlock:^(HS4DeviceError errorID) {

            if (errorID==HS4DeviceDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:hsInstance.deviceID forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];

                 }else if(errorID==HS4DataZeor){

                 [message setObject:@"No Data" forKey:@"msg"];

                 [message setObject:hsInstance.deviceID forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];


                 }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:errorID] forKey:@"errorID"];

                 [message setObject:@"HS" forKey:@"ProductType"];

                 [message setObject:@"HS4" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
             
             
                 }
        
       }];


       }else{

          commandState=@0;

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"HS" forKey:@"ProductType"];
            
         [message setObject:@"HS4" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
      }

}

- (void) disConnectDevice:(CDVInvokedUrlCommand*)command{

     NSString* mac = [command.arguments objectAtIndex:1];

    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    [message setObject:@"disconnect" forKey:@"msg"];

    [message setObject:mac forKey:@"address"];

    [message setObject:@"HS4" forKey:@"type"];
           
    [self sendCallBackSomeJsonData:message commandID:command.callbackId];


}

- (void) setDisconnectCallback:(CDVInvokedUrlCommand*)command{


      [callbackList setObject:command.callbackId forKey: @"deviceDicConnected"];


}






@end
