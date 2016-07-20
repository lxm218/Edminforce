/*
 * Daily Roster
 * Displays all classes, each with teacher name, level, and all students, for
 * a selected day and selected program or all programs
 */

KUI.Report_DailyRoster = class extends RC.CSS {
    constructor(p) {
        super(p);

        this.queryParams = {
            p : FlowRouter.getQueryParam("p"),
            d : FlowRouter.getQueryParam("d"),
            t : FlowRouter.getQueryParam("t"),
        }
        this.queryParams.d && (this.queryParams.d = moment(this.queryParams.d, 'YYYYMMDD').toDate());

        this.state = {
            loading:false,
            selectedProgram: this.queryParams.p || '',
            selectedTeacher: this.queryParams.t || '',
            programs: [],
            teachers: [],
            selectedDate: this.queryParams.d || new Date()
        };
        this.data = null;

        this.onDateChange = this.onDateChange.bind(this);
        this.onProgramChange = this.onProgramChange.bind(this);
        this.onTeacherChange = this.onTeacherChange.bind(this);
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

    componentDidMount() {
        super.componentDidMount && super.componentDidMount();
        this.setupDatePicker();
        Meteor.call('dailyRoster.getPrograms', (function(err,result){
            result.programs.unshift({_id:'',name:'All'});
            result.teachers.unshift({_id:'',nickName:'All'});
            this.setState({
                programs:result.programs,
                teachers:result.teachers
            })

            if (this.queryParams.d) {
                this.getDailyRoster();
            }
        }).bind(this));
    }
    componentDidUpdate(prevProps, prevState) {
        super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState);
        this.setupDatePicker();
    }

    onDateEdit(e) {
        // nothing, just to get rid of the react js warning about value is set, but missing onChange
    }

    updateQueryParams(p, d, t) {

        p = p || this.state.selectedProgram;
        d = d || moment(this.state.selectedDate).format('YYYYMMDD');
        t = t || this.state.selectedTeacher;

        FlowRouter.withReplaceState(function() {
            FlowRouter.setQueryParams({
                p,
                d,
                t,
            });
        });
    }

    onDateChange(e) {
        let  newDate = e.date;
        this.setState({selectedDate:newDate});

        this.updateQueryParams(null, moment(e.date).format('YYYYMMDD'));
    }

    onProgramChange(e) {
        this.setState({
            selectedProgram: e.target.value
        })

        this.updateQueryParams(e.target.value);
    }

    onTeacherChange(e) {
        this.setState({
            selectedTeacher: e.target.value
        })

        this.updateQueryParams(null,null,e.target.value);
    }

    // Retrieve daily roster data from server.
    // Response has all classes, for selected program and date, grouped by program
    // each class has all students (regular and makeup/trial)
    getDailyRoster() {
        this.setState({loading:true});
        this.updateQueryParams();
        Meteor.call('dailyRoster.getData', moment(this.state.selectedDate).format("YYYYMMDD"),(function(err,result){
            this.data = result;
            
            // sort program by display order, sort student names alphabetically, move trial & makeup to the end
            if (this.data.programs && this.data.programs.length > 0) {
                // sort programs by order
                this.data.programs.sort((a,b) => (a.displayOrder > b.displayOrder));
                // sort students in each class, each program
                this.data.programs.forEach( (p) => {
                    p.classes.forEach( (c) => {
                        // parse class time
                        c.classTime = moment(c.schedule.time, 'hh:mma');

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

            this.setState({
                loading:false, 
                error: err && err.reason
            });
        }).bind(this))
    }

    // Renders daily roster as a HTML table
    // Vertically, classes are grouped by hour, such as 9:00 AM - 10:00AM, 10:00AM - 11:00 AM, etc.
    // Horizontally, each column is a major class level, when filtered by a program, or a program
    // when "All" is selected in program filter.
    // If a class has students from multiple major levels, these major level table cells are merged in
    // a wider column.
    renderRoster() {
        if (!this.data) return null;
        if (!this.data.programs || !this.data.programs.length)
            return (<div>No data available for the selected date</div>);
        if (this.state.error)
            return (<div>{this.state.error}</div>);

        // color palette for columns and class title
        let programTitleColor = "#1AB394";
        let programPalette = ["#99CC00", "#FF99CC", "#FFFF99", "#F4B084"];

        // filter classes by program, teacher
        let classesByProgram = [];
        this.data.programs.forEach( (p) => {
            // filter by program
            if (this.state.selectedProgram != '' && p._id != this.state.selectedProgram)
                return;

            // filter by teacher
            if (this.state.selectedTeacher != '' ) {
                let programFilteredByTeacher = {...p};
                programFilteredByTeacher.classes = p.classes.filter( (c) => c.teacherID == this.state.selectedTeacher);
                programFilteredByTeacher.classes.length > 0 && classesByProgram.push(programFilteredByTeacher)
            }
            else {
                classesByProgram.push(p);
            }
        });

        // find out how many "hours" all classes have, each hour is represented as an integer number
        // in 24 hour format, such as 1 for 1:00AM, 13 for 1:00PM, etc.
        let hours = [];
        classesByProgram.forEach( (p) => {
            p.classes.forEach( (c) => {
                if (hours.indexOf(c.classTime.hours()) < 0)
                    hours.push(c.classTime.hours());
            })
        });

        if  (hours.length == 0) {
            return (<div>No class available for your selection</div>);
        }
        // sort hours
        hours.sort((a,b) => (a-b));

        // horizontal class groups, each class group is displayed in a table column.
        // when filtered by a specific program, each class group is a major class level
        // when not filtered by a program, each class group is a program.
        let classGroups = [];
        if (this.state.selectedProgram != '') {
            // group classes by major class level
            let program = classesByProgram[0];
            if (program) {
                program.classes.forEach( (c) => {
                    // find out how many major levels this class has
                    let majorLevels = [];
                    if (c.levels && c.levels.length > 0) {
                        let classLevels = this.data.levels.filter( (le) => c.levels.indexOf(le._id) >= 0 );
                        classLevels = classLevels.map( (cl) => App.resolveClassLevel(cl));
                        majorLevels = _.uniq(classLevels, (cl) => cl.name);
                        majorLevels.sort( (a,b) => (a.order - b.order));
                    }
                    else {
                        // all classes without level are put in the first column (column header is set to "Level N/A")
                        majorLevels.push({
                            name: '',
                            alias: '',
                            subLevel: 0,
                            order: -1
                        })
                    }

                    // add a class group for each level.
                    // add the class to its group, if the class has students from multiple major levels
                    // merge all major level columns into one.
                    majorLevels.forEach( (majorLevel, index) => {
                        let grp = _.find(classGroups, {id: majorLevel.name.toLowerCase()});
                        if (!grp) {
                            grp={
                                id: majorLevel.name.toLowerCase(),
                                name: majorLevel.name == '' ? 'Level N/A' : majorLevel.name,
                                order: majorLevel.order,
                                classes: []
                            }
                            classGroups.push(grp);
                        }

                        // to merge multiple major levels, only add class to the first column
                        // for the second and subsequent columns, add a place holder
                        if (index == 0) {
                            c.colSpan = majorLevels.length;
                            c.students.forEach( (s) => { s.colSpan =  majorLevels.length })
                            grp.classes.push(c);
                        }
                        else {
                            grp.classes.push({
                                merged: true,
                                classTime: c.classTime,
                                nStudents: c.students.length
                            });
                        }
                    })
                })

                // sort class groups by order
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
        while (timeColWidth + classGroups.length * 0.2 < colWidth - 0.2) {
            colWidth-=0.2;
            timeColWidth+=classGroups.length * 0.2;
        }

        // create table column width elements
        let colWidthElements = [];
        colWidthElements.push(<col key="cw" width={timeColWidth + "%"} />);
        classGroups.forEach( (p,index) => {
            colWidthElements.push(<col key={"cw"+index} width={colWidth + "%"} />);
        })

        // create table rows
        let rows = [];
        let strCurrentDate = moment(this.state.selectedDate).format("YYYYMMDD");
        hours.forEach( (hour) => {
            // currentHour stores rows of each class group for the current hour
            let currentHour = new Array(classGroups.length);
            // max number of rows in all class groups.
            let maxRowCount = 0;

            // iterate through all class groups(programs or levels), generate table columns for all classes in each program
            classGroups.forEach( (p, index) => {
                // classes from each program, start in the current hour
                let currentHourClasses = _.filter(p.classes, (c) => c.classTime.hours() == hour);

                // generate rows for all classes, and teachers
                currentHour[index] = {rows:[]}
                // sort classes by start time
                if (currentHourClasses.length > 0) {
                    currentHourClasses.sort( (a,b) => (a.classTime.valueOf() - b.classTime.valueOf()));
                    currentHourClasses.forEach( (c) => {
                        if (c.merged) {
                            // add null place holders for merged class
                            let placeHolders = new Array(c.nStudents+1);
                            currentHour[index].rows.push(...placeHolders);
                        }
                        else {
                            let classLevelName = App.getClassLevelName(c, this.data.levels);
                            classLevelName != '' && (classLevelName += ' ');
                            currentHour[index].rows.push(
                                {
                                    "teacher": c.classTime.format("hh:mm A ") + classLevelName + c.teacher + " (" + c.students.length + ")",
                                    "colSpan": c.colSpan,
                                    "classID": c._id
                                });
                            currentHour[index].rows = [...currentHour[index].rows,...c.students];
                        }
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
                        let colSpan = p.rows[iRow] && p.rows[iRow].colSpan > 1 ? {"colSpan":p.rows[iRow].colSpan} : {}
                        if (!p.rows[iRow]) {
                            // merged cell, do nothing
                        }
                        else if (p.rows[iRow].teacher) {
                            // show class time and teacher in a "th" style
                            tdElements.push(<th key={"c"+hour+"_" + iRow + "_" + index} {...colSpan} style={{textAlign:"center",background:programPalette[index % programPalette.length]}}>
                                <a href={"/teachers?c=" + p.rows[iRow].classID + "&d=" + strCurrentDate}>{p.rows[iRow].teacher}</a>
                            </th>);
                        }
                        else {
                            let tdContent = p.rows[iRow].name;

                            let annotations = [];
                            // show student level
                            let studentLevel = _.find(this.data.levels, {_id:p.rows[iRow].level});
                            studentLevel && annotations.push(studentLevel.alias);

                            // show "new" student flag
                            if (p.rows[iRow].transferred)
                                annotations.push("transfer");
                            else
                            if (p.rows[iRow].newStudent)
                                annotations.push("new");

                            // show unpaid for pending registration
                            p.rows[iRow].unpaid && annotations.push('unpaid');

                            // show trail / makeup
                            if (p.rows[iRow].type == 'trial')
                                annotations.push('trial');
                            else
                            if (p.rows[iRow].type == 'makeup')
                                annotations.push('make up');

                            annotations.length > 0 && (tdContent += ' (' + annotations.join() + ')');

                            tdElements.push(<td {...colSpan} key={"c"+hour+"_" + iRow + "_" + index}><a href={"/student/" + p.rows[iRow].studentID}>{tdContent}</a></td>);
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
            teacher: {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'selectedTeacher',
                label : 'Teacher'
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
                                {
                                    (this.state.programs || []).map((item, index)=>{
                                        return <option key={index} value={item._id}>{item.name}</option>;
                                    })
                                }
                            </RB.Input>
                        </RB.Col>
                    </div>
                </RB.Row>
                <RB.Row>
                    <div className="form-horizontal">
                        <RB.Col md={6} mdOffset={0}>
                            <RB.Input type="select" {... p.teacher} value={this.state.selectedTeacher} onChange={this.onTeacherChange}>
                                {
                                    (this.state.teachers || []).map((item, index)=>{
                                        return <option key={index} value={item._id}>{item.nickName}</option>;
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