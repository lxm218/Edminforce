/**
 * Created on 9/15/15.
 */


{
    //单体 在多个地方使用或在meteordata中被触发  仅初始化一次
    //let _storeInstance=null;

    Dependency.add('classRegister.SelectClassPage.store', new function () {

        //if(_storeInstance) return _storeInstance;
        //_storeInstance = this;

        var self = this;


        //this function may be called in Tracker.autorun and before  DB.Swimmers loaded
        //so should take care
        self.getSwimmers = function () {
            return DB.Swimmers.find({accountId: Meteor.userId()})
        }

        //////////////////////////////////////////////////////
        ///////////////////selection info
        // should reset after add to
        //选中的swimmer
        self.currentSwimmer = new ReactiveVar()
        //当前的level
        self.currentLevel = new ReactiveVar()
        //选中的day
        self.currentDay = new ReactiveVar()
        self.currentTime = new ReactiveVar()
        self.currentClass = new ReactiveVar()
        //当前的步骤
        self.currentStep = new ReactiveVar(1)


        //可选days 依赖于 当前的currentLevel
        self.avaiableDays = new ReactiveVar([])
        //可选时间   依赖于 当前选中的currentDay
        self.avaiableTimes = new ReactiveVar([])


        //Session.set('CART_ID')


        /*
         * 一次流程选择的class信息  3步
         * 使用Immutable库进行对象修改
         * {
         *  swimmer:
         *  class1:{classId, swimmerId}
         *  class2:
         *  class3:
         * }
         * */
        self.selectedClasses = new ReactiveVar(Immutable.Map())


        var undefinedSelectValueOption = {text:'', value: ''};
        var undefinedSelectValue = '';

        //暂存购物车ID 后端会验证其有效性


        function resetDateAndTime() {
            self.currentDay.set(undefinedSelectValue)
            self.currentTime.set(undefinedSelectValue)
        }


        self.tokenId = Dispatcher.register(function (payload) {
            switch (payload.actionType) {

                case "CRSelectClassPage_SWIMMER_CHANGE": //选择swimmer  level可能会变
                {
                    let swimmer = payload.swimmer
                    let level= App.getNextClassLevel(swimmers.level) //next


                    self.currentSwimmer.set(swimmer)
                    self.currentLevel.set(level)

                    self.currentDay.set()
                    self.currentTime.set()

                    debugger

                    break;
                }
                case "CRSelectClassPage_DAY_CHANGE"://选择day
                {
                    debugger

                    self.currentDay.set(payload.day)
                    self.currentTime.set()
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

                        let currentSwimmer = self.currentSwimmer.get()
                        let currentClass = self.currentClass.get()


                        Meteor.call('add_class_to_cart', {
                            swimmerId: currentSwimmer._id,
                            classId: currentClass._id,
                            quantity: 1,
                            swimmer: currentSwimmer,
                            class1: currentClass
                        }, function (err, result) {
                            debugger
                            if (err) {
                                alert(err.error)
                                console.error(err)
                                return; //todo  prompt
                            }

                            //selectedClasses
                            let map = self.selectedClasses.get()
                            map = map.set('swimmer', currentSwimmer)
                            map = map.set('class1', currentClass)
                            self.selectedClasses.set(map)


                            Session.set('CART_ID', result.cartId)

                            console.log('step1', currentSwimmer, currentClass)

                            console.log('CART_ID: ',Session.get('CART_ID'))


                            self.currentStep.set(2)
                            resetDateAndTime();
                        })


                    }

                    if (payload.currentStep == 2) {

                        let currentClass = self.currentClass.get()

                        let map = self.selectedClasses.get()
                        map = map.set('class2', currentClass)
                        self.selectedClasses.set(map)


                        let swimmer = map.get('swimmer')
                        let class1 = map.get('class1')


                        Meteor.call('add_preference_to_cart', {
                            cartId: Session.get('CART_ID'),

                            preferenceNum: 2,

                            classId: class1._id,
                            swimmerId: swimmer._id,
                            data: currentClass
                        }, function (err) {
                            if (err) {
                                alert(err.error)
                                console.error(err)
                                return; //todo  prompt
                            }

                            console.log('step2', currentClass)


                            self.currentStep.set(3)
                            resetDateAndTime()
                        })


                    }

                    if (payload.currentStep == 3) {

                        //todo unify with currentStep == 2

                        let currentClass = self.currentClass.get()

                        let map = self.selectedClasses.get()
                        map = map.set('class3', currentClass)
                        self.selectedClasses.set(map)


                        let swimmer = map.get('swimmer')
                        let class1 = map.get('class1')


                        Meteor.call('add_preference_to_cart', {
                            cartId: Session.get('CART_ID'),

                            preferenceNum: 3,

                            classId: class1._id,
                            swimmerId: swimmer._id,
                            data: currentClass
                        }, function (err) {
                            if (err) return; //todo  prompt

                            console.log('step3', currentClass)


                            FlowRouter.go('/classRegister/SelectClassReady');
                        })

                    }

                    break;
                }

                case "componentWillMount_CRSelectClassPage":
                {
                    //清空上一轮的选择

                    self.currentDay.set(undefinedSelectValue)
                    self.currentTime.set(undefinedSelectValue)
                    self.currentClass.set(null)
                    self.currentStep.set(1)
                    //self.avaiableDays //依赖于 当前的currentLevel
                    //self.avaiableTimes //依赖于 当前选中的currentDay

                    self.selectedClasses.set(Immutable.Map())

                    break;
                }
                case "CRSelectClassPage_CLASS_EDIT":
                {
                    var editStep = payload.eidtStep

                    alert(editStep)

                    break;
                }
                case "CRSelectClassPage_SelectedClasses_CHANGE":{
                    let preferenceNum = payload.preferenceNum
                    let classData = payload.classData


                    let map = self.selectedClasses.get()
                    map = map.set('class'+preferenceNum, classData)
                    self.selectedClasses.set(map)


                    break
                }





            }
        });


        /*
         *
         * ********************* wait for ******************
         * wrap in Meteor.startup for Tracker.autorun can run before cellections loaded
         *
         * */

        Meteor.startup(function () {

            //初始化swimmer and level
            Tracker.autorun(function () {

                var swimmers = self.getSwimmers().fetch()

                if (swimmers.length) {
                    self.currentSwimmer.set(swimmers[0])
                    var level= App.getNextClassLevel(swimmers[0].level)
                    self.currentLevel.set(level) //获取比当前level更高一级的level
                }
                console.log(swimmers)

            })

            //days depend on level of swimmer
            Tracker.autorun(function () {

                //wait for App.info ready
                App.info = App.info || DB.App.findOne()
                if (!App.info) return;

                var level = self.currentLevel.get();
                console.log('autorun level', level, App.info.sessionRegister)


                //todo  计算可用数目报名数
                let classes = DB.Classes.find({
                    sessionId: App.info.sessionRegister, //level session
                    levels: level
                }).fetch()

                console.log(level, App.info.sessionRegister, classes)

                //debugger
                classes = _.uniq(classes, function (item, key, a) {
                    return item.day;
                });

                let days = classes.map(function (v, n) {
                    return {text: App.Config.week[v.day], value: v.day}
                })
                days.sort(function (a, b) {
                    return (a.value - b.value);
                })

                //add an empty value to prevent browser init select value  use the first item
                days.unshift(undefinedSelectValueOption)

                self.avaiableDays.set(days)


                //重置day
                //self.currentDay.set(days[0].value)


            });

            /// time depend on day
            Tracker.autorun(function () {

                //wait for App.info ready
                App.info = App.info || DB.App.findOne()
                if (!App.info) return;


                var currentDay = self.currentDay.get();

                var level
                Tracker.nonreactive(function () {
                    level = self.currentLevel.get()
                });

                let classes = DB.Classes.find({
                    sessionId: App.info.sessionRegister, // session level day
                    levels: level,
                    day: currentDay
                }).fetch()

                let times = classes.map(function (v, n) {
                    return {
                        text: App.num2time(v.startTime) + "-" + App.num2time(v.endTime),
                        value: v.startTime
                    }
                })
                times.sort(function (a, b) {
                    return (a.value - b.value);
                })


                //add an empty value to prevent browser init select value  use the first item
                times.unshift(undefinedSelectValueOption)

                self.avaiableTimes.set(times)

                //重置time
                //self.currentTime.set(times[0].value)


            });

            //time确定后class就确定了
            //level + day+ time  确定一个class
            Tracker.autorun(function () {

                //wait for App.info ready
                App.info = App.info || DB.App.findOne()
                if (!App.info) return;

                let time = self.currentTime.get()


                let level, day;
                Tracker.nonreactive(function () {
                    level = self.currentLevel.get()
                    day = self.currentDay.get()
                });


                let theClass = DB.Classes.find({
                    sessionId: App.info.sessionRegister, // session level day
                    levels: level,
                    day: day,
                    startTime: time
                }).fetch()

                if (theClass.length > 1) {
                    console.error('Multi class match when select class ')
                }

                if (theClass[0]) {
                    self.currentClass.set(theClass[0])

                    console.log('selected class', theClass[0])
                }


            });


        })


    });
}

