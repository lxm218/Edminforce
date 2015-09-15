title
=======
```
这里按模块估计每个组件的所需时间，可得出一个总的完成日期，具体模块的实现顺序可根据情况调整

总体时间阶段：

first tweek： 9.14-9.20
second week： 9.21-9.27

```

###classEdit module

component|	etc
---------|----
CancelClass| 0.5－1d
ChangeClassBillingPage | <0.5d
ChangeClassPage|  1d
ClassOperationBoardPage|  done
SheduleMeetingWithCoachPage|  <0.5d  暂不做？
SwimmerListPage|  almost done.  定制RC.Item  0.5d－1d
SwimmerRegisteredClassPage|   0.5d
移植ionic 的grid组件 用于布局和数据显示|  1d
日期选择和time选择 下拉组件 关联class数据库信息|0.5-1d

```
备注：

问题：
  1.ChangeClassBillingPage退款或欠款之后 走支付流程？
  2.ChangeClassPage
    a. 是否可只修改 class的time 不修改class本身，那就不涉及退费了
    b. change class不用选择 preference time？ 

```

###classRegister module

component| etc
---------|----
classRegisterViewControl | 1d-2d
bookTheSameTimePage, bookTheSameTimePreferencePage| 0.5-1d
SelectClassPage| 1d
AddWaitingListPage| 0.5d
registraionInfoPage| 1h
RegBillingPage, SelectClassReadyPage| 0.5d

```
AddWaitingListPage
1. 是否允许选择可用课程 
   a.若允许则 选中后 ［add waitinglist］按钮应即时变为 ［select］
     不再走waitinglist流程
     
2. 可以加多少个AddWaitingList item？

3. 是否可以即选择preference 又添加waiting list


bookTheSameTimePreferencePage
1. preference Class的处理逻辑 后端手动处理？

classRegisterViewControl
1. session已开始后是否还允许报名，是不是四周之后session start之后不允许再注册
2. 下一个session的class信息是否和当前session一样，如果不一样是否可以


```
###payment

component| etc
---------|--------
payNowConfirmPage| 0.5-1d
others| 0.5-1d

```
问题：
1. 支付网关接口的调用
2. payInStoreConfirmPage 
   24小时 未支付 后端人工删除订单？电话确认？。
3. payNowConfirmPage 
  邮件失败的处理？允许用户再次点击发邮件？后端自动重发？

```




