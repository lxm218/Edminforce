/**
 * Created on 9/15/15.
 */

Dependency.add('classRegister.SelectClassPage.store', new function () {

    var self = this;


    //选中的swimmer
    self.currentSwimmer = new ReactiveVar()

    //当前的level
    self.currentLevel = new ReactiveVar()

    //可选days 依赖于 当前的level
    self.avaiableDays = new ReactiveVar([])

    //选中的day
    self.currentDay = new ReactiveVar()

    //可选时间   依赖于 当前选中的day
    self.avaiableTimes = new ReactiveVar([])

    self.currentTime = new ReactiveVar()

    self.currentClass = new ReactiveVar()


    //当前class? classId


    //当前的步骤
    self.currentStep = new ReactiveVar(1)
    self.firstPreference = new ReactiveVar() //此值会影响可选的课程的数目  影响classRegister文档
    self.secendPreference = new ReactiveVar({})
    self.thirdPreference = new ReactiveVar({})

    /*
     * 保存已选过的class 一个swimmer可选多个class 可有多个swimmer
     * 使用Immutable库进行对象修改
     * {
     *   swimmerId:[
     *       {
     *           firstPreference:'',
     *           secendPreference:'',
     *           thirdPreference:''
     *
     *       }
     *   ]
     * }
     * */
    self.selectedClassed = new ReactiveVar({})


    Meteor.subscribe("appInfo");
    Meteor.subscribe("classes");

    debugger

    self.tokenId = Dispatcher.register(function (payload) {
        switch (payload.actionType) {

            case "CRSelectClassPage_SWIMMER_CHANGE": //选择swimmer  level可能会变
            {
                let swimmer = payload.swimmer
                self.currentSwimmer.set(swimmer)
                self.currentLevel.set(swimmer.level)

                debugger

                break;
            }
            case "CRSelectClassPage_DAY_CHANGE"://选择day
            {
                debugger
                self.currentDay.set(payload.day)

                break;
            }

            case "CRSelectClassPage_TIME_CHANGE"://选择time  确定一个class
            {
                debugger
                self.currentTime.set(payload.time)
                break;
            }


            case "CRSelectClassPage_CLASS_SELECT"://select确定
            {
                debugger




                if (payload.currentStep == 1) {

                    self.firstPreference.set(payload.selectedClass)
                    self.currentStep.set(2)


                    // 创建购物车
                    //  添加选课纪录 会影响到可选课程的数目


                }
                if (payload.currentStep == 2) {
                    self.secendPreference.set(payload.selectedClass)
                    self.currentStep.set(3)

                    //更新购物车

                    debugger
                }

                if (payload.currentStep == 3) {
                    self.thirdPreference.set(payload.selectedClass)

                    //更新购物车

                    FlowRouter.go('/classRegister/SelectClassReady');
                }

                break;
            }

        }
    });


    ////////////////////wait for///////////////////////////
    //day   depend on  swimmer
    Tracker.autorun(function () {
        var level = self.currentLevel.get();


        if (!DB.Classes) return;

        //todo  计算可用数目报名数
        let classes = DB.Classes.find({
            sessionId: 'testSession2', //level session
            level:level
        }).fetch()

        debugger
        classes = _.uniq(classes, function(item, key, a) {
            return item.day;
        });

        let days = classes.map(function (v, n) {
            return {text: App.Config.week[v.day], value: v.day}
        })

        self.avaiableDays.set(days)

        //设置默认值 ok？
        if(days.length){
            self.currentDay.set(days[0].value)
        }

    });

    /// time depend on day
    Tracker.autorun(function () {
        var level = self.currentLevel.get()

        var currentDay = self.currentDay.get();

        debugger
        if (!DB.Classes) return;

        let classes = DB.Classes.find({
            sessionId: 'testSession2', // session level day
            level:level,
            day:currentDay
        }).fetch()

        let times = classes.map(function (v, n) {
            return {
                text: App.num2time(v.startTime)+"-"+ App.num2time(v.endTime),
                value: v.startTime
            }
        })

        self.avaiableTimes.set(times)
        //初始化time
        if(times.length){
            self.currentTime.set(times[0].value)
        }

    });

    //time确定后class就确定了
    //level + day+ time  确定一个class
    Tracker.autorun(function () {
        let time = self.currentTime.get()
        let level = self.currentLevel.get()
        let day = self.currentDay.get()

        if (!DB.Classes) return;
        let theClass = DB.Classes.find({
            sessionId: 'testSession2', // session level day
            level:level,
            day:day,
            startTime:time
        }).fetch()

        if(theClass[0]){
            self.currentClass.set(theClass[0])
        }

    });




    });