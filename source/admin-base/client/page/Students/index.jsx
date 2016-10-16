

KUI.Student_index = class extends RC.CSSMeteorData{
    constructor(p){
        super(p);

        this.state = {
            query : {
                status : 'Active'
            },
            page : 1
        };

        this.m = KG.DataHelper.getDepModule();
    }

    baseStyles(){
        return {
            table : {
            }
        };
    }

    getMeteorData(){
        let query = this.state.query;

        let x1 = Meteor.subscribe('EF-Customer'),
            x2 = util.data.subscribe(this.m.Student, {
                query : query,
                pageSize : 10,
                pageNum : this.state.page,
                sort : {
                    updateTime : -1
                }
            });

        let x3 = Meteor.subscribe(util.getModuleName('ClassLevel'));

        let list = this.getStudentModule().getAll({});

        return {
            ready : x1.ready() && x2.ready() && x3.ready(),
            list,
            count : x2.ready()?util.data.getMaxCount(x2):0
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
                key : 'name',
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
                reactDom : function(doc){
                    if(!doc.level) return '';
                    let clo = self.m.ClassLevel.getDB().findOne({_id : doc.level});
                    return clo.name;
                }
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
                        if(!util.user.checkPermission('student', 'delete')){
                            return swal(util.const.NoOperatorPermission, '', 'error');
                        }

                        self.m.Student.callMeteorMethod('checkCanBeRemoveById', [item._id], {
                            success : function(f){
                                if(f){
                                    swal({
                                        title : 'Delete this student?',
                                        text : '',
                                        type : 'warning',
                                        showCancelButton : true,
                                        closeOnCancel : true,
                                        closeOnConfirm : false,
                                        confirmButtonText : 'Confirm',
                                        confirmButtonColor : '#1ab394'
                                    }, function(f){
                                        if(!f) return false;
                                        self.m.Student.callMeteorMethod('removeById', [item._id], {
                                            success : function(){
                                                swal({
                                                    title : 'Delete success',
                                                    text : '',
                                                    type : 'success'
                                                });
                                            }
                                        });
                                    });
                                }
                                else{
                                    swal({
                                        title : 'Delete Fail',
                                        text : 'student already register class.',
                                        type : 'error'
                                    });



                                }
                            }
                        });
                    };

                    return (
                        <RC.Div style={{textAlign:'center'}}>
                            <RC.URL href={`/student/${item._id}`}><KUI.Icon icon="edit" font="18px" color="#1ab394" style={sy}></KUI.Icon></RC.URL>
                            {<KUI.Icon onClick={del} icon="trash-o" font="18px" color="#cdcdcd"
                             style={ml}></KUI.Icon>}
                        </RC.Div>

                    );
                }
            }
        ];

        var list = this.data.list;

console.log(list)
        return (
            <RC.Div>
                {this.getSearchBox()}

                <hr />
                <p>Search Result : {this.data.count} matches</p>
                {this.data.ready ?
                    <KUI.PageTable
                        style={style.table}
                        total={this.data.count}
                        pagesize={10}
                        page={this.state.page}
                        onSelectPage={this.selectPage.bind(this)}
                        list={list}
                        title={titleArray}
                        ref="table"></KUI.PageTable>
                    :
                    util.renderLoading()
                }

            </RC.Div>
        );

    }
    selectPage(page){

        this.setState({
            page : page
        });
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
            query.name = {
                value : sname.getValue(),
                type : 'RegExp'
            };
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
