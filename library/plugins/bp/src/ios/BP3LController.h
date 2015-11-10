//
//  BP3LViewController.h
//  testShareCommunication
//
//  Created by my on 14/10/13.
//  Copyright (c) 2013年 my. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface BP3LController : NSObject{
NSMutableArray *BP3LDeviceArray;
}
+(BP3LController *)shareBP3LController;

-(NSArray *)getAllCurrentBP3LInstace;

-(void)commandStopSearchDevice;


@end
