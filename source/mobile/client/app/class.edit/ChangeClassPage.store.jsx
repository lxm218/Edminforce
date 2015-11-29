/**
 * Created on 9/25/15.
 */

Dependency.add('classEdit.ChangeClass.store', new function () {

    var self = this;


    self.swimmerId = new ReactiveVar()
    self.classId = new ReactiveVar()


    self.swimmer = new ReactiveVar()
    self.class = new ReactiveVar()

    self.currentLevel = new ReactiveVar()


    //可选days 依赖于 当前的currentLevel
    self.avaiableDays = new ReactiveVar([])
    //可选时间   依赖于 当前选中的currentDay
    self.avaiableTimes = new ReactiveVar([])


    //选择的class
    self.currentDay = new ReactiveVar()
    self.currentTime = new ReactiveVar()
    self.currentClass = new ReactiveVar()


    self.tokenId = Dispatcher.register(function (payload) {

        switch (payload.actionType) {



            case "ChangeClassPage_INIT":
            {

                self.swimmerId.set(payload.swimmerId)
                self.classId.set(payload.classId)

                Meteor.subscribe("classes");
                Meteor.subscribe("swimmer", payload.swimmerId);


                break;
            }
            case "ChangeClassPage_DAY_CHANGE":
            {



                self.currentDay.set(payload.day)
                break;
            }
            case "ChangeClassPage_TIME_CHANGE":
            {


                self.currentTime.set(payload.time)

                break;
            }
            case "ChangeClassPage_CLASS_CONFIRM":
            {

                var href = '/classEdit/ChangeClassBillingPage'

                FlowRouter.go(href);

                break;
            }
            case "ChangeClassPage_BILLING_CONFIRM":
            {

                //var swimmer =self.swimmer.get()
                //var oldClass = self.class.get()
                //var newClass = self.currentClass.get()
                //
                //
                //
                //Meteor.call('change_class',
                //    swimmer._id,
                //    oldClass._id,
                //    newClass._id,
                //
                //    function (err) {
                //    if (err) {//todo  prompt
                //        console.error(err)
                //        alert(err.message)
                //        return;
                //    }
                //
                //    FlowRouter.go('/classEdit/swimmerList');
                //})

                break;
            }
            case "ChangeClassPage_CLASS_SEND_REQUEST":
            {

                var fromClass =self.class.get()

                var currentClass =self.currentClass.get()

                var swimmer = self.swimmer.get()
                if(!currentClass){
                    alert('Please select a class to change')
                    return
                }

                DB.Requests.insert({
                    type:'change_class',
                    swimmerId:swimmer._id,
                    swimmerInfo:swimmer,
                    classId:fromClass._id,
                    classInfo: _.omit(fromClass,['students','pendingTransactions']),

                    toClassId:currentClass._id,
                    toClassInfo: _.omit(currentClass,['students','pendingTransactions'])
                },function(err,result){

                    if(err){
                        console.error(err)
                        return
                    }


                    alert(
                        'Your request to change class for ' +
                        'Daniel has been submitted. ' +
                        'We’ll contact you soon.'
                    )

                    var href = '/classEdit/swimmerList'

                    FlowRouter.go(href);

                })







                break;
            }




            //每次 router到这个页面 清空用户选择
            case "GOTO_ChangeClassPage":
            {
                self.currentDay.set()
                self.currentTime.set()
                self.currentClass.set()

            }



        }
    })


    //todo  为autorun 添加 ignore逻辑 优化性能
    Meteor.startup(function () {

        //swimmerId  classId
        Tracker.autorun(function () {

            var swimmerId = self.swimmerId.get()
            var classId = self.classId.get()

            if(!swimmerId || !classId) return;

            var swimmer = DB.Swimmers.findOne({_id: swimmerId})
            var classDetail = DB.Classes.findOne({_id: classId})

            if(!swimmer || !classDetail) return;

            self.swimmer.set(swimmer)
            self.class.set(classDetail)


            //var curentLevel= App.getNextClassLevel(swimmer.level)
            //console.log(curentLevel)
            //
            //self.currentLevel.set(curentLevel)

        })

        Tracker.autorun(function () {
            var currentSwimmer = self.swimmer.get()
            var appInfo = DB.App.findOne()

            if(!appInfo) return;
            if(!currentSwimmer) return;

            Tracker.autorun(function () {

                //var nowClasses = DB.ClassesRegister.find({
                //    swimmerId: currentSwimmer._id,
                //    status:'normal',  //不显示cancel中的和 change中的
                //    sessionId: App.info.sessionNow
                //}).fetch();

                var nowClasses =DB.Classes.find({
                    'students.swimmerId':currentSwimmer._id,
                    sessionId: App.info && App.info.sessionNow
                }).fetch()



                //self.nowClasses.set(nowClasses)

                if(nowClasses.length>0){
                    self.currentLevel.set(App.getNextClassLevel(currentSwimmer.level))

                }else{
                    self.currentLevel.set(currentSwimmer.level)
                }

            })

        })

        //选择 avaiableDays
        Tracker.autorun(function () {
            App.info = App.info || DB.App.findOne()
            if (!App.info) return;

            var level = self.currentLevel.get()

            let classes = DB.Classes.find({
                sessionId: App.info.sessionRegister, //level session
                levels: level,
                _id:{$ne: self.classId.get()} //除去当前class
            }).fetch()

            console.log(level,classes)
            classes = _.uniq(classes, function (item, key, a) {
                return item.day;
            });

            let days = classes.map(function (v, n) {
                return {text: App.Config.week[v.day], value: v.day}
            })

            days.unshift({value: undefined})

            //

            self.avaiableDays.set(days)


        })


        Tracker.autorun(function () {
            App.info = App.info || DB.App.findOne()
            if (!App.info) return;

            var currentDay = self.currentDay.get();

            var level = self.currentLevel.get()

            let classes = DB.Classes.find({
                sessionId: App.info.sessionRegister, // session level day
                levels: level,
                day: currentDay,
                _id:{$ne: self.classId.get()}
            }).fetch()

            let times = classes.map(function (v, n) {
                return {
                    text: App.num2time(v.startTime) + "-" + App.num2time(v.endTime),
                    value: v.startTime
                }
            })

            //add an empty value to prevent browser init select value  use the first item
            times.unshift({value: undefined})

            self.avaiableTimes.set(times)

            //初始化time
            //if (times.length) {
            //    self.currentTime.set(times[0].value)
            //}

        });


        Tracker.autorun(function () {
            App.info = App.info || DB.App.findOne()
            if (!App.info) return;

            let time = self.currentTime.get()

            let level = self.currentLevel.get()
            let day = self.currentDay.get()


            let theClass = DB.Classes.findOne({
                sessionId: App.info.sessionRegister, // session level day
                levels: level,
                day: day,
                startTime: time
            })

            if (theClass) {
                self.currentClass.set(theClass)
            }

        });


    })


})