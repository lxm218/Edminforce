#import "POManagerCordova.h"

@implementation POManagerCordova{
    
    PO3Controller *controller;

    NSMutableDictionary *callbackList;

    NSMutableDictionary *deviceIDPSList;
    
    NSNumber*commandState;

}


#pragma mark -
#pragma mark Cordova Methods


- (void)pluginInitialize {

    NSLog(@"Bluetooth Serial Cordova Plugin - BLE version");

    [super pluginInitialize];

    controller = [PO3Controller shareIHPO3Controller];

    callbackList = [[NSMutableDictionary alloc]init];

    deviceIDPSList = [[NSMutableDictionary alloc]init];

    commandState=[NSNumber numberWithInt:0];

    [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceDisconnected:) name:@"PO3DisConnectNoti" object:nil];

}

- (id)init
{
     self = [super init];

     controller = [PO3Controller shareIHPO3Controller];

     commandState=[NSNumber numberWithInt:0];

     deviceIDPSList = [[NSMutableDictionary alloc]init];
 
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


- (PO3*) getPO3withMac:(NSString *)mac{

  controller = [PO3Controller shareIHPO3Controller];

  NSArray *poDeviceArray = [controller getAllCurrentPO3Instace];


      if(poDeviceArray.count>0 && mac.length>0){

        for(PO3 *tempPO3 in poDeviceArray){

          if([mac isEqualToString:tempPO3.serialNumber]){
            
            return tempPO3;
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

     [message setObject:@"PO3" forKey:@"name"];

     [deviceIDPSList setObject:infoDic forKey:serialNumber];

    [self sendCallBackSomeJsonData:message commandID:[callbackList valueForKey:@"deviceConnected"]];

}

-(void)deviceDisconnected:(NSNotification *)tempNoti{


     NSDictionary *infoDic = [tempNoti userInfo];

     NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    NSString *serialNumber = [infoDic objectForKey:@"SerialNumber"];

     if (serialNumber!=nil) {
        
         [message setObject:serialNumber forKey:@"address"];
    }

    [message setObject:@"disconnect" forKey:@"msg"];

    [message setObject:@"PO3" forKey:@"type"];

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

            [message setObject:@"PO" forKey:@"ProductType"];

            [message setObject:@"PO3" forKey:@"ProductModel"];
           

            [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        }
        

     }else{

         [message setObject:@"error" forKey:@"msg"];

         [message setObject:@600 forKey:@"errorID"];

         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
     }


}

- (void) startDiscovery:(CDVInvokedUrlCommand*)command{


    controller = [PO3Controller shareIHPO3Controller];


     NSArray *poDeviceArray = [controller getAllCurrentPO3Instace];

    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    if (poDeviceArray.count>0)
    {
          for (int i = 0; i < poDeviceArray.count; i++)
           {
        
            PO3*myPo3=[poDeviceArray objectAtIndex:i];
        
       
            [message setObject:@"discovery doing" forKey:@"msg"];

            [message setObject:myPo3.serialNumber forKey:@"address"];

            [message setObject:@"PO3" forKey:@"name"];


            [self sendCallBackSomeJsonData:message commandID:command.callbackId];

            }

      
    }else{

         [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceConnected:) name:@"PO3ConnectNoti" object:nil];

         [callbackList setObject:command.callbackId forKey: @"deviceConnected"];

    }

}

- (void) stopDiscovery:(CDVInvokedUrlCommand*)command{

     NSString* mac = [command.arguments objectAtIndex:1];

    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    [message setObject:@"discovery done" forKey:@"msg"];

    [self sendCallBackSomeJsonData:message commandID:command.callbackId];

}

- (void) connectDevice:(CDVInvokedUrlCommand*)command{

     NSString* mac = [command.arguments objectAtIndex:1];

    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];
   
    [message setObject:@"connected" forKey:@"msg"];

    [message setObject:mac forKey:@"address"];

    [message setObject:@"PO3" forKey:@"name"];
          
    [self sendCallBackSomeJsonData:message commandID:command.callbackId];


}
- (void) startMeasure:(CDVInvokedUrlCommand*)command{

     NSString* appsecret = [command.arguments objectAtIndex:0];

     NSString* mac = [command.arguments objectAtIndex:1];

     NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

     [message setObject:mac forKey:@"address"];

    PO3 *po3Instance = [self getPO3withMac:mac];


     if ([commandState intValue]==1) {
        
        [message removeAllObjects];
        
        [message setObject:@"error" forKey:@"msg"];
        
        [message setObject:[NSNumber numberWithInt:500] forKey:@"errorID"];
        
        [message setObject:@"PO" forKey:@"ProductType"];
            
        [message setObject:@"PO3" forKey:@"ProductModel"];
        
        [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
        return;
        
    }


     if(po3Instance!=nil){


         [po3Instance commandStartPO3WithAppSecret:appsecret MeasureData:^(BOOL startData) {

             commandState=@1;
        
        } Measure:^(NSDictionary *measureDataDic) {

             [message setObject:@"realtime" forKey:@"msg"];

             [message setObject:measureDataDic forKey:@"value"];

             [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
        } FinishPO3MeasureData:^(BOOL finishData) {

            commandState=@0;
        
        } DisposeErrorBlock:^(PO3ErrorID errorID) {

            commandState=@0;

             if (errorID==PO3DeviceDisConect) {


                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:po3Instance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];

           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:errorID] forKey:@"errorID"];

                 [message setObject:@"PO" forKey:@"ProductType"];

                 [message setObject:@"PO3" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
             
             
             }
        
        }];

     }else{

         commandState=@0;

        [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"PO" forKey:@"ProductType"];
            
         [message setObject:@"PO3" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
           
    }



}

- (void) getOfflineData:(CDVInvokedUrlCommand*)command{


      NSString* appsecret = [command.arguments objectAtIndex:0];

     NSString* mac = [command.arguments objectAtIndex:1];

     NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

     [message setObject:mac forKey:@"address"];

    PO3 *po3Instance = [self getPO3withMac:mac];


    if ([commandState intValue]==1) {
        
        [message removeAllObjects];
        
        [message setObject:@"error" forKey:@"msg"];
        
        [message setObject:[NSNumber numberWithInt:500] forKey:@"errorID"];
        
        [message setObject:@"PO" forKey:@"ProductType"];
        
        [message setObject:@"PO3" forKey:@"ProductModel"];
           
        
        [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
        return;
        
    }


     if(po3Instance!=nil){


         [po3Instance commandDisposePO3WithAppSecret:appsecret DataCount:^(NSNumber *dataCount) {

              [message removeAllObjects];
            
              [message setObject:mac forKey:@"address"];

              [message setObject:@"historyCount" forKey:@"msg"];

              [message setObject:dataCount forKey:@"count"];

              [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 
        
         } TransferMemorryData:^(BOOL startData) {
        
        } Memory:^(NSDictionary *historyDataDic) {

              [message removeAllObjects];
            
              [message setObject:mac forKey:@"address"];

              [message setObject:@"history" forKey:@"msg"];

              [message setObject:historyDataDic forKey:@"value"];

              [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 
        
        } DisposePO3WaveHistoryData:^(NSDictionary *waveHistoryDataDic) {

              [message removeAllObjects];
            
              [message setObject:mac forKey:@"address"];

              [message setObject:@"historyWave" forKey:@"msg"];

              [message setObject:waveHistoryDataDic forKey:@"value"];

              [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 

        
       } DisposeProgress:^(NSNumber *progress) {
        
       } FinishTransmission:^(BOOL finishData) {
        
       } DisposeErrorBlock:^(PO3ErrorID errorID) {

         if (errorID==PO3DeviceDisConect) {


                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:po3Instance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 

           }else if (errorID==PO3DataZero) {


              [message setObject:@"historyCount" forKey:@"msg"];

              [message setObject:@0 forKey:@"count"];

              [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 

           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:errorID] forKey:@"errorID"];

                  [message setObject:@"PO" forKey:@"ProductType"];

                 [message setObject:@"PO3" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 
             
             
             }
        
      }];


              

     }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"PO" forKey:@"ProductType"];
            
         [message setObject:@"PO3" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];      
    }



}

- (void) getBattery:(CDVInvokedUrlCommand*)command{
    
     NSString* appsecret = [command.arguments objectAtIndex:0];

     NSString* mac = [command.arguments objectAtIndex:1];

     NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

     [message setObject:mac forKey:@"address"];

    PO3 *po3Instance = [self getPO3withMac:mac];


    if ([commandState intValue]==1) {
        
        [message removeAllObjects];
        
        [message setObject:@"error" forKey:@"msg"];
        
        [message setObject:[NSNumber numberWithInt:500] forKey:@"errorID"];
        
        [message setObject:@"PO" forKey:@"ProductType"];
        
        [message setObject:@"PO3" forKey:@"ProductModel"];
           
        
        [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
        return;
        
    }


    if(po3Instance != nil){
        

         [po3Instance commandQueryBatteryInfoWithAppSecret:appsecret Battery:^(BOOL resetSuc) {
        
         } DisposeErrorBlock:^(PO3ErrorID errorID) {

            if (errorID==PO3DeviceDisConect) {


                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:po3Instance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];

           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:errorID] forKey:@"errorID"];

                 [message setObject:@"PO" forKey:@"ProductType"];

                 [message setObject:@"PO3" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
             
             
             }
        
         } DisposeBattery:^(NSNumber *battery) {

             [message setObject:@"battery" forKey:@"msg"];

             [message setObject:battery forKey:@"battery"];

             [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
        }];


        
    }else{
        
         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"PO" forKey:@"ProductType"];
            
         [message setObject:@"PO3" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
    }
    
}



- (void) disConnectDevice:(CDVInvokedUrlCommand*)command{

      NSString* appsecret = [command.arguments objectAtIndex:0];

     NSString* mac = [command.arguments objectAtIndex:1];

     NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

     [message setObject:mac forKey:@"address"];

    PO3 *po3Instance = [self getPO3withMac:mac];

    commandState=@0;

    if(po3Instance != nil){


    [po3Instance commandEndPO3WithAppSecret:appsecret CurrentConnect:^(BOOL resetSuc) {

        [message setObject:@"disconnect" forKey:@"msg"];

        [message setObject:mac forKey:@"address"];

        [message setObject:@"PO3" forKey:@"type"];

        [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
    } DisposeErrorBlock:^(PO3ErrorID errorID) {

         if (errorID==PO3DeviceDisConect) {


                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:po3Instance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];

           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:errorID] forKey:@"errorID"];

                 [message setObject:@"PO" forKey:@"ProductType"];

                 [message setObject:@"PO3" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
             
             
             }
        
    }];

    }else{


        [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"PO" forKey:@"ProductType"];
            
         [message setObject:@"PO3" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];


    }


}
- (void) setDisconnectCallback:(CDVInvokedUrlCommand*)command{


     [callbackList setObject:command.callbackId forKey: @"deviceDicConnected"];


}







@end
