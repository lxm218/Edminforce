
KUI.Registration_index = class extends RC.CSSMeteorData{

    getMeteorData(){
        Meteor.subscribe('EF-Class');
        Meteor.subscribe('EF-Student');
        Meteor.subscribe('EF-ClassStudent');

        return {
            studentList : this.getStudentData(),
            classList : this.getClassData()
        };
    }

    getClassData(){
        return KG.get('EF-Class').getAll();
    }
    getStudentData(){
        return KG.get('EF-Student').getDB().find().fetch();
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
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-9',
                ref : 'student',
                label : 'Student'
            },
            lesson : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-9',
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
            }
        };


        return (
            <form className="form-horizontal">
                <RB.Row>
                    <RB.Col md={8} mdOffset={0}>

                        <RB.Input type="select" {... p.student}>
                            {
                                _.map(option.student, (item, index)=>{
                                    return <option key={index} value={item._id}>{item.nickName}</option>;
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

    cancel(){
        let {student, lesson} = this.getReactObj();
        student.getInputDOMNode().value = '-1';
        lesson.getInputDOMNode().value = '-1';
    }
    save(){
        let {student, lesson} = this.getReactObj();
        if(student.getValue() === '-1'){
            util.dialog.alert('You must select a student');
            return false;
        }
        if(lesson.getValue() === '-1'){
            util.dialog.alert('You must select a class');
            return false;
        }

        let data = {
            studentID : student.getValue(),
            classID : lesson.getValue()
        };

        let rs = KG.get('EF-ClassStudent').insertByData(data);
        KG.result.handle(rs, {
            success : function(d){
                util.goPath('/registration/success/'+d);
            },
            step : function(fn){
                util.dialog.confirm({
                    msg : 'Class is full of registration, do you want to going into waitlist!',
                    YesFn : function(){
                        let mp = fn.call();
                        if(mp.status){
                            util.goPath('/registration/success/'+mp.data);
                        }

                    }
                });
            }
        });
    }

    render(){

        return (
            <RC.Div>
                <h3>Register Class</h3>
                <hr/>
                {this.getSearchBox()}
            </RC.Div>
        );
    }
};


