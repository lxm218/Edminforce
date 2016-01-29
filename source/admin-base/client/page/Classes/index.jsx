

KUI.Class_index = class extends RC.CSSMeteorData{

    constructor(p){
        super(p);

        this.state = {
            list : null
        };
    }

    getProgramData(){
        let m = KG.get('EF-Program');
        return m.getDB().find({}, {sort:{
            createTime : -1
        }}).fetch();
    }
    getSessionData(){
        let m = KG.get('EF-Session');
        return m.getDB().find({}, {
            sort : {
                updateTime : -1
            }
        }).fetch();
    }

    baseStyles(){
        return {
            table : {
                marginTop : '15px'
            }
        };
    }

    getMeteorData(){
        let list = KG.get('EF-Class').getAll();

        return {
            list : list
        };
    }


    renderTable(){
        let self = this;

        let sy = this.css.get('styles');

        let list = this.state.list || this.data.list;
        _.map(list, (item)=>{
            let s = item.schedule;
            item.scheduleAll = `${s.day} ${s.time}`;

            return item;
        });

        let titleArray = [
            {
                title : 'Class',
                key : 'nickName'
            },
            {
                title : 'Session',
                key : 'sessionName'
            },
            {
                title : 'Number',
                key : 'numberOfClass'
            },
            {
                title : 'Teacher',
                key : 'teacher'
            },
            {
                title : 'Schedule',
                key : 'scheduleAll'
            },
            {
                title : 'Length',
                key : 'length'
            },
            {
                title : 'Action',
                reactDom : function(item){
                    const sy = {
                        cursor : 'pointer',
                        position : 'relative',
                        top : '2px'
                    };
                    const ml = {
                        marginLeft : '10px',
                        cursor : 'pointer'
                    };

                    var del = function(){
                        util.dialog.confirm({
                            msg : 'delete this class?',
                            YesFn : function(){
                                KG.get('EF-Class').getDB().remove({
                                    _id : item._id
                                });
                            }
                        });
                    };

                    return (
                        <RC.Div style={{textAlign:'center'}}>
                            <RC.URL href="/classes/add"><KUI.Icon icon="edit" font="18px" color="#1ab394" style={sy}></KUI.Icon></RC.URL>
                            <KUI.Icon onClick={del} icon="trash-o" font="18px" color="#cdcdcd" style={ml}></KUI.Icon>
                        </RC.Div>

                    );
                }
            }
        ];

        return (
            <KUI.Table
                style={sy.table}
                list={list}
                title={titleArray}
                ref="table"></KUI.Table>
        );
    }

    getSearchBox(){

        let p = {
            program : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'program',
                label : 'Program'
            },
            session : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'session',
                label : 'Session'
            },
            status : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'status',
                label : 'Status'
            },
            teacher : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'teacher',
                label : 'Teacher'
            },
            day : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'day',
                label : 'Day Of Class'
            }
        };

        let option = {
            program : this.getProgramData(),
            session : this.getSessionData(),
            status : KG.get('EF-Class').getDBSchema().schema('status').allowedValues,
            day : KG.get('EF-Class').getDBSchema().schema('schedule.day').allowedValues
        };

        return (
            <RB.Row>
                <form className="form-horizontal">
                    <RB.Col md={6} mdOffset={0}>
                        <RB.Input type="select" {... p.program}>
                            {
                                _.map(option.program, (item, index)=>{
                                    return <option key={index} value={item._id}>{item.name}</option>;
                                })
                            }
                        </RB.Input>
                        <RB.Input type="text" {... p.teacher} />
                        <RB.Input type="select" {... p.day}>
                            {
                                _.map(option.day, (item, index)=>{
                                    return <option key={index} value={item}>{item}</option>;
                                })
                            }
                        </RB.Input>
                    </RB.Col>

                    <RB.Col md={6} mdOffset={0}>
                        <RB.Input type="select" {... p.session}>
                            {
                                _.map(option.session, (item, index)=>{
                                    return <option key={index} value={item._id}>{item.name}</option>;
                                })
                            }
                        </RB.Input>
                        <RB.Input type="select" {... p.status}>
                            {
                                _.map(option.status, (item, index)=>{
                                    return <option key={index} value={item}>{item}</option>;
                                })
                            }
                        </RB.Input>

                    </RB.Col>
                </form>
            </RB.Row>
        );
    }

    render(){

        const sy = {
            rd : {
                textAlign : 'right'
            }
        };

        return (
            <RC.Div>
                {this.getSearchBox()}
                <RC.Div style={sy.rd}>
                    <KUI.YesButton onClick={this.search.bind(this)} label="Search"></KUI.YesButton>
                </RC.Div>

                <hr/>
                <RC.Div style={sy.rd}>
                    <KUI.YesButton href="/classes/add" label="Add New Class"></KUI.YesButton>
                </RC.Div>

                {this.renderTable()}
            </RC.Div>
        );
    }

    search(){
        let program = this.refs.program,
            session = this.refs.session,
            teacher = this.refs.teacher,
            status = this.refs.status,
            day = this.refs.day;
        let query = {
            programID : program.getValue(),
            sessionID : session.getValue(),
            status : status.getValue(),
            'schedule.day' : day.getValue()
        };
        if(teacher.getValue()){
            query.teacher = new RegExp(teacher.getValue(), 'i');
        }
        //console.log(query);

        let list = KG.get('EF-Class').getAll(query);
        this.data.list = list;
        this.setState({
            list : list
        });
    }
};