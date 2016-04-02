let _ = lodash;
let {
    RadioButton,
    RadioButtonGroup
} = MUI;

EdminForce.Components.BookTrial = class extends RC.CSS {

    constructor(p) {
        super(p)
        this.state = {
            msg: null
        }

        this.classDateTime = parseInt(FlowRouter.getQueryParam("timestamp"));
        this.classDateTime = new Date(this.classDateTime);
        this.selectedStudent = null;

        this.registration = this.registration.bind(this);
        this.confirm = this.confirm.bind(this);
        this.selectStudent = this.selectStudent.bind(this);
        this.addStudent = this.addStudent.bind(this);
    }

    confirm() {
        if (!this.selectedStudent) {
            alert("Please select a student.");
            return;
        }

        let {
            classItem
        } = this.props.trialStudents;

        this.props.actions.bookTrial(this.selectedStudent._id, classItem, this.classDateTime);

        // var insertData = [];
        // for (let i = 0; i < selectedStudents.length; i++) {
        //     var data = {
        //         accountID: Meteor.userId(),
        //         classID: this.data.classInfo._id,
        //         studentID: selectedStudents[i]._id,
        //         programID: this.data.classInfo.programID,
        //         lessonDate: new Date(timestamp),
        //         status: "checkouted",
        //         type: "trial",
        //         createTime: new Date()
        //     };
        //
        //     insertData.push(data);
        // }
        //
        // var emailData = this.getAllClasses(insertData)
        // var html = this.getPaymentConfirmEmailTemplate(emailData)
        //
        // let self = this;
        //
        // var moreIds = EdminForce.Collections.classStudent.batchInsert(insertData, function (err, res) {
        //     //called with err or res where res is array of created _id values
        //
        //     if (err) {
        //         alert("Insert Fail!");
        //     } else {
        //         let params = {
        //             programId: self.data.classInfo.programID,
        //             classId: self.data.classInfo._id,
        //             timestamp: timestamp
        //         };
        //         Meteor.call('sendEmailHtml',
        //             Meteor.user().emails[0].address,
        //             'Trial Class Booking Confirmation',
        //             html,
        //             function (error, result) {
        //                 if (!!error) {
        //                     console.log(error)
        //                 }
        //                 if (!!result) {
        //                     console.log(result)
        //                 }
        //             });
        //         let path = FlowRouter.path("/programs/:programId/:classId/:timestamp/summary", params);
        //         FlowRouter.go(path);
        //     }
        // });
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    getAllClasses(data) {
        var res = {}
        for (var i = 0; i < data.length; i++) {
            var student = EdminForce.Collections.student.find({
                    _id: data[i].studentID
                }, {}
            ).fetch();
            if (res[student[0].name] == undefined) {
                res[student[0].name] = {}
            }
            var doc = res[student[0].name]
            var classes = EdminForce.Collections.class.findOne({
                _id: data[i].classID
            })
            doc[classes.name] = data[i].lessonDate
        }
        return res
    }

    getPaymentConfirmEmailTemplate(data) {
        let school = {
            "name": "CalColor Academy"
        }
        let tpl = [
            '<h4>Hello,</h4>',
            '<p>Thank for booking trial class. The following course is successfully booked.</p>',
            '<table border=\"1\">',
            '<tr>',
            '<td>Name</td>',
            '<td>Class</td>',
            '<td>Date</td>',
            '</tr>'
        ].join('')

        for (var studentName in data) {
            var count = 0
            var l = ""
            var chosenClass = data[studentName]
            for (var name in chosenClass) {
                if (count != 0) {
                    var line = [
                        '<tr>',
                        '<td>', name, '</td>',
                        '<td>', this.formatDate(chosenClass[name]), '</td>',
                        '</tr>',
                    ].join('')
                    l = l + line
                } else {
                    var line = [
                        '<td>', name, '</td>',
                        '<td>', this.formatDate(chosenClass[name]), '</td>',
                        '</tr>',
                    ].join('')
                    l = l + line
                }
                count++
            }
            var fCol = [
                '<tr>',
                '<td rowspan=', count, '>', studentName, '</td>',
            ].join('')
            tpl = tpl + fCol + l
        }

        tpl = tpl + [
                '</table>',
                '<br/><br/>',
                '<b>', school.name, '</b>'
            ].join('')
        return tpl
    }

    registration() {
        FlowRouter.go("/classes");
    }

    selectStudent(event, studentId) {
        this.selectedStudent = _.find(this.props.trialStudents.students, {_id: studentId});
    }

    addStudent() {
        Session.set("BookTrialTimestamp", FlowRouter.getParam("timestamp"));
        Session.set("BookTrialClassId", FlowRouter.getParam("classID"));
        Session.set("BookTrialProgramId", FlowRouter.getParam("programID"));
        FlowRouter.go('/account/addstudent');
    }

    render() {
        let {
            classItem,
            students
        } = this.props.trialStudents;

        let studentItems = students.map((item, index) =>
            <RadioButton value={item._id}
                         key={item._id}
                         label={item.name}
                         style={index === students.length-1 ? {borderBottom:'none'}:null}
            />
        );

        let confirmButton = students.length === 0 ?
            (<RC.Button bgColor="brand2" onClick={this.registration}>Sorry, no trial class is available for your account. Please go to registration directly</RC.Button>) :
            (<RC.Button bgColor="brand2" onClick={this.confirm}>Confirm</RC.Button>);

        return (
            <RC.Div style={{padding:"10px"}}>
                <RC.VerticalAlign center={true} className="padding" height="300px">
                    <h2>Book Confirm</h2>
                </RC.VerticalAlign>
                <RC.List>
                    <RC.Item title="Student">
                        <RadioButtonGroup name="selectStudent" onChange={this.selectStudent}>
                            {studentItems}
                        </RadioButtonGroup>
                        {students.length === 0 ?
                            <RC.Button bgColor="brand2" key='_add_button_' theme="inline"
                                       onClick={this.addStudent}>Add</RC.Button> : null}
                    </RC.Item>
                    <RC.Item title="Class Name">
                        {classItem.name}
                    </RC.Item>
                    <RC.Item title="Date">
                        {moment(this.classDateTime).format("dddd, MMMM Do YYYY, h:mm a")}
                    </RC.Item>
                </RC.List>
                {confirmButton}
            </RC.Div>
        );
    }
};