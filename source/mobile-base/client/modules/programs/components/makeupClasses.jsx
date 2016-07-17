let _ = lodash;
EdminForce.Components.MakeupClasses = class extends RC.CSS {
    constructor(p) {
        super(p);
        this.state = {
            selectedDay: null,
            selectedLesson: null
        };

        this.onSelectDay = this.onSelectDay.bind(this);
    }

    onSelectDay(day) {
        let newState = {
            selectedDay: day
        }
        if (day != this.state.selectedDay) {
            newState.selectedLesson = null;
        }
        this.setState(newState)
    }

    onSelectLesson(classData) {
        let path = FlowRouter.path('/makeupClassSummary', null, {
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
            return (
                <RC.Div><p style={{textAlign:"center", padding: 0, paddingBottom: 8, paddingTop: 8}}>No class available
                    for make-ups</p></RC.Div>
            )

        let lesseonsFilteredByDay = this.props.classes;
        if (this.state.selectedDay) {
            // lesseonsFilteredByDay = _.filter(this.props.classes, (item) => {
            //     return item.schedule && item.schedule.day.toLowerCase() == this.state.selectedDay.toLowerCase();
            // });

            let lessons = this.props.classes || [];
            lesseonsFilteredByDay = _.filter(lessons,
              (lesson) =>lesson.lessonDate && moment(lesson.lessonDate).format("MM-DD-YYYY") === moment(this.state.selectedDay).format("MM-DD-YYYY")
            )
            // if (lesseonsFilteredByDay.length == 0)
            //     return (
            //         <RC.Div><p style={{textAlign:"center", padding: 0, paddingBottom: 8, paddingTop: 8}}>No class
            //             available on selected day</p></RC.Div>
            //     )
        }

        // sort lessons by week day + lesson date
        EdminForce.utils.sortLessonsByWeekDay(lesseonsFilteredByDay);

        let lessons = lesseonsFilteredByDay.map(function (item, index) {
            let style = this.state.selectedLesson == item ? {
                backgroundColor: "#e0e0e0"
            } : null;
            return (
                <RC.Item key={item.key} theme="divider"
                         onClick={this.onSelectLesson.bind(this, item)} style={style}>
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

        if (!this.state.selectedLesson) {
            processButtonStyle = {
                backgroundColor: "gray",
                cursor: "not-allowed"
            };
            attributes.disabled = "disabled";
        } else {
            processButtonStyle = {
                backgroundColor: "rgb(255, 121, 40)"
            };
        }

        return (
            <RC.Div>
                <RC.Div style={{borderBottom:"1px solid #e0e0e0", paddingBottom:8}}>
                    {this.props.title?this.props.title : <h3 style={{"textAlign": "center"}}>Make up Class</h3>}
                    <div className="students-detail-make-up">
                        <div className="make-up-step-1" style={{display: "block"}}>
                            <div>
                              {
                                //<EdminForce.Components.WeekDaySelector onSelectDay={this.onSelectDay}/>
                              }

                              <EdminForce.Components.DateSelector onSelectDate={this.onSelectDay} />

                            </div>
                            { this.renderClasses() }
                        </div>
                    </div>
                </RC.Div>
            </RC.Div>
        );
    }
}
