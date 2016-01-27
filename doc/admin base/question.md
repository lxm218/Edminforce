UI -> [https://lxmworkshop.mybalsamiq.com/projects/edminforceadminwebapp-simplified/grid]
***

#### 3. student profile页
1. student profile部分是从student页面点击某条纪录过来的吧，这里应该有个Save按钮吧？
2. Family Information这里是什么？
3. Class History部分的Year是什么意思？怎么得来的？
4. Class History的status的值可能有几种？

#### 2. students页
1. 有个Class的select 这里面是表示把所有的class都列在这里么？
2. Day of Class是什么意思，应该是什么值？
3. 这个页面没有添加学生的入口，UI中也没有看到添加的页面，是不需要这个功能么？

#### 1. add new class 页面
1. level的取值怎么来  -> [Beginner, Intermediate, Advanced]
2. teacher只能写一个么，是输入还是去AdminUser里面选择 -> 应该有个teacher 列表 （第一次手工加进去，以后有新teacher，在设立账号的时候，title就是teacher），在这儿就是在teacher list下拉菜单里面选
3. schedule是输入么？有没有特殊的交互 -> 这儿我改成两个框，一个选天，一个选时间 (第一个预设：Sun, Mon, Tues, Wed, Thu, Fri, Sat) (第二个预设：可以从早上九点开始，每个加30分钟，比如9:00am, 9:30am, 10:00am ...)
4. Frequency的combox的取值怎么来 -> 目前把这个去掉了
5. tuition是总和还是每次课的单价，有个需求是根据次数确定费用，那是不是需要有每堂课的单价 -> 这里是单次的学费，可选 每次课多少钱，或者每个月多少钱， 所以我把per class做成下拉菜单，可选per class 或 per month
6. 需要限定最大学生人数和最少学生人数吧，就是Class表需要加入maxStudent & minStudent字段 -> 对，我在图上加上了
7. 需要加入试课的最大人数限制吧 -> 我加上了，默认的如果是0，就是根据实际上课人数如果小于max，如果设置为1或2，这个就是max之外允许的人数
8. 需要加入可选的Session吧 -> 我随后会加上
9. 需要加入可选的Program吧 -> 我随后会加上
10. 需要加入可以注册的开始和结束时间吧，或者在Status中加入一个字段表示目前阶段可以注册。-> 这个在session里面
11. 需要加入总共的课程次数吧 -> 这个有了，number of class
12. 需要加入每堂课的时间长度吧，看UI上是有的 -> 加上了，下拉列表（预设30 min, 45 min, 1 hr, 1.5 hr, 2 hr)

(by malan)
class 里面 有个schedule，这个是两个字段组成：day and time。 这个day就是 Day of Class里面的值。

另外，class name 能否这个组合而成：program+level+day+time. 如果level为空，就是program+day+time
