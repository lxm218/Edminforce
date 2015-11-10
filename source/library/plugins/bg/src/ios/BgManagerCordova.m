#import "BgManagerCordova.h"

@implementation BgManagerCordova{
    
    BG5Controller *bgController;
    
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

    bgController = [BG5Controller shareIHBg5Controller];

    callbackList = [[NSMutableDictionary alloc]init];

    deviceIDPSList = [[NSMutableDictionary alloc]init];

    commandState=[NSNumber numberWithInt:0];

   [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceDisconnected:) name:@"BG5DisConnectNoti" object:nil];

}

- (id)init
{
    self = [super init];

    bgController = [BG5Controller shareIHBg5Controller];

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

- (BG5*) getBG5withMac:(NSString *)mac{

     bgController = [BG5Controller shareIHBg5Controller];

    NSArray *bgArray = [bgController getAllCurrentBG5Instace];

    if (bgArray.count>0 && mac.length>0)
    {
        for(BG5 *tempBG5 in bgArray){

          if([mac isEqualToString:tempBG5.serialNumber]){
            
            return tempBG5;

            break;
          
          }
        }
    }
   
        
    return nil;

}

#pragma mark -
#pragma mark some NSNotification

-(void)deviceConnected:(NSNotification *)tempNoti{

    NSDictionary *infoDic = [tempNoti userInfo];

     NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    NSString *serialNumber = [infoDic objectForKey:@"SerialNumber"];

     [message setObject:@"discovery doing" forKey:@"msg"];

     [message setObject:serialNumber forKey:@"address"];
     
     [message setObject:@"BG5"  forKey:@"name"];

     [deviceIDPSList setObject:infoDic forKey:serialNumber];

    [self sendCallBackSomeJsonData:message commandID:[callbackList valueForKey:@"deviceConnected"]];

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

    [message setObject:@"BG5" forKey:@"type"];

    [self sendCallBackSomeJsonData:message commandID:[callbackList valueForKey:@"deviceDicConnected"]];
    
}


#pragma mark -
#pragma mark some Methods

- (void) startDiscovery:(CDVInvokedUrlCommand*)command{


    bgController = [BG5Controller shareIHBg5Controller];


    NSArray *bgArray = [bgController getAllCurrentBG5Instace];

    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];



    if (bgArray.count>0)
    {

           for (int i = 0; i < bgArray.count; i++)
         {
        
         BG5*myBg5=[bgArray objectAtIndex:i];
        
       
         [message setObject:@"discovery doing" forKey:@"msg"];

         [message setObject:myBg5.serialNumber forKey:@"address"];

         [message setObject:@"BG5" forKey:@"name"];

         [self sendCallBackSomeJsonData:message commandID:command.callbackId];

         }

     }else{

         [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceConnected:) name:@"BG5ConnectNoti" object:nil];

         [callbackList setObject:command.callbackId forKey: @"deviceConnected"];
    }

}

- (void) stopDiscovery:(CDVInvokedUrlCommand*)command{

     NSString* mac = [command.arguments objectAtIndex:1];

    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];


    [message setObject:@"error" forKey:@"msg"];
        
    [message setObject:[NSNumber numberWithInt:800] forKey:@"errorID"];
        
    [message setObject:@"BG" forKey:@"ProductType"];
        
    [message setObject:mac forKey:@"address"];

    [message setObject:@"BG5" forKey:@"ProductModel"];


    [self sendCallBackSomeJsonData:message commandID:command.callbackId];

}
- (void) connectDevice:(CDVInvokedUrlCommand*)command{

     NSString* mac = [command.arguments objectAtIndex:1];

    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];
   
    // [message setObject:@"connected" forKey:@"msg"];

    // [message setObject:mac forKey:@"address"];

    // [message setObject:@"BG5" forKey:@"name"];

    [message setObject:@"error" forKey:@"msg"];
        
    [message setObject:[NSNumber numberWithInt:800] forKey:@"errorID"];
        
    [message setObject:@"BG" forKey:@"ProductType"];
        
    [message setObject:mac forKey:@"address"];

    [message setObject:@"BG5" forKey:@"ProductModel"];
                    
    [self sendCallBackSomeJsonData:message commandID:command.callbackId];


}

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

            [message setObject:@"BG" forKey:@"ProductType"];

            
            [message setObject:@"BG5" forKey:@"ProductModel"];
           

            [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        }
        

     }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"BG" forKey:@"ProductType"];

         [message setObject:@"BG5" forKey:@"ProductModel"];

         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
     }


}


