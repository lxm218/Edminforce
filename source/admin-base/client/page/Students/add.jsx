
KUI.Student_comp_add = class extends RC.CSS{

    render(){

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
            },
            school : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-9',
                ref : 'school',
                label : 'School'
            },
            note : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-9',
                ref : 'note',
                label : 'Comments'
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

        let op_status = KG.get('EF-Student').getDBSchema().schema('status').allowedValues,
            op_gender = KG.get('EF-Student').getDBSchema().schema('profile.gender').allowedValues;

        return (
            <form className="form-horizontal">
                <RB.Row>
                    <RB.Col md={12} mdOffset={0}>
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
                        <RB.Input type="text" {... p.school} />

                        <RB.Input type="textarea" {... p.note} />

                    </RB.Col>
                </RB.Row>
            </form>
        );
    }

    getRefs(){
        return {
            name : this.refs.name,
            gender : this.refs.gender,
            birthday : this.refs.birthday,
            status : this.refs.status,
            school : this.refs.school,
            note : this.refs.note
        };
    }

    getValue(){
        let {name, gender, birthday, status, note, school} = this.getRefs();

        let sd = {
            name : name.getValue(),
            status : status.getValue(),
            profile : {
                birthday : moment(birthday.getValue(), util.const.dateFormat).toDate(),
                gender : gender.getValue(),
                school : school.getValue(),
                note : note.getValue()
            }
        };

        return sd;
    }

    componentDidMount(){
        super.componentDidMount();
        let {birthday} = this.getRefs();
        $(birthday.getInputDOMNode()).datepicker({});
    }

    setDefaultValue(data){

        let {name, gender, birthday, status, school, note} = this.getRefs();

        school.getInputDOMNode().value = data.profile.school || '';
        name.getInputDOMNode().value = data.name || data.nickName;
        gender.getInputDOMNode().value = data.profile.gender;
        $(birthday.getInputDOMNode()).datepicker('setDate', data.profile.birthday);
        status.getInputDOMNode().value = data.status;
        note.getInputDOMNode().value = data.profile.note || '';
    }
};

KUI.Student_add = class extends RC.CSS{

    getAccountID(){
        return FlowRouter.current().params.accountID;
    }

    render(){

        return (
            <RC.Div>
                <h3>Add Student</h3>
                <hr/>
                <KUI.Student_comp_add ref="form" />
                <RC.Div style={{textAlign:'right'}}>
                    <KUI.YesButton onClick={this.save.bind(this)} label="Add"></KUI.YesButton>
                </RC.Div>
            </RC.Div>
        );
    }

    save(){
        let data = this.refs.form.getValue();

        data.accountID = this.getAccountID();

        let rs = KG.get('EF-Student').insert(data);
        KG.result.handle(rs, {
            success : function(json){
                util.toast.alert('Insert Success');
                util.goPath('/family/profile/'+data.accountID);
            },
            error : function(e, error){
                console.log(error);
                util.message.publish('KG:show-error-message', {
                    error : error.statusText
                });
            }
        });
    }
};