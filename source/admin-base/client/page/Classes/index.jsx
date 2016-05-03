

KUI.Class_index = class extends RC.CSSMeteorData{

    constructor(p){
        super(p);

        this.state = {
            query : null,
            page : 1,
            refresh : false
        };

        this.m = KG.DataHelper.getDepModule();
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
        let query = this.state.query;
        let x1 = null;
        if(query){

            x1 = KG.get('EF-Class').subscribeClassByQuery(query, {
                pageSize : 10,
                pageNum : this.state.page
            });
        }
        let x2 = Meteor.subscribe('EF-Program', {});
            x3 = Meteor.subscribe('EF-Session', {
                query : {
                    registrationStatus : 'Yes'
                }
            });
        let x4 = Meteor.subscribe('EF-AdminUser', {
            query : {
                role : 'teacher'
            }
        });

        if(!x2.ready() || !x3.ready() || !x4.ready()) return {ready : false};


        let list = [];
        if(x1){
            list = x1.data;
            console.log(x1.ready(), list);
        }


        return {
            ready : x1?x1.ready():true,
            list : list,
            count : x1?x1.count:0
        };
    }


    renderTable(){
        if(!this.data.ready){
            return util.renderLoading();
        }
        let self = this;

        let sy = this.css.get('styles');

        let list = this.data.list;
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
                title : 'Registrations',
                //key : 'numberOfClass'
                reactDom(doc){
                    return `${doc.numberOfRegistered||0}/${doc.maxStudent}`;
                }
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
                            <RC.URL href={`/program/class/detail/${item._id}`}><KUI.Icon icon="edit" font="18px" color="#1ab394" style={sy}></KUI.Icon></RC.URL>
                            <KUI.Icon onClick={del} icon="trash-o" font="18px" color="#cdcdcd" style={ml}></KUI.Icon>
                        </RC.Div>

                    );
                }
            }
        ];

        return (
            <KUI.PageTable
                style={sy.table}
                total={this.data.count}
                page={this.state.page}
                pagesize={10}
                onSelectPage={this.selectPageTableNum.bind(this)}
                list={list}
                title={titleArray}
                ref="table">
            </KUI.PageTable>
        );
    }
    selectPageTableNum(page){
        this.setState({
            page : page
        });
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
            day : KG.get('EF-Class').getDBSchema().schema('schedule.day').allowedValues,
            teacher : []
        };

        option.teacher = this.m.AdminUser.getAll({});


        return (
            <RB.Row>
                <form className="form-horizontal">
                    <RB.Col md={6} mdOffset={0}>
                        <RB.Input type="select" {... p.program}>
                            <option key={-1} value="all">All</option>
                            {
                                _.map(option.program, (item, index)=>{
                                    return <option key={index} value={item._id}>{item.name}</option>;
                                })
                            }
                        </RB.Input>
                        <RB.Input type="select" {... p.teacher}>
                            <option key={-1} value="all">All</option>
                            {
                                _.map(option.teacher, (item, index)=>{
                                    return <option key={index} value={item.nickName}>{item.nickName}</option>;
                                })
                            }
                        </RB.Input>

                        <RB.Input type="select" {... p.day}>
                            <option key={-1} value="all">All</option>
                            {
                                _.map(option.day, (item, index)=>{
                                    return <option key={index} value={item}>{item}</option>;
                                })
                            }
                        </RB.Input>
                    </RB.Col>

                    <RB.Col md={6} mdOffset={0}>
                        <RB.Input type="select" {... p.session}>
                            <option key={-1} value="all">All</option>
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

        if(!this.data.ready){
            //return util.renderLoading();
        }

        const sy = {
            rd : {
                textAlign : 'right'
            }
        };

        return (
            <RC.Div>

                <KUI.ProgramTopTab select={2} />
                <hr/>

                {this.getSearchBox()}
                <RC.Div style={sy.rd}>
                    <KUI.YesButton onClick={this.search.bind(this)} label="Search"></KUI.YesButton>
                </RC.Div>

                <hr/>

                {this.state.query ? <p>Search Result : {this.data.count} matches</p> : null}
                {this.state.query ? this.renderTable() : null}

                <RC.Div style={sy.rd}>
                    <KUI.YesButton href="/program/class/add" label="Add New Class"></KUI.YesButton>
                </RC.Div>
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
        if(query.programID === 'all'){
            delete query.programID;
        }
        if(query.sessionID === 'all'){
            delete query.sessionID;
        }
        if(query['schedule.day'] === 'all'){
            delete query['schedule.day'];
        }

        //if(teacher.getValue()){
        //    query.teacher = {
        //        value : teacher.getValue(),
        //        type : 'RegExp'
        //    };
        //}

        if(teacher.getValue() !== 'all'){
            query.teacher = teacher.getValue();
        }


        this.setState({
            query : query,
            page : 1
        });
    }
};
