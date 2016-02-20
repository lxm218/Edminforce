

KUI.Setting_add_comp = class extends RC.CSS{

    constructor(p){
        super(p);

        this.module = this.getDepModule();
        this.formType = new ReactiveVar(this.props.type || 'edit');
    }

    getDepModule(){
        return {
            AdminUser : KG.get('EF-AdminUser')
        };
    }

    getRefs(){
        return {
            name : this.refs.name,
            email : this.refs.email,
            pwd : this.refs.pwd,
            role : this.refs.role,
            supervisor : this.refs.supervisor,

            schoolName : this.refs.schoolName,
            schoolEmail : this.refs.schoolEmail,
            schoolPhone : this.refs.schoolPhone,
            schoolAddress : this.refs.schoolAddress,
            schoolCity : this.refs.schoolCity,
            schoolState : this.refs.schoolState,
            schoolZip : this.refs.schoolZip

        };
    }

    render(){
        let p = {
            name : {
                labelClassName : 'col-xs-2',
                wrapperClassName : 'col-xs-10',
                ref : 'name',
                label : 'Name'
            },
            email : {
                labelClassName : 'col-xs-2',
                wrapperClassName : 'col-xs-10',
                ref : 'email',
                label : 'UserID',
                placeholder : 'type email'
            },
            pwd : {
                labelClassName : 'col-xs-2',
                wrapperClassName : 'col-xs-10',
                ref : 'pwd',
                label : 'Password'
            },
            role : {
                labelClassName : 'col-xs-2',
                wrapperClassName : 'col-xs-4',
                ref : 'role',
                label : 'Access/Role'
            },
            supervisor : {
                labelClassName : 'col-xs-2',
                wrapperClassName : 'col-xs-10',
                ref : 'supervisor',
                label : 'Supervisor'
            },
            s_name : {
                labelClassName : 'col-xs-2',
                wrapperClassName : 'col-xs-10',
                ref : 'schoolName',
                label : 'School Name'
            },
            s_email : {
                labelClassName : 'col-xs-2',
                wrapperClassName : 'col-xs-10',
                ref : 'schoolEmail',
                label : 'School Email'
            },
            s_phone : {
                labelClassName : 'col-xs-2',
                wrapperClassName : 'col-xs-10',
                ref : 'schoolPhone',
                label : 'School Phone'
            },
            s_address : {
                labelClassName : 'col-xs-2',
                wrapperClassName : 'wrapper',
                label : 'School Address'
            }

        };

        let option = {
            role : this.module.AdminUser.getDBSchema().schema('role').allowedValues
        };

        let formType = this.formType.get();
        if(formType === 'edit'){
            p.email.disabled = true;
        }

        return (
            <form className="form-horizontal">
                <RB.Row>
                    <RB.Col md={12}>
                        <RB.Input type="text" {... p.name} />
                        <RB.Input type="text" {... p.email} />
                        {formType==='add'?<RB.Input type="password" {... p.pwd} />:null}

                        <RB.Input type="select" {... p.role}>
                            {
                                _.map(option.role, (item, index)=>{
                                    return <option key={index} value={item}>{item}</option>;
                                })
                            }
                        </RB.Input>

                        <RB.Input type="text" {... p.supervisor} />
                        <RB.Input type="text" {... p.s_name} />
                        <RB.Input type="text" {... p.s_email} />
                        <RB.Input type="text" {... p.s_phone} />

                        <RB.Input {... p.s_address}>
                            <RB.Row>
                                <RB.Col xs={4}>
                                    <input ref="schoolAddress" placeholder="address" type="text" className="form-control" />
                                </RB.Col>
                                <RB.Col xs={2}>
                                    <input ref="schoolCity" placeholder="city" type="text" className="form-control" />
                                </RB.Col>
                                <RB.Col xs={2}>
                                    <input ref="schoolState" placeholder="state" type="text" className="form-control" />
                                </RB.Col>
                                <RB.Col xs={2}>
                                    <input ref="schoolZip" placeholder="zipcode" type="text" className="form-control" />
                                </RB.Col>

                            </RB.Row>
                        </RB.Input>
                    </RB.Col>
                </RB.Row>
            </form>
        );
    }

    getValue(){
        let {
            name, email, pwd, role, supervisor, schoolName, schoolEmail, schoolPhone,
            schoolAddress, schoolCity, schoolState, schoolZip
            } = this.getRefs();

        let data = {
            nickName : name.getValue(),
            email : email.getValue(),
            role : role.getValue(),
            supervisor : supervisor.getValue(),
            school : {
                name : schoolName.getValue(),
                email : schoolEmail.getValue(),
                phone : schoolPhone.getValue(),
                address : schoolAddress.value,
                city : schoolCity.value,
                state : schoolState.value,
                zipcode : schoolZip.value
            }
        };

        if(this.formType.get() === 'add'){
            data.password = pwd.getValue();
        }

        return data;
    }

    setDefaultValue(data){
        let {
            name, email, role, supervisor, schoolName, schoolEmail, schoolPhone,
            schoolAddress, schoolCity, schoolState, schoolZip
            } = this.getRefs();
        name.getInputDOMNode().value = data.nickName;
        email.getInputDOMNode().value = data.email || '';
        role.getInputDOMNode().value = data.role || '';
        supervisor.getInputDOMNode().value = data.supervisor || '';
        schoolName.getInputDOMNode().value = data.school.name || '';
        schoolEmail.getInputDOMNode().value = data.school.email || '';
        schoolPhone.getInputDOMNode().value = data.school.phone || '';
        schoolAddress.value = data.school.address || '';
        schoolCity.value = data.school.city || '';
        schoolState.value = data.school.state || '';
        schoolZip.value = data.school.zipcode || '';
    }
    reset(){
        let {
            name, email, pwd, role, supervisor, schoolName, schoolEmail, schoolPhone,
            schoolAddress, schoolCity, schoolState, schoolZip
            } = this.getRefs();
        name.getInputDOMNode().value = '';
        email.getInputDOMNode().value = '';
        pwd.getInputDOMNode().value = '';
        role.getInputDOMNode().value = '';
        supervisor.getInputDOMNode().value = '';
        schoolName.getInputDOMNode().value = '';
        schoolEmail.getInputDOMNode().value = '';
        schoolPhone.getInputDOMNode().value = '';
        schoolAddress.value = '';
        schoolCity.value = '';
        schoolState.value = '';
        schoolZip.value = '';
    }
};

KUI.Setting_addAccount = class extends RC.CSS{

    baseStyles(){
        return {
            ml : {
                marginLeft : '20px'
            }
        };
    }

    render(){
        let sy = this.css.get('styles');
        return (
            <RC.Div>
                <h3>Create New Account</h3>
                <hr/>
                <KUI.Setting_add_comp type="add" ref="form" />
                <RC.Div style={{textAlign:'right'}}>
                    <KUI.NoButton href="/setting" label="Cancel" />
                    <KUI.YesButton style={sy.ml} onClick={this.save.bind(this)} label="Save"></KUI.YesButton>
                </RC.Div>
            </RC.Div>
        );
    }

    save(){
        let self = this;
        let data = this.refs.form.getValue();
        console.log(data);

        KG.get('EF-AdminUser').insert(data, function(rs){
            KG.result.handle(rs, {
                success : function(){
                    util.toast.alert('Insert Success');
                    self.refs.form.reset();
                },
                error : function(e){
                    util.toast.showError(e.reason);
                }
            });
        });


    }
};