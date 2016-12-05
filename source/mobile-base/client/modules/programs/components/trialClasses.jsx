/*
 * Trial classes
 */
EdminForce.Components.TrialClasses = class extends RC.CSS {

    constructor(p) {
        super(p);
        this.state = {
        }

        this.onSelectDay = this.onSelectDay.bind(this);
        this.isDisable = this.isDisable.bind(this);

    }

    getTrialStudents(classItem) {
        this.props.actions.showTrialEligibleStudents(classItem);
    }

    onSelectDay(e, day, { selected, disabled }) {
        if(disabled) return;

        day = moment(day).startOf('d');
        if (!this.props.trialDate || day.diff(this.props.trialDate,'d') != 0) {
            this.props.context.LocalState.set('trialDate', day.toDate());
        }
    }
    isDisable(day){
      let availableDates = this.props.availableDates
      let dayF = moment(day).tz(EdminForce.Settings.timeZone).format('YYYY-MM-DD')
      return availableDates && availableDates.indexOf(dayF)===-1
    }


    render() {
        let self = this;
        let col = {
            display: "inline-block",
            float: "left",
            width: "50%",
            padding: 0
        };

        let lessons = this.props.classes || [];
        let lessonElements = lessons.map( (item) => (
            <RC.Item key={item.key} theme="divider" onClick={self.getTrialStudents.bind(self, item)}>
                <h3>{item.name}</h3>
                <div>
                    <br/>
                    <p style={col}>Day: {moment(item.lessonDate).format("MMMM Do YYYY")}</p>
                    <p style={col}>Length: {item.length}</p>
                    <br/>
                    <p>Teacher: {item.teacher}</p>
                </div>
            </RC.Item>
        ));

      let lessonElementsEmpty=<p style={{textAlign:'center',marginTop:'1rem'}}>
          No class available on this date.<br/>
          Please select a different date.
      </p>
        
      if (!this.props.trialDate) lessonElementsEmpty = null;

      return (
            <div>
                {EdminForce.utils.renderError(this.props.error)}
                <RC.VerticalAlign center={true} style={{paddingTop:20}} height="100px" key="title">
                    <p className="font_8">Please select the preferred day first and one of classes listed below.</p>
                    <p className="font_8">Only available classes are listed here. If you need to book trial class on a particular date which is not shown here, please call the school.</p>
                    <br></br>
                </RC.VerticalAlign>
              {
                //<EdminForce.Components.DateSelector onSelectDate={this.onSelectDay}  minDate={new Date()} initDate={this.props.trialDate} />
              }

              <RC.DayPickerInput
                date={this.props.trialDate}
                disabledDays={ this.isDisable }
                selectedDays={ day => DayPicker.DateUtils.isSameDay(day, this.props.trialDate) }
                onDayClick={this.onSelectDay}
              />



              <RC.List>
                    {
                      lessons.length ? lessonElements :lessonElementsEmpty
                    }
                </RC.List>
            </div>
        );
    }
};
