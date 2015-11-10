#import "AmManagerCordova.h"

@implementation AmManagerCordova{
    
    AM3SController *controller;

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

    controller = [AM3SController shareIHAM3SController];

    deviceIDPSList = [[NSMutableDictionary alloc]init];

    commandState=[NSNumber numberWithInt:0];

    [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceDisconnected:) name:@"AM3SDisConnectNoti" object:nil];

}


- (id)init
{
    self = [super init];

    controller = [AM3SController shareIHAM3SController];

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




- (AM3S*) getAM3SwithMac:(NSString *)mac{


  
    controller = [AM3SController shareIHAM3SController];

    NSArray *am3sDeviceArray = [controller getAllCurrentAM3SInstace];

    if (am3sDeviceArray.count>0 && mac.length>0)
    {
        for(AM3S *tempAM3S in am3sDeviceArray){

          if([mac isEqualToString:tempAM3S.serialNumber]){
            
            return tempAM3S;
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

     [message setObject:@"AM3S" forKey:@"name"];

     [deviceIDPSList setObject:infoDic forKey:serialNumber];

     [self sendCallBackSomeJsonData:message commandID:[callbackList valueForKey:@"deviceConnected"]];

}


-(void)deviceDisconnected:(NSNotification *)tempNoti{


    NSDictionary *infoDic = [tempNoti userInfo];

     NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    NSString *serialNumber = [infoDic objectForKey:@"SerialNumber"];
    
    if (serialNumber.length>0) {

         [message setObject:serialNumber forKey:@"address"];

         [deviceIDPSList removeObjectForKey:serialNumber];
    }

    [message setObject:@"disconnect" forKey:@"msg"];

    [message setObject:@"AM3S" forKey:@"type"];

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

            [message setObject:@"AM" forKey:@"ProductType"];
          
            [message setObject:@"AM3S" forKey:@"ProductModel"];

            [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        }
        

     }else{

         [message setObject:@"error" forKey:@"msg"];

         [message setObject:@600 forKey:@"errorID"];

         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
     }


}


- (void) startDiscovery:(CDVInvokedUrlCommand*)command{


    controller = [AM3SController shareIHAM3SController];

    NSArray *am3sDeviceArray = [controller getAllCurrentAM3SInstace];

    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    if (am3sDeviceArray.count>0)
    {

              for (int i = 0; i < am3sDeviceArray.count; i++) {
        
               AM3S*myAM3S=[am3sDeviceArray objectAtIndex:i];
        
               [message setObject:@"discovery doing" forKey:@"msg"];

               [message setObject:myAM3S.serialNumber forKey:@"address"];

               [message setObject:@"AM3S" forKey:@"name"];

               [self sendCallBackSomeJsonData:message commandID:command.callbackId];

               }
          
    }else{

         [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceConnected:) name:@"AM3SConnectNoti" object:nil];

         [callbackList setObject:command.callbackId forKey: @"deviceConnected"];
    }

   

}

- (void) stopDiscovery:(CDVInvokedUrlCommand*)command{


    // NSString* mac = [command.arguments objectAtIndex:1];

    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

     [controller commandStopSearchAMDevice];

     [message setObject:@"discovery done" forKey:@"msg"];

     [message setObject:@"AM3S" forKey:@"name"];

    [self sendCallBackSomeJsonData:message commandID:command.callbackId];

}

- (void) connectDevice:(CDVInvokedUrlCommand*)command{

     NSString* mac = [command.arguments objectAtIndex:1];

    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];
   
    [message setObject:@"connected" forKey:@"msg"];

    [message setObject:mac forKey:@"address"];

    [message setObject:@"AM3S" forKey:@"name"];
          
    [self sendCallBackSomeJsonData:message commandID:command.callbackId];


}

- (void) resetDevice:(CDVInvokedUrlCommand*)command{

     NSString* appsecret = [command.arguments objectAtIndex:0];

     NSString* mac = [command.arguments objectAtIndex:1];

     NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

      AM3S *am3sInstance = [self getAM3SwithMac:mac];


      if ([commandState intValue]==1) {
        
        [message removeAllObjects];
        
        [message setObject:@"error" forKey:@"msg"];
        
        [message setObject:[NSNumber numberWithInt:500] forKey:@"errorID"];
        
        [message setObject:@"AM" forKey:@"ProductType"];
            
        [message setObject:@"AM3S" forKey:@"ProductModel"];
        
        [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
        return;
        
    }

     if(am3sInstance!=nil){


        [message setObject:am3sInstance.serialNumber forKey:@"address"];


         [am3sInstance commandResetDeviceWithAppSecret:appsecret DisposeResultBlock:^(BOOL resetSuc) {

            [message setObject:@"resetDevice" forKey:@"msg"];

            [message setObject:am3sInstance.serialNumber forKey:@"address"];

            [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
         } DisposeErrorBlock:^(AM3SErrorID errorID) {

             if (errorID==AM3SErrorDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:am3sInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
                
            }else{

                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:errorID] forKey:@"errorID"];

                 [message setObject:@"AM" forKey:@"ProductType"];

                 [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
            }
        
         }];

       }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"AM" forKey:@"ProductType"];
            
         [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
      }



}

- (void) getUserId:(CDVInvokedUrlCommand*)command{

    NSString* appsecret = [command.arguments objectAtIndex:0];

    NSString* mac = [command.arguments objectAtIndex:1];

    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    AM3S *am3sInstance = [self getAM3SwithMac:mac];

    if ([commandState intValue]==1) {
        
        [message removeAllObjects];
        
        [message setObject:@"error" forKey:@"msg"];
        
        [message setObject:[NSNumber numberWithInt:500] forKey:@"errorID"];
        
        [message setObject:@"AM" forKey:@"ProductType"];
            
        [message setObject:@"AM3S" forKey:@"ProductModel"];
        
        [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
        return;
        
    }

     if(am3sInstance!=nil){


        [message setObject:am3sInstance.serialNumber forKey:@"address"];

        [am3sInstance getAM3SWithAppSecret:appsecret UserID:^(unsigned int userID) {

             [message setObject:@"user id" forKey:@"msg"];

             [message setObject:[NSNumber numberWithInt:userID] forKey:@"value"];

             [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
        } disposeErrorBlock:^(AM3SErrorID errorID) {

            if (errorID==AM3SErrorDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:am3sInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
                
            }else{

                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:errorID] forKey:@"errorID"];

                 [message setObject:@"AM" forKey:@"ProductType"];

                 [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
            }
        
        }];

       }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"AM" forKey:@"ProductType"];
            
         [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
      }

}

- (void) setUserId:(CDVInvokedUrlCommand*)command{

     NSString* appsecret = [command.arguments objectAtIndex:0];

     NSString* mac = [command.arguments objectAtIndex:1];

     NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

     NSNumber* userID = [command.arguments objectAtIndex:2];

      AM3S *am3sInstance = [self getAM3SwithMac:mac];

      if (userID!=nil)
      {

         if(am3sInstance!=nil){

            [message setObject:am3sInstance.serialNumber forKey:@"address"];

            [am3sInstance commandSetAM3SWithAppSecret:appsecret UserID:userID DisposeBlock:^(BOOL resetSuc) {

                 [message setObject:@"setUserIdOK" forKey:@"msg"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
           } DisposeErrorBlock:^(AM3SErrorID errorID) {

                if (errorID==AM3SErrorDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:am3sInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
                
               }else{

                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:errorID] forKey:@"errorID"];

                 [message setObject:@"AM" forKey:@"ProductType"];

                 [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
            }
        
           }];

        

       }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"AM" forKey:@"ProductType"];
            
         [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
      }

          
      }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@500 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"AM" forKey:@"ProductType"];
            
         [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];


      }

}

