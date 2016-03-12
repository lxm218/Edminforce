let _ = lodash;
let {
    RadioButton,
    RadioButtonGroup
    } = MUI;

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

        let classByClassIDHandler = Meteor.subscribe('EF-Class-By-ClassID', classID);

        let classInfo = EdminForce.Collections.class.find({
            _id: classID
        }).fetch();

        let students = EdminForce.Collections.student.find({
            accountID: Meteor.userId()
        }).fetch();

        classInfo = classInfo && classInfo[0] || {};

        let canRegisterStudents = [];

        for (let i = 0; i < students.length; i++) {

            // check if a student already had a trial of the program, or if the student ever registered the class
            let nTrialHistory = EdminForce.Collections.classStudent.find({
                programID: classInfo.programID,
                studentID: students[i]._id,
                type: {$in:['trial','register']},
                status: {$in:['pending', 'checkouting', 'checkouted']}
            }).count();

            if (nTrialHistory > 0) continue;

            canRegisterStudents.push(students[i]);
        }

        let programSub = Meteor.subscribe('EF-Program');
        let program = EdminForce.Collections.program.find({_id: classInfo.programID}).fetch();
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

        var emailData = this.getAllClasses(insertData)
        var html = this.getPaymentConfirmEmailTemplate(emailData)

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
                Meteor.call('sendEmailHtml',
                  Meteor.user().emails[0].address,
                  'Thank for a Booking Trial Class!',
                  html,
                  function (error, result) {
                    if (!!error){
                      console.log(error)
                    }
                    if (!!result){
                      console.log(result)
                    } } );
                let path = FlowRouter.path("/programs/:programId/:classId/:timestamp/summary", params);
                FlowRouter.go(path);
            }
        });
    }




    getAllClasses(data){
      var res = {}
      for (var i = 0; i < data.length; i++) {
        var student = EdminForce.Collections.student.find({
          _id: data[i].studentID
        }, {}
        ).fetch();
        if (res[student[0].name] == undefined){
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

    getPaymentConfirmEmailTemplate(data){
        let school={
          "name" : "CalColor Academy"
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

        for (var studentName in data){
          var count = 0
          var l = ""
          var chosenClass = data[studentName]
          for (var name in chosenClass){
            if(count != 0){
              var line = [
                  '<tr>',
                    '<td>',name,'</td>',
                    '<td>',chosenClass[name],'</td>',
                  '</tr>',
              ].join('')
              l = l + line
            } else {
              var line = [
                    '<td>',name,'</td>',
                    '<td>',chosenClass[name],'</td>',
                  '</tr>',
              ].join('')
              l = l + line
            }
            count ++
          }
          var fCol = [
                '<tr>',
                  '<td rowspan=',count,'>',studentName,'</td>',
            ].join('')
            tpl = tpl + fCol + l
        }

        tpl = tpl + [

            '</table>',

          //  '<h4>See details, please <a href="http://www.classforth.com" target="_blank">Login Your Account</a></h4>',

            '<br/><br/>',
            '<b>',school.name,'</b>'
        ].join('')
         return tpl
    }

    registration() {
        FlowRouter.go("/classes");
    }

    selectStudent(event, studentId) {

        let student = _.find(this.data.students, function(item){
            return item._id = studentId;
        });

        this.selectedStudents || (this.selectedStudents = {});
        if (this.selectedStudents[student._id]) {
            delete this.selectedStudents[student._id];
        } else {
            this.selectedStudents[student._id] = student;
        }

        //console.log(this.selectedStudents);
    }

    addStudent() {
        //console.log(FlowRouter.getParam("programID"));
        //console.log(FlowRouter.getParam("classID"));
        //console.log(FlowRouter.getParam("timestamp"));
        Session.set("BookTrialTimestamp", FlowRouter.getParam("timestamp"));
        Session.set("BookTrialClassId", FlowRouter.getParam("classID"));
        Session.set("BookTrialProgramId", FlowRouter.getParam("programID"));
        FlowRouter.go('/account/addstudent');
    }

    render() {
        let timestamp = FlowRouter.getParam("timestamp") * 1;
        let self = this;
        let studentItems = this.data.students.map((item, index) =>
            <RadioButton value={item._id}
                         key={item._id}
                         label={item.name}
                         style={index === this.data.students.length-1 ? {borderBottom:'none'}:null}
            />
        );
        //if (this.data.students.length === 0) {
        //    studentItems.push(
        //    <RC.Button bgColor="brand2" key='_add_button_' theme="inline" onClick={this.addStudent}>
        //        <$translate label="addStudent"/>
        //    </RC.Button>
        //    );
        //}

        let confirmButton = this.data.students.length === 0 ?
            (<RC.Button bgColor="brand2" onClick={self.registration.bind(self)}>
                <$translate label="registration"/>
            </RC.Button>) :
            (<RC.Button bgColor="brand2" onClick={self.confirm.bind(self)}>
                <$translate label="confirm"/>
            </RC.Button>);

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
                            <RadioButtonGroup name="selectStudent" onChange={this.selectStudent.bind(this)}>
                                {studentItems}
                            </RadioButtonGroup>
                            {this.data.students.length === 0 ?
                                <RC.Button bgColor="brand2" key='_add_button_' theme="inline" onClick={this.addStudent}>
                                    <$translate label="addStudent"/>
                                </RC.Button> : ""}
                        </RC.Item>
                        <RC.Item title={TAPi18n.__("className")}>
                            {this.data.classInfo.name}
                        </RC.Item>
                        <RC.Item title={TAPi18n.__("date")}>
                            {moment(new Date(timestamp)).format("dddd, MMMM Do YYYY, h:mm a")}
                        </RC.Item>

                    </RC.List>
                    {confirmButton}
                </RC.Loading>
            </RC.Div>
        );
    }
};
