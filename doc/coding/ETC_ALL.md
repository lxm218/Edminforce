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