- (void) setUserMessage:(CDVInvokedUrlCommand*)command{

     NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

     NSString* appsecret = [command.arguments objectAtIndex:0];
   
     NSString* mac = [command.arguments objectAtIndex:1];

     NSNumber* age = [command.arguments objectAtIndex:2];

     NSNumber* weight = [command.arguments objectAtIndex:3];

     NSNumber* height = [command.arguments objectAtIndex:4];

      NSNumber* sex = [command.arguments objectAtIndex:5];

     NSNumber* lengthType = [command.arguments objectAtIndex:6];

     NSNumber* activityLevel = [command.arguments objectAtIndex:7];

     NSNumber* target = [command.arguments objectAtIndex:8];

     NSNumber* hourType = [command.arguments objectAtIndex:9];

     AM3S *am3sInstance = [self getAM3SwithMac:mac];

     if(am3sInstance!=nil){


        [message setObject:am3sInstance.serialNumber forKey:@"address"];

        [am3sInstance commandSetAM3SWithAppSecret:appsecret UserAge:age weight:weight height:height sex:sex lengthType:lengthType activityLevel:activityLevel target:target hourType:hourType DisposeBlock:^(BOOL resetSuc) {
        
          [message setObject:@"setUserMessageOK" forKey:@"msg"];

          [self sendCallBackSomeJsonData:message commandID:command.callbackId];

        } DisposeErrorBlock:^(AM3SErrorID errorID) {

             if (errorID==AM3SErrorDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:am3sInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
                
               }else{

                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:errorID] forKey:@"errorID"];

                 [message setObject:@"AM" forKey:@"ProductType"];

                 [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
            }
        
        }];


       }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"AM" forKey:@"ProductType"];
            
         [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
      }


}

