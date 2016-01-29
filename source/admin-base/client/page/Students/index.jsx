

KUI.Student_index = class extends RC.CSSMeteorData{
    constructor(p){
        super(p);

        this.state = {
            query : {}
        };
    }

    baseStyles(){
        return {
            table : {
            }
        };
    }

    getMeteorData(){
        Meteor.subscribe('EF-Student', {});

        let query = this.state.query;

        let list = this.getStudentModule().getDB().find(query,{
            sort : {
                updateTime : -1
            }
        }).fetch();

        return {
            list
        };
    }

    getStudentModule(){
        return KG.get('EF-Student');
    }


    render(){
        let self = this;

        let style = this.css.get('styles');


        const titleArray = [
            {
                title : 'Student',
                key : 'nickName',
                style : {
                }
            },
            {
                title : 'Gender',
                key : 'profile.gender',
                style : {
                }
            },
            {
                title : 'Age',
                key : 'age',
                style : {
                }
            },
            {
                title : 'Parents',
                key : 'accountName',
                style : {

                }
            },
            {
                title : 'Level',
                key : 'skillLevel',
                style : {}
            },
            {
                title : 'Action',
                style : {
                    textAlign : 'center'
                },
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
                            msg : 'delete this student?',
                            YesFn : function(){
                                KG.get('EF-Student').getDB().remove({
                                    _id : item._id
                                });
                            }
                        });
                    };

                    return (
                        <RC.Div style={{textAlign:'center'}}>
                            <RC.URL href={`/student/${item._id}`}><KUI.Icon icon="edit" font="18px" color="#1ab394" style={sy}></KUI.Icon></RC.URL>
                            <KUI.Icon onClick={del} icon="trash-o" font="18px" color="#cdcdcd" style={ml}></KUI.Icon>
                        </RC.Div>

                    );
                }
            }
        ];

        var list = this.data.list;

        _.map(list, (item)=> {
            item.age = '';
            if(item.profile.birthday){
                item.age = moment().year() - moment(item.profile.birthday).year()
            }
            return item;

        });



        return (
            <RC.Div>
                {this.getSearchBox()}

                <hr />

                <KUI.Table
                    style={style.table}
                    list={list}
                    title={titleArray}
                    ref="table"></KUI.Table>


            </RC.Div>
        );

    }

    getSearchBox(){
        var p = {
            name : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-9',
                ref : 'sname',
                label : 'Search Students'
            },
            active : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-4',
                ref : 'sactive',
                label : 'Active'
            }
        };

        const style = {
            marginTop : '40px'
        };

        const sy = {
            td : {
                textAlign : 'left'
            },
            ml : {
                marginLeft : '20px'
            },
            rd : {
                textAlign : 'right'
            }
        };

        let option = ['Active', 'Inactive'];

        return (
            <RC.Div style={style}>
                <RB.Row>
                    <RB.Col md={12} mdOffset={0}>
                        <form className="form-horizontal">

                            <RB.Input type="text" {... p.name} />


                            <RB.Input type="select" {... p.active}>
                                {
                                    _.map(option, (item, index)=>{
                                        return <option key={index} value={item}>{item}</option>;
                                    })
                                }
                            </RB.Input>

                            <RC.Div style={sy.rd}>
                                <KUI.YesButton style={sy.ml} onClick={this.search.bind(this)} label="Search"></KUI.YesButton>
                            </RC.Div>
                        </form>
                    </RB.Col>
                </RB.Row>
            </RC.Div>
        );
    }

    search(){
        let sname = this.refs.sname,
            sa = this.refs.sactive;

        //TODO input to Student module
        let query = {};
        if(sname.getValue()){
            query.nickName = new RegExp(sname.getValue(), 'i');
        }
        if(sa.getValue){
            query.status = sa.getValue();
        }

        console.log(query);
        this.setState({
            query : query
        });
    }
};

