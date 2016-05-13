
KUI.Registration_index = class extends KUI.Page{

    constructor(p){
        super(p);

        this.studentID = this.props.studentID;

        this.state = {
            search_student_query : null,
            student : null,
            search_class_query : null,

            searchStudentResult : null
        };

    }

    getMeteorData(){
        this.module = KG.DataHelper.getDepModule();
        let x = Meteor.subscribe('EF-Class'),
            x1 = Meteor.subscribe('EF-Program'),
            x2 = Meteor.subscribe('EF-Session'),
            y = Meteor.subscribe('EF-Student', {
                query : this.studentID?{_id:this.studentID}:{_id:'xxx'}
            }),
            z = Meteor.subscribe('EF-ClassStudent');

        if(!x1.ready || !x2.ready) return {ready : false};
        let P = this.module.Program.getDB().find().fetch(),
            S = this.module.Session.getDB().find().fetch();

        return {
            ready : x.ready() && y.ready(),
            studentList : this.getStudentData(),
            classList : this.getClassData(),
            program : P,
            session : S
        };
    }

    getClassData(){
        let query = this.state.search_class_query;
        if(!query) return [];
        return KG.get('EF-Class').getAll(query);
    }
    getStudentData(){
        let query = this.state.search_student_query;
        if(!query) return [];
        return KG.get('EF-Student').getAll(query, {
            sort : {createTime : -1}
        });
    }

    getReactObj(){
        return {
            student : this.refs.student,
            lesson : this.refs.lesson
        };
    }

    getSearchBox(){

        let p = {
            student : {
                labelClassName : 'col-xs-2',
                wrapperClassName : 'wrapper',
                ref : 'student',
                label : 'Student'
            },
            program : {
                labelClassName : 'col-xs-2',
                wrapperClassName : 'col-xs-6',
                ref : 'program',
                label : 'Program'
            },
            session : {
                labelClassName : 'col-xs-2',
                wrapperClassName : 'col-xs-6',
                ref : 'session',
                label : 'Session'
            },

            lesson : {
                labelClassName : 'col-xs-2',
                wrapperClassName : 'col-xs-6',
                ref : 'lesson',
                label : 'Class'
            }
        };

        let option = {
            student : this.data.studentList,
            lesson : this.data.classList,
            program : this.data.program,
            session : this.data.session
        };

        option.student = [{_id:'-1', name:'Please select student'}].concat(option.student);
        option.lesson = [{_id:'-1', nickName : 'Please select class'}].concat(option.lesson);

        let sy = {
            ml : {
                marginLeft : '20px'
            },
            rd : {
                textAlign : 'right'
            },
            col : {
                position : 'relative',
                top : '5px',
                fontSize : '16px'
            }
        };

        let so = this.state.student;

        return (
            <form className="form-horizontal">
                <RB.Row>
                    <RB.Col md={12} mdOffset={0}>


                        <RB.Input {... p.student}>
                            <RB.Row>
                                {so?<RB.Col style={sy.col} xs={4}>{so.name}</RB.Col>:''}
                                <RB.Col xs={2}>
                                    {this.studentID?'':<KUI.YesButton onClick={this.openModal.bind(this)} label="Select"></KUI.YesButton>}
                                </RB.Col>
                            </RB.Row>
                        </RB.Input>

                        <RB.Input onChange={this.change.bind(this)} type="select" {... p.program}>
                            {
                                _.map(option.program, (item, index)=>{
                                    return <option key={index} value={item._id}>{item.name}</option>;
                                })
                            }
                        </RB.Input>
                        <RB.Input onChange={this.change.bind(this)} type="select" {... p.session}>
                            {
                                _.map(option.session, (item, index)=>{
                                    return <option key={index} value={item._id}>{item.name}</option>;
                                })
                            }
                        </RB.Input>

                        <RB.Input type="select" {... p.lesson}>
                            {
                                _.map(option.lesson, (item, index)=>{
                                    return <option key={index} value={item._id}>{item.nickName}</option>;
                                })
                            }
                        </RB.Input>

                        <RC.Div style={sy.rd}>
                            <KUI.NoButton onClick={this.cancel.bind(this)} label="Cancel"></KUI.NoButton>
                            <KUI.YesButton onClick={this.save.bind(this)} style={sy.ml} label="Register"></KUI.YesButton>
                        </RC.Div>

                    </RB.Col>
                </RB.Row>
            </form>
        );
    }

    change(){
        let p = this.refs.program,
            s = this.refs.session;
        let query = {
            programID : p.getValue(),
            sessionID : s.getValue()
        };

        this.setState({
            search_class_query:query
        });
    }


    cancel(){
        let {student, lesson} = this.getReactObj();
        //student.getInputDOMNode().value = '-1';
        lesson.getInputDOMNode().value = '-1';
        this.setState({
            student : null
        });
    }
    save(){
        let self = this;

        let {student, lesson} = this.getReactObj();
        if(!this.state.student){
            util.toast.showError('You must select a student');
            return false;
        }

        if(lesson.getValue() === '-1'){
            util.toast.showError('You must select a class');
            return false;
        }

        let classData = _.find(this.data.classList,{_id:lesson.getValue()});

        let data = {
            studentID : this.state.student._id,
            accountID : this.state.student.accountID,
            programID: classData.programID,
            classID : lesson.getValue()
        };
console.log(data);
        let rs = KG.get('EF-ClassStudent').insertByData(data);
        console.log(rs);
        KG.result.handle(rs, {
            success : function(d){

                _.delay(function(){
                    util.goPath('/registration/payment/'+d);
                }, 500);



            },
            error : function(e, error){
                util.toast.showError(error.statusText);
            },
            step : function(fn){
                //util.dialog.confirm({
                //    msg : 'Class is full of registration, do you want to going into waitlist!',
                //    YesFn : function(){
                //        let mp = fn.call();
                //        if(mp.status){
                //            util.goPath('/registration/payment/'+mp.data);
                //        }
                //
                //    }
                //});
                swal({
                    title : '',
                    text : 'Class is full of registration, do you want to going into waitlist!',
                    type : 'warning',
                    showCancelButton : true,
                    closeOnCancel : true,
                    closeOnConfirm : true,
                    confirmButtonText : 'Add Waitlist',
                    confirmButtonColor : '#1ab394'
                }, function(){
                    let mp = fn.call();
                    if(mp.status){
                        util.toast.alert('Add waitlist success!');
                    }

                });
            }
        });
    }

    render(){
        if(!this.data.ready){
            return util.renderLoading();
        }

        return (
            <RC.Div>

                <h3>Register Class</h3>
                <hr/>
                {this.getSearchBox()}

                {this.renderModal()}
            </RC.Div>
        );
    }

    renderModal(){
        return (
            <KUI.Modal onHide={this.hideModal.bind(this)}
                       title="Search Student"
                       YesText="Select"
                       onYes={this.selectSS.bind(this)}
                       ref="modal" >
                <RB.Row>
                    <RB.Col xsOffset={2} xs={6}>
                        <RB.Input ref="search_input" placeholder="Input student name" type="text" />
                    </RB.Col>
                    <RB.Col xs={2}>
                        <KUI.YesButton onClick={this.searchStudentByKeyword.bind(this)} label="Search"></KUI.YesButton>
                    </RB.Col>
                </RB.Row>

                {this.renderStundentTable()}
            </KUI.Modal>
        );
    }

    searchStudentByKeyword(){
        this.searchStudentInModal(1);
    }

    searchStudentInModal(page){
        let self = this;
        let ip = this.refs.search_input.getValue();
        let query = {};
        if(ip){
            query = {
                name : {
                    type : 'RegExp',
                    value : ip
                }
            };
        }


        this.setState({
            searchStudentResult : 'loading'
        });
        KG.get('EF-Student').callMeteorMethod('getStudentListByQuery', [query, {
            pageNum : page,
            sort : {
                createTime : -1
            }
        }], {
            success : function(rs){
                console.log(rs);
                self.setState({
                    searchStudentResult : rs
                });
            }
        });
    }

    openModal(){
        this.setState({
            search_student_query:null
        });
        this.refs.modal.show();
    }

    hideModal(){
        this.refs.modal.hide();
    }

    selectSS(){
        let jq = $(ReactDOM.findDOMNode(this.refs.ss));
        let inp = jq.find('input[type="radio"]');

        let rs;
        inp.each(function(){
            if($(this).prop('checked')){

                rs = $(this).val();
                return false;
            }
        });

        rs = _.find(this.state.searchStudentResult.list, {_id : rs});
        console.log(rs);
        this.setState({
            student : rs
        });
        this.hideModal();
    }

    renderStundentTable(){
        if(this.state.searchStudentResult === 'loading'){
            return util.renderLoading();
        }
        else if(!this.state.searchStudentResult){
            return null;
        }


        let self = this;

        const titleArray = [
            {
                title : '',
                reactDom(item){

                    return <RC.Div style={{textAlign:'center'}}><label>
                            <input type="radio" value={item._id} name="select_student" />
                        </label></RC.Div>;
                }
            },
            {
                title : 'Student',
                key : 'name',
                style : {}
            },
            {
                title : 'Email',
                key : 'customer.email'
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
            }
        ];

        let list = this.state.searchStudentResult.list;
console.log(list)
        return (
            <KUI.PageTable
                total={this.state.searchStudentResult.count}
                pagesize={10}
                onSelectPage={this.changePageNum.bind(this)}
                style={{}}
                list={list}
                title={titleArray}
                ref="ss"></KUI.PageTable>
        );
    }

    changePageNum(page){
        this.searchStudentInModal(page);

    }

    runOnceAfterDataReady(){


        this.change();
    }

};

KUI.Registration_index1 = class extends KUI.Registration_index{
    runOnceAfterDataReady(){
        super.runOnceAfterDataReady();
        console.log(this.studentID);
        let studentID = this.studentID;
        if(studentID){
            let ss = KG.get('EF-Student').getAll({_id:studentID})[0];
            console.log(ss);
            this.setState({
                student : ss
            });
        }
        else{
            this.setState({
                student : null
            });
        }
    }
};

KUI.Registration_index2 = class extends KUI.Registration_index{
    runOnceAfterDataReady(){

        util.getReactJQueryObject(this.refs.program).hide();
        util.getReactJQueryObject(this.refs.session).hide();
        this.setState({
            search_class_query:{}
        });

        _.delay(()=>{
            this.refs.lesson.getInputDOMNode().value = FlowRouter.getParam('classID');
        }, 1000);



    }
};


