title
=======

```
  这个组件作为class注册的顶层组件view controller，整个采用flux方式，
  处理不同视图的数据传递以及注册流程的控制。
  采用自定义reactive数据存储注册过程的信息
  
```

###

```

进入注册页面的判断逻辑
1.判断当前所处的时间段
  根据当前session  session的registerStartDate  当前时间判断处于哪一阶段
 
 一共4个阶段
 
2.可选课的swimmer的查询 

 查询所有account下的swimmer
  
  swimmer是否正在学习，
  swimmer是否有孩子以前学习过
  swimmer是否和正在学习的swimmer是兄弟姐妹关系 暂略？
  
  
3. 查询可用的class，查询class的选时间
     
     查询所有可注册的class信息
     sessionComingId  && availableSeats>0
     
4. 用户可能有多个孩子，每个孩子选多个class，book the same time只针对某个孩子某个class
   需要增加一个BookTheSameTime选择列表增一个（2.0与2.0a直接新增一个list页面）
   
   bookTheSameTimeClassListPage
   查询所有正在学习的孩子以及正在学习的class
   
   



问题：
session已开始后是否还允许报名，是不是四周之后session start之后不允许再注册
下一个session的class信息是否和当前session一样，如果不一样是否可以

```
 