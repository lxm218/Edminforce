{

    EdminForce.Components.ProgramsClasses = class extends RC.CSSMeteorData {

        getMeteorData() {
            let programID = FlowRouter.getParam("programID");
            let classProgramIDHandler;
            Tracker.autorun(function () {
                classProgramIDHandler = Meteor.subscribe('EF-Class-programID', programID);
            });

            let classes = EdminForce.Collections.class.find({}, {
                sort: {
                    createTime: -1
                }
            }).fetch();

            //console.log(classes);

            return {
                classes: classes,
                isReady: classProgramIDHandler.ready()
            }
        }

        bookClass(item) {
            // user login
            if (Meteor.user()) {
                //TODO if currently user not student, jump to add student page, after add successful then jump to confirm page
                console.log("User logged");

                let programID = FlowRouter.getParam("programID");

                let params = {
                    programId: programID,
                    classId: item._id
                }
                let path = FlowRouter.path("/programs/:programId/:classId/confirm", params);
                FlowRouter.go(path);

            } else {  // user not login
                console.log("User not logged");
                FlowRouter.go('/login');
                Session.set("BookTrialClassId", "class_11");
                Session.set("BookTrialProgramId", "111");
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
                                        <RC.Item key={item._id} theme="divider" onClick={self.bookClass.bind(self, item)}>
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