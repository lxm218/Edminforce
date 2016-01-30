
KUI.Program_session = class extends RC.CSSMeteorData{

    constructor(p){
        super(p);

        this.state = {
            showAddBox : false
        };

    }

    getMeteorData(){

        let x = Meteor.subscribe('EF-Session');

        let list = this.getSessionModule().getDB().find({}, {
            sort : {
                createTime : -1
            }
        }).fetch();

        return {
            list : list
        };
    }

    render(){

        let style = this.css.get('styles');

        const titleArray = [
            {
                title : 'Sessions',
                key : 'name'
            },
            {
                title : 'Start Date',
                key : 'startDate'
            },
            {
                title : 'End Date',
                key : 'endDate'
            },
            {
                title : 'Registration Start Date',
                key : 'registrationStartDate'
            },
            {
                title : 'Registration Status',
                key : 'registrationStatus'
            }
        ];

        let format = 'YYYY-MM-DD';
        var list = _.map(this.data.list, (item)=>{
            item.startDate = moment(item.startDate).format(format);
            item.endDate = moment(item.endDate).format(format);
            item.registrationStartDate = moment(item.registrationStartDate).format(format);
            return item;
        });


        return (
            <RC.Div>
                <RC.TabsSlider bgColor="#f9f9f9" cursorColor="brand1" initialTab={1}>
                    <RC.URL href="/program">Program</RC.URL>
                    <RC.URL href="/program/session">Session</RC.URL>
                </RC.TabsSlider>

                <KUI.Table
                    style={style.table}
                    list={list}
                    title={titleArray}
                    ref="table"></KUI.Table>

                <RC.Div style={style.rd}>
                    <KUI.YesButton onClick={this.showAddBox.bind(this)} label="Add"></KUI.YesButton>
                </RC.Div>

                <hr />

                {this.getAddBox()}
            </RC.Div>
        );
    }

    baseStyles(){
        return {
            table : {
                marginTop : '20px'
            },

            rd : {
                textAlign : 'right'
            }
        };
    }

    componentDidMount(){
        let [sd1, sd2,,] = this.getAddBoxRefs();
        $(sd1.getInputDOMNode()).datepicker({});

        sd2 = $(sd2);
        sd2.find('.input-daterange').datepicker({});
    }

    getAddBox(){
        var p = {
            name : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-9',
                ref : 'sname',
                label : 'Session Name'
            },
            sd1 : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-4',
                ref : 'sd1',
                label : 'Registration Start Date'
            },
            ss : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-4',
                ref : 'ss',
                label : 'Registration Status'
            }
        };

        const style = {
            marginTop : '40px',
            display : this.state.showAddBox ? 'block' : 'none'
        };

        const sy = {
            td : {
                textAlign : 'left'
            },
            ml : {
                marginLeft : '20px'
            }
        };

        let option = ['Yes', 'No'];

        return (
            <RC.Div style={style}>
                <RB.Row>
                    <RB.Col md={12} mdOffset={0}>
                        <form className="form-horizontal">

                            <RB.Input type="text" {... p.name} />

                            <div ref="sd2" className="form-group">
                                <label className="control-label col-xs-3">
                                    <span>Session Schedule</span>
                                </label>
                                <div className="col-xs-9">
                                    <div className="input-daterange input-group " >
                                        <input style={sy.td} type="text" className="input-sm form-control" name="start" />
                                        <span className="input-group-addon">to</span>
                                        <input style={sy.td} type="text" className="input-sm form-control" name="end" />
                                    </div>
                                </div>

                            </div>

                            <RB.Input type="text" {... p.sd1} />

                            <RB.Input type="select" {... p.ss}>
                                {
                                    _.map(option, (item, index)=>{
                                        return <option key={index} value={item}>{item}</option>;
                                    })
                                }
                            </RB.Input>

                            <RC.Div style={this.css.get('styles').rd}>
                                <KUI.NoButton onClick={this.resetAddBox.bind(this)} label="Cancel"></KUI.NoButton>
                                <KUI.YesButton style={sy.ml} onClick={this.save.bind(this)} label="Save"></KUI.YesButton>
                            </RC.Div>
                        </form>
                    </RB.Col>
                </RB.Row>
            </RC.Div>
        );
    }

    showAddBox(){
        this.setState({
            showAddBox : true
        });
    }

    getAddBoxRefs(){
        let arr = ['sd1', 'sd2', 'sname', 'ss'];
        return _.map(arr, (item)=>{
            return this.refs[item];
        });

    }

    save(){
        let self = this;
        let [sd1, sd2, sname, ss] = this.getAddBoxRefs();

        let format = 'MM/DD/YYYY';

        let data = {
            name : sname.getValue(),
            startDate : $(sd2).find('input').eq(0).val(),
            endDate : $(sd2).find('input').eq(1).val(),
            registrationStartDate : sd1.getValue(),
            registrationStatus : ss.getValue()
        };

        data.startDate = moment(data.startDate, format).toDate();
        data.endDate = moment(data.endDate, format).toDate();
        data.registrationStartDate = moment(data.registrationStartDate, format).toDate();

        console.log(data);

        let rs = this.getSessionModule().insert(data);
        KG.result.handle(rs, {
            success : function(){
                alert('insert success');
                self.resetAddBox();
            }
        });
    }

    resetAddBox(){
        let [sd1, sd2, sname, ss] = this.getAddBoxRefs();
        sname.getInputDOMNode().value = '';
        $(sd1.getInputDOMNode()).datepicker('clearDates');
        $(sd2).find('input').eq(0).datepicker('clearDates');
        $(sd2).find('input').eq(1).datepicker('clearDates');
        ss.getInputDOMNode().value = 'Yes';

        this.setState({
            showAddBox : false
        });
    }

    getSessionModule(){
        return KG.get('EF-Session');
    }

};