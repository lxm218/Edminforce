{

    EdminForce.Components.ProgramsClasses = React.createClass({

        bookClass(){
            // user login
            if(Meteor.user()){
                //TODO if currently user not student, jump to add student page, after add successful then jump to confirm page
                console.log("User logged");

                let params = {
                    programsId: "111",
                    classId: "class_11"
                }
                let path = FlowRouter.path("/programs/:programsId/:classId/confirm", params);
                FlowRouter.go(path);

            }else{  // user not login
                console.log("User not logged");
                FlowRouter.go('/login');
                Session.set("BookTrialClassId", "class_11");
                Session.set("BookTrialProgramId", "111");
            }
        },

        render: function () {

            // Fill with your UI
            return (
                <div>
                    <RC.List>
                        <RC.Item theme="divider" onClick={this.bookClass}>
                            <h3>Beginning Trial Class 1</h3>

                            <p>2/20/2016, 1:00pm-2:00pm</p>
                        </RC.Item>

                        <RC.Item theme="divider" onClick={this.bookClass}>
                            <h3>Beginning Trial Class 2</h3>

                            <p>2/21/2016, 2:00pm-3:00pm</p>
                        </RC.Item>

                        <RC.Item theme="divider" onClick={this.bookClass}>
                            <h3>Beginning Trial Class 3</h3>

                            <p>2/22/2016, 2:00pm-3:00pm</p>
                        </RC.Item>
                    </RC.List>
                </div>
            );
        }
    });

}