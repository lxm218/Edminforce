{

    const schemaConst = {
        day: ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'],
        weekDay:{
            "mon": 1,
            "tues": 2,
            "wed": 3,
            "thu": 4,
            "fri": 5,
            "sat": 6,
            "sun": 7
        },
        tuitionType: ['each', 'total'],
        status: ['Active', 'Inactive'],
        level: ['Beginner', 'Intermediate', 'Advanced'],
        genderRequire: ['All', 'Male', 'Female'],
        //length : ['30 min', '45 min', '1 hr', '1.5 hr', '2 hr']

        registrationStatus: ['trial', 'register', 'wait', 'makeup']
    };

    EdminForce.Components.ProgramsClasses = class extends RC.CSSMeteorData {

        getMeteorData() {
            let programID = FlowRouter.getParam("programID");
            let classProgramIDHandler;
            Tracker.autorun(function () {
                classProgramIDHandler = Meteor.subscribe('EF-Class-programID', programID);
            });


            return {
                classes: this.getAvailableTrialClasses(),
                isReady: classProgramIDHandler.ready()
            }
        }

        getAvailableTrialClasses() {

            let displayWeekNumber = 2;

            let classes = EdminForce.Collections.class.find({}, {
                sort: {
                    createTime: 1
                }
            }).fetch();

            let sessions = EdminForce.Collections.session.find({}, {
                sort: {
                    startDate: 1
                }
            }).fetch();

            let classStudent = EdminForce.Collections.classStudent.find({}, {
                sort: {
                    lessonDate: 1
                }
            }).fetch();

            let today = new Date();

            let availableClasses = [];

            for (let i = 0; i < classes.length; i++) {
                //if(classes.max)
                let item = classes[i];

                // Following condition, skip this class
                // 1. class's status isn't Active
                //console.log(item.status);
                //console.log(schemaConst.status[0]);

                if(lodash.lowerCase(item.status)!== lodash.lowerCase(schemaConst.status[0])){
                    continue;
                }

                // get regular register students number
                let regularRegisterStudents = EdminForce.Collections.classStudent.find({
                    classID: item._id,
                    status: schemaConst.registrationStatus[1]       // register
                }, {
                    sort: {
                        lessonDate: 1
                    }
                }).fetch() || [];

                // Get the student who register
                let trialRegisterStudents = EdminForce.Collections.classStudent.find({
                    classID: item._id,
                    status: schemaConst.registrationStatus[0]       // trial

                }, {
                    sort: {
                        lessonDate: 1
                    }
                }).fetch() || [];

                // school didn't set the trial student number
                if(item.trialStudent == 0){
                    // Class not full, trial is avaiable
                    if(item.maxStudent > regularRegisterStudents.length){

                        let classSession = EdminForce.Collections.session.find({
                            _id: item.sessionID
                        }, {
                            sort: {
                                startDate: 1
                            }
                        }).fetch() || [];

                        classSession = classSession[0];

                        if(!classSession){
                            console.error("Didn't find session information");
                            continue;
                        }

                        console.log(item);
                        console.log(classSession);

                        // which week day this class has in every week
                        let classWeekDay = item.schedule.day;
                        // The time of this class
                        let classTime = item.schedule.time;

                        classWeekDay = schemaConst.weekDay[lodash.lowerCase(item.schedule.day)];

                        // the week day of today
                        let todayWeekDay = today.getDay();

                        // next class date
                        let classDate = null;
                        if(todayWeekDay>classWeekDay){
                            classDate = moment(today).add(7-todayWeekDay+classWeekDay, 'days').toDate();
                        }else if(todayWeekDay<classWeekDay){
                            classDate = moment(today).add(classWeekDay-todayWeekDay, 'days').toDate();
                        }else{
                            classDate = moment(today).toDate();
                        }

                        for(let j = 0; j< displayWeekNumber; j++){
                            // first clone it
                            //let lesson = lodash.cloneDeep(item);

                            //lesson.lessonDate =
                        }

                    }else if(item.maxStudent == regularRegisterStudents.length){         // class full, trial isn't avaiable

                    }else{
                        console.error("[Error]Something wrong, max student shouldn't less than registered student number");
                    }
                }else if(item.trialStudent>0){  // school set the trial number


                }else{
                    console.error("[Error]Something wrong, trial student should less than 0");
                }
            }

            return classes;
        }

        bookClass(item) {

            let programID = FlowRouter.getParam("programID");

            // user login
            if (Meteor.user()) {
                //TODO if currently user not student, jump to add student page, after add successful then jump to confirm page
                console.log("User logged");

                let params = {
                    programId: programID,
                    classId: item._id
                }
                let path = FlowRouter.path("/programs/:programId/:classId/confirm", params);
                FlowRouter.go(path);

            } else {  // user not login
                console.log("User not logged");
                FlowRouter.go('/login');
                Session.set("BookTrialClassId", item._id);
                Session.set("BookTrialProgramId", programID);
            }
        }

        render() {
            let self = this;
            // Fill with your UI
            return (
                <div>
                    <RC.List>
                        <RC.Loading isReady={this.data.isReady}>
                            {
                                this.data.classes.map(function (item) {
                                    return (
                                        <RC.Item key={item._id} theme="divider"
                                                 onClick={self.bookClass.bind(self, item)}>
                                            <h3>{item.name}</h3>

                                            <p>Day: {item.schedule.day}, Time: {item.schedule.time},
                                                Length: {item.length}</p>
                                        </RC.Item>
                                    )
                                })
                            }
                        </RC.Loading>
                    </RC.List>
                </div>
            );
        }
    };

}