- (void) getUserMessage:(CDVInvokedUrlCommand*)command{


      NSString* appsecret = [command.arguments objectAtIndex:0];

      NSString* mac = [command.arguments objectAtIndex:1];

      NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

      AM3S *am3sInstance = [self getAM3SwithMac:mac];

     if(am3sInstance!=nil){


        [message setObject:am3sInstance.serialNumber forKey:@"address"];


         [am3sInstance commandQueryUserInfoWithAppSecret:appsecret disposeBlock:^(BOOL resetSuc) {
        
         } DisposeErrorBlock:^(AM3SErrorID errorID) {

            if (errorID==AM3SErrorDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:am3sInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
                
               }else{

                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:errorID] forKey:@"errorID"];

                 [message setObject:@"AM" forKey:@"ProductType"];

                 [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
            }
        
         } DisposeUserInfo:^(NSDictionary *userInfo) {

             [message setObject:@"user info" forKey:@"msg"];

             [message setObject:userInfo forKey:@"value"];

             [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
        }];

       }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"AM" forKey:@"ProductType"];
            
         [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
      }

}

- (void) getClocktotal:(CDVInvokedUrlCommand*)command{


      NSString* appsecret = [command.arguments objectAtIndex:0];

      NSString* mac = [command.arguments objectAtIndex:1];

      NSMutableDictionary* message = [[NSMutableDictionary alloc] init];
   
      AM3S *am3sInstance = [self getAM3SwithMac:mac];

     if(am3sInstance!=nil){


        [message setObject:am3sInstance.serialNumber forKey:@"address"];

         [am3sInstance commandQueryWithAppSecret:appsecret AlarmNum:^(NSNumber *AlarmNum) {

            [message setObject:@"alarmclock number" forKey:@"msg"];

            [message setObject:AlarmNum forKey:@"value"];

            [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
         } DisposeErrorBlock:^(AM3SErrorID errorID) {

            if (errorID==AM3SErrorDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:am3sInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
                
               }else{

                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:errorID] forKey:@"errorID"];

                 [message setObject:@"AM" forKey:@"ProductType"];

                 [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
            }
        
         }];



       }else{

        [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"AM" forKey:@"ProductType"];
            
         [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
      }
}

- (void) getClockDetail:(CDVInvokedUrlCommand*)command{

      NSString* appsecret = [command.arguments objectAtIndex:0];

      NSString* mac = [command.arguments objectAtIndex:1];

      NSMutableDictionary* message = [[NSMutableDictionary alloc] init];
   
      AM3S *am3sInstance = [self getAM3SwithMac:mac];

     if(am3sInstance!=nil){


        [message setObject:am3sInstance.serialNumber forKey:@"address"];

         [am3sInstance commandQueryWithAppSecret:appsecret AlarmInfo:^(NSMutableArray *totoalAlarmArray) {

            [message setObject:@"alarmclock detail" forKey:@"msg"];

            [message setObject:totoalAlarmArray forKey:@"value"];

            [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
         } DisposeErrorBlock:^(AM3SErrorID errorID) {

             if (errorID==AM3SErrorDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:am3sInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
                
               }else{

                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:errorID] forKey:@"errorID"];

                 [message setObject:@"AM" forKey:@"ProductType"];

                 [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
            }
        
         }];

       }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"AM" forKey:@"ProductType"];
            
         [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
      }
}

