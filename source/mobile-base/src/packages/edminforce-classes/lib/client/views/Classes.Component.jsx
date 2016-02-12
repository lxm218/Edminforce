{

    let _ = lodash;

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.Classes = class extends RC.CSSMeteorData {

        constructor(p) {
            super(p);

            this.classes = new ReactiveVar(null);
            this.programs = new ReactiveVar(null);
            this.students = new ReactiveVar(null);

            // selected programID
            this.programID = new ReactiveVar(null);

            // selected StudentID
            this.studentID = new ReactiveVar(null);

        }

        getMeteorData() {

            let handler = null;

            //let programID =
            Tracker.autorun(function () {
                handler = Meteor.subscribe("EF-Classes-For-Register");
            });

            this.getPrograms();

            this.getStudents();

            this.getClasses();

            return {
                isReady: handler.ready()
            }
        }

        getPrograms(){
            let programs = EdminForce.Collections.program.find({}).fetch();

            for (let i = 0; i < programs.length; i++) {
                programs[i].value = programs[i]["_id"];
                programs[i].label = programs[i].name;
            }


            this.programs.set(programs);

            // If this.programID didn't selected, default select first one
            if (!this.programID.get()) {
                this.programID.set(programs[0] && programs[0]["_id"]);
            }
        }

        getStudents() {
            console.log("getStudent, time: ", new Date().getTime());
            let students = EdminForce.Collections.student.find({
                accountID: Meteor.userId()
            }).fetch();

            let registeredStudents = EdminForce.Collections.classStudent.find({
                programID: this.programID.get()
            }).fetch();

            let validStudents = [];

            for (let i = 0; i < students.length; i++) {
                let student = students[i];
                let find = false;
                for (let j = 0; j < registeredStudents.length; j++) {
                    // This student already registered this program
                    if (student["_id"] === registerStudents[j].studentID) {
                        find = true;
                        break;
                    }
                }

                // not registered before
                if (!find) {
                    student.value = student["_id"];
                    student.label = student.name;
                    validStudents.push(student);
                }
            }

            if (!this.studentID.get()) {
                this.studentID.set(students[0] && students[0]['_id']);
            }

            this.students.set(validStudents);
        }

        getClasses() {
            let classes = EdminForce.Collections.class.find({
                programID: this.programID.get()
            }).fetch();

            let validClasses = [];

            for (let i = 0; i < classes.length; i++) {
                let item = classes[i];
                // find how many student register for this class
                let registeredStudents = EdminForce.Collections.classStudent.find({
                    classID: item['_id']
                }).fetch();

                // this class is available
                if(item.maxStudent>registeredStudents.length){
                    validClasses.push(item);
                }
            }

            this.classes.set(validClasses);
        }

        book() {
            let params = {
                cartId: "111"
            };
            let path = FlowRouter.path("/classes/:cartId/confirm", params);
            FlowRouter.go(path);
        }

        onSelectStudent(event){
            this.studentID.set(event.target.value);
        }

        onSelectProgram(event){
            this.programID.set(event.target.value);
        }

        render() {

            let session = TAPi18n.__("ef_classes_" + moment().quarter().toString());
            let year = moment().year();
            let title = TAPi18n.__("ef_classes_title", {"session": session, "year": year});

            let self = this;

            return (
                <RC.Div style={{"padding": "20px"}}>
                    <RC.Loading isReady={this.data.isReady}>
                        <RC.VerticalAlign center={true} className="padding" height="300px">
                            <h2>
                                {title}
                            </h2>
                        </RC.VerticalAlign>
                        <RC.Select options={this.students.get()} value={this.studentID}
                                   label={TAPi18n.__("ef_classes_students")} labelColor="brand1" onChange={this.onSelectStudent.bind(this)}/>
                        <RC.Select options={this.programs.get()} value={this.programID}
                                   label={TAPi18n.__("ef_classes_program")} labelColor="brand1" onChange={this.onSelectProgram.bind(this)}/>
                        {
                            this.classes.get().map(function (item) {
                                return (
                                    <RC.Item key={item['_id']} theme="divider"
                                             onClick={self.book.bind(self, item)}>
                                        <h3>{item.name}</h3>

                                        <p> <strong>Day:</strong> {item.schedule.day}</p>
                                        <p> <strong>Time:</strong> {item.schedule.time}</p>
                                        <p> <strong>Length:</strong> {item.length}</p>
                                    </RC.Item>
                                )
                            })
                        }
                        <RC.Button bgColor="brand2" bgColorHover="dark"
                                   onClick={this.book}>{TAPi18n.__("ef_classes_book")}</RC.Button>
                    </RC.Loading>
                </RC.Div>
            );
        }

    };

}