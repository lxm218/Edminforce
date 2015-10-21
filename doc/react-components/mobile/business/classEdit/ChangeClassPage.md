###general

* 课程选择组件暂用下拉形式。后面改造为表格形式。

* 查询class文档获取所有可用的class以及每个class的可选时间段
  
  ```
   查询class逻辑：
   
     1. 当前session 的所有class active状态 且avalible>0
     
  ```
    
  
*  update classRegister 文档, class status标记为为 canceled_for_change

*  update classRegister DOC, 根据情况修改其 avalible数目


  	```
    问题： 
    a. 是否可只修改 class的time 不修改class本身，那就不涉及退费了
  	b. change class不用选择 preference time？ 
  	
  	```

```
  ETC: 1day
```

###data
```
  {
    account
    swimmer
    class
    
    
  }
```