- (void) setClock:(CDVInvokedUrlCommand*)command{


      NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

      NSString* appsecret = [command.arguments objectAtIndex:0];
   
      NSString* mac = [command.arguments objectAtIndex:1];

      NSNumber* alarmID = [command.arguments objectAtIndex:2];

      NSNumber* hour = [command.arguments objectAtIndex:3];

      NSNumber* min = [command.arguments objectAtIndex:4];

      NSNumber* isRepeat = [command.arguments objectAtIndex:5];

      NSArray* weekArr = [command.arguments objectAtIndex:6];

      NSNumber* isOpen = [command.arguments objectAtIndex:7];

      AM3S *am3sInstance = [self getAM3SwithMac:mac];

     if(am3sInstance!=nil){


        [message setObject:am3sInstance.serialNumber forKey:@"address"];

        [am3sInstance commandSetAlarmWithAppSecret:appsecret AlarmID:alarmID hour:hour min:min isRepeat:isRepeat weeks:weekArr isOpen:isOpen DisposeResultBlock:^(BOOL resetSuc) {
             
              [message setObject:@"setClockOK" forKey:@"msg"];

              [self sendCallBackSomeJsonData:message commandID:command.callbackId];

        } DisposeErrorBlock:^(AM3SErrorID errorID) {

            if (errorID==AM3SErrorDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:am3sInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
                
               }else{

                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:errorID] forKey:@"errorID"];

                 [message setObject:@"AM" forKey:@"ProductType"];

                 [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
            }
        
       }];
        

       }else{

        [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"AM" forKey:@"ProductType"];
            
         [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
      }
}

