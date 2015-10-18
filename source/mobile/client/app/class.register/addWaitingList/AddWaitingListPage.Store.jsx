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


        //可选days 依赖于 当前的currentLevel
        self.avaiableDays = new ReactiveVar([])
        //可选时间   依赖于 当前选中的currentDay
        self.avaiableTimes = new ReactiveVar([])



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

                    debugger

                    break;
                }
                case "CRAddWaitingListPage_DAY_CHANGE"://选择day
                {
                    debugger

                    self.currentDay.set(payload.day)
                    break;
                }

                case "CRAddWaitingListPage_TIME_CHANGE"://选择time  确定一个class
                {
                    debugger
                    self.currentTime.set(payload.time)
                    break;
                }


                case "CRAddWaitingListPage_CLASS_SELECT"://select确定
                {
                    debugger

                    var currentSwimmer=self.currentSwimmer.get()
                    var currentClass = self.currentClass.get()

                    Meteor.call('add_waiting_list',currentSwimmer._id,
                        currentClass._id,function(err, result){
                            if(err){
                                console.error(err)
                                return;
                            }

                            FlowRouter.go('/classRegister/AddWaitingListConfirm');
                        })

                    break;
                }

                case "GOTO_CRAddWaitingListPage":
                {
                    //清空上一轮的选择

                    self.currentDay.set(undefinedSelectValue)
                    self.currentTime.set(undefinedSelectValue)
                    self.currentClass.set(null)
                    //self.currentStep.set(1)
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
                App.info = App.info || DB.App.findOne()
                if (!App.info) return;


                var level = self.currentLevel.get();

                //Tracker.nonreactive(function () {

                //todo  计算可用数目报名数
                let classes = DB.Classes.find({
                    sessionId: App.info && App.info.sessionRegister, //level session
                    levels: level,
                    seatsRemain:{$lte:0}
                }).fetch()

                //debugger
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
                App.info = App.info || DB.App.findOne()
                if (!App.info) return;

                var currentDay = self.currentDay.get();

                var level
                Tracker.nonreactive(function(){
                    level = self.currentLevel.get()
                });

                let classes = DB.Classes.find({
                    sessionId: App.info.sessionRegister, // session level day
                    levels: level,
                    day: currentDay,
                    seatsRemain:{$lte:0}

                }).fetch()

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
                App.info = App.info || DB.App.findOne()
                if (!App.info) return;

                let time = self.currentTime.get()


                let level
                let day
                Tracker.nonreactive(function(){
                    level = self.currentLevel.get()
                    day = self.currentDay.get()
                });

                let theClass = DB.Classes.find({
                    sessionId:  App.info.sessionRegister, // session level day
                    levels: level,
                    day: day,
                    startTime: time,
                    seatsRemain:{$lte:0}

                }).fetch()

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

