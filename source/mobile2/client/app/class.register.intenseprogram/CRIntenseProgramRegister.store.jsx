{
    Dependency.add('classRegister.intenseProgramRegister.store', new function(){
        var self = this;

        var undefinedSelectValueOption = {text:'', value: ''};

        self.swimmers = new ReactiveVar();
        self.currentSwimmer = new ReactiveVar();
        self.currentIntenseSession = new ReactiveVar();
        self.currentClass = new ReactiveVar();

        self.currentStep = new ReactiveVar(1);

        self.avaiableIntenseSessions = new ReactiveVar();
        self.avaialbeClasses = new ReactiveVar();

        self.selectedClasses = new ReactiveVar(Immutable.Map());

        self.isFirstTime =new ReactiveVar(false);

        // Get the swimmers list
        self.getSwimmers = function () {
            return DB.Swimmers.find({accountId: Meteor.userId()});
        };

        self.getIntenseSessions = function(){
            var intenseSessions = DB.Sessions.find({"programIds":"intense"}).fetch();
            //var intenseSessions = DB.Sessions.find().fetch();
            console.log("-----getIntenseSessions: %o", intenseSessions);
            return intenseSessions;
        };

        Dispatcher.register(function(message){
            switch (message.subject){
                case "CRIntenseProgramRegisterStore_Swimmer_Change":
                {
                    let swimmer = message.data;

                    console.log("[info][Selected Swimmer] %o", swimmer);

                    self.currentSwimmer.set(swimmer);

                    //self.currentIntenseSession.set();

                    break;
                }
                case "CRIntenseProgramRegisterStore_Intense_Change":
                {
                    let intense = message.data;

                    console.log("[info][Selected Intense]%o", intense);

                    self.currentIntenseSession.set(intense);

                    break;
                }
                case "CRIntenseProgramRegisterStore_Time_Change":{

                    let aClass = message.data;

                    console.log("[info][Selected Time] %o",aClass);

                    self.aClass = self.currentClass.set(aClass);
                    break;
                }
                case "CRIntenseProgramRegisterStore_Class_Selected": {
                    if(message.data.currentStep === 1){

                        let currentSwimmer = self.currentSwimmer.get();
                        let currentClass = self.currentClass.get();

                        let isFistTime = self.isFirstTime.get();


                        Meteor.call('add_class_to_cart', {
                            swimmerId: currentSwimmer._id,
                            classId: currentClass._id,
                            quantity: 1,
                            swimmer: currentSwimmer,
                            class1: currentClass,
                            type:'register-paced',  //四种类型的默认类型

                            accountId:Meteor.userId(),

                            //标记购物项是否是第一次注册 用于判断 waiver form
                            isFistTime:isFistTime
                        }, function (err, result) {

                            if (err) {
                                alert(err.error);
                                console.error(err);
                                return; //todo  prompt
                            }

                            //selectedClasses
                            let map = self.selectedClasses.get();
                            map = map.set('swimmer', currentSwimmer);
                            map = map.set('class1', currentClass);
                            self.selectedClasses.set(map);


                            Session.set('CART_ID', result.cartId);

                            console.log('step1', currentSwimmer, currentClass);

                            console.log('CART_ID: ',Session.get('CART_ID'));


                            self.currentStep.set(2);
                        });

                    }else if(message.data.currentStep === 2){
                        let currentClass = self.currentClass.get();

                        let map = self.selectedClasses.get();
                        map = map.set('class2', currentClass);
                        self.selectedClasses.set(map);


                        let swimmer = map.get('swimmer');
                        let class1 = map.get('class1');


                        Meteor.call('add_preference_to_cart', {
                            cartId: Session.get('CART_ID'),

                            preferenceNum: 2,

                            classId: class1._id,
                            swimmerId: swimmer._id,
                            data: currentClass
                        }, function (err) {
                            if (err) {
                                alert(err.error);
                                console.error(err);
                                return; //todo  prompt
                            }

                            console.log('step2', currentClass);

                            self.currentStep.set(3);
                        })
                    }else if(message.data.currentStep === 3){
                        let currentClass = self.currentClass.get();

                        let map = self.selectedClasses.get();
                        map = map.set('class3', currentClass);
                        self.selectedClasses.set(map);


                        let swimmer = map.get('swimmer');
                        let class1 = map.get('class1');


                        Meteor.call('add_preference_to_cart', {
                            cartId: Session.get('CART_ID'),

                            preferenceNum: 3,

                            classId: class1._id,
                            swimmerId: swimmer._id,
                            data: currentClass
                        }, function (err) {
                            if (err) return; //todo  prompt

                            console.log('step3', currentClass);

                            var href="/intense/ready"
                                +"?cartId="+Session.get('CART_ID')
                                +"&swimmerId="+swimmer._id
                                +"&classId="+class1._id;

                            FlowRouter.go(href);
                        })
                    }
                }
            }
        });


        Meteor.startup(function(){
            Meteor.subscribe("swimmersByAccountId", Meteor.userId());
            Meteor.subscribe("appInfo");
            Meteor.subscribe("classes");
            Meteor.subscribe("sessions");

            // Get current user's swimmer list
            Tracker.autorun(function(){
                var swimmers = self.getSwimmers().fetch();

                _.each(swimmers, function(swimmer, index){
                    swimmer['text'] = swimmer['name'];
                    swimmer['value'] = swimmer['_id'];
                });

                swimmers = _.sortBy(swimmers, 'text');

                self.swimmers.set(swimmers);
                if(swimmers.length){
                    self.currentSwimmer.set(swimmers[0]);
                }
            });

            // Get available intense session
            Tracker.autorun(function(){
                var inteseSessions = self.getIntenseSessions();
                var currentDate = new Date().getTime();

                var avaiableIntenseSessions = [];

                _.each(inteseSessions, function(session, index){
                    //console.log("========inteseSession: %o, index: %s", session, index);
                    var startDate = new Date(session.startDate).getTime();
                    var registerStartDate = new Date(session.registerStartDate).getTime()|| 0;

                    // Start Date should be big than today, and today should be big than register start date
                    if(startDate>=currentDate&&currentDate>=registerStartDate){
                        session['text'] = session['name'];
                        session['value'] = session['_id'];
                        avaiableIntenseSessions.push(session);
                    }
                });

                avaiableIntenseSessions = _.sortBy(avaiableIntenseSessions, 'text');

                avaiableIntenseSessions.unshift(undefinedSelectValueOption);

                // Set default select
                if(avaiableIntenseSessions.length){
                    self.currentIntenseSession.set(avaiableIntenseSessions[0]);
                }

                console.log("[Info][avaiableIntenseSessions]: %o", avaiableIntenseSessions);
                self.avaiableIntenseSessions.set(avaiableIntenseSessions);
            });

            // Get available classes based on current select swimmer's level and current select intense session
            Tracker.autorun(function(){
                var currentSwimmer = self.currentSwimmer.get();
                var currentIntenseSession = self.currentIntenseSession.get();
                var level = currentSwimmer&&currentSwimmer.level;
                var intenseSessionId = currentIntenseSession&&currentIntenseSession._id;

                var availableClass = [];

                // if level and intenseSessionId both exist, then query classes
                if(level&&intenseSessionId){
                    availableClass = DB.Classes.find({
                        levels: level,
                        sessionId: intenseSessionId
                    }).fetch();
                }

                _.each(availableClass, function(aClass, index){
                    aClass['text'] = App.num2time(aClass.startTime) + "-" + App.num2time(aClass.endTime);
                    aClass['value'] = aClass['_id'];
                });

                availableClass = _.sortBy(availableClass, 'startTime');

                availableClass.unshift(undefinedSelectValueOption);

                console.log("[info][availableClass][%s]%o", new Date().getTime(), availableClass);

                //if(availableClass.length){
                //    self.currentClass.set(availableClass[0]);
                //}

                self.avaialbeClasses.set(availableClass);

            });


        });


    });
}