- (void) deleteClock:(CDVInvokedUrlCommand*)command{

      NSString* appsecret = [command.arguments objectAtIndex:0];

      NSString* mac = [command.arguments objectAtIndex:1];

      NSNumber* alarmID = [command.arguments objectAtIndex:2];

      NSMutableDictionary* message = [[NSMutableDictionary alloc] init];
   
      AM3S *am3sInstance = [self getAM3SwithMac:mac];

     if(am3sInstance!=nil){


        [message setObject:am3sInstance.serialNumber forKey:@"address"];

        [am3sInstance commandDeleteWithAppSecret:appsecret AlarmViaID:alarmID DisposeResultBlock:^(BOOL resetSuc) {

              [message setObject:@"deleteClockOK" forKey:@"msg"];

              [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
        } DisposeErrorBlock:^(AM3SErrorID errorID) {

             if (errorID==AM3SErrorDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:am3sInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
                
               }else{

                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:errorID] forKey:@"errorID"];

                 [message setObject:@"AM" forKey:@"ProductType"];

                 [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
            }
        
        }];
        

       }else{

        [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"AM" forKey:@"ProductType"];
            
         [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
      }
}

- (void) getRemind:(CDVInvokedUrlCommand*)command{

      NSString* appsecret = [command.arguments objectAtIndex:0];

      NSString* mac = [command.arguments objectAtIndex:1];

      NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

      AM3S *am3sInstance = [self getAM3SwithMac:mac];

     if(am3sInstance!=nil){


        [message setObject:am3sInstance.serialNumber forKey:@"address"];

         [am3sInstance commandQueryWithAppSecret:appsecret Reminder:^(NSArray *remindInfo) {

             [message setObject:@"remindInfo" forKey:@"msg"];

             [message setObject:remindInfo forKey:@"value"];

             [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
         } DisposeErrorBlock:^(AM3SErrorID errorID) {

               if (errorID==AM3SErrorDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:am3sInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
                
               }else{

                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:errorID] forKey:@"errorID"];

                 [message setObject:@"AM" forKey:@"ProductType"];

                 [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
            }
        
         }];

       }else{

        [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"AM" forKey:@"ProductType"];
            
         [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
      }
}

- (void) setRemind:(CDVInvokedUrlCommand*)command{


     NSString* appsecret = [command.arguments objectAtIndex:0];

      NSString* mac = [command.arguments objectAtIndex:1];

      NSString* timeStr = [command.arguments objectAtIndex:2];

      NSString* switchStr = [command.arguments objectAtIndex:3];

      NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

      AM3S *am3sInstance = [self getAM3SwithMac:mac];

     if(am3sInstance!=nil){


        [message setObject:am3sInstance.serialNumber forKey:@"address"];

        NSDictionary*dic=[[NSDictionary alloc] initWithObjectsAndKeys:timeStr,@"Time",switchStr,@"Switch", nil];


         [am3sInstance commandSetWithAppSecret:appsecret ReminderDictionary:dic DisposeResultBlock:^(BOOL resetSuc) {
          

            [message setObject:@"setRemindOK" forKey:@"msg"];


             [self sendCallBackSomeJsonData:message commandID:command.callbackId];


            } DisposeErrorBlock:^(AM3SErrorID errorID) {


                 if (errorID==AM3SErrorDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:am3sInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
                
               }else{

                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:errorID] forKey:@"errorID"];

                 [message setObject:@"AM" forKey:@"ProductType"];

                 [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
            }
                
            }];

         [am3sInstance commandQueryWithAppSecret:appsecret Reminder:^(NSArray *remindInfo) {

             [message setObject:@"remindInfo" forKey:@"msg"];

             [message setObject:remindInfo forKey:@"value"];

             [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
         } DisposeErrorBlock:^(AM3SErrorID errorID) {

              
        
         }];

       }else{

        [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"AM" forKey:@"ProductType"];
            
         [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
      }



}

- (void) getActivityMessage:(CDVInvokedUrlCommand*)command{

       NSString* appsecret = [command.arguments objectAtIndex:0];

      NSString* mac = [command.arguments objectAtIndex:1];

      NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

      AM3S *am3sInstance = [self getAM3SwithMac:mac];

     if(am3sInstance!=nil){


        [message setObject:am3sInstance.serialNumber forKey:@"address"];


         [am3sInstance commandSynchronousActiveWithAppSecret:appsecret HistoryData:^(NSArray *historyDataArray) {

             [message setObject:@"activity" forKey:@"msg"];

             [message setObject:historyDataArray forKey:@"value"];

             [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
         } DisposeErrorBlock:^(AM3SErrorID errorID) {

               if (errorID==AM3SErrorDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:am3sInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
                
               }else{

                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:errorID] forKey:@"errorID"];

                 [message setObject:@"AM" forKey:@"ProductType"];

                 [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
            }
        
        }];

       }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"AM" forKey:@"ProductType"];
            
         [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
      }
}

- (void) getSleepMessage:(CDVInvokedUrlCommand*)command{


     NSString* appsecret = [command.arguments objectAtIndex:0];

      NSString* mac = [command.arguments objectAtIndex:1];

      NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

      AM3S *am3sInstance = [self getAM3SwithMac:mac];

     if(am3sInstance!=nil){


        [message setObject:am3sInstance.serialNumber forKey:@"address"];


        [am3sInstance commandSynchronousSleepWithAppSecret:appsecret historyData:^(NSArray *historyDataArray) {

             [message setObject:@"sleep" forKey:@"msg"];

             [message setObject:historyDataArray forKey:@"value"];

             [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
         
        } DisposeErrorBlock:^(AM3SErrorID errorID) {

             if (errorID==AM3SErrorDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:am3sInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
                
               }else{

                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:errorID] forKey:@"errorID"];

                 [message setObject:@"AM" forKey:@"ProductType"];

                 [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
            }
        
        }];


        

       }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"AM" forKey:@"ProductType"];
            
         [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
      }
}

- (void) getRealTimeMessage:(CDVInvokedUrlCommand*)command{

      NSString* appsecret = [command.arguments objectAtIndex:0];

      NSString* mac = [command.arguments objectAtIndex:1];

      NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

      AM3S *am3sInstance = [self getAM3SwithMac:mac];

     if(am3sInstance!=nil){


        [message setObject:am3sInstance.serialNumber forKey:@"address"];


         [am3sInstance commandSynchronousCurrentWithAppSecret:appsecret ActiveInfo:^(NSDictionary *activeDictionary) {

             [message setObject:@"realtime" forKey:@"msg"];

             [message setObject:activeDictionary forKey:@"value"];

             [self sendCallBackSomeJsonData:message commandID:command.callbackId];

        
         } DisposeErrorBlock:^(AM3SErrorID errorID) {

             if (errorID==AM3SErrorDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:am3sInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
                
               }else{

                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:errorID] forKey:@"errorID"];

                 [message setObject:@"AM" forKey:@"ProductType"];

                 [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
            }
        
         }];       

       }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"AM" forKey:@"ProductType"];
            
         [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
      }
}

