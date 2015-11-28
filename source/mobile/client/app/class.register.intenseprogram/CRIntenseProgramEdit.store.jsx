{
    Dependency.add('classRegister.intenseProgramEdit.store', new function(){
        var self = this;

        var undefinedSelectValueOption = {text:'', value: ''};

        self.passedCartId = new ReactiveVar();
        self.passedSwimmerId = new ReactiveVar();
        self.passedSessionId = new ReactiveVar();
        self.swimmers = new ReactiveVar();
        self.currentSwimmer = new ReactiveVar();
        self.currentIntenseSession = new ReactiveVar();
        self.currentClass = new ReactiveVar();

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
                case "CRIntenseProgramEditStore_Time_Change":{

                    let aClass = message.data;

                    console.log("[info][Selected Time] %o",aClass);

                    self.aClass = self.currentClass.set(aClass);
                    break;
                }
                case "CRIntenseProgramEditStore_CLASS_SELECT":{

                    var currentClass = self.currentClass.get();
                    var swimmer = self.currentSwimmer.get();
                    /*
                     * cartId  确定购物车
                     * swimmerId classId   确定一个item
                     * preferenceNum   确定preference  1，2，3
                     * toClassData     新的class数据  classId？
                     *
                     * */
                    Meteor.call('change_preference_in_cart', {
                        cartId:message.data&&message.data.cartId,
                        swimmerId: message.data&&message.data.swimmerId,
                        classId: message.data&&message.data.classId,
                        preferenceNum:message.data&&message.data.preferenceNum,

                        cartItem:message.data&&message.data.cartItem, //购物项

                        //optimize
                        fromClassId:message.data&&message.data.classId,
                        toClassId:currentClass._id,

                        swimmer:swimmer,
                        classData:currentClass
                    }, function (err, result) {

                        if (err) {
                            console.error(err);
                            return; //todo  prompt
                        }

                        var href="/intense/ready"
                            +"?cartId="+(message.data&&message.data.cartId)
                            +"&swimmerId="+(message.data&&message.data.swimmerId);

                        FlowRouter.go(href);


                    });

                    break;
                }
            }
        });


        Meteor.startup(function(){
            Meteor.subscribe("swimmersByAccountId", Meteor.userId());
            Meteor.subscribe("appInfo");
            Meteor.subscribe("classes");
            Meteor.subscribe("sessions");
            Meteor.subscribe("activeShoppingCart");

            // Get current user's swimmer list
            Tracker.autorun(function(){
                var swimmers = self.getSwimmers().fetch();

                _.each(swimmers, function(swimmer, index){
                    swimmer['text'] = swimmer['name'];
                    swimmer['value'] = swimmer['_id'];
                });

                var id = self.passedSwimmerId.get();
                for(var i=0;i<swimmers.length; i++){
                    if(swimmers[i]['_id'] === id){
                        self.currentSwimmer.set(swimmers[i]);
                    }
                }

                self.swimmers.set(swimmers);
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

                avaiableIntenseSessions.unshift(undefinedSelectValueOption);

                // Set default select
                var id = self.passedSessionId.get();
                for(var i=0;i<avaiableIntenseSessions.length; i++){
                    if(avaiableIntenseSessions[i]['_id'] === id){
                        self.currentIntenseSession.set(avaiableIntenseSessions[i]);
                    }
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