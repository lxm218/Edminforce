/**
 * Created on 10/2/15.
 */

/**
 * Created on 9/15/15.
 */


{
    //let ShoppingCart;
    //Dependency.autorun(function () {
    //    ShoppingCart = Dependency.get('classRegister.ShoppingCart.model');
    //});


    Dependency.add('classRegister.AddWaitingList.store', new function () {

        var self = this;


        //this function may be called in Tracker.autorun and before  DB.Swimmers loaded
        //so should take care
        self.getSwimmers = function () {
            return DB.Swimmers.find({accountId: Meteor.userId()})
        }

        self.props = new ReactiveVar();

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

        //需要选3个preference
        self.currentStep = new ReactiveVar(1)



        //可选days 依赖于 当前的currentLevel
        self.avaiableDays = new ReactiveVar([])
        //可选时间   依赖于 当前选中的currentDay
        self.avaiableTimes = new ReactiveVar([])


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

                case "CRAddWaitingListPage_PROPS_INIT"://get props
                {

                    self.props.set(payload.props)

                    self.currentDay.set()
                    self.currentTime.set()
                    self.currentClass.set()




                    break;
                }

                case "CRAddWaitingListPage_SWIMMER_CHANGE": //选择swimmer  level可能会变
                {
                    let swimmer = payload.swimmer

                    self.currentSwimmer.set(swimmer)
                    //self.currentLevel.set(App.getNextClassLevel(swimmer.level))//todo

                    self.currentDay.set()
                    self.currentTime.set()



                    break;
                }
                case "CRAddWaitingListPage_DAY_CHANGE"://选择day
                {


                    self.currentDay.set(payload.day)
                    break;
                }

                case "CRAddWaitingListPage_TIME_CHANGE"://选择time  确定一个class
                {

                    self.currentTime.set(payload.time)
                    break;
                }


                case "CRAddWaitingListPage_CLASS_SELECT"://select确定
                {

                    if (payload.currentStep == 1) {

                        let currentSwimmer = self.currentSwimmer.get()
                        let currentClass = self.currentClass.get()

                        //selectedClasses
                        let map = self.selectedClasses.get()
                        map = map.set('swimmer', currentSwimmer)
                        map = map.set('class1', currentClass)
                        self.selectedClasses.set(map)

                        self.currentStep.set(2)
                        resetDateAndTime();


                    }else if (payload.currentStep == 2) {

                        let currentClass = self.currentClass.get()

                        let map = self.selectedClasses.get()
                        map = map.set('class2', currentClass)
                        self.selectedClasses.set(map)

                        self.currentStep.set(3)
                        resetDateAndTime();


                    }else if (payload.currentStep == 3) {

                        let currentClass = self.currentClass.get()

                        let map = self.selectedClasses.get()
                        map = map.set('class3', currentClass)
                        self.selectedClasses.set(map)


                        Meteor.call('add_waiting_list',{
                                swimmerId: map.get('swimmer')._id,
                                classId: map.get('class1')._id,
                                swimmer:map.get('swimmer'),
                                class1:_.omit(map.get('class1'),'students','pendingTransactions'),
                                class2:_.omit(map.get('class2'),'students','pendingTransactions'),
                                class3:_.omit(map.get('class3'),'students','pendingTransactions')
                            },function(err, result){
                                if(err){
                                    console.error(err)
                                    return;
                                }
                                console.log(result)

                                FlowRouter.go('/classRegister/AddWaitingListConfirm?id='+result);
                            })
                    }


                    break;
                }

                case "GOTO_CRAddWaitingListPage":
                {
                    //清空上一轮的选择

                    self.currentDay.set(undefinedSelectValue)
                    self.currentTime.set(undefinedSelectValue)
                    self.currentClass.set(null)
                    self.currentStep.set(1)
                    //self.avaiableDays //依赖于 当前的currentLevel
                    //self.avaiableTimes //依赖于 当前选中的currentDay

                    self.selectedClasses.set(Immutable.Map())

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


            Tracker.autorun(function (compution) {
                var props = self.props.get();

                if(!props) return;
                console.log('autorun props', props)


                var currentSwimmer= DB.Swimmers.findOne({
                    _id:props.swimmerId
                })

                var currentLevel =props.classLevel

                self.currentSwimmer.set(currentSwimmer)
                self.currentLevel.set(currentLevel)


            })


                //days depend on level of swimmer
            Tracker.autorun(function () {
                //wait for App.info ready
                //App.info = App.info || DB.App.findOne()
                //if (!App.info) return;

                var selectedSession = Session.get('selectedSession')
                if (!selectedSession) return;



                var currentStep = self.currentStep.get()
                var level = self.currentLevel.get();

                //Tracker.nonreactive(function () {

                //todo  计算可用数目报名数
                if(currentStep ==1){
                    var classes = DB.Classes.find({
                        sessionId: selectedSession, //level session
                        levels: level,
                        seatsRemain:{$lte:0}
                    }).fetch()
                }else{
                    var classes = DB.Classes.find({
                        sessionId: selectedSession, //level session
                        levels: level,
                        //seatsRemain:{$lte:0}
                    }).fetch()
                }


                //
                classes = _.uniq(classes, function (item, key, a) {
                    return item.day;
                });

                let days = classes.map(function (v, n) {
                    return {text: App.Config.week[v.day], value: v.day}
                })

                //add an empty value to prevent browser init select value  use the first item
                days.unshift(undefinedSelectValueOption)

                self.avaiableDays.set(days)

                //设置默认值
                //if (days.length) {
                //    self.currentDay.set(days[0].value)
                //}


                //});


            });

            /// time depend on day
            Tracker.autorun(function () {
                //wait for App.info ready
                //App.info = App.info || DB.App.findOne()
                //if (!App.info) return;

                var selectedSession = Session.get('selectedSession')
                if (!selectedSession) return;

                var currentDay = self.currentDay.get();

                var level
                Tracker.nonreactive(function(){
                    level = self.currentLevel.get()
                });

                var currentStep = self.currentStep.get()

                if(currentStep ==1){
                    var classes = DB.Classes.find({
                        sessionId: selectedSession, // session level day
                        levels: level,
                        day: currentDay,
                        seatsRemain:{$lte:0}

                    }).fetch()
                }else{
                    var classes = DB.Classes.find({
                        sessionId: selectedSession, // session level day
                        levels: level,
                        day: currentDay,
                        //seatsRemain:{$lte:0}

                    }).fetch()
                }



                let times = classes.map(function (v, n) {
                    return {
                        text: App.num2time(v.startTime) + "-" + App.num2time(v.endTime),
                        value: v.startTime
                    }
                })

                //add an empty value to prevent browser init select value  use the first item
                times.unshift(undefinedSelectValueOption)

                self.avaiableTimes.set(times)

                //初始化time
                //if (times.length) {
                //    self.currentTime.set(times[0].value)
                //}





            });

            //time确定后class就确定了
            //level + day+ time  确定一个class
            Tracker.autorun(function () {
                //wait for App.info ready
                //App.info = App.info || DB.App.findOne()
                //if (!App.info) return;

                var selectedSession = Session.get('selectedSession')
                if (!selectedSession) return;

                let time = self.currentTime.get()


                let level
                let day
                Tracker.nonreactive(function(){
                    level = self.currentLevel.get()
                    day = self.currentDay.get()
                });

                var currentStep = self.currentStep.get()

                if(currentStep ==1) {
                    var theClass = DB.Classes.find({
                        sessionId:  selectedSession, // session level day
                        levels: level,
                        day: day,
                        startTime: time,
                        seatsRemain:{$lte:0}

                    }).fetch()
                }else{
                    var theClass = DB.Classes.find({
                        sessionId:  selectedSession, // session level day
                        levels: level,
                        day: day,
                        startTime: time,
                        //seatsRemain:{$lte:0}

                    }).fetch()
                }



                if (theClass[0]) {
                    self.currentClass.set(theClass[0])
                }


            });


            //初始化swimmer and level
            //Tracker.autorun(function () {
            //    //if(!DB.Swimmers) return;
            //
            //    var swimmers = self.getSwimmers().fetch()
            //    if (swimmers.length) {
            //        self.currentSwimmer.set(swimmers[0])
            //        self.currentLevel.set(App.getNextClassLevel(swimmers[0].level))
            //    }
            //
            //})
        })


    });
}