- (void) setUnit:(CDVInvokedUrlCommand*)command{

    NSString* appsecret = [command.arguments objectAtIndex:0];

    NSString* mac = [command.arguments objectAtIndex:1];

    NSNumber* unit = [command.arguments objectAtIndex:2];

    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    BG5 *bgInstance = [self getBG5withMac:mac];

    [message setObject:mac forKey:@"address"];


     if(bgInstance!=nil){

     [bgInstance commandInitBGWithAppSecret:appsecret SetUnit:unit DisposeBGBlock:^{

         [message setObject:@"setUnit" forKey:@"msg"];

         [self sendCallBackSomeJsonData:message commandID:command.callbackId];
        
    } DisposeBGErrorBlock:^(NSNumber *errorID) {

          if ([errorID intValue]==100) {


                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:bgInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];

           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:errorID forKey:@"errorID"];

                 [message setObject:@"BG" forKey:@"ProductType"];

                 [message setObject:@"BG5" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];
             
             
             }
        
    }];

    }else{

       [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"BG" forKey:@"ProductType"];

         [message setObject:@"BG5" forKey:@"ProductModel"];

       [self sendCallBackSomeJsonData:message commandID:command.callbackId];      
    }


}

- (void) setBottleId:(CDVInvokedUrlCommand*)command{

    NSString* appsecret = [command.arguments objectAtIndex:0];

    NSString* mac = [command.arguments objectAtIndex:1];

    NSNumber* bottleID = [command.arguments objectAtIndex:2];


     NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    BG5 *bgInstance = [self getBG5withMac:mac];


     if(bgInstance!=nil){


    [bgInstance commandSendBottleIDWithAppSecret:appsecret bottleID:bottleID DisposeBGSendBottleIDBlock:^(BOOL sendOk) {

         [message setObject:mac forKey:@"address"];

         [message setObject:@"setBottleId" forKey:@"msg"];

         [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 
        
    } DisposeBGErrorBlock:^(NSNumber *errorID) {

         if ([errorID intValue]==100) {


                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:bgInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 

           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:errorID forKey:@"errorID"];

                  [message setObject:@"BG" forKey:@"ProductType"];

                 [message setObject:@"BG5" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 
             
             
             }

        
    }];

     }else{

        [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"BG" forKey:@"ProductType"];

         [message setObject:@"BG5" forKey:@"ProductModel"];

       [self sendCallBackSomeJsonData:message commandID:command.callbackId];        
    }



}
- (void) getBottleId:(CDVInvokedUrlCommand*)command{

    NSString* appsecret = [command.arguments objectAtIndex:0];

    NSString* mac = [command.arguments objectAtIndex:1];

    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    [message setObject:mac forKey:@"address"];

    BG5 *bgInstance = [self getBG5withMac:mac];


     if(bgInstance!=nil){


    [bgInstance commandGetbottleIDWithAppSecret:appsecret bottleID:^(NSNumber *bottleID) {

         [message setObject:@"bottleID" forKey:@"msg"];

         [message setObject:bottleID forKey:@"bottleID"];

         [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 
        
    } DisposeBGErrorBlock:^(NSNumber *errorID) {

        if ([errorID intValue]==100) {


                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:bgInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 

           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:errorID forKey:@"errorID"];

                  [message setObject:@"BG" forKey:@"ProductType"];

                 [message setObject:@"BG5" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 
             
             
             }
        
    }];


     }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"BG" forKey:@"ProductType"];

         [message setObject:@"BG5" forKey:@"ProductModel"];

       [self sendCallBackSomeJsonData:message commandID:command.callbackId];         
    }




}

