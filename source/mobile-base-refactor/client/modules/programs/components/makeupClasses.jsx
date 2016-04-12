let _ = lodash;
EdminForce.Components.MakeupClasses = class extends RC.CSS {
    constructor(p) {
        super(p);
        this.state = {
            selectedDay: null,
            selectedLesson: null
        };

        this.onSelectDay = this.onSelectDay.bind(this);
        this.makeupClass = this.makeupClass.bind(this);
    }

    onSelectDay(day) {
        this.setState({
            selectedDay: day
        })
    }

    onSelectLesson(classData) {
        this.setState({
            selectedLesson: classData
        })
    }

    makeupClass() {
    }

    renderClasses() {
        if (this.props.classes.length == 0)
            return (
                <RC.Div><p style={{textAlign:"center", padding: 0, paddingBottom: 8, paddingTop: 8}}>No class available
                    for make up</p></RC.Div>
            )

        let lesseonsFilteredByDay = this.props.classes;
        if (this.state.selectedDay) {
            lesseonsFilteredByDay = _.filter(this.props.classes, (item) => {
                return item.schedule && item.schedule.day.toLowerCase() == this.state.selectedDay.toLowerCase();
            });
            // if (lesseonsFilteredByDay.length == 0)
            //     return (
            //         <RC.Div><p style={{textAlign:"center", padding: 0, paddingBottom: 8, paddingTop: 8}}>No class
            //             available on selected day</p></RC.Div>
            //     )
        }

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

        if (!this.selectedLesson) {
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
                    <h3 style={{"textAlign": "center"}}>Make up Class</h3>
                    <div className="students-detail-make-up">
                        <div className="make-up-step-1" style={{display: "block"}}>
                            <div>
                                <p style={{marginLeft: "20px"}}>Select Day:</p>
                                <EdminForce.Components.WeekDaySelector onSelectDay={this.onSelectDay}/>
                            </div>
                            { this.renderClasses() }
                            <div style={{margin:"0 20px"}}>
                                <RC.Button {... attributes} style={processButtonStyle} bgColor="brand2"
                                                            bgColorHover="dark"
                                                            onClick={this.makeupClass}>Continue</RC.Button>
                            </div>
                        </div>
                    </div>
                </RC.Div>
            </RC.Div>
        );
    }
}