- (void) getHourType:(CDVInvokedUrlCommand*)command{

      NSString* appsecret = [command.arguments objectAtIndex:0];

      NSString* mac = [command.arguments objectAtIndex:1];

      NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

      AM3S *am3sInstance = [self getAM3SwithMac:mac];

     if(am3sInstance!=nil){


        [message setObject:am3sInstance.serialNumber forKey:@"address"];


         [am3sInstance commandQueryWithAppSecret:appsecret TimeFormat:^(AM3STimeFormat timeFormat) {

             [message setObject:@"getHourType" forKey:@"msg"];

             [message setObject:[NSNumber numberWithInt:timeFormat] forKey:@"value"];

             [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
         } DisposeErrorBlock:^(AM3SErrorID errorID) {

              if (errorID==AM3SErrorDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:am3sInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
                
               }else{

                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:errorID] forKey:@"errorID"];

                 [message setObject:@"AM" forKey:@"ProductType"];

                 [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
            }
        
         }];

       }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"AM" forKey:@"ProductType"];
            
         [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
      }
}

- (void) setHourType:(CDVInvokedUrlCommand*)command{


      NSString* appsecret = [command.arguments objectAtIndex:0];

      NSString* mac = [command.arguments objectAtIndex:1];

      NSNumber* type = [command.arguments objectAtIndex:2];

      NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

      AM3S *am3sInstance = [self getAM3SwithMac:mac];

     if(am3sInstance!=nil){


        [message setObject:am3sInstance.serialNumber forKey:@"address"];

        [am3sInstance commandSetWithAppSecret:appsecret TimeFormat:type ResultBlock:^(BOOL resetSucSetting) {

              [message setObject:@"setHourTypeOK" forKey:@"msg"];

              [self sendCallBackSomeJsonData:message commandID:command.callbackId];

        
        } DisposeErrorBlock:^(AM3SErrorID errorID) {

               if (errorID==AM3SErrorDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:am3sInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
                
               }else{

                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:errorID] forKey:@"errorID"];

                 [message setObject:@"AM" forKey:@"ProductType"];

                 [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
            }
        
       }];        

       }else{

        [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"AM" forKey:@"ProductType"];
            
         [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
      }
}

- (void) setRandom:(CDVInvokedUrlCommand*)command{


      NSString* appsecret = [command.arguments objectAtIndex:0];

      NSString* mac = [command.arguments objectAtIndex:1];

      NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

      AM3S *am3sInstance = [self getAM3SwithMac:mac];

     if(am3sInstance!=nil){


        [message setObject:am3sInstance.serialNumber forKey:@"address"];


         [am3sInstance commandSetRandomWithAppSecret:appsecret DisposeRandomNumberStr:^(NSString *randomNumberStr) {

            [message setObject:randomNumberStr forKey:@"value"];   
        
         } DisposeBlock:^(BOOL resetSucSetting) {

             [message setObject:@"setRandomOK" forKey:@"msg"];

              [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
        } DisposeErrorBlock:^(AM3SErrorID errorID) {

            if (errorID==AM3SErrorDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:am3sInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
                
               }else{

                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:errorID] forKey:@"errorID"];

                 [message setObject:@"AM" forKey:@"ProductType"];

                 [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
            }
        
        }];
        

       }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"AM" forKey:@"ProductType"];
            
         [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
      }
}

- (void) getStageMessage:(CDVInvokedUrlCommand*)command{

      NSString* appsecret = [command.arguments objectAtIndex:0];

      NSString* mac = [command.arguments objectAtIndex:1];

      NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

      AM3S *am3sInstance = [self getAM3SwithMac:mac];

     if(am3sInstance!=nil){


        [message setObject:am3sInstance.serialNumber forKey:@"address"];


         [am3sInstance commandAM3SSetWithAppSecret:appsecret SyncsportCount:^(NSNumber *sportCount) {
        
    } disposeMeasureData:^(NSArray *measureDataArray) {

         [message setObject:@"stage forms" forKey:@"msg"];

         [message setObject:measureDataArray forKey:@"value"];

         [self sendCallBackSomeJsonData:message commandID:command.callbackId];

        
    } disposeFinishMeasure:^(BOOL resetSuc) {
        
    } disposeErrorBlock:^(AM3SErrorID errorID) {

        if (errorID==AM3SErrorDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:am3sInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
                
               }else{

                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:errorID] forKey:@"errorID"];

                 [message setObject:@"AM" forKey:@"ProductType"];

                 [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
            }
        
    }];


       }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"AM" forKey:@"ProductType"];
            
         [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
      }
}

