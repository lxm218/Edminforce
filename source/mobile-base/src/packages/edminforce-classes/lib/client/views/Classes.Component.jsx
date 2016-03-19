{

    let _ = lodash;

    let {
        Table,
        TableHeaderColumn,
        TableRow,
        TableHeader,
        TableRowColumn,
        TableBody
        }=MUI;

    injectTapEventPlugin();

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.Classes = class extends RC.CSS {

        constructor(p) {
            super(p);

            this.selectedClasses = [];

            this.selectedClassStyle = { backgroundColor: "#e0e0e0" }

            this.state = {
                styles: [],
                weekDay: null,

                studentID: null,
                programID: null,
                sessionID: null,

                classes : [],
                programs : [],
                students : [],
                sessions : [],

                isReady : false
            };

            this.routeChange = false;
        }

        shouldComponentUpdate() {
            return !this.routeChange;
        }

        onReceiveData(err, result) {
            if (err) {
                return;
            }
            result.classes = result.classes || [];
            let newState = _.pick(result, ['sessions','classes','students','programs','firstRegistrationWeekSession','firstRegistrationWeekAlert','studentID','programID','sessionID']);

            this.setCollectionLabelAndValue(newState.programs);
            this.setCollectionLabelAndValue(newState.sessions);
            this.setCollectionLabelAndValue(newState.students);

            newState.isReady = true;

            this.setState(newState);
        }

        setCollectionLabelAndValue(col) {
            if (!col) return;
            _.forEach(col, (c) => {
                c.value = c._id;
                c.label = c.name;
            })
        }

        componentDidMount() {
            super.componentDidMount();
            Meteor.call("getRegistrationData", true, this.studentID, this.programID, this.sessionID, this.onReceiveData.bind(this));
        }

        onSelectStudent(event) {
            this.selectedClasses = [];
            Meteor.call("getRegistrationData", false, event.target.value, this.state.programID, this.state.sessionID, this.onReceiveData.bind(this));
            this.setState({
                isReady: false,
                studentID:event.target.value
            })
        }

        onSelectProgram(event) {
            this.selectedClasses = [];
            Meteor.call("getRegistrationData", false, this.state.studentID, event.target.value, this.state.sessionID, this.onReceiveData.bind(this));
            this.setState({
                isReady: false,
                programID:event.target.value
            })
        }

        onSelectSession(event) {
            this.selectedClasses = [];
            Meteor.call("getRegistrationData", false, this.state.studentID, this.state.programID, event.target.value, this.onReceiveData.bind(this));
            this.setState({
                isReady: false,
                sessionID: event.target.value
            })
        }

        onTableRowSelection(selectedRowIndice) {
            this.selectedClasses = selectedRowIndice.map( (idx) => this.classes[idx] );
        }


        onSelectDay(day) {
            this.selectedClasses = [];
            this.setState({
                weekDay: day
            })
        }

        book() {

            // you must select a class
            if (this.selectedClasses.length == 0) {
                alert("Sorry, no class available in this program.");
                return;
            }

            this.routeChange = true;

            let insertData = this.selectedClasses.map( (c) => ({
                accountID: Meteor.userId(),
                classID: c["_id"],
                programID: c.programID,
                studentID: this.studentID,
                status: "pending",
                type: 'register'
            }));

            // first insert it to classStudent cart
            EdminForce.Collections.classStudent.batchInsert(insertData, function (err, res) {
                if (err) {
                    alert("Insert Fail!");
                } else {

                    let params = {
                        cartId: res.join()
                    };

                    let path = FlowRouter.path("/carts/detail/:cartId", params);
                    FlowRouter.go(path);

                }
            }.bind(this));
        }

        render() {
            let session = TAPi18n.__("ef_classes_" + moment().quarter().toString());
            let year = moment().year();
            let title = TAPi18n.__("ef_classes_title", {"session": session, "year": year});

            let self = this;
            let classTable;

            let classes = this.state.classes;
            if (!this.state.firstRegistrationWeekSession && this.state.weekDay) {
                classes = _.filter(classes, (c) => c.schedule.day == this.state.weekDay );
            }

            if (classes.length > 0) {
                //selected by default
                this.state.firstRegistrationWeekSession && (this.selectedClasses = classes);
                let classItems = classes.map(function (item, index) {
                    return (
                        <TableRow key={item._id} selected={!!_.find(self.selectedClasses, {_id:item._id})}>
                            <TableRowColumn style={{width: "100%", whiteSpace:"normal"}}>
                                <h3>{item.name}</h3>
                                <p><strong>Teacher:</strong> {item.teacher}</p>
                                <p><strong>Length:</strong> {item.length}</p>
                            </TableRowColumn>
                        </TableRow>
                    )
                });

                classTable = (
                    <Table selectable={true} multiSelectable={true} onRowSelection={self.onTableRowSelection.bind(self)} key="classTbl">
                        <TableHeader displaySelectAll={false} enableSelectAll={false}
                            style={{display:"none"}}>
                            <TableRow>
                                <TableHeaderColumn>Class</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={true} deselectOnClickaway={false}>
                            {classItems}
                        </TableBody>
                    </Table>
                )
            }
            else {
                if (this.state.firstRegistrationWeekAlert)
                    classTable = (
                        <RC.Div style={{"padding": "20px"}} key="priorityAlert">
                            <p><b>The first week registration only opens to current students to renew the same classes they're currently taking. Please come back next week for registration.</b></p>
                        </RC.Div>
                    )
                else
                    classTable = (
                        <RC.Div style={{"padding": "20px"}} key="noClssMsg">
                            <p><b>No class found for your selection.</b></p>
                        </RC.Div>
                    )
            }

            let renderBodyElements = [];

            if (this.state.firstRegistrationWeekSession) {
                classes.length > 0 && renderBodyElements.push(
                    (<RC.Div style={{"padding": "20px"}} key="renewMsg"><p>You're renewing the following classes:</p></RC.Div>)
                );

                renderBodyElements.push(classTable);

                renderBodyElements.push(
                    (<RC.Button bgColor="brand2" bgColorHover="dark" isActive={false} onClick={self.book.bind(self)} key="bookBtn">Confirm</RC.Button>)
                );
            }
            else {
                // program selection is only available in regular registration
                renderBodyElements.push((
                    <RC.Select options={this.state.programs} value={this.state.programID}
                        label={TAPi18n.__("ef_classes_program")} labelColor="brand1"
                        onChange={this.onSelectProgram.bind(this)} key="programList"/>
                ));

                // week day filter
                renderBodyElements.push(
                    (<RC.Div key="dayFilter">
                        <span style={{marginLeft: "6",color:"#0082ec"}}>Select Day:</span>
                        <div style={{textAlign:"center"}}>
                            <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                                onClick={this.onSelectDay.bind(this, "Mon")}>Mon</RC.Button>
                            <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                                onClick={this.onSelectDay.bind(this, "Tue")}>Tue</RC.Button>
                            <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                                onClick={this.onSelectDay.bind(this, "Wed")}>Wed</RC.Button>
                            <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                                onClick={this.onSelectDay.bind(this, "Thu")}>Thu</RC.Button>
                            <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                                onClick={this.onSelectDay.bind(this, "Fri")}>Fri</RC.Button>
                            <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                                onClick={this.onSelectDay.bind(this, "Sat")}>Sat</RC.Button>
                            <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                                onClick={this.onSelectDay.bind(this, "Sun")}>Sun</RC.Button>
                        </div>
                    </RC.Div>)
                );

                renderBodyElements.push(classTable);

                renderBodyElements.push(
                    (<RC.Button bgColor="brand2" bgColorHover="dark" isActive={false} onClick={self.book.bind(self)} key="bookBtn">{TAPi18n.__("ef_classes_book")}</RC.Button>)
                );
            }

            return (
                <RC.Div style={{"padding": "20px"}}>
                    <RC.Loading isReady={this.state.isReady}>
                        <RC.VerticalAlign center={true} className="padding" height="300px" key="title">
                            <h2>{title}</h2>
                        </RC.VerticalAlign>
                        <RC.Select options={this.state.students} value={this.state.studentID} key="studentList"
                            label={TAPi18n.__("ef_classes_students")} labelColor="brand1"
                            onChange={this.onSelectStudent.bind(this)}/>
                        <RC.Select options={this.state.sessions} value={this.state.sessionID} key="sessionList"
                            label="Session" labelColor="brand1"
                            onChange={this.onSelectSession.bind(this)}/>
                        {renderBodyElements}
                    </RC.Loading>
                </RC.Div>
            );
        }
    };
}
