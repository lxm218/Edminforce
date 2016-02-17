{
    let _=lodash;
    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.Students = class extends RC.CSSMeteorData {

        constructor(p) {
            super(p);
        }

        getMeteorData() {
            let handler = null;

            Tracker.autorun(function () {
                handler = Meteor.subscribe("EF-Students");
            }.bind(this));

            let classStudents = EdminForce.Collections.classStudent.find({
                accountID: Meteor.userId(),
                type:{
                    $in: ['register', 'wait']
                },
                status:{
                    $in: ["checkouted"]
                }
            }).fetch();

            // get current user's students
            let students = EdminForce.Collections.student.find({
                accountID: Meteor.userId()
            }).fetch();

            // get all classes
            let classes = EdminForce.Collections.class.find({}).fetch();

            let sessions = EdminForce.Collections.session.find({}).fetch();

            let bookClasses = [];

            for(let i = 0; i< classStudents.length; i++){
            //for(let i = 0; i< 0; i++){
                let bookClass = classStudents[i];

                if(!bookClass){
                    continue;
                }

                let classID = bookClass.classID;
                let classData = _.find(classes, function(item){
                    return item["_id"] === classID;
                });

                if(!classData){
                    continue;
                }

                let sessionData = _.find(sessions, function(item){
                    return item["_id"] === classData.sessionID;
                });

                if(!sessionData){
                    continue;
                }

                bookClass.className = classData.name;
                bookClass.classStudentID = bookClass["_id"];

                bookClass = _.merge(bookClass, classData, sessionData);

                let now = new Date();

                // currently time is between session's start and end time
                if(now>=sessionData.startDate&&now<=sessionData.endDate){
                    bookClass.inProgressing = true;
                }else{
                    bookClass.inProgressing = false;
                }

                bookClasses.push(bookClass);
            }

            //console.log(bookClasses);

            let studentLists = [];

            for(let i = 0; i<students.length; i++){
                let student = students[i];
                let studentID = student["_id"];

                let bookClassesThisStudent = _.filter(bookClasses, function(item){
                    return item.studentID = studentID;
                });

                bookClassesThisStudent = _.sortBy(bookClassesThisStudent, function(item){
                    return !item.inProgressing;
                });

                console.log(bookClassesThisStudent);
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