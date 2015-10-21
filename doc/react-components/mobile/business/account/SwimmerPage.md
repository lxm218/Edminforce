###General
create / update

###Data
```
{
	account     	//account的详细信息
	swimmers     	//account下的swimmer的详细信息 对象数组
	
}
需要获取当前account的swimmer的个数以及具体id对应的详细信息

```

###Hierarchy && Properties

1. swimmerId 值非空则是read／update 否则为add

 ```
 <AddUpdateSwimmerPage swimmerId={}>
 <AddUpdateSwimmerPage>
 
 ```
 
 


