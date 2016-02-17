
KUI.Registration_index = class extends KUI.Page{

    constructor(p){
        super(p);

        this.studentID = this.props.studentID;

        this.state = {
            student : null
        };

    }

    getMeteorData(){
        let x = Meteor.subscribe('EF-Class'),
            y = Meteor.subscribe('EF-Student'),
            z = Meteor.subscribe('EF-ClassStudent');

        return {
            ready : x.ready() && y.ready() && z.ready(),
            studentList : this.getStudentData(),
            classList : this.getClassData()
        };
    }

    getClassData(){
        return KG.get('EF-Class').getAll();
    }
    getStudentData(){
        return KG.get('EF-Student').getAll();
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
            lesson : {
                labelClassName : 'col-xs-2',
                wrapperClassName : 'col-xs-6',
                ref : 'lesson',
                label : 'Class'
            }
        };

        let option = {
            student : this.data.studentList,
            lesson : this.data.classList
        };

        option.student = [{_id:'-1', nickName:'Please select student'}].concat(option.student);
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
                                {so?<RB.Col style={sy.col} xs={4}>{so.nickName}</RB.Col>:''}
                                <RB.Col xs={2}>
                                    {this.studentID?'':<KUI.YesButton onClick={this.openModal.bind(this)} label="Select"></KUI.YesButton>}
                                </RB.Col>
                            </RB.Row>
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

    cancel(){
        let {student, lesson} = this.getReactObj();
        //student.getInputDOMNode().value = '-1';
        lesson.getInputDOMNode().value = '-1';
        this.setState({
            student : null
        });
    }
    save(){

        let {student, lesson} = this.getReactObj();
        if(!this.state.student){
            util.toast.showError('You must select a student');
            return false;
        }

        if(lesson.getValue() === '-1'){
            util.toast.showError('You must select a class');
            return false;
        }

        let data = {
            studentID : this.state.student._id,
            classID : lesson.getValue()
        };

        let rs = KG.get('EF-ClassStudent').insertByData(data);
        KG.result.handle(rs, {
            success : function(d){
                util.goPath('/registration/success/'+d);
            },
            error : function(e, error){
                util.toast.showError(error.statusText);
            },
            step : function(fn){
                util.dialog.confirm({
                    msg : 'Class is full of registration, do you want to going into waitlist!',
                    YesFn : function(){
                        let mp = fn.call();
                        if(mp.status){
                            util.goPath('/registration/payment/'+mp.data);
                        }

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
                {this.renderStundentTable()}
            </KUI.Modal>
        );
    }

    openModal(){
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

        rs = KG.get('EF-Student').getAll({_id:rs})[0];
        console.log(rs);
        this.setState({
            student : rs
        });
        this.hideModal();
    }

    renderStundentTable(){
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
                key : 'nickName',
                style : {}
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
            }
        ];

        let list = this.data.studentList;

        return (
            <KUI.Table
                style={{}}
                list={list}
                title={titleArray}
                ref="ss"></KUI.Table>
        );
    }

};

KUI.Registration_index1 = class extends KUI.Registration_index{
    runOnceAfterDataReady(){
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


