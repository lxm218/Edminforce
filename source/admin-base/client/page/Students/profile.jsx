

KUI.Student_profile = class extends RC.CSSMeteorData{
    constructor(p){
        super(p);


    }

    baseStyles(){
        return {
            table : {
            }
        };
    }

    getMeteorData(){
        let sub = Meteor.subscribe('EF-Student', {
            _id : this.getProfileId()
        });

        let id = this.getProfileId(),
            profile = {};

        if(sub.ready()){
            profile = this.getStudentModule().getDB().findOne();

        }

        return {
            id,
            ready : sub.ready(),
            profile
        };
    }

    getStudentModule(){
        return KG.get('EF-Student');
    }

    getProfileId(){
        return FlowRouter.current().params.id;
    }


    render(){


        return (
            <RC.Div>
                <h3>Student Profile</h3>
                <hr />

                {this.getProfileBox()}

            </RC.Div>
        );

    }

    getProfileBox(){
        var p = {
            name : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-9',
                ref : 'name',
                label : 'Student Name'
            },
            gender : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-4',
                ref : 'gender',
                label : 'Gender'
            },
            birthday : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-4',
                ref : 'birthday',
                label : 'Birthday'
            },
            status : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-4',
                ref : 'status',
                label : 'Status'
            }
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

        let op_status = util.const.StudentStatus,
            op_gender = util.const.Gender;

        return (
            <RC.Div>
                <RB.Row>
                    <RB.Col md={12} mdOffset={0}>
                        <form className="form-horizontal">

                            <RB.Input type="text" {... p.name} />
                            <RB.Input type="select" {... p.gender}>
                                {
                                    _.map(op_gender, (item, index)=>{
                                        return <option key={index} value={item}>{item}</option>;
                                    })
                                }
                            </RB.Input>
                            <RB.Input type="text" {... p.birthday} />

                            <RB.Input type="select" {... p.status}>
                                {
                                    _.map(op_status, (item, index)=>{
                                        return <option key={index} value={item}>{item}</option>;
                                    })
                                }
                            </RB.Input>

                            <RC.Div style={sy.rd}>

                                <KUI.YesButton style={sy.ml} onClick={this.save.bind(this)} label="Save"></KUI.YesButton>
                            </RC.Div>
                        </form>
                    </RB.Col>
                </RB.Row>
            </RC.Div>
        );
    }

    getRefs(){
        return {
            name : this.refs.name,
            gender : this.refs.gender,
            birthday : this.refs.birthday,
            status : this.refs.status
        };
    }

    save(){
        let {name, gender, birthday, status} = this.getRefs();

        let sd = {
            status : status.getValue(),
            'profile.birthday' : moment(birthday.getValue(), 'MM/DD/YYYY').toDate(),
            'profile.gender' : gender.getValue()
        };
        if(name.getValue()){
            sd.nickName = name.getValue();
        }

        console.log(sd);

        //update data
        let rs = this.getStudentModule().getDB().update({
            _id : this.getProfileId()
        }, {'$set' : sd});

        alert('update success');
    }

    setDefaultValue(){

        let data = this.data.profile;
        let {name, gender, birthday, status} = this.getRefs();

        $(birthday.getInputDOMNode()).datepicker({});

        name.getInputDOMNode().value = data.nickName;
        gender.getInputDOMNode().value = data.profile.gender;
        //birthday.getInputDOMNode().value = moment(data.profile.birthday).format('MM/DD/YYYY');
        $(birthday.getInputDOMNode()).datepicker('setDate', data.profile.birthday);
        status.getInputDOMNode().value = data.status;

    }

    componentWillUpdate(np, ns){
        super.componentWillUpdate(np, ns);

        if(!this.data.ready) return;
        this.setDefaultValue();
    }


};

