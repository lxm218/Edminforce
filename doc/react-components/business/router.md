router advice
=============
```
这里对路由进行了梳理，供参考。

设计遵循以下思路：

1. 每个模块有自己独立的前缀 互不冲突

2. 路由系统应可以尽快匹配，无重复，不依赖定义的顺序

 例如 swimmer的update 和 read可以设计为
 /account/{accountId}/swimmer/{swimmerId}/update
 /account/{accountId}/swimmer/{swimmerId}/read
 
 也可以设计为
 /account/{accountId}/swimmerUpdate/{swimmerId}
 /account/{accountId}/swimmerRead/{swimmerId}
 
 也可设计为
 /accountSwimmerUpdate/{accountId}/{swimmerId}
 /accountSwimmerRead/{accountId}/{swimmerId}
 
 
 第二种方法比第一种会获得更快的匹配，尽管第一种应该更接近rest的资源为中心的风格。
 另外这里accountId 属于用户登陆信息，不存在访问别人account的情况，accountId可以忽略，
 第三种其实应该是最为高效的 因为直接走了不同的分支，虽然可读性略差
 

```

###auth

Refer to account-password package

###account module
```

/account/setting
/account/alternativeContact
/account/emergencyContactPage


/account/addSwimmer
/account/addSwimmer/evaluationLevel

/account/swimmerUpdate/{swimmerId}
/account/swimmerRead/{swimmerId}

```

###classEdit  module
```

@@@ 是否有必要合并？
/classEdit/{calssId}/operationBoard
/classEdit/{calssId}/change
/classEdit/{calssId}/changeBilling
/classEdit/{calssId}/cancel
/classEdit/{calssId}/sheduleMeeting
/classEdit/{calssId}/writeComment



@@@ 扩展模块名classEdit为classEditSwimmer 可避免/classEdit/{calssId}的路由判断 也会防止出错
/classEditSwimmer/{swimmerId}/registered
/classEditSwimmerList

```

###classRegister module

```
/classRegister/SelectClass
/classRegister/SelectClassReady
/classRegister/AddWaitingList

```