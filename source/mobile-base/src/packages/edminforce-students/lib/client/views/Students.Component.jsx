{
    let _=lodash;
    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.Students = class extends RC.CSSMeteorData {

        constructor(p) {
            super(p);
        }

        getMeteorData() {
            let handler = null;
            let ready = false;

            Tracker.autorun(function () {
                handler = Meteor.subscribe("EF-Students");
            }.bind(this));

            let classStudents = EdminForce.Collections.classStudent.find({
                accountID: Meteor.userId()
            }).fetch();

            // get current user's students
            let students = EdminForce.Collections.student.find({
                accountID: Meteor.userId()
            }).fetch();

            // get all classes
            let classes = EdminForce.Collections.class.find({}).fetch();

            let bookedClasses = [];

            for(let i = 0; i<classStudents.length; i++){
                let item = {};
                let classStudent = classStudents[i];
                let classID = classStudent.classID;
                let studentID = classStudent.studentID;

                let index = _.findIndex(classes, function(item){
                    return item["_id"] == classID;
                });

                let classData = classes[index];

                console.log("classData: ", classData);

                index = _.findIndex(students, function(item){
                    return item["_id"] == studentID;
                });

                let student = students[index];

                console.log("student: ", student);
            }

            return {
                isReady: handler.ready()
            }
        }

        selectStudent() {
            let params = {
                studentId: "111"
            };
            let path = FlowRouter.path("/students/:studentId", params);
            FlowRouter.go(path);
        }

        render() {

            // Fill with your UI
            return (
                <RC.Div>
                    <h3>Students</h3>
                    <RC.Loading isReady={this.data.isReady}>
                        <RC.List>
                            <RC.Item theme="divider" onClick={this.selectStudent}>Student1</RC.Item>
                            <RC.Item theme="divider" onClick={this.selectStudent}>Student2</RC.Item>
                            <RC.Item theme="divider" onClick={this.selectStudent}>Student3</RC.Item>
                        </RC.List>
                    </RC.Loading>
                </RC.Div>
            );
        }
    };

}