
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

    // render daily roster as a HTML table
    renderRoster() {
        if (!this.data) return null;
        if (!this.data.programs || !this.data.programs.length)
            return (<div>No data available for the selected date</div>);

        // group classes in each program by starting hour
        let hours = [];
        this.data.programs.forEach( (p) => {
            p.classes.forEach( (c) => {
                c.classTime = moment(c.schedule.time, 'hh:mma');
                if (hours.indexOf(c.classTime.hours()) < 0)
                    hours.push(c.classTime.hours());
            })
        });
        hours.sort();

        // calculate column width, the first column is smaller, the rest of the columns are equally sized
        let colWidth = Math.floor(100 / this.data.programs.length);
        let timeColWidth = 100 - colWidth * this.data.programs.length;
        while (timeColWidth + this.data.programs.length < colWidth - 1) {
            colWidth--;
            timeColWidth+=this.data.programs.length;
        }

        // create table column width elements
        let colWidthElements = new Array(this.data.programs.length);
        colWidthElements.fill(<col width={colWidth + "%"} />);
        colWidthElements.unshift(<col width={timeColWidth + "%"} />);

        // create table rows
        let rows = [];
        // currentHour stores rows from each program for the current hour
        let currentHour = new Array[this.data.programs.length];
        currentHour.fill({});
        hours.forEach( (hour) => {
            // max number of rows in all program columns
            let maxRowCount = 0;

            // iterate through all programs, generate table columns for all classes in each program
            this.data.programs.forEach( (p, index) => {
                // classes from each program, start in the current hour
                let currentHourClasses = _.filter(p.classes, (c) => c.classTime.hours() == hour);

                // generate rows for all classes, and teachers
                currentHour[index].rows = [];
                // sort classes by start time
                if (currentHourClasses.length > 0) {
                    currentHourClasses.sort( (a,b) => a.classTime.valueOf() - b.classTime.valueOf());
                    currentHourClasses.forEach( (c) => {
                        currentHour[index].rows.push({"teacher": c.classTime.format("hh:mm ") + c.teacher});
                        currentHour[index].rows.concat(c.students);
                    })
                }

                if (maxRowCount < currentHour[index].rows.length)
                    maxRowCount = currentHour[index].rows.length;
            });

            // generate table rows
            for (let iRow = 0; iRow < maxRowCount; iRow++) {
                let tdElements = [];
                iRow == 0 && (tdElements.push( <td rowSpan={maxRowCount}>{moment().hours(hour).format("hh a")}</td> ))

                currentHour.forEach( (p) => {
                    if (iRow < p.rows.length) {
                        // class name or student name
                        if (p.rows[iRow].teacher) {
                            // show class time and teacher in a "th" style
                            tdElements.push(<th>{p.rows[iRow].teacher}</th>);
                        }
                        else {
                            let tdContent = p.rows[iRow].name;
                            if (p.rows[iRow].type == 'trial')
                                tdContent += ' (trial)';
                            else
                            if (p.rows[iRow].type == 'makeup')
                                tdContent += ' (make up)';

                            tdElements.push(<td>{tdContent}</td>);
                        }
                    }
                    else
                    if (iRow == p.rows.length && iRow < maxRowCount-1) {
                        // merged cell to show empty space
                        tdElements.push(<td rowSpan={maxRowCount - iRow}></td>);
                    }
                })

                rows.push(<tr>{tdElements}</tr>);
            }
        });


        return (
            <table className="table table-bordered table-condensed">
                <colgroup>
                    {colWidthElements}
                </colgroup>
                <tr>
                    <th></th>
                    {
                        this.data.programs.map( (p) => (<th>{p.name}</th>) )
                    }
                </tr>
                {
                    rows
                }
            </table>
        )
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