- (void) setBottleMessage:(CDVInvokedUrlCommand*)command{

     NSString* appsecret = [command.arguments objectAtIndex:0];

     NSString* mac = [command.arguments objectAtIndex:1];

     NSString* qr = [command.arguments objectAtIndex:2];

     NSNumber* leftNum = [command.arguments objectAtIndex:3];

     NSString* timeTs = [command.arguments objectAtIndex:4];


     NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

     [message setObject:mac forKey:@"address"];

    BG5 *bgInstance = [self getBG5withMac:mac];


     if(bgInstance!=nil){


     [bgInstance commandSendBGCodeStringWithAppSecret:appsecret encodeString:qr validDate:timeTs remainNum:leftNum DisposeBGSendCodeBlock:^(BOOL sendOk) {
       
       [message setObject:@"setBottleMessage" forKey:@"msg"]; 

       [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 

    } DisposeBGStartModel:^(BGOpenMode mode) {

        NSNumber*modeNum=[NSNumber numberWithInt:mode];

        [message setObject:@"setBottleMessage" forKey:@"msg"]; 

        [message setObject:modeNum forKey:@"BGOpenMode"];

        [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 

        
    } DisposeBGErrorBlock:^(NSNumber *errorID) {

        if ([errorID intValue]==100) {


                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:bgInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 

           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:errorID forKey:@"errorID"];

                  [message setObject:@"BG" forKey:@"ProductType"];

                 [message setObject:@"BG5" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 
             
             
             }

        
    }];


     }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"BG" forKey:@"ProductType"];

         [message setObject:@"BG5" forKey:@"ProductModel"];

       [self sendCallBackSomeJsonData:message commandID:command.callbackId];  

    }




}
- (void) getBottleMessage:(CDVInvokedUrlCommand*)command{

    NSString* appsecret = [command.arguments objectAtIndex:0];

    NSString* mac = [command.arguments objectAtIndex:1];

    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    [message setObject:mac forKey:@"address"];

    BG5 *bgInstance = [self getBG5withMac:mac];


     if(bgInstance!=nil){


    [bgInstance commandReadBGCodeDicWithAppSecret:appsecret BGCodeDic:^(NSDictionary *codeDic) {

        NSNumber *ShiTnum=[codeDic valueForKey:@"Strips"];
        NSNumber*bottleID=[codeDic valueForKey:@"bottleID"];
        NSString*date=[codeDic valueForKey:@"Date"];
        
         [message setObject:@"code" forKey:@"msg"];

         [message setObject:bottleID forKey:@"bottleid"];

         [message setObject:ShiTnum forKey:@"leftnum"];

         [message setObject:date forKey:@"expiretime"];

         [self sendCallBackSomeJsonData:message commandID:command.callbackId];  

        
    } DisposeBGErrorBlock:^(NSNumber *errorID) {

        if ([errorID intValue]==100) {


                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:bgInstance.serialNumber forKey:@"address"];

                  [self sendCallBackSomeJsonData:message commandID:command.callbackId];  

           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:errorID forKey:@"errorID"];

                 [message setObject:@"BG" forKey:@"ProductType"];

                 [message setObject:@"BG5" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId];  
             
             
             }
        
    }];


     }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"BG" forKey:@"ProductType"];

         [message setObject:@"BG5" forKey:@"ProductModel"];

       [self sendCallBackSomeJsonData:message commandID:command.callbackId];        
    }

}

