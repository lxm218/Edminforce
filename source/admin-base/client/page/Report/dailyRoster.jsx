
KUI.Report_DailyRoster = class extends RC.CSS {
    constructor(p) {
        super(p);

        this.state = {
            loading:false,
            selectedDate: new Date()
        };
        this.data = null;

        this.onDateChange = this.onDateChange.bind(this);
        this.getDailyRoster = this.getDailyRoster.bind(this);
    }

    // set up bootstrap datepicker control
    setupDatePicker(){
        let classDateDomNode = this.refs.selectedDate ? this.refs.selectedDate.getInputDOMNode() : null;
        if (classDateDomNode) {
            $(classDateDomNode).datepicker({});
            $(classDateDomNode).bind('hide', this.onDateChange);
        }
    }

    // set up date picker
    componentDidMount() {
        super.componentDidMount && super.componentDidMount();
        this.setupDatePicker()
    }
    componentDidUpdate(prevProps, prevState) {
        super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState);
        this.setupDatePicker();
    }


    onDateChange(e) {
        let  newDate = e.date;
        this.setState({selectedDate:newDate});
    }

    getDailyRoster() {
        this.setState({loading:true});
        Meteor.call('dailyRoster.getData', moment(this.state.selectedDate).format("YYYYMMDD"),(function(err,result){
            this.data = result;
            // group by programs
            this.setState({loading:false});
        }).bind(this))
    }

    renderRoster() {
        if (!this.data) return null;

        let hours = [];
        this.data.programs.forEach( (p) => {
            p.classes.forEach( (c) => {
                c.classTime = moment(c.schedule.time, 'hh:mma');
                if (hours.indexOf(c.classTime.hours()) < 0)
                    hours.push(c.classTime.hours());
                c.classTime = c.classTime.toDate();
            })
        });

        hours.sort();
    }

    render() {
        if (this.state.loading)
            return util.renderLoading();

        let p = {
            date: {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'selectedDate',
                label : 'Date'
            },
        };

        return (
            <RC.Div>
                <h3 style={{"textAlign": "left"}}>Daily Roster</h3>
                <RB.Row>
                    <div className="form-horizontal">
                        <RB.Col md={6} mdOffset={0}>
                            <RB.Input type="text" {... p.date} value={moment(this.state.selectedDate).format("MM/DD/YYYY")}>
                            </RB.Input>
                        </RB.Col>
                        <RB.Col  md={6} mdOffset={0}>
                            <KUI.YesButton onClick={this.getDailyRoster} label="Show"></KUI.YesButton>
                        </RB.Col>
                    </div>
                </RB.Row>
                <RC.Div>
                    {this.renderRoster()}
                </RC.Div>
            </RC.Div>
        )
    }
}