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
        this.showExportButton = this.showExportButton.bind(this);
        this.exportPeriod = this.exportPeriod.bind(this);
        this.serializeCSV = this.serializeCSV.bind(this);
        
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

    // Retrieve daily roster raw data from server.
    // Response has classes of all programs on the selected date,
    // grouped by program, each class with all students (regular and makeup/trial)
    getDailyRoster() {
        this.setState({loading:true});
        this.updateQueryParams();
        Meteor.call('dailyRoster.getData', moment(this.state.selectedDate).format("YYYYMMDD"),(function(err,result){
            this.data = result;
            
            // sort program by display order
            // sort student names alphabetically
            // move trial & makeup to the end
            if (this.data.programs && this.data.programs.length > 0) {
                // sort programs by order
                this.data.programs.sort((a,b) => (a.displayOrder > b.displayOrder));
                // sort students in each class in each program
                this.data.programs.forEach( (p) => {
                    p.classes.forEach( (c) => {
                        // parse class time, we need the hour later in data transformation
                        c.classTime = moment(c.schedule.time, 'hh:mma');

                        if (!c.students || c.students.length == 0) return;

                        // separate students into regular, trial, and makeups
                        // sort students by names, then put all
                        // students in a list in the order of regular, makeup, then trial
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

    // Transform roster data into a two dimensional table, in the same
    // structure as the UI layout. This data then can be used to
    // render the UI page or exported.
    // If not filtered by a particular program, each roster column
    // shows classes in a program, if filtered by a program, each
    // roster columns shows classes of a major class level.
    getRosterDataTable() {
        // null means no data ever retrieved from server.
        if (!this.data) return null;
        // an empty array means empty data set returned from server
        if (!this.data.programs || !this.data.programs.length)
            return [];

        // filter classes by program, teacher
        // group classes by program
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

        if  (hours.length == 0) return [];

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

        // create table rows
        let rosterRows = [];
        // header row
        let headerRow = classGroups.map( (grp) => ({ type: 'header', text: grp.name}));
        headerRow.unshift({text:''});
        rosterRows.push(headerRow);

        // iterate through all class hours
        hours.forEach( (hour) => {
            // the array "currentHour" stores rows in  each class group for the current hour
            let currentHour = new Array(classGroups.length);
            // max number of rows in the current hour
            let maxRowCount = 0;

            // iterate through all class groups(programs or levels)
            // generate table columns for all classes in each group
            classGroups.forEach( (p, index) => {
                // classes from each program, start in the current hour
                let currentHourClasses = _.filter(p.classes, (c) => c.classTime.hours() == hour);

                // generate rows for all classes, and teachers
                currentHour[index] = {rows:[]}
                // sort classes by start time
                if (currentHourClasses.length > 0) {
                    // in the current hour, sort classes by time
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

            // generate rows for current hour
            for (let iRow = 0; iRow < maxRowCount; iRow++) {
                // a row is an array of column cells
                let rosterRow = [];

                // the hour cell, only has text for the first row in the hour section.
                rosterRow.push(iRow == 0 ? {
                    type: 'hour',
                    text: moment().hours(hour).format("hh:00 A"),
                    rowSpan : maxRowCount
                } : null);

                // for each column (program or level)
                currentHour.forEach( (p, index) => {
                    if (iRow < p.rows.length) {
                        let colSpan = p.rows[iRow] && p.rows[iRow].colSpan > 1 ? {"colSpan":p.rows[iRow].colSpan} : {}
                        if (!p.rows[iRow]) {
                            // null for merged cell
                            rosterRow.push(null);
                        }
                        else if (p.rows[iRow].teacher) {
                            // teacher cell
                            rosterRow.push({
                                type: 'teacher',
                                text: p.rows[iRow].teacher,
                                // we need classID to render a URL
                                classID: p.rows[iRow].classID,
                                ...colSpan
                            });
                        }
                        else {
                            // student cell
                            let tdContent = p.rows[iRow].name;

                            let annotations = [];
                            // show student level
                            let studentLevel = _.find(this.data.levels, {_id:p.rows[iRow].level});
                            studentLevel && annotations.push(studentLevel.alias);

                            // show "new" or "transfer" student flag
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

                            rosterRow.push({
                                type: 'student',
                                text: tdContent,
                                studentID: p.rows[iRow].studentID,
                                ...colSpan
                            });
                        }
                    }
                    else {
                        // merged cell to show empty space
                        rosterRow.push(iRow == p.rows.length ? {
                            type: 'rowspan',
                            text:'',
                            rowSpan: maxRowCount - iRow
                        } : null);
                    }
                })

                rosterRows.push(rosterRow);
            }
        });

        return rosterRows;
    }

    // Renders daily roster as a HTML table
    // Vertically, classes are grouped by hour, such as 9:00 AM - 10:00AM, 10:00AM - 11:00 AM, etc.
    // Horizontally, each column is a major class level, when filtered by a program, or a program
    // when "All" is selected in program filter.
    // If a class has students from multiple major levels, these major level table cells are merged in
    // a wider column.
    renderRoster(rosterRows) {
        if (!rosterRows) return null;
        if (rosterRows.length == 0)
            return (<div>No data available for your selection</div>);
        if (this.state.error)
            return (<div>{this.state.error}</div>);

        // color palette for columns and class title
        let programTitleColor = "#1AB394";
        let programPalette = ["#99CC00", "#FF99CC", "#FFFF99", "#F4B084"];

        let rows = [];
        let strCurrentDate = moment(this.state.selectedDate).format("YYYYMMDD");
        // skip the header row, then iterate through all table rows, create a th/tr for each row
        for (let iRow = 1; iRow < rosterRows.length; iRow++) {
            let tdElements = [];
            let rosterRow = rosterRows[iRow];
            // creates a "td" element for eachn non-null column
            for (let iCol = 0; iCol < rosterRow.length; iCol++) {
                if (!rosterRow[iCol]) continue;

                let text = rosterRow[iCol].text || '';
                let attrs = {
                    key:iRow + '_' + iCol
                };
                // colSpan or rowSpan
                (rosterRow[iCol].rowSpan && rosterRow[iCol].rowSpan > 1) && (attrs.rowSpan = rosterRow[iCol].rowSpan);
                (rosterRow[iCol].colSpan && rosterRow[iCol].colSpan > 1) && (attrs.colSpan = rosterRow[iCol].colSpan);

                switch (rosterRow[iCol].type) {
                    case 'hour':
                        tdElements.push(<td {...attrs}>{text}</td>);
                        break;
                    case 'student':
                        tdElements.push(<td {...attrs}><a href={"/student/" + rosterRow[iCol].studentID}>{text}</a></td>);
                        break;
                    case 'teacher':
                        tdElements.push(<th {...attrs} style={{textAlign:"center",background:programPalette[(iCol-1) % programPalette.length]}}>
                            <a href={"/teachers?c=" + rosterRow[iCol].classID + "&d=" + strCurrentDate}>{text}</a>
                        </th>);
                        break;
                    case 'rowspan':
                        tdElements.push(<td {...attrs}></td>);
                        break;
                }
            }

            rows.push(<tr key={iRow}>{tdElements}</tr>);
        }

        let titleStyles = [
            {
                textAlign:"center"
            },
            {
                textAlign:"center",
                background: programTitleColor
            }
        ]

        // calculate column width, the first column is smaller, the rest of the columns are equally sized
        let nColumns = rosterRows[0].length - 1;
        let colWidth = Math.floor(100 / nColumns);
        let timeColWidth = 100 - colWidth * nColumns;
        while (timeColWidth + nColumns * 0.2 < colWidth - 0.2) {
            colWidth-=0.2;
            timeColWidth+=nColumns * 0.2;
        }
        // create table column width elements
        let colWidthElements = [];
        rosterRows[0].forEach( (p,index) => {
            colWidthElements.push(index == 0 ? (<col key="cw" width={timeColWidth + "%"} />) : (<col key={"cw"+index} width={colWidth + "%"} />) );
        })

        return (
            <table className="table table-bordered table-condensed2" style={{textAlign:"center", fontSize:12}}>
                <colgroup>
                    {colWidthElements}
                </colgroup>
                <thead>
                <tr>
                    {rosterRows[0].map( (p, idx) => (<th key={"h" + idx} style={titleStyles[idx % 2]}>{p.text}</th>) )}
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        )
    }

    exportPeriod(){
        var data = this.getRosterDataTable()
        var res = ''
        for(var i = 0; i < data.length; i++) {
            res = res + this.serializeCSV(data[i])
        }
        var blob = new Blob([res], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "DailyRoster.csv");
    }

    serializeCSV(record){
        var res = ''
        if (record.length == 0) return res
        for (var i=0; i < record.length; i++) {
            if (record[i] == null) {
                res = res + ' ,'
            } else {
                res = res + ' ' + record[i]['text'] + ','
            }
        }
        res = res.slice(0,-1)
        res = res + '\n'
        return res
    }

    showExportButton(){
        if(this.data) {
            return (<KUI.YesButton onClick={this.exportPeriod.bind(this)} style={{marginLeft : '15px'}} label="Export Report" ></KUI.YesButton>);
        }
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
                            {this.showExportButton()}
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
                    {this.renderRoster(this.getRosterDataTable())}
                </RC.Div>
            </RC.Div>
        )
    }
}