- (void) getOfflineData:(CDVInvokedUrlCommand*)command{

    NSString* appsecret = [command.arguments objectAtIndex:0];

    NSString* mac = [command.arguments objectAtIndex:1];

    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    [message setObject:mac forKey:@"address"];

    BG5 *bgInstance = [self getBG5withMac:mac];


     if(bgInstance!=nil){

        [bgInstance commandTransferMemorryDataWithAppSecret:appsecret BGDataCount:^(NSNumber *dataCount) {

            [message setObject:@"historyDataCount" forKey:@"msg"];

            [message setObject:dataCount forKey:@"count"];

            [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 

        
        } DisposeBGHistoryData:^(NSDictionary *historyDataDic) {

            [message setObject:@"historyData" forKey:@"msg"];

            [message setObject:historyDataDic forKey:@"history"];

            [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 
        
        } DisposeBGErrorBlock:^(NSNumber *errorID) {

            if ([errorID intValue]==100) {


                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:bgInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 

           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:errorID forKey:@"errorID"];

                  [message setObject:@"BG" forKey:@"ProductType"];

                 [message setObject:@"BG5" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 
             
             
             }

        
       }];

     }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"BG" forKey:@"ProductType"];

         [message setObject:@"BG5" forKey:@"ProductModel"];

       [self sendCallBackSomeJsonData:message commandID:command.callbackId];       
    }


}

