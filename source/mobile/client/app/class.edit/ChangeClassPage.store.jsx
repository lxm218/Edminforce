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

                debugger

                self.currentDay.set(payload.day)
                break;
            }
            case "ChangeClassPage_TIME_CHANGE":
            {

                debugger
                self.currentTime.set(payload.time)

                break;
            }
            case "ChangeClassPage_CLASS_CONFIRM":
            {

                var href = '/classEdit/ChangeClassBillingPage'

                FlowRouter.go(href);

                break;
            }



        }
    })


    //todo  为autorun 添加 ignore逻辑 优化性能
    Meteor.startup(function () {

        //swimmerId  classId
        Tracker.autorun(function () {

            var swimmerId = self.swimmerId.get()
            var classId = self.classId.get()

            var swimmer = DB.Swimmers.findOne({_id: swimmerId})
            var classDetail = DB.Classes.findOne({_id: classId})

            self.swimmer.set(swimmer)
            self.class.set(classDetail)
            self.currentLevel.set(swimmer && swimmer.level)

        })

        //选择 avaiableDays
        Tracker.autorun(function () {

            var level = self.currentLevel.get()

            let classes = DB.Classes.find({
                sessionId: 'testSession2', //level session
                level: level,
                _id:{$ne: self.classId.get()} //除去当前class
            }).fetch()

            classes = _.uniq(classes, function (item, key, a) {
                return item.day;
            });

            let days = classes.map(function (v, n) {
                return {text: App.Config.week[v.day], value: v.day}
            })

            days.unshift({value: undefined})

            debugger

            self.avaiableDays.set(days)


        })


        Tracker.autorun(function () {

            var currentDay = self.currentDay.get();

            var level = self.currentLevel.get()

            let classes = DB.Classes.find({
                sessionId: 'testSession2', // session level day
                level: level,
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

            let time = self.currentTime.get()

            let level = self.currentLevel.get()
            let day = self.currentDay.get()


            let theClass = DB.Classes.findOne({
                sessionId: 'testSession2', // session level day
                level: level,
                day: day,
                startTime: time
            })

            if (theClass) {
                self.currentClass.set(theClass)
            }

        });


    })


})