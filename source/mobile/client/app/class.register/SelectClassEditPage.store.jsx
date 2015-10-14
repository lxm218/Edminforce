/**
 * Created on 10/11/15.
 */

{
    //单体 在多个地方使用或在meteordata中被触发  仅初始化一次
    //let _storeInstance=null;

    Dependency.add('classRegister.CRSelectClassEditPage.store', new function () {

        //if(_storeInstance) return _storeInstance;
        //console.log('run Dependency CRSelectClassEditPage')
        //_storeInstance = this;

        var self = this;

        ////props///

        self.props = new ReactiveVar();
        self.cart = new ReactiveVar();


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

                case "CRSelectClassEditPage_PROPS_UPDATE"://get props
                {
                    console.log('CRSelectClassEditPage_PROPS_UPDATE',payload.props)

                    self.props.set(payload.props)

                    self.currentDay.set()
                    self.currentTime.set()
                    self.currentClass.set()


                    break;
                }

                case "CRSelectClassEditPage_DAY_CHANGE"://选择day
                {
                    console.log('day change ', payload.day)
                    self.currentDay.set(payload.day)
                    self.currentTime.set()
                    break;
                }

                case "CRSelectClassEditPage_TIME_CHANGE"://选择time  确定一个class
                {
                    debugger
                    self.currentTime.set(payload.time)
                    break;
                }

                case "CRSelectClassEditPage_CLASS_SELECT"://select确定
                {
                    debugger

                    var props = self.props.get();
                    var currentClass = self.currentClass.get()
                    /*
                     * cartId  确定购物车
                     * swimmerId classId   确定一个item
                     * preferenceNum   确定preference  1，2，3
                     * toClassData     新的class数据  classId？
                     *
                     * */
                    Meteor.call('change_preference_in_cart', {
                        cartId:props.cartId,
                        swimmerId: props.swimmerId,
                        classId: props.classId,
                        preferenceNum:props.preferenceNum,

                        classData:currentClass
                    }, function (err, result) {
                        debugger
                        if (err) {
                            console.error(err)
                            alert(err.error)
                            return; //todo  prompt
                        }

                        //通知SelectClassPage.store 更新数据
                        //Dispatcher.dispatch({
                        //    actionType: 'CRSelectClassPage_SelectedClasses_CHANGE',
                        //    preferenceNum:props.preferenceNum,
                        //    classData:currentClass
                        //});


                        //回到上一页
                        window.history.back();

                    })

                    break;
                }

                case "CRSelectClassEditPage_ComponentWillMount":
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

            }
        });


        /*
         *
         * ********************* wait for ******************
         * wrap in Meteor.startup for Tracker.autorun can run before cellections loaded
         *
         * */

        Meteor.startup(function () {

            //根据组件的props 初始化数据
            Tracker.autorun(function (compution) {

                debugger

                var props = self.props.get();
                console.log(self.props.dep._dependentsById)

                if(!props) return; //wait for props

                console.log('autorun props', props)

                //var cartId= props.cartId;

                //todo classId swimmerId 条件
                var cart
                if(props.cartId){
                    cart= DB.ShoppingCart.findOne({
                        _id:props.cartId
                    })
                }else{
                    cart= DB.ShoppingCart.findOne({
                        status:'active'
                    })
                }


                var currentSwimmer= DB.Swimmers.findOne({
                    _id:props.swimmerId
                })

                if(cart){
                    self.cart.set(cart)
                    console.log(cart)

                }


                if(currentSwimmer){
                    self.currentSwimmer.set(currentSwimmer)
                    self.currentLevel.set(App.getNextClassLevel(currentSwimmer.level))

                    console.log('set currentLevel',currentSwimmer.level)

                }


            })


            //days depend on level of swimmer
            Tracker.autorun(function (compution) {

                console.log(self.currentLevel.dep._dependentsById)


                console.log('autorun get currentLevel')

                //wait for App.info ready
                App.info = App.info || DB.App.findOne()
                if (!App.info) return;



                var level = self.currentLevel.get();
                console.log('autorun get currentLevel', level, App.info.sessionRegister)

                if(!level) return;  // wait for level


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

