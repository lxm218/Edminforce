let _ = lodash;
EdminForce.Components.MakeupClasses = class extends RC.CSS {
    constructor(p) {
        super(p);
        this.state = {
        };

        this.onSelectDay = this.onSelectDay.bind(this);
    }

    onSelectDay(day) {
        day = moment(day).startOf('d');
        if (!this.props.makeupDate || day.diff(this.props.makeupDate,'d') != 0) {
            this.props.context.LocalState.set('makeupDate', day.toDate());
        }
    }

    onSelectLesson(classData) {
        let path = FlowRouter.path(`/${EdminForce.sid}/makeupClassSummary`, null, {
            studentID: this.props.studentID,
            classID: classData._id,
            studentName: this.props.studentName,
            lessonDate: classData.lessonDate.getTime(),
            makeupFee: classData.makeupClassFee
        })
        FlowRouter.go(path);
    }

    renderClasses() {
        if (this.props.classes.length == 0)
            return this.props.makeupDate ? (
                <RC.Div><p style={{textAlign:"center", padding: 0, paddingBottom: 8, paddingTop: 8}}>No class available for make-ups.<br/> Please select a different date.</p></RC.Div>
            ) : null;

        let lessons = (this.props.classes || []).map(function (item, index) {
            return (
                <RC.Item key={item.key} theme="divider"
                         onClick={this.onSelectLesson.bind(this, item)}>
                    <h3>{item.name}</h3>
                    <p>Day: {moment(item.lessonDate).format("MMMM Do YYYY")}</p>
                    <p>Teacher: {item.teacher}</p>
                </RC.Item>
            )
        }.bind(this))

        return lessons;
    }

    render() {
        let attributes = {};
        processButtonStyle = {
            backgroundColor: "gray",
            cursor: "not-allowed"
        };
        attributes.disabled = "disabled";

        let lessonElementsEmpty=<p style={{textAlign:'center',marginTop:'1rem'}}>
            No class available on this date.<br/>
            Please select a different date.
        </p>

        return (
            <RC.Div>
                <RC.Div style={{borderBottom:"1px solid #e0e0e0", paddingBottom:8}}>
                    {this.props.title?this.props.title : <h3 style={{"textAlign": "center"}}>Make up Class</h3>}
                    <div className="students-detail-make-up">
                        <div className="make-up-step-1" style={{display: "block"}}>
                            <div>
                              <EdminForce.Components.DateSelector onSelectDate={this.onSelectDay} minDate={new Date()} initDate={this.props.makeupDate} />
                            </div>
                            { this.renderClasses() }
                        </div>
                    </div>
                </RC.Div>
            </RC.Div>
        );
    }
}
