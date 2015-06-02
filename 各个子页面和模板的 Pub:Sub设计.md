各个子页面和模板的 Pub/Sub设计.md

各个子页面的 Pub/Sub
Layout 全局 pub/sub

这些 pub/sub 是每次登陆就会产生的. 和在哪个页面没有关系. 他们都是在 layout 层面的.

alertsHeader

这个是专门 给 header 上的 alert icon 以及点击后出来的 float window 用的. 得到未阅读的总数和前不超过10条

publish 'alertsHeader', (userId)-> //userId 事实上不需要传入, 可以 Meteor.userId()

逻辑是 判断 userId 是不是医生. 如果不是就 throw new Meteor.Error 去这个医生 profile.alertCheckTime , 然后从 Alerts collection 寻找晚于这个时间的 alerts. 使用 package tmeasday:publish-counts 计算所有符合条件的 alert 总数 但是 publish cursor 的之后要限制数量. 最大10条. 因为再多 header 上 alert float 也显示不下.

在 /history path 的页面还有另外的 alertsHistory publish

另外，alertsheader上显示的每一条提醒都有一个『提醒他』的按钮（hover时显示），如果用点击过后，此条就不再出现alertsHeader里了

messagesHeader

和 alertsHeader 类似

对应的 collection 是 chatSession

users

Meteor.users , 返回 Profile.

history page 健康管理记录

alertsHistory

和 alertsHeader 类似, 但是返回的数量限制是 paginated. 可以持续增加

messagesHistory

和 messagesHeader 类似, 但是返回的数量限制是 paginated. 可以持续加载

用户在 history 页面可以增加 note. 增加 note 字段即可.

Chat page

一进入 Chat Page 就可以 subscribe chatSessionList

chatSessionlist

publish 'chatSessionList', ()->

从 chatSession 中返回 from 或者 to 是 当前 userId 的所有记录, 时间倒序. 不是所有记录都需要返回 msg 数组, 以为会占太多带宽. 只有前十条需要包括 msgs 数组. 因为他们最有可能被点进去看. 如果用户点了除了前十条以外的 chat, 就需要额外 publish

chatSessionSingle

publish 'chatSessionSingle', (chatSessionid)->

当用户点击了某一个 session , 而且这个 session 不是前十个已经下载 msgs 数组的. 这时候需要请求 server 下行传达缺失的 msgs, 从而才可以出现 chat 对话记录.

server 端 chatSession.find {_id:sessionid}, {fields:{msgs:1}} 即可.

当然, 这样设计会有些延迟, 毕竟用户点击了以后要等待传递过来. 但是这样也好过先下载大量数据但是没有用人用.

Home 客户卡片

当医生进入首页就开始 sub

userCards

publishComposite 'userCards', ()->

从 userAggr collection 中拿出所有属于当前这个医生的用户卡片 排序依据是

加星号的重点客户
最新有 Activity 的 时间倒序
姓名 字母正序
我假设每个医生不可能有成千上万的病人. 所以暂时考虑一次性全部下行.

然后 Composite 的方式把 这些病人的 user.profile 也下行. 这样前端就可以组合两个 collection 的信息显示出来卡片了.

考虑到这个页面会被经常从 profile 页面返回. 建议使用 SubsManager Package 来加快速度. 把 Cards 数据 Cache 在本地.
Profile 客户信息页面

进入 Profile 页面时候判断本地数据库是否有基本的 userAggr 和 user.profile 信息. 如果有就说明我们是从 Home 用户卡片 页面跳进来的. 这种情况下我们不进行Router 级别的 sub. 因为本地数据已有.

但是如果发现本地 Mongo 没有这个数据, 就需要使用 'patientProfile' 来 sub 这个病人的基本数据.

这个页面的不同功能卡片很多. Router 可以加载一部分共用数据. 其他各个模板需要的数据, 由各自模板自己 sub. 而且在初始折叠的时候都不需要 sub, 只有卡片展开的时候才 sub, 这样节约带宽和初始加载时间

patientProfile

publish 'patientProfile', (patientId)-> 这个 publish 和'userCards'返回内容完全一样, 只不过只有这一个病人的数据. find {_id: patientId}

请注意, Profile 页面的卡片各自 subscripbe 自己的数据. 这一点和其他页面不同. 我们在另外地方专门讲这些卡片Tempate级别 的 sub
Alert Settings 警报设置页面

My Settings 设置页面

这个页面就是设定当前用户的 profile, 所以很简单地返回当前用户的 user.profiel 即可

publish mySettings

publish 'mySettings', ()->

返回当前用户的 profile