//
//  BP3L.h
//  testShareCommunication
//
//  Created by my on 8/10/13.
//  Copyright (c) 2013年 my. All rights reserved.
//

#import <Foundation/Foundation.h>
//#define ProductType_BP3L 0xA1
typedef enum {
    BP3LNormalError = 1,//下位机传上来的错误信息
    BP3LOverTimeError,//底层发的超时
    BP3LNoRespondError,//一定时间内没收到响应的，一般是蓝牙堵塞
    BP3LBeyondRangeError,//超范围的
    BP3LDidDisconnect,//下位机断开
    //    BP3LAskToShut,//下位机请求关机
    BP3LAskToStopMeasure,//下位机请求中断测量
    
    BP3LUnAuthorized=700
    
}BP3LDeviceError;

typedef void (^BlockBP3LEnergyValue)(NSNumber *energyValue);
typedef void(^BlockBP3LDeviceError)(BP3LDeviceError error);
typedef void(^BlockBP3LDeviceFounction)(NSDictionary *dic);
typedef void(^BlockBP3LBlueSet)(BOOL isOpen);
typedef void(^BlockBP3LAngle)(NSDictionary *dic);
typedef void(^BlockBP3LPressure)(NSNumber *pressure);
typedef void(^BlockBP3LXioaboWithHeart)(NSArray *xiaoboArr);
typedef void(^BlockBP3LXioaboNoHeart)(NSArray *xiaoboArr);
typedef void(^BlockBP3LZero)(BOOL isComplete);
typedef void(^BlockBP3LMesureResult)(NSDictionary *dic);

typedef void(^BlockBP3LBachCount)(NSNumber *num);
typedef void(^BlockBP3LBachProgress)(NSNumber *pregress);
typedef void(^BlockBP3LBachArray)(NSArray *array);

typedef void(^BlockBP3LStopSuccess)();


@interface BP3L : NSObject{
    
    BlockBP3LEnergyValue _blockEnergyValue;
    BlockBP3LDeviceError _blockError;
    BlockBP3LDeviceFounction _blockFounction;
    BlockBP3LBlueSet _blockBlueSet;
    BlockBP3LAngle _blockAngle;
    
    BlockBP3LXioaboWithHeart _blockXiaoboArr;
    BlockBP3LXioaboNoHeart _blockXiaoboArrNoHeart;
    BlockBP3LPressure _blockPressure;
    BlockBP3LMesureResult _blockMesureResult;
    
    BlockBP3LBachCount _blockBachCount;
    BlockBP3LBachProgress _blockBachProgress;
    BlockBP3LBachArray _blockBachArray;
    BlockBP3LStopSuccess _blockStopSuccess;
    
    BOOL isCompleteZero;
    int totalBatchCount;
    BOOL isResived;
    int uploadCountSum;
    
    int wavePackageCnt;
    
    BOOL beMeasuringFlg;
    
}

@property (strong, nonatomic) NSString *currentUUID;
@property (strong, nonatomic) NSString *serialNumber;
@property (strong, nonatomic) NSTimer *startMeasureTimer;

//@property(nonatomic,copy)BlockEnergyValue _blockEnergyValue;
//@property(nonatomic,copy)BlockError _blockError;
//@property(nonatomic,copy)BlockDeviceFounction _blockFounction;
//@property(nonatomic,copy)BlockBlueSet _blockBlueSet;
//@property(nonatomic,copy)BlockAngle _blockAngle;
//@property(nonatomic,copy)BlockZero _isCompZero;
//@property(nonatomic,copy)BlockXioaboWithHeart _blockXiaoboArr;
//@property(nonatomic,copy)BlockXioaboNoHeart _blockXiaoboArrNoHeart;
//@property(nonatomic,copy)BlockPressure _blockPressureArr;
//@property(nonatomic,copy)BlockMesureResult _blockMesureResult;
//
//@property(nonatomic,copy)BlockBachCount _blockBachCount;
//@property(nonatomic,copy)BlockBachProgress _blockBachProgress;
//@property(nonatomic,copy)BlockBachArray _blockBachArray;

-(void)commandFounction:(BlockBP3LDeviceFounction)founction errorBlock:(BlockBP3LDeviceError)error;//要功能信息
-(void)commandSetBlueConnect:(BOOL)open respond:(BlockBP3LBlueSet)blockBuleSet errorBlock:(BlockBP3LDeviceError)error;//设置蓝牙回连开关
-(void)commandSetOffline:(BOOL)open errorBlock:(BlockBP3LDeviceError)error;//设置离线开关

-(void)commandEnergyWithAppSecret:(NSString*)AppSecret Energy:(BlockBP3LEnergyValue)energyValue errorBlock:(BlockBP3LDeviceError)error;

-(void)commandStartGetAngle:(BlockBP3LAngle)angleInfo errorBlock:(BlockBP3LDeviceError)error;//角度
-(void)commandStartMeasureWithAppSecret:(NSString*)AppSecret pressure:(BlockBP3LPressure)pressure xiaoboWithHeart:(BlockBP3LXioaboWithHeart)xiaobo xiaoboNoHeart:(BlockBP3LXioaboNoHeart)xiaoboNoHeart result:(BlockBP3LMesureResult)result errorBlock:(BlockBP3LDeviceError)error;//测量

-(void)commandBatchUpload:(BlockBP3LBachCount)totalCount pregress:(BlockBP3LBachProgress)progress dataArray:(BlockBP3LBachArray)uploadDataArray errorBlock:(BlockBP3LDeviceError)error;//要批量数据

-(void)stopBPMeassureWithAppSecret:(NSString*)AppSecret Block:(BlockBP3LStopSuccess)success errorBlock:(BlockBP3LDeviceError)error;

-(void)clearAllBlock;


-(void)commandDisDeviceConnect;



@end
