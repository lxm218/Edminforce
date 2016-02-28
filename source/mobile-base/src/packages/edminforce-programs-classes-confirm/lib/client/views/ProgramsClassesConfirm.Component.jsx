let _ = lodash;

// Don't forget to change `SomeName` to correct name
EdminForce.Components.ProgramsClassesConfirm = class extends RC.CSSMeteorData {

    constructor(p) {
        super(p)
        this.state = {
            msg: null
        }
    }

    getMeteorData() {

        let classID = FlowRouter.getParam("classID");
        let timestamp = FlowRouter.getParam("timestamp");

        let classByClassIDHandler;

        Tracker.autorun(function () {
            classByClassIDHandler = Meteor.subscribe('EF-Class-By-ClassID', classID);
        });

        let classInfo = EdminForce.Collections.class.find({
            _id: classID
        }).fetch();

        let students = EdminForce.Collections.student.find({
            accountID: Meteor.userId()
        }).fetch();

        classInfo = classInfo && classInfo[0] || {};

        let programRegisterStudents = EdminForce.Collections.classStudent.find({
            accountID: Meteor.userId(),
            programID: classInfo.programID,
            type: "trial"
        }).fetch();

        let canRegisterStudents = [];

        for (let i = 0; i < students.length; i++) {
            let find = false;
            for (let j = 0; j < programRegisterStudents.length; j++) {
                if (students[i]._id == programRegisterStudents[j].studentID) {        // find it
                    find = true;
                    break;
                }
            }
            if (!find) {
                canRegisterStudents.push(students[i]);
            }
        }

        let programSub = Meteor.subscribe('EF-Program');
        let program = EdminForce.Collections.program.find({_id:classInfo.programID}).fetch();
        program = program && program.length > 0 ? program[0] : {};

            //console.log(programRegisterStudents);
        //
        //console.log(canRegisterStudents);

        return {
            program,
            classInfo: classInfo,
            students: canRegisterStudents,
            isReady: classByClassIDHandler.ready() && programSub.ready()
        };
    }

    confirm() {


        let selectedStudents = _.toArray(this.selectedStudents);

        console.log(selectedStudents);

        if (selectedStudents.length === 0) {
            alert("Please at least select one students!");
            return;
        }

        let timestamp = FlowRouter.getParam("timestamp") * 1;

        var insertData = [];
        for (let i = 0; i < selectedStudents.length; i++) {
            var data = {
                accountID: Meteor.userId(),
                classID: this.data.classInfo._id,
                studentID: selectedStudents[i]._id,
                programID: this.data.classInfo.programID,
                lessonDate: new Date(timestamp),
                status: "checkouted",
                type: "trial",
                createTime: new Date()
            };

            insertData.push(data);
        }

        let self = this;

        var moreIds = EdminForce.Collections.classStudent.batchInsert(insertData, function (err, res) {
            //called with err or res where res is array of created _id values

            if (err) {
                alert("Insert Fail!");
            } else {
                let params = {
                    programId: self.data.classInfo.programID,
                    classId: self.data.classInfo._id,
                    timestamp: timestamp
                };
                let path = FlowRouter.path("/programs/:programId/:classId/:timestamp/summary", params);
                FlowRouter.go(path);
            }
        });
    }

    selectStudent(student) {
        this.selectedStudents || (this.selectedStudents = {});
        if (this.selectedStudents[student._id]) {
            delete this.selectedStudents[student._id];
        } else {
            this.selectedStudents[student._id] = student;
        }

        //console.log(this.selectedStudents);
    }

    addStudent() {
        console.log(FlowRouter.getParam("programID"));
        console.log(FlowRouter.getParam("classID"));
        console.log(FlowRouter.getParam("timestamp"));
        Session.set("BookTrialTimestamp", FlowRouter.getParam("timestamp"));
        Session.set("BookTrialClassId", FlowRouter.getParam("classID"));
        Session.set("BookTrialProgramId", FlowRouter.getParam("programID"));
        FlowRouter.go('/account/addstudent');
    }

    render() {
        let timestamp = FlowRouter.getParam("timestamp") * 1;
        let self = this;

        let studentItems = this.data.students.map( (item, index) =>
            <RC.Checkbox key={item._id} label={item.name} style={index === this.data.students.length-1 ? {borderBottom:'none'}:null} onClick={self.selectStudent.bind(self, item)}/> );
        if (this.data.students.length === 0) {
            studentItems.push(
                <RC.Button bgColor="brand2" key='_add_button_' theme="inline" onClick={this.addStudent}>
                    <$translate label="addStudent"/>
                </RC.Button>
            );
        }

        // Fill with your UI
        return (
            <RC.Div style={{padding:"10px"}}>
                <RC.Loading isReady={this.data.isReady}>
                    <RC.VerticalAlign center={true} className="padding" height="300px">
                        <h2>
                            {TAPi18n.__("bookSummary")}
                        </h2>
                    </RC.VerticalAlign>
                    <RC.List>
                        <RC.Item title={TAPi18n.__("student")}>
                            {studentItems}
                        </RC.Item>
                        <RC.Item title={TAPi18n.__("className")}>
                            {this.data.program.name}
                        </RC.Item>
                        <RC.Item title={TAPi18n.__("date")}>
                            {moment(new Date(timestamp)).format("dddd, MMMM Do YYYY, h:mm a")}
                        </RC.Item>
                        
                    </RC.List>
                    <RC.Button bgColor="brand2" onClick={self.confirm.bind(self)}>
                        <$translate label="confirm"/>
                    </RC.Button>
                </RC.Loading>
            </RC.Div>
        );
    }
};
