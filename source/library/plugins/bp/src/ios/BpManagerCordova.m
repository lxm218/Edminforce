#import "BpManagerCordova.h"

@implementation BpManagerCordova{
    
    BP5Controller *controller;

    BP3LController *bp3lController;

    BP7Controller *bp7Controller;

    NSMutableDictionary *callbackList;

    NSMutableDictionary *deviceIDPSList;
    
    NSNumber*commandState;
}

NSString* theCallbackId;


#pragma mark -
#pragma mark Cordova Methods


- (void)pluginInitialize {

    NSLog(@"Bluetooth Serial Cordova Plugin - BLE version");

    [super pluginInitialize];

    callbackList = [[NSMutableDictionary alloc]init];

    deviceIDPSList = [[NSMutableDictionary alloc]init];

    controller = [BP5Controller shareBP5Controller];

    bp3lController = [BP3LController shareBP3LController];

    bp7Controller=[BP7Controller shareBP7Controller];
    
    commandState=[NSNumber numberWithInt:0];

     [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceDisconnected:) name:@"BP5DisConnectNoti" object:nil];

     [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(bp3lDeviceDisconnected:) name:@"BP3LDidDisConnect" object:nil];

      [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(bp7DeviceDisconnected:) name:@"BP7DisConnectNoti" object:nil];
}


- (id)init
{
    self = [super init];

     controller = [BP5Controller shareBP5Controller];

     bp3lController = [BP3LController shareBP3LController];

     bp7Controller=[BP7Controller shareBP7Controller];
    
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

- (NSString*) isBP5OrBP3LwithMac:(NSString *)mac{
    
    controller = [BP5Controller shareBP5Controller];

     bp3lController = [BP3LController shareBP3LController];
    
    NSArray *bpDeviceArray = [controller getAllCurrentBP5Instace];

    NSArray *bp3lDeviceArray = [bp3lController getAllCurrentBP3LInstace];


    if (bpDeviceArray.count>0 && mac.length>0)
    {
        for(BP5 *tempBP5 in bpDeviceArray){
            
            if([mac isEqualToString:tempBP5.serialNumber]){
                
                return @"BP5";
                break;
                
            }
        }
    }else if (bp3lDeviceArray.count>0 && mac.length>0)
    {
        for(BP3L *tempBP3l in bp3lDeviceArray){
            
            if([mac isEqualToString:tempBP3l.serialNumber]){
                
                return @"BP3L";
                break;
                
            }
        }
    }

    return @"BP7";
    
}



- (BP5*) getBP5withMac:(NSString *)mac{
    
    controller = [BP5Controller shareBP5Controller];
    
    NSArray *bpDeviceArray = [controller getAllCurrentBP5Instace];

    if (bpDeviceArray.count>0 && mac.length>0)
    {
        for(BP5 *tempBP5 in bpDeviceArray){

          if([mac isEqualToString:tempBP5.serialNumber]){
            
            return tempBP5;
              
            break;
          
          }
        }
    }
    
    
    return nil;

}

- (BP3L*) getBP3LwithMac:(NSString *)mac{

    bp3lController = [BP3LController shareBP3LController];

    NSArray *bpDeviceArray = [bp3lController getAllCurrentBP3LInstace];

    if (bpDeviceArray.count>0 && mac.length>0)
    {
        for(BP3L *tempBP3L in bpDeviceArray){

          if([mac isEqualToString:tempBP3L.serialNumber]){
            
            return tempBP3L;
            break;
          
          }
        }
    }
    
    return nil;

}
- (BP7*) getBP7withMac:(NSString *)mac{

    bp7Controller=[BP7Controller shareBP7Controller];

    NSArray *bp7DeviceArray = [bp7Controller getAllCurrentBP7Instace];

    if (bp7DeviceArray.count>0 && mac.length>0)
    {
        for(BP7 *tempBP7 in bp7DeviceArray){

          if([mac isEqualToString:tempBP7.serialNumber]){
            
            return tempBP7;
            break;
          
          }
        }
    }
    
    return nil;


}

#pragma mark -
#pragma mark some NSNotification

-(void)bp7DeviceConnected:(NSNotification *)tempNoti{

    NSDictionary *infoDic = [tempNoti userInfo];

     NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    NSString *serialNumber = [infoDic objectForKey:@"SerialNumber"];

     [message setObject:@"discovery doing" forKey:@"msg"];

     [message setObject:serialNumber forKey:@"address"];

     [message setObject:@"BP7" forKey:@"name"];

     [deviceIDPSList setObject:infoDic forKey:serialNumber];

    [self sendCallBackSomeJsonData:message commandID:[callbackList valueForKey:@"BP7deviceConnected"]];

}

-(void)bp3lDeviceConnected:(NSNotification *)tempNoti{

    NSDictionary *infoDic = [tempNoti userInfo];

     NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    NSString *serialNumber = [infoDic objectForKey:@"SerialNumber"];

     [message setObject:@"discovery doing" forKey:@"msg"];

     [message setObject:serialNumber forKey:@"address"];

     [message setObject:@"BP3L" forKey:@"name"];

     [deviceIDPSList setObject:infoDic forKey:serialNumber];

    [self sendCallBackSomeJsonData:message commandID:[callbackList valueForKey:@"BP3LdeviceConnected"]];

}

-(void)deviceConnected:(NSNotification *)tempNoti{

    NSDictionary *infoDic = [tempNoti userInfo];

     NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    NSString *serialNumber = [infoDic objectForKey:@"SerialNumber"];

     [message setObject:@"discovery doing" forKey:@"msg"];

     [message setObject:serialNumber forKey:@"address"];

     [message setObject:@"BP5" forKey:@"name"];

     [deviceIDPSList setObject:infoDic forKey:serialNumber];

    [self sendCallBackSomeJsonData:message commandID:[callbackList valueForKey:@"deviceConnected"]];

}
-(void)bp7DeviceDisconnected:(NSNotification *)tempNoti{

      NSDictionary *infoDic = [tempNoti userInfo];

     NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    NSString *serialNumber = [infoDic objectForKey:@"SerialNumber"];
    
    if (serialNumber!=nil) {
        
         [message setObject:serialNumber forKey:@"address"];
    }

     [message setObject:@"disconnect" forKey:@"msg"];

    [message setObject:@"BP7" forKey:@"type"];

    [self sendCallBackSomeJsonData:message commandID:[callbackList valueForKey:@"BP7deviceDisConnected"]];


}
-(void)bp3lDeviceDisconnected:(NSNotification *)tempNoti{

      NSDictionary *infoDic = [tempNoti userInfo];

     NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    NSString *serialNumber = [infoDic objectForKey:@"SerialNumber"];
    
    if (serialNumber!=nil) {
        
         [message setObject:serialNumber forKey:@"address"];
    }

     [message setObject:@"disconnect" forKey:@"msg"];

    [message setObject:@"BP3L" forKey:@"type"];

    [self sendCallBackSomeJsonData:message commandID:[callbackList valueForKey:@"BP3LdeviceDisConnected"]];


}
-(void)deviceDisconnected:(NSNotification *)tempNoti{


     NSDictionary *infoDic = [tempNoti userInfo];

     NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    NSString *serialNumber = [infoDic objectForKey:@"SerialNumber"];

     [message setObject:@"disconnect" forKey:@"msg"];

    if (serialNumber!=nil) {
        
        [message setObject:serialNumber forKey:@"address"];
        
        [deviceIDPSList removeObjectForKey:serialNumber];
    }


    [message setObject:@"BP5" forKey:@"type"];

    [self sendCallBackSomeJsonData:message commandID:[callbackList valueForKey:@"deviceDisConnected"]];
    
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

            [message setObject:@"BP" forKey:@"ProductType"];

            if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP3L"]) {
            
            [message setObject:@"BP3L" forKey:@"ProductModel"];
            
             }else if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP5"]){
        
            [message setObject:@"BP5" forKey:@"ProductModel"];

            }else{
            
            [message setObject:@"BP7" forKey:@"ProductModel"];
            }
           

            [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        }
        

     }else{

         [message setObject:@"error" forKey:@"msg"];

         [message setObject:@600 forKey:@"errorID"];

         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
     }


}


- (void) startDiscovery:(CDVInvokedUrlCommand*)command{


    controller = [BP5Controller shareBP5Controller];


    NSArray *bpDeviceArray = [controller getAllCurrentBP5Instace];

    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    if (bpDeviceArray.count>0)
    {

              for (int i = 0; i < bpDeviceArray.count; i++) {
        
               BP5*myBp5=[bpDeviceArray objectAtIndex:i];
        
       
               [message setObject:@"discovery doing" forKey:@"msg"];

               [message setObject:myBp5.serialNumber forKey:@"address"];

               [message setObject:@"BP5"forKey:@"name"];
               

               [self sendCallBackSomeJsonData:message commandID:command.callbackId];

               }
          
    }else{

         [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceConnected:) name:@"BP5ConnectNoti" object:nil];

         [callbackList setObject:command.callbackId forKey: @"deviceConnected"];
    }


      bp3lController = [BP3LController shareBP3LController];

    NSArray *bp3LDeviceArray = [bp3lController getAllCurrentBP3LInstace];


    if (bp3LDeviceArray.count>0)
    {

              for (int i = 0; i < bp3LDeviceArray.count; i++) {
        
               BP3L*myBp3L=[bp3LDeviceArray objectAtIndex:i];
        
       
               [message setObject:@"discovery doing" forKey:@"msg"];

               [message setObject:myBp3L.serialNumber forKey:@"address"];

               [message setObject:@"BP3L" forKey:@"name"];


               [self sendCallBackSomeJsonData:message commandID:command.callbackId];

               }
          
    }else{

         [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(bp3lDeviceConnected:) name:@"BP3LDeviceDidConnected" object:nil];

         [callbackList setObject:command.callbackId forKey: @"BP3LdeviceConnected"];
    }


      bp7Controller=[BP7Controller shareBP7Controller];

    NSArray *bp7DeviceArray = [bp7Controller getAllCurrentBP7Instace];


    if (bp7DeviceArray.count>0)
    {

              for (int i = 0; i < bp7DeviceArray.count; i++) {
        
               BP7*myBp7=[bp7DeviceArray objectAtIndex:i];
        
       
               [message setObject:@"discovery doing" forKey:@"msg"];

               [message setObject:myBp7.serialNumber forKey:@"address"];

               [message setObject:@"BP7" forKey:@"name"];


               [self sendCallBackSomeJsonData:message commandID:command.callbackId];

               }
          
    }else{

         [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(bp7DeviceConnected:) name:@"BP7ConnectNoti" object:nil];

         [callbackList setObject:command.callbackId forKey: @"BP7deviceConnected"];
    }


   

}



- (void) stopDiscovery:(CDVInvokedUrlCommand*)command{

    NSString* mac = [command.arguments objectAtIndex:1];

    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];


     [bp3lController commandStopSearchDevice];

     [message setObject:@"discovery done" forKey:@"msg"];

     [message setObject:@"BP3L" forKey:@"name"];


    // if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP3L"]) {


       
    //          [bp3lController commandStopSearchDevice];

    //          [message setObject:@"discovery done" forKey:@"msg"];

    //          [message setObject:@"BP3L" forKey:@"name"];

        

    //  }else if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP5"]){


    //      [message setObject:@"error" forKey:@"msg"];
        
    //      [message setObject:[NSNumber numberWithInt:800] forKey:@"errorID"];
        
    //      [message setObject:@"BP" forKey:@"ProductType"];
        
    //      [message setObject:mac forKey:@"address"];

    //      [message setObject:@"BP5" forKey:@"ProductModel"];

    //  }else if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP7"]){

    //      [message setObject:@"error" forKey:@"msg"];
        
    //      [message setObject:[NSNumber numberWithInt:800] forKey:@"errorID"];
        
    //      [message setObject:@"BP" forKey:@"ProductType"];
        
    //      [message setObject:mac forKey:@"address"];

    //      [message setObject:@"BP7" forKey:@"ProductModel"];
          
    //  }else{

    //      [message setObject:@"error" forKey:@"msg"];
        
    //      [message setObject:[NSNumber numberWithInt:800] forKey:@"errorID"];
        
    //      [message setObject:@"BP" forKey:@"ProductType"];
        
    //      [message setObject:mac forKey:@"address"];
          
    //  }


    [self sendCallBackSomeJsonData:message commandID:command.callbackId];

}

- (void) connectDevice:(CDVInvokedUrlCommand*)command{

     NSString* mac = [command.arguments objectAtIndex:1];

    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    [message setObject:@"error" forKey:@"msg"];
        
    [message setObject:[NSNumber numberWithInt:800] forKey:@"errorID"];
        
    [message setObject:@"BP" forKey:@"ProductType"];
        
    [message setObject:mac forKey:@"address"];

     if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP3L"]) {

         [message setObject:@"BP3L" forKey:@"ProductModel"];

     }else if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP5"]){

         [message setObject:@"BP5" forKey:@"ProductModel"];

     }else{

         [message setObject:@"BP7" forKey:@"ProductModel"];
          
     }
           

    [self sendCallBackSomeJsonData:message commandID:command.callbackId];


}


- (void) startMeasure:(CDVInvokedUrlCommand*)command{
    
  NSString* appsecret = [command.arguments objectAtIndex:0];

  NSString* mac = [command.arguments objectAtIndex:1];

  NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

  NSMutableDictionary* messageOne = [[NSMutableDictionary alloc] init];


  BP5 *bpInstance = [self getBP5withMac:mac];

  BP3L *bp3lInstance = [self getBP3LwithMac:mac];

  BP7 *bp7Instance = [self getBP7withMac:mac];
    
    if ([commandState intValue]==1) {
        
        [message removeAllObjects];
        
        [message setObject:@"error" forKey:@"msg"];
        
        [message setObject:[NSNumber numberWithInt:500] forKey:@"errorID"];
        
        [message setObject:@"BP" forKey:@"ProductType"];
        
        if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP3L"]) {
            
            [message setObject:@"BP3L" forKey:@"ProductModel"];
            
        }else if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP5"]){
        
            [message setObject:@"BP5" forKey:@"ProductModel"];

        }else{
            
            [message setObject:@"BP7" forKey:@"ProductModel"];
        }
        
        [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
        return;
        
    }

    if(bpInstance!=nil){
        
        commandState=@1;

        [message setObject:bpInstance.serialNumber forKey:@"address"];

         [bpInstance commandStartMeasureWithAppSecret:appsecret BlockZero:^{

             [message setObject:@"zero doing" forKey:@"msg"];

             [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
        } BlockZeroComplete:^{

             [message setObject:@"zero done" forKey:@"msg"];

             [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
        } pressure:^(NSNumber *pressure) {

             [message setObject:@"measure doing" forKey:@"msg"];

             [message setObject:pressure forKey:@"pressure"];

             [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
        } xiaoboWithHeart:^(NSArray *xiaoboArr) {

             [message setObject:@"measure doing" forKey:@"msg"];

             [message setObject:xiaoboArr forKey:@"wave"];

             [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
        } xiaoboNoHeart:^(NSArray *xiaoboArr) {

             [message setObject:@"measure doing" forKey:@"msg"];

             [message setObject:xiaoboArr forKey:@"wave"];

             [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
        } result:^(NSDictionary *dic) {
            
            [message removeAllObjects];
            [message setObject:@"measure done" forKey:@"msg"];
            [message setObject:@"BP5" forKey:@"name"];
            [message setObject:bpInstance.serialNumber forKey:@"address"];
            [message setObject:[dic valueForKey:@"SYS"] forKey:@"highpressure"];
            [message setObject:[dic valueForKey:@"DIA"]  forKey:@"lowpressure"];
            [message setObject:[dic valueForKey:@"heartRate"]  forKey:@"heartrate"];
            [message setObject:[dic valueForKey:@"arrhythmia"]  forKey:@"arrhythmia"];

            [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
            commandState=@0;
            
        } errorBlock:^(BPDeviceError error) {
            
             commandState=@0;

             if (error==BPDidDisconnect) {


                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:bpInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];

           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:error] forKey:@"errorID"];

                 [message setObject:@"BP" forKey:@"ProductType"];

                 [message setObject:@"BP5" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
             
             
             }

            
        }];
        

    }else if(bp3lInstance!=nil){
        
        commandState=@1;

        [messageOne setObject:bp3lInstance.serialNumber forKey:@"address"];
        
        [bp3lInstance commandStartMeasureWithAppSecret:appsecret pressure:^(NSNumber *pressure) {

               [messageOne setObject:@"measure doing" forKey:@"msg"];

             [messageOne setObject:pressure forKey:@"pressure"];
            

              [self sendCallBackSomeJsonData:messageOne commandID:command.callbackId];
        
         } xiaoboWithHeart:^(NSArray *xiaoboArr) {

            [messageOne setObject:@"measure doing" forKey:@"msg"];

             [messageOne setObject:xiaoboArr forKey:@"wave"];

              [self sendCallBackSomeJsonData:messageOne commandID:command.callbackId];
        
         } xiaoboNoHeart:^(NSArray *xiaoboArr) {

            [messageOne setObject:@"measure doing" forKey:@"msg"];

             [messageOne setObject:xiaoboArr forKey:@"wave"];

              [self sendCallBackSomeJsonData:messageOne commandID:command.callbackId];
        
        } result:^(NSDictionary *dic) {
            
            [messageOne removeAllObjects];
            [messageOne setObject:@"measure done" forKey:@"msg"];
            [messageOne setObject:@"BP3L" forKey:@"name"];
            [messageOne setObject:bp3lInstance.serialNumber forKey:@"address"];
            [messageOne setObject:[dic valueForKey:@"SYS"] forKey:@"highpressure"];
            [messageOne setObject:[dic valueForKey:@"DIA"]  forKey:@"lowpressure"];
            [messageOne setObject:[dic valueForKey:@"heartRate"]  forKey:@"heartrate"];

             [self sendCallBackSomeJsonData:messageOne commandID:command.callbackId];
            
            commandState=@0;
        
       } errorBlock:^(BP3LDeviceError error) {

             commandState=@0;
           
             if (error==BP3LDidDisconnect) {


                 [messageOne setObject:@"disconnect" forKey:@"msg"];

                 [messageOne setObject:bp3lInstance.serialNumber forKey:@"address"];

                  [self sendCallBackSomeJsonData:messageOne commandID:command.callbackId];

           }else{
                 
                 [messageOne removeAllObjects];
                 
                 [messageOne setObject:@"error" forKey:@"msg"];
                 
                 [messageOne setObject:[NSNumber numberWithInt:error] forKey:@"errorID"];

                 [messageOne setObject:@"BP" forKey:@"ProductType"];

                 [messageOne setObject:@"BP3L" forKey:@"ProductModel"];
                 
                  [self sendCallBackSomeJsonData:messageOne commandID:command.callbackId];
             
             
             }
        
       }];



    }else if (bp7Instance!=nil){

        commandState=@1;

        [message setObject:bp7Instance.serialNumber forKey:@"address"];

         [bp7Instance commandStartMeasureWithAppSecret:appsecret BlockZero:^{

             [message setObject:@"zero doing" forKey:@"msg"];

             [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
        } BlockZeroComplete:^{

             [message setObject:@"zero done" forKey:@"msg"];

             [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
        } pressure:^(NSNumber *pressure) {

             [message setObject:@"measure doing" forKey:@"msg"];

             [message setObject:pressure forKey:@"pressure"];

             [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
        } xiaoboWithHeart:^(NSArray *xiaoboArr) {

             [message setObject:@"measure doing" forKey:@"msg"];

             [message setObject:xiaoboArr forKey:@"wave"];

             [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
        } xiaoboNoHeart:^(NSArray *xiaoboArr) {

             [message setObject:@"measure doing" forKey:@"msg"];

             [message setObject:xiaoboArr forKey:@"wave"];

             [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
        } result:^(NSDictionary *dic) {
            
            [message removeAllObjects];
            [message setObject:@"measure done" forKey:@"msg"];
            [message setObject:@"BP7" forKey:@"name"];
            [message setObject:bp7Instance.serialNumber forKey:@"address"];
            [message setObject:[dic valueForKey:@"SYS"] forKey:@"highpressure"];
            [message setObject:[dic valueForKey:@"DIA"]  forKey:@"lowpressure"];
            [message setObject:[dic valueForKey:@"heartRate"]  forKey:@"heartrate"];

            [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
            commandState=@0;
            
        } errorBlock:^(BPDeviceError error) {
            
             commandState=@0;

             if (error==BPDidDisconnect) {


                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:bp7Instance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];

           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:error] forKey:@"errorID"];

                 [message setObject:@"BP" forKey:@"ProductType"];

                 [message setObject:@"BP7" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
             
             
             }

            
        }];

    }else{

         [messageOne removeAllObjects];
                           
         [messageOne setObject:@"error" forKey:@"msg"];
                 
         [messageOne setObject:@400 forKey:@"errorID"];

         [messageOne setObject:mac forKey:@"address"];

         [messageOne setObject:@"BP" forKey:@"ProductType"];

          if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP3L"]) {
            
            [message setObject:@"BP3L" forKey:@"ProductModel"];
            
             }else if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP5"]){
        
            [message setObject:@"BP5" forKey:@"ProductModel"];

            }else{
            
            [message setObject:@"BP7" forKey:@"ProductModel"];
            }

          [self sendCallBackSomeJsonData:messageOne commandID:command.callbackId];

    }

}
- (void) stopMeasure:(CDVInvokedUrlCommand*)command{

     NSString* mac = [command.arguments objectAtIndex:1];

    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    NSMutableDictionary* messageOne = [[NSMutableDictionary alloc] init];

     NSString* appsecret = [command.arguments objectAtIndex:0];

    
    BP5 *bpInstance = [self getBP5withMac:mac];

    BP3L *bp3lInstance = [self getBP3LwithMac:mac];

    BP7 *bp7Instance = [self getBP7withMac:mac];

     commandState=@0;
   
    if(bpInstance!=nil){

        [message setObject:bpInstance.serialNumber forKey:@"address"];

        [bpInstance stopBPMeassureWithAppSecret:appsecret Block:^{

            [message setObject:@"stopMeasure" forKey:@"msg"];
            [message setObject:@"BP5" forKey:@"name"];
            

            [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
        } errorBlock:^(BPDeviceError error) {

            if (error==BPDidDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:bpInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:error] forKey:@"errorID"];

                  [message setObject:@"BP" forKey:@"ProductType"];

                 [message setObject:@"BP5" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
             
             
             }

            
        }];
    }else if(bp3lInstance!=nil){

         [messageOne setObject:bp3lInstance.serialNumber forKey:@"address"];

        [bp3lInstance stopBPMeassureWithAppSecret:appsecret Block:^{

               [messageOne setObject:@"stopMeasure" forKey:@"msg"];
               [messageOne setObject:@"type" forKey:@"type"];
            

             [self sendCallBackSomeJsonData:messageOne commandID:command.callbackId];
        
        } errorBlock:^(BP3LDeviceError error) {

              if (error==BP3LDidDisconnect) {


                 [messageOne setObject:@"disconnect" forKey:@"msg"];

                 [messageOne setObject:bp3lInstance.serialNumber forKey:@"address"];

                  [self sendCallBackSomeJsonData:messageOne commandID:command.callbackId];

           }else{
                 
                 [messageOne removeAllObjects];
                 
                 [messageOne setObject:@"error" forKey:@"msg"];
                 
                 [messageOne setObject:[NSNumber numberWithInt:error] forKey:@"errorID"];

                 [messageOne setObject:@"BP" forKey:@"ProductType"];

                 [messageOne setObject:@"BP3L" forKey:@"ProductModel"];
                 
                  [self sendCallBackSomeJsonData:messageOne commandID:command.callbackId];
             
             
             }
       
        }];


    }else if(bp7Instance!=nil){

        [message setObject:bp7Instance.serialNumber forKey:@"address"];

        [bp7Instance stopBPMeassureWithAppSecret:appsecret Block:^{

            [message setObject:@"stopMeasure" forKey:@"msg"];
            [message setObject:@"BP7" forKey:@"name"];
            

            [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
        } errorBlock:^(BPDeviceError error) {

            if (error==BPDidDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:bp7Instance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:error] forKey:@"errorID"];

                  [message setObject:@"BP" forKey:@"ProductType"];

                 [message setObject:@"BP7" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
             
             
             }

            
        }];
    }else{

         [messageOne removeAllObjects];
                           
         [messageOne setObject:@"error" forKey:@"msg"];
                 
         [messageOne setObject:@400 forKey:@"errorID"];

         [messageOne setObject:mac forKey:@"address"];

         [messageOne setObject:@"BP" forKey:@"ProductType"];

         if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP3L"]) {
            
            [message setObject:@"BP3L" forKey:@"ProductModel"];
            
             }else if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP5"]){
        
            [message setObject:@"BP5" forKey:@"ProductModel"];

            }else{
            
            [message setObject:@"BP7" forKey:@"ProductModel"];
            }
                 
          [self sendCallBackSomeJsonData:messageOne commandID:command.callbackId];
    }

}
- (void) enableOffline:(CDVInvokedUrlCommand*)command{

     NSMutableDictionary* message = [[NSMutableDictionary alloc] init];
   
     NSString* mac = [command.arguments objectAtIndex:1];


      NSString* appsecret = [command.arguments objectAtIndex:0];
    
    if ([commandState intValue]==1) {
        
        [message removeAllObjects];
        
        [message setObject:@"error" forKey:@"msg"];
        
        [message setObject:[NSNumber numberWithInt:500] forKey:@"errorID"];
        
        [message setObject:@"BP" forKey:@"ProductType"];
        
        if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP3L"]) {
            
            [message setObject:@"BP3L" forKey:@"ProductModel"];
            
        }else{
            
            [message setObject:@"BP5" forKey:@"ProductModel"];
        }
        
        [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
        return;
        
    }

   
     BP5 *bpInstance = [self getBP5withMac:mac];

      BP7 *bp7Instance = [self getBP7withMac:mac];

     if(bpInstance!=nil){

         [message setObject:bpInstance.serialNumber forKey:@"address"];


        [bpInstance commandSetOfflineWithAppSecret:appsecret open:YES errorBlock:^(BPDeviceError error) {


            if (error==BPDidDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:bpInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:error] forKey:@"errorID"];

                 [message setObject:@"BP" forKey:@"ProductType"];

                 [message setObject:@"BP5" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
             
             
             }


            
        }];


        
            [message setObject:@"enableOffline" forKey:@"msg"];

            [self sendCallBackSomeJsonData:message commandID:command.callbackId];

        }else if (bp7Instance!=nil)
        {
           
            [message setObject:bp7Instance.serialNumber forKey:@"address"];


        [bp7Instance commandSetOfflineWithAppSecret:appsecret open:YES errorBlock:^(BPDeviceError error) {


            if (error==BPDidDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:bp7Instance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:error] forKey:@"errorID"];

                 [message setObject:@"BP" forKey:@"ProductType"];

                 [message setObject:@"BP7" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
             
             
             }


            
        }];


        
            [message setObject:@"enableOffline" forKey:@"msg"];

            [self sendCallBackSomeJsonData:message commandID:command.callbackId];

        }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"BP" forKey:@"ProductType"];

         if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP3L"]) {
            
            [message setObject:@"BP3L" forKey:@"ProductModel"];
            
             }else if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP5"]){
        
            [message setObject:@"BP5" forKey:@"ProductModel"];

            }else{
            
            [message setObject:@"BP7" forKey:@"ProductModel"];
            }
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
       }  

}

- (void) disenableOffline:(CDVInvokedUrlCommand*)command{

     NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

     NSString* mac = [command.arguments objectAtIndex:1];

      NSString* appsecret = [command.arguments objectAtIndex:0];
   
      BP5 *bpInstance = [self getBP5withMac:mac];

      BP7 *bp7Instance = [self getBP7withMac:mac];
    
    
    if ([commandState intValue]==1) {
        
        [message removeAllObjects];
        
        [message setObject:@"error" forKey:@"msg"];
        
        [message setObject:[NSNumber numberWithInt:500] forKey:@"errorID"];
        
        [message setObject:@"BP" forKey:@"ProductType"];
        
       if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP3L"]) {
            
            [message setObject:@"BP3L" forKey:@"ProductModel"];
            
             }else if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP5"]){
        
            [message setObject:@"BP5" forKey:@"ProductModel"];

            }else{
            
            [message setObject:@"BP7" forKey:@"ProductModel"];
           
         }
        
        [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
        return;
        
    }

       if(bpInstance!=nil){


        [message setObject:bpInstance.serialNumber forKey:@"address"];


       [bpInstance commandSetOfflineWithAppSecret:appsecret open:NO errorBlock:^(BPDeviceError error) {

           if (error==BPDidDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:bpInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:error] forKey:@"errorID"];

                 [message setObject:@"BP" forKey:@"ProductType"];

                 [message setObject:@"BP5" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
             
             
             }


            
        }];


        
            [message setObject:@"disableOffline" forKey:@"msg"];

            [self sendCallBackSomeJsonData:message commandID:command.callbackId];
      
       }else if (bp7Instance!=nil)
       {
           
        [message setObject:bp7Instance.serialNumber forKey:@"address"];


       [bp7Instance commandSetOfflineWithAppSecret:appsecret open:NO errorBlock:^(BPDeviceError error) {

           if (error==BPDidDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:bp7Instance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:error] forKey:@"errorID"];

                 [message setObject:@"BP" forKey:@"ProductType"];

                 [message setObject:@"BP7" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
             
             
             }


            
        }];


        
            [message setObject:@"disableOffline" forKey:@"msg"];

            [self sendCallBackSomeJsonData:message commandID:command.callbackId];
       }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"BP" forKey:@"ProductType"];

         if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP3L"]) {
            
            [message setObject:@"BP3L" forKey:@"ProductModel"];
            
             }else if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP5"]){
        
            [message setObject:@"BP5" forKey:@"ProductModel"];

            }else{
            
            [message setObject:@"BP7" forKey:@"ProductModel"];
           
         }
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
       }

}
- (void) getOfflineNum:(CDVInvokedUrlCommand*)command{


    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

     NSString* mac = [command.arguments objectAtIndex:1];


      NSString* appsecret = [command.arguments objectAtIndex:0];

    
    BP5 *bpInstance = [self getBP5withMac:mac];

    BP7 *bp7Instance = [self getBP7withMac:mac];
    
    if ([commandState intValue]==1) {
        
        [message removeAllObjects];
        
        [message setObject:@"error" forKey:@"msg"];
        
        [message setObject:[NSNumber numberWithInt:500] forKey:@"errorID"];
        
        [message setObject:@"BP" forKey:@"ProductType"];
        
       if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP3L"]) {
            
            [message setObject:@"BP3L" forKey:@"ProductModel"];
            
             }else if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP5"]){
        
            [message setObject:@"BP5" forKey:@"ProductModel"];

            }else{
            
            [message setObject:@"BP7" forKey:@"ProductModel"];
           
         }
        
        [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
        return;
        
    }


    if(bpInstance!=nil){

        [message setObject:bpInstance.serialNumber forKey:@"address"];

        [bpInstance commandBatchWithAppSecret:appsecret UploadNum:^(NSNumber *num) {

             [message setObject:@"offlineNum" forKey:@"msg"];
             [message setObject:num forKey:@"value"];

            [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
        } errorBlock:^(BPDeviceError error) {

            if (error==BPDidDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:bpInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:error] forKey:@"errorID"];

                 [message setObject:@"BP" forKey:@"ProductType"];

                 [message setObject:@"BP5" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
             
             
             }

            
        }];

     }else if (bp7Instance!=nil)
     {
         
        [message setObject:bp7Instance.serialNumber forKey:@"address"];

        [bp7Instance commandBatchWithAppSecret:appsecret UploadNum:^(NSNumber *num) {

             [message setObject:@"offlineNum" forKey:@"msg"];
             [message setObject:num forKey:@"value"];

            [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
        } errorBlock:^(BPDeviceError error) {

            if (error==BPDidDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:bp7Instance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:error] forKey:@"errorID"];

                 [message setObject:@"BP" forKey:@"ProductType"];

                 [message setObject:@"BP7" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
             
             
             }

            
        }];
     }else{

        [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"BP" forKey:@"ProductType"];

        if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP3L"]) {
            
            [message setObject:@"BP3L" forKey:@"ProductModel"];
            
             }else if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP5"]){
        
            [message setObject:@"BP5" forKey:@"ProductModel"];

            }else{
            
            [message setObject:@"BP7" forKey:@"ProductModel"];
           
         }
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
    }


}
- (void) getOfflineData:(CDVInvokedUrlCommand*)command{



     NSMutableDictionary* message = [[NSMutableDictionary alloc] init];
   
     NSString* mac = [command.arguments objectAtIndex:1];


     NSString* appsecret = [command.arguments objectAtIndex:0];

     BP5 *bpInstance = [self getBP5withMac:mac];

      BP7 *bp7Instance = [self getBP7withMac:mac];
    
    if ([commandState intValue]==1) {
        
        [message removeAllObjects];
        
        [message setObject:@"error" forKey:@"msg"];
        
        [message setObject:[NSNumber numberWithInt:500] forKey:@"errorID"];
        
        [message setObject:@"BP" forKey:@"ProductType"];
        
       if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP3L"]) {
            
            [message setObject:@"BP3L" forKey:@"ProductModel"];
            
             }else if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP5"]){
        
            [message setObject:@"BP5" forKey:@"ProductModel"];

            }else{
            
            [message setObject:@"BP7" forKey:@"ProductModel"];
           
         }
        
        [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
        return;
        
    }


     if(bpInstance!=nil){


        [message setObject:bpInstance.serialNumber forKey:@"address"];

        [bpInstance commandBatchWithAppSecret:appsecret UploaddataArray:^(NSArray *array) {


            [message setObject:@"offlineData" forKey:@"msg"];
             [message setObject:array forKey:@"value"];

            [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
        } errorBlock:^(BPDeviceError error) {

            if (error==BPDidDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:bpInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:error] forKey:@"errorID"];

                 [message setObject:@"BP" forKey:@"ProductType"];

                 [message setObject:@"BP5" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
             
             
             }

            
        }];



       }else if (bp7Instance!=nil)
       {
            [message setObject:bp7Instance.serialNumber forKey:@"address"];

        [bp7Instance commandBatchWithAppSecret:appsecret UploaddataArray:^(NSArray *array) {


            [message setObject:@"offlineData" forKey:@"msg"];
             [message setObject:array forKey:@"value"];

            [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
        } errorBlock:^(BPDeviceError error) {

            if (error==BPDidDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:bp7Instance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:error] forKey:@"errorID"];

                 [message setObject:@"BP" forKey:@"ProductType"];

                 [message setObject:@"BP7" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
             
             
             }

            
        }];

       }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"BP" forKey:@"ProductType"];

         if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP3L"]) {
            
            [message setObject:@"BP3L" forKey:@"ProductModel"];
            
             }else if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP5"]){
        
            [message setObject:@"BP5" forKey:@"ProductModel"];

            }else{
            
            [message setObject:@"BP7" forKey:@"ProductModel"];
           
         }
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
      }

}
- (void) getBattery:(CDVInvokedUrlCommand*)command{


     NSMutableDictionary* message = [[NSMutableDictionary alloc] init];
   
     NSString* mac = [command.arguments objectAtIndex:1];

     NSString* appsecret = [command.arguments objectAtIndex:0];
    
    NSMutableDictionary* messageOne = [[NSMutableDictionary alloc] init];
    
    BP5 *bpInstance = [self getBP5withMac:mac];
    
    BP3L *bp3lInstance = [self getBP3LwithMac:mac];

    BP7 *bp7Instance = [self getBP7withMac:mac];
    
    if ([commandState intValue]==1) {
        
        [message removeAllObjects];
        
        [message setObject:@"error" forKey:@"msg"];
        
        [message setObject:[NSNumber numberWithInt:500] forKey:@"errorID"];
        
        [message setObject:@"BP" forKey:@"ProductType"];
        
        if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP3L"]) {
            
            [message setObject:@"BP3L" forKey:@"ProductModel"];
            
           }else if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP5"]){
        
            [message setObject:@"BP5" forKey:@"ProductModel"];

            }else{
            
            [message setObject:@"BP7" forKey:@"ProductModel"];
           
         }
        
        [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
        return;
        
    }


     if(bpInstance!=nil){


        [bpInstance commandEnergyWithAppSecret:appsecret energyValue:^(NSNumber *energyValue) {

             [message setObject:@"battery" forKey:@"msg"];
             [message setObject:energyValue forKey:@"battery"];

            [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
        } errorBlock:^(BPDeviceError error) {

            if (error==BPDidDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:bpInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];

           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:error] forKey:@"errorID"];

                 [message setObject:@"BP" forKey:@"ProductType"];

                 [message setObject:@"BP5" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
             
             
             }

            
        }];

     }else if (bp3lInstance!=nil){
     
         [bp3lInstance commandEnergyWithAppSecret:appsecret Energy:^(NSNumber *energyValue) {
             
             [messageOne setObject:@"battery" forKey:@"msg"];
             
             [messageOne setObject:energyValue forKey:@"battery"];
             
             [self sendCallBackSomeJsonData:messageOne commandID:command.callbackId];
             
         } errorBlock:^(BP3LDeviceError error) {
             
             if (error==BPDidDisconnect) {
                 
                 [messageOne setObject:@"disconnect" forKey:@"msg"];
                 
                 [messageOne setObject:bp3lInstance.serialNumber forKey:@"address"];
                 
                 [self sendCallBackSomeJsonData:messageOne commandID:command.callbackId];
                 
             }else{
                 
                 [messageOne removeAllObjects];
                 
                 [messageOne setObject:@"error" forKey:@"msg"];
                 
                 [messageOne setObject:[NSNumber numberWithInt:error] forKey:@"errorID"];
                 
                 [messageOne setObject:@"BP" forKey:@"ProductType"];
                 
                 [messageOne setObject:@"BP3L" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:messageOne commandID:command.callbackId];
                 
                 
             }

             
         }];
     
     }
     else if (bp7Instance!=nil)
     {
         
        [bp7Instance commandEnergyWithAppSecret:appsecret energyValue:^(NSNumber *energyValue) {

             [message setObject:@"battery" forKey:@"msg"];
             [message setObject:energyValue forKey:@"battery"];

            [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
        } errorBlock:^(BPDeviceError error) {

            if (error==BPDidDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:bp7Instance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];

           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:error] forKey:@"errorID"];

                 [message setObject:@"BP" forKey:@"ProductType"];

                 [message setObject:@"BP7" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
             
             
             }

            
        }];
     }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"BP" forKey:@"ProductType"];

        if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP3L"]) {
            
            [message setObject:@"BP3L" forKey:@"ProductModel"];
            
             }else if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP5"]){
        
            [message setObject:@"BP5" forKey:@"ProductModel"];

            }else{
            
            [message setObject:@"BP7" forKey:@"ProductModel"];
           
         }
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
    }

}
- (void) isEnableOffline:(CDVInvokedUrlCommand*)command{

      NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

       NSString* mac = [command.arguments objectAtIndex:1];


        NSString* appsecret = [command.arguments objectAtIndex:0];

     BP5 *bpInstance = [self getBP5withMac:mac];

     BP7 *bp7Instance = [self getBP7withMac:mac];
    
    if ([commandState intValue]==1) {
        
        [message removeAllObjects];
        
        [message setObject:@"error" forKey:@"msg"];
        
        [message setObject:[NSNumber numberWithInt:500] forKey:@"errorID"];
        
        [message setObject:@"BP" forKey:@"ProductType"];
        
       if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP3L"]) {
            
            [message setObject:@"BP3L" forKey:@"ProductModel"];
            
             }else if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP5"]){
        
            [message setObject:@"BP5" forKey:@"ProductModel"];

            }else{
            
            [message setObject:@"BP7" forKey:@"ProductModel"];
           
         }
        
        [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
        return;
        
    }


     if(bpInstance!=nil){


     [message setObject:bpInstance.serialNumber forKey:@"address"];

     [bpInstance commandFounctionWithAppSecret:appsecret Founction:^(NSDictionary *dic) {
        
        NSNumber*isOpen=[dic valueForKey:@"offlineOpen"];

        [message setObject:@"isEnableOffline" forKey:@"msg"];

        [message setObject:isOpen forKey:@"isEnableOffline"];

        [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
     } errorBlock:^(BPDeviceError error) {

        if (error==BPDidDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:bpInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];

           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:error] forKey:@"errorID"];

                 [message setObject:@"BP" forKey:@"ProductType"];

                 [message setObject:@"BP5" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
             
             
             }


        
     }];
     

      }else if (bp7Instance!=nil)
      {
           [message setObject:bp7Instance.serialNumber forKey:@"address"];

     [bp7Instance commandFounctionWithAppSecret:appsecret Founction:^(NSDictionary *dic) {
        
        NSNumber*isOpen=[dic valueForKey:@"offlineOpen"];

        [message setObject:@"isEnableOffline" forKey:@"msg"];

        [message setObject:isOpen forKey:@"isEnableOffline"];

        [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
     } errorBlock:^(BPDeviceError error) {

        if (error==BPDidDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:bp7Instance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];

           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:error] forKey:@"errorID"];

                 [message setObject:@"BP" forKey:@"ProductType"];

                 [message setObject:@"BP7" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
             
             
             }


        
     }];
      }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"BP" forKey:@"ProductType"];

        if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP3L"]) {
            
            [message setObject:@"BP3L" forKey:@"ProductModel"];
            
             }else if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP5"]){
        
            [message setObject:@"BP5" forKey:@"ProductModel"];

            }else{
            
            [message setObject:@"BP7" forKey:@"ProductModel"];
           
         }
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
    }

}
- (void) disConnectDevice:(CDVInvokedUrlCommand*)command{

     NSString* mac = [command.arguments objectAtIndex:1];

    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

     BP3L *bp3lInstance = [self getBP3LwithMac:mac];

    if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP3L"]) {

        if (bp3lInstance!=nil)
        {
            [bp3lInstance commandDisDeviceConnect];

             [message setObject:@"disconnect" forKey:@"msg"];

             [message setObject:@"BP3L" forKey:@"name"];
             
        }else{

         [message setObject:@"error" forKey:@"msg"];
        
         [message setObject:[NSNumber numberWithInt:400] forKey:@"errorID"];
        
         [message setObject:@"BP" forKey:@"ProductType"];
        
         [message setObject:mac forKey:@"address"];

         [message setObject:@"BP3L" forKey:@"ProductModel"];

        }

        

     }else if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP5"]){


         [message setObject:@"error" forKey:@"msg"];
        
         [message setObject:[NSNumber numberWithInt:800] forKey:@"errorID"];
        
         [message setObject:@"BP" forKey:@"ProductType"];
        
         [message setObject:mac forKey:@"address"];

         [message setObject:@"BP5" forKey:@"ProductModel"];

     }else{

         [message setObject:@"error" forKey:@"msg"];
        
         [message setObject:[NSNumber numberWithInt:800] forKey:@"errorID"];
        
         [message setObject:@"BP" forKey:@"ProductType"];
        
         [message setObject:mac forKey:@"address"];

         [message setObject:@"BP7" forKey:@"ProductModel"];
          
     }

    [self sendCallBackSomeJsonData:message commandID:command.callbackId];


}
- (void) setDisconnectCallback:(CDVInvokedUrlCommand*)command{

     NSString* mac = [command.arguments objectAtIndex:1];

  NSLog(@"%@",mac);

   
  BP5 *bpInstance = [self getBP5withMac:mac];

  BP3L *bp3lInstance = [self getBP3LwithMac:mac];

  BP7 *bp7Instance = [self getBP7withMac:mac];

  if (bpInstance!=nil)
  {
     [callbackList setObject:command.callbackId forKey: @"deviceDisConnected"]; 

  }else if (bp3lInstance!=nil)
  {

      [callbackList setObject:command.callbackId forKey: @"BP3LdeviceDisConnected"];


   }else if (bp7Instance!=nil)
  {

      [callbackList setObject:command.callbackId forKey: @"BP7deviceDisConnected"];


   }


}
- (void) confirmAngle:(CDVInvokedUrlCommand*)command{

      NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

       NSString* mac = [command.arguments objectAtIndex:1];


        NSString* appsecret = [command.arguments objectAtIndex:0];


     BP7 *bp7Instance = [self getBP7withMac:mac];

     if(bp7Instance!=nil){


     [message setObject:bp7Instance.serialNumber forKey:@"address"];

     [bp7Instance commandStartGetAngleWithAppSecret:appsecret Angle:^(NSNumber *angleNum) {

        [message setObject:@"angle" forKey:@"msg"];

        [message setObject:angleNum forKey:@"value"];

        [self sendCallBackSomeJsonData:message commandID:command.callbackId];

         commandState=@0;
        
    } errorBlock:^(BPDeviceError error) {

         commandState=@0;


        if (error==BPDidDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:bp7Instance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];

           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:error] forKey:@"errorID"];

                 [message setObject:@"BP" forKey:@"ProductType"];

                 [message setObject:@"BP7" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
             
             
             }
        
    }];


     }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"BP" forKey:@"ProductType"];

          if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP3L"]) {
            
            [message setObject:@"BP3L" forKey:@"ProductModel"];
            
             }else if ([[self isBP5OrBP3LwithMac:mac] isEqualToString:@"BP5"]){
        
            [message setObject:@"BP5" forKey:@"ProductModel"];

            }else{
            
            [message setObject:@"BP7" forKey:@"ProductModel"];
           
         }
         
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
    }

  
}





@end