- (void) getPicture:(CDVInvokedUrlCommand*)command{


      NSString* appsecret = [command.arguments objectAtIndex:0];

      NSString* mac = [command.arguments objectAtIndex:1];

      NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

      AM3S *am3sInstance = [self getAM3SwithMac:mac];

     if(am3sInstance!=nil){


        [message setObject:am3sInstance.serialNumber forKey:@"address"];

         [am3sInstance commandQueryWithAppSecret:appsecret Picture:^(AM3SPicture picture) {

             [message setObject:@"picture" forKey:@"msg"];

             [message setObject:[NSNumber numberWithInt:picture]forKey:@"value"];

             [self sendCallBackSomeJsonData:message commandID:command.callbackId];

        
        } DisposeErrorBlock:^(AM3SErrorID errorID) {

             if (errorID==AM3SErrorDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:am3sInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
                
               }else{

                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:errorID] forKey:@"errorID"];

                 [message setObject:@"AM" forKey:@"ProductType"];

                 [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
            }
        
        
       }];


        

       }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"AM" forKey:@"ProductType"];
            
         [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
      }
}

- (void) setPicture:(CDVInvokedUrlCommand*)command{

      NSString* appsecret = [command.arguments objectAtIndex:0];

      NSString* mac = [command.arguments objectAtIndex:1];

       NSNumber* index = [command.arguments objectAtIndex:2];

      NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

      AM3S *am3sInstance = [self getAM3SwithMac:mac];

     if(am3sInstance!=nil){


        [message setObject:am3sInstance.serialNumber forKey:@"address"];

         [am3sInstance commandSetWithAppSecret:appsecret Picture:index ResultBlock:^(BOOL resetSucSetting) {

             [message setObject:@"setPictureOK" forKey:@"msg"];

             [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
         } DisposeErrorBlock:^(AM3SErrorID errorID) {

             if (errorID==AM3SErrorDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:am3sInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
                
               }else{

                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:errorID] forKey:@"errorID"];

                 [message setObject:@"AM" forKey:@"ProductType"];

                 [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
            }
        
         }];


        

       }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"AM" forKey:@"ProductType"];
            
         [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
      }

}

- (void) getBattery:(CDVInvokedUrlCommand*)command{


      NSString* appsecret = [command.arguments objectAtIndex:0];

      NSString* mac = [command.arguments objectAtIndex:1];

      NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

      AM3S *am3sInstance = [self getAM3SwithMac:mac];

     if(am3sInstance!=nil){


        [message setObject:am3sInstance.serialNumber forKey:@"address"];

        [am3sInstance CommandQueryWithAppSecret:appsecret Battery:^(NSNumber *battery) {

               [message setObject:@"battery" forKey:@"msg"];

               [message setObject:battery forKey:@"value"];

               [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
        } DisposeErrorBlock:^(AM3SErrorID errorID) {


             if (errorID==AM3SErrorDisconnect) {

                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:am3sInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
                
               }else{

                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:[NSNumber numberWithInt:errorID] forKey:@"errorID"];

                 [message setObject:@"AM" forKey:@"ProductType"];

                 [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
            
            }
        
        
        }];


        

       }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"AM" forKey:@"ProductType"];
            
         [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
      }


}

- (void) disConnectDevice:(CDVInvokedUrlCommand*)command{

     NSString* appsecret = [command.arguments objectAtIndex:0];

      NSString* mac = [command.arguments objectAtIndex:1];

      NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

      AM3S *am3sInstance = [self getAM3SwithMac:mac];

     if(am3sInstance!=nil){


        [am3sInstance commandDisAMDeviceConnect];


        [message setObject:am3sInstance.serialNumber forKey:@"address"];

        [message setObject:@"disconnect" forKey:@"msg"];

        [message setObject:mac forKey:@"address"];

        [message setObject:@"AM3S" forKey:@"type"];
           
        [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        

       }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"AM" forKey:@"ProductType"];
            
         [message setObject:@"AM3S" forKey:@"ProductModel"];
                 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
    
      }


}


- (void) setDisconnectCallback:(CDVInvokedUrlCommand*)command{


      [callbackList setObject:command.callbackId forKey: @"deviceDicConnected"];


}






@end
