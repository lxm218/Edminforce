
KUI.Report_DailyRoster = class extends RC.CSS {
    constructor(p) {
        super(p);

        this.state = {
            loading:false,
            selectedDate: new Date()
        };
        this.data = {};

        this.onDateChange = this.onDateChange.bind(this);
        this.onProgramChange = this.onProgramChange.bind(this);
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

    onDateEdit(e) {
        // nothing, just to get rid of the react js warning about value is set, but missing onChange
    }

    onDateChange(e) {
        let  newDate = e.date;
        this.setState({selectedDate:newDate});
    }

    onProgramChange(e) {
        this.setState({
            selectedProgram: e.target.value
        })
    }

    getDailyRoster() {
        this.setState({loading:true});
        Meteor.call('dailyRoster.getData', moment(this.state.selectedDate).format("YYYYMMDD"),(function(err,result){
            this.data = result;
            
            // sort student names alphabetically, move trial & makeup to the end
            if (this.data.programs && this.data.programs.length > 0) {
                // sort programs by order
                this.data.programs.sort((a,b) => (a.displayOrder > b.displayOrder));

                this.data.programs.forEach( (p) => {
                    p.classes.forEach( (c) => {
                        if (!c.students || c.students.length == 0) return;

                        let regulars = [], makeups = [], trials = [];
                        c.students.forEach( (s) => {
                            if (s.type == 'makeup')
                                makeups.push(s);
                            else if (s.type == 'trial')
                                trials.push(s);
                            else
                                regulars.push(s);
                        })
                        regulars.length > 0 && regulars.sort( (a,b) => (a.name > b.name));
                        makeups.length > 0 && makeups.sort( (a,b) => (a.name > b.name));
                        trials.length > 0 && trials.sort( (a,b) => (a.name > b.name));
                        c.students = [...regulars, ...trials, ...makeups];
                    })
                });
            }

            //this.data.date = moment(this.selectedDate);
            // group by programs
            this.setState({
                loading:false, 
                error: err && err.reason,
                selectedProgram: ''
            });
        }).bind(this))
    }

    // render daily roster as a HTML table
    renderRoster() {
        if (!this.data) return null;
        if (!this.data.programs || !this.data.programs.length)
            return (<div>No data available for the selected date</div>);
        if (this.state.error)
            return (<div>{this.state.error}</div>);

        let programTitleColor = "#1AB394";
        let programPalette = ["#99CC00", "#FF99CC", "#FFFF99", "#F4B084"];

        // group classes in each program by starting hour
        let hours = [];
        let levels = [];
        this.data.programs.forEach( (p) => {
            p.classes.forEach( (c) => {
                c.classTime = moment(c.schedule.time, 'hh:mma');
                // filter by program
                if (this.state.selectedProgram == '' || p._id == this.state.selectedProgram) {
                    if (hours.indexOf(c.classTime.hours()) < 0)
                        hours.push(c.classTime.hours());
                }
            })
        });
        hours.sort((a,b) => (a-b));

        let classGroups = [];
        if (this.state.selectedProgram != '') {
            // filter class by program, group classes by level, show one level in each column
            let program = _.find(this.data.programs, {_id:this.state.selectedProgram});
            if (program) {
                program.classes.forEach( (c) => {
                    let levelName = '', levelOrder = -1;
                    if (c.levels && c.levels.length > 0) {
                        let level = _.find(this.data.levels, {_id: c.levels[0]});
                        if (level) {
                            levelName = level.name;
                            // remove the sub level number.
                            let idxSpace = levelName.lastIndexOf(' ');
                            if (idxSpace > 0) {
                                levelName = levelName.substring(0, idxSpace).trim();
                            }
                            levelOrder = level.order;
                        }
                    }

                    let grp = _.find(classGroups, {id: levelName.toLowerCase()});
                    if (!grp) {
                        grp={
                            id: levelName.toLowerCase(),
                            name: levelName == '' ? 'Level N/A' : levelName,
                            order: levelOrder,
                            classes: []
                        }
                        classGroups.push(grp);
                    }
                    grp.classes.push(c);
                })

                classGroups.sort( (a,b) => (a.order - b.order) );
            }
        }
        else {
            // show all classes, grouped by program, show one program in each column
            classGroups = this.data.programs;
        }

        // calculate column width, the first column is smaller, the rest of the columns are equally sized
        let colWidth = Math.floor(100 / classGroups.length);
        let timeColWidth = 100 - colWidth * classGroups.length;
        while (timeColWidth + classGroups.length < colWidth - 1) {
            colWidth--;
            timeColWidth+=classGroups.length;
        }

        // create table column width elements
        let colWidthElements = [];
        colWidthElements.push(<col key="cw" width={timeColWidth + "%"} />);
        classGroups.forEach( (p,index) => {
            colWidthElements.push(<col key={"cw"+index} width={colWidth + "%"} />);
        })

        // create table rows
        let rows = [];
        // currentHour stores rows from each program for the current hour
        let currentHour = new Array(classGroups.length);
        hours.forEach( (hour) => {
            // max number of rows in all program columns
            let maxRowCount = 0;

            // iterate through all programs, generate table columns for all classes in each program
            classGroups.forEach( (p, index) => {
                // classes from each program, start in the current hour
                let currentHourClasses = _.filter(p.classes, (c) => c.classTime.hours() == hour);

                // generate rows for all classes, and teachers
                currentHour[index] = {rows:[]}
                // sort classes by start time
                if (currentHourClasses.length > 0) {
                    currentHourClasses.sort( (a,b) => (a.classTime.valueOf() - b.classTime.valueOf()));
                    currentHourClasses.forEach( (c) => {
                        currentHour[index].rows.push({"teacher": c.classTime.format("hh:mm A ") + c.teacher + " (" + c.students.length + ")"});
                        currentHour[index].rows = [...currentHour[index].rows,...c.students];
                    })
                }

                if (maxRowCount < currentHour[index].rows.length)
                    maxRowCount = currentHour[index].rows.length;
            });

            // generate table rows
            for (let iRow = 0; iRow < maxRowCount; iRow++) {
                let tdElements = [];
                iRow == 0 && (tdElements.push( <td key={"c"+hour} rowSpan={maxRowCount}>{moment().hours(hour).format("hh:00 A")}</td> ))

                currentHour.forEach( (p, index) => {
                    if (iRow < p.rows.length) {
                        // class name or student name
                        if (p.rows[iRow].teacher) {
                            // show class time and teacher in a "th" style
                            tdElements.push(<th key={"c"+hour+"_" + iRow + "_" + index} style={{textAlign:"center",background:programPalette[index % programPalette.length]}}>
                                <a href="/teachers">{p.rows[iRow].teacher}</a>
                            </th>);
                        }
                        else {
                            let tdContent = p.rows[iRow].name;

                            // show unpaid for pending registration
                            (p.rows[iRow].unpaid) && (tdContent += ' (Unpaid)');

                            if (p.rows[iRow].type == 'trial')
                                tdContent += ' (trial)';
                            else
                            if (p.rows[iRow].type == 'makeup')
                                tdContent += ' (make up)';
                            
                            tdElements.push(<td key={"c"+hour+"_" + iRow + "_" + index}><a href={"/student/" + p.rows[iRow].studentID}>{tdContent}</a></td>);
                        }
                    }
                    else
                    if (iRow == p.rows.length && iRow < maxRowCount) {
                        // merged cell to show empty space
                        tdElements.push(<td key={"c"+hour+"_" + iRow + "_" + index} rowSpan={maxRowCount - iRow}></td>);
                    }
                })

                rows.push(<tr key={"r" + hour + "_" + iRow}>{tdElements}</tr>);
            }
        });

        let titleStyles = [{
            textAlign:"center",
            background: programTitleColor
        }, {
            textAlign:"center"
        }]

        return (
            <table className="table table-bordered table-condensed2" style={{textAlign:"center", fontSize:12}}>
                <colgroup>
                    {colWidthElements}
                </colgroup>
                <thead>
                    <tr>
                        <th></th>
                        {classGroups.map( (p, idx) => (<th key={"h" + idx} style={titleStyles[idx % 2]}>{p.name}</th>) )}
                    </tr>
                    </thead>
                <tbody>{rows}</tbody>
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
            program: {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'selectedProgram',
                label : 'Program'
            },
        };

        return (
            <RC.Div>
                <h3 style={{"textAlign": "left"}}>Daily Roster</h3>
                <RB.Row>
                    <div className="form-horizontal">
                        <RB.Col md={6} mdOffset={0}>
                            <RB.Input type="text" {... p.date} value={moment(this.state.selectedDate).format("MM/DD/YYYY")} onChange={this.onDateEdit}>
                            </RB.Input>
                        </RB.Col>
                        <RB.Col  md={6} mdOffset={0}>
                            <KUI.YesButton onClick={this.getDailyRoster} label="Show"></KUI.YesButton>
                        </RB.Col>
                    </div>
                </RB.Row>
                <RB.Row>
                    <div className="form-horizontal">
                        <RB.Col md={6} mdOffset={0}>
                            <RB.Input type="select" {... p.program} value={this.state.selectedProgram} onChange={this.onProgramChange}>
                                <option key={-1} value="">All</option>
                                {
                                    (this.data.programs || []).map((item, index)=>{
                                        return <option key={index} value={item._id}>{item.name}</option>;
                                    })
                                }
                            </RB.Input>
                        </RB.Col>
                    </div>
                </RB.Row>
                <RC.Div style={{marginTop:20}}>
                    {this.renderRoster()}
                </RC.Div>
            </RC.Div>
        )
    }
}