- (void) getBattery:(CDVInvokedUrlCommand*)command{

    NSString* appsecret = [command.arguments objectAtIndex:0];

    NSString* mac = [command.arguments objectAtIndex:1];

    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    [message setObject:mac forKey:@"address"];

    BG5 *bgInstance = [self getBG5withMac:mac];


     if(bgInstance!=nil){

    [bgInstance commandQueryBatteryWithAppSecret:appsecret DisposeBatteryBlock:^(NSNumber *energy) {

            [message setObject:@"battery" forKey:@"msg"];

            [message setObject:energy forKey:@"battery"];

            [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 

        
    } DisposeErrorBlock:^(NSNumber *errorID) {

         if ([errorID intValue]==100) {


                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:bgInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 

           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:errorID forKey:@"errorID"];

                  [message setObject:@"BG" forKey:@"ProductType"];

                 [message setObject:@"BG5" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 
             
             
             }
        
    }];

    }else{

          [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"BG" forKey:@"ProductType"];

         [message setObject:@"BG5" forKey:@"ProductModel"];

       [self sendCallBackSomeJsonData:message commandID:command.callbackId];  

    }


}

- (void) deleteOfflineData:(CDVInvokedUrlCommand*)command{

    NSString* appsecret = [command.arguments objectAtIndex:0];

    NSString* mac = [command.arguments objectAtIndex:1];

    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    [message setObject:mac forKey:@"address"];

    BG5 *bgInstance = [self getBG5withMac:mac];


     if(bgInstance!=nil){

         [bgInstance commandDeleteMemorryDataWithAppSecret:appsecret DeleteData:^(BOOL deleteOk) {

             [message setObject:@"deleteOfflineData" forKey:@"msg"];

             [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 
        
        } DisposeBGErrorBlock:^(NSNumber *errorID) {

             if ([errorID intValue]==100) {


                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:bgInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 

           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:errorID forKey:@"errorID"];

                  [message setObject:@"BG" forKey:@"ProductType"];

                 [message setObject:@"BG5" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 
             
             
             }
        
       }];

    }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"BG" forKey:@"ProductType"];

         [message setObject:@"BG5" forKey:@"ProductModel"];

       [self sendCallBackSomeJsonData:message commandID:command.callbackId];  

    }

}
- (void) holdLink:(CDVInvokedUrlCommand*)command{

    NSString* appsecret = [command.arguments objectAtIndex:0];

    NSString* mac = [command.arguments objectAtIndex:1];

    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    [message setObject:mac forKey:@"address"];

    BG5 *bgInstance = [self getBG5withMac:mac];


     if(bgInstance!=nil){

         [bgInstance commandKeepConnectWithAppSecret:appsecret DisposeBGErrorBlock:^(NSNumber *errorID) {


             if ([errorID intValue]==100) {


                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:bgInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 

           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:errorID forKey:@"errorID"];

                  [message setObject:@"BG" forKey:@"ProductType"];

                 [message setObject:@"BG5" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 
             
             
             }


        
        }];


    

      [message setObject:@"holdLink" forKey:@"msg"];


     [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 

     }else{

        [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"BG" forKey:@"ProductType"];

         [message setObject:@"BG5" forKey:@"ProductModel"];

       [self sendCallBackSomeJsonData:message commandID:command.callbackId];       
    }



}
- (void) startMeasure:(CDVInvokedUrlCommand*)command{

     NSString* appsecret = [command.arguments objectAtIndex:0];

     NSString* mac = [command.arguments objectAtIndex:1];

     NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    [message setObject:mac forKey:@"address"];

    BG5 *bgInstance = [self getBG5withMac:mac];


     if(bgInstance!=nil){

        [bgInstance commandCreateBGWithAppSecret:appsecret testModel:BGMeasureMode_Blood DisposeBGStripInBlock:^(BOOL stripIn) {
        
           [message setObject:@"strip in" forKey:@"msg"];

           [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 

        } DisposeBGBloodBlock:^(BOOL blood) {

            [message setObject:@"get blood" forKey:@"msg"];

            [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 
        
        } DisposeBGResultBlock:^(NSNumber *result) {

             [message setObject:@"value" forKey:@"msg"];

             [message setObject:result forKey:@"value"];

             [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 

        
        } DisposeBGTestModelBlock:^(BGMeasureMode mode) {
        
        } DisposeBGErrorBlock:^(NSNumber *errorID) {

             if ([errorID intValue]==100) {


                 [message setObject:@"disconnect" forKey:@"msg"];

                 [message setObject:bgInstance.serialNumber forKey:@"address"];

                 [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 

           }else{
                 
                 [message removeAllObjects];
                 
                 [message setObject:@"error" forKey:@"msg"];
                 
                 [message setObject:errorID forKey:@"errorID"];

                  [message setObject:@"BG" forKey:@"ProductType"];

                 [message setObject:@"BG5" forKey:@"ProductModel"];
                 
                 [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 
             
             
             }
        
        }];


    }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"BG" forKey:@"ProductType"];

         [message setObject:@"BG5" forKey:@"ProductModel"];

       [self sendCallBackSomeJsonData:message commandID:command.callbackId];       
    }

}

- (void) disConnectDevice:(CDVInvokedUrlCommand*)command{

     NSString* mac = [command.arguments objectAtIndex:1];

    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];

    [message setObject:@"error" forKey:@"msg"];
        
    [message setObject:[NSNumber numberWithInt:800] forKey:@"errorID"];
        
    [message setObject:@"BG" forKey:@"ProductType"];
        
    [message setObject:mac forKey:@"address"];

    [message setObject:@"BG5" forKey:@"ProductModel"];

    [self sendCallBackSomeJsonData:message commandID:command.callbackId];  


}
- (void) setDisconnectCallback:(CDVInvokedUrlCommand*)command{


      [callbackList setObject:command.callbackId forKey: @"deviceDicConnected"];


}

- (void) codeStripStrAnalysis:(CDVInvokedUrlCommand*)command{

    NSString* appsecret = [command.arguments objectAtIndex:0];

    NSString* mac = [command.arguments objectAtIndex:1];

    NSString* codeStr = [command.arguments objectAtIndex:2];

    NSMutableDictionary* message = [[NSMutableDictionary alloc] init];


    BG5 *bgInstance = [self getBG5withMac:mac];

    if (bgInstance!=nil)
    {

        NSDictionary*codeDic=[bgInstance codeStripStrAnalysis:codeStr];

        if (codeDic!=nil)
        {

              [message setObject:@"codeInfo" forKey:@"msg"];

              [message setObject:codeDic forKey:@"codeInfo"];

              [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 
            
        }else{


         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@600 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"BG" forKey:@"ProductType"];

         [message setObject:@"BG5" forKey:@"ProductModel"];
 
         [self sendCallBackSomeJsonData:message commandID:command.callbackId]; 

        }  
       
    }else{

         [message removeAllObjects];
                            
         [message setObject:@"error" forKey:@"msg"];
                 
         [message setObject:@400 forKey:@"errorID"];

         [message setObject:mac forKey:@"address"];

         [message setObject:@"BG" forKey:@"ProductType"];

         [message setObject:@"BG5" forKey:@"ProductModel"];

       [self sendCallBackSomeJsonData:message commandID:command.callbackId];       
    }


}




@end
