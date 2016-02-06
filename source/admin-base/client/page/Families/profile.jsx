KUI.Family_add_comp = class extends RC.CSS{

    getRefs(){

        return {
            name : this.refs.name,
            email : this.refs.email,
            phone : this.refs.phone,
            location : this.refs.location,
            al_name : this.refs.al_name,
            al_phone : this.refs.al_phone,
            em_name : this.refs.em_name,
            em_phone : this.refs.em_phone
        };
    }

    render(){

        let p = {
            name : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'name',
                label : 'Account Name'
            },
            email : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'email',
                label : 'Email'
            },
            phone : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'phone',
                label : 'Phone'
            },
            location : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'location',
                label : 'Location'
            },
            alternativeName : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'al_name',
                label : 'Name'
            },
            alternativePhone : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'al_phone',
                label : 'Phone'
            },
            emergencyName : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'em_name',
                label : 'Name'
            },
            emergencyPhone : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'em_phone',
                label : 'Phone'
            }
        };

        const sy = {
            rd : {
                textAlign : 'right'
            }
        };

        return (
            <form className="form-horizontal">
                <RB.Row>
                    <RB.Col md={6} mdOffset={0}>
                        <RB.Input type="text" {... p.name} />
                        <RB.Input type="text" {... p.phone} />
                        <p style={sy.rd}>Alternative Contact</p>
                        <RB.Input type="text" {... p.alternativeName} />
                        <RB.Input type="text" {... p.alternativePhone} />
                    </RB.Col>
                    <RB.Col md={6} mdOffset={0}>
                        <RB.Input type="text" {... p.email} />
                        <RB.Input type="text" {... p.location} />
                        <p style={sy.rd}>Emergency Contact</p>
                        <RB.Input type="text" {... p.emergencyName} />
                        <RB.Input type="text" {... p.emergencyPhone} />
                    </RB.Col>
                </RB.Row>
            </form>
        );
    }

    getValue(){
        let {name, email, phone, location, al_name, al_phone, em_name, em_phone} = this.getRefs();

        return {
            name : name.getValue(),
            email : email.getValue(),
            phone : phone.getValue(),
            location : location.getValue(),
            alternativeContact : {
                name : al_name.getValue(),
                phone : al_phone.getValue()
            },
            emergencyContact : {
                name : em_name.getValue(),
                phone : em_phone.getValue()
            }
        };
    }

    setDefaultValue(data){
        let {name, email, phone, location, al_name, al_phone, em_name, em_phone} = this.getRefs();

        let al = data.alternativeContact || {},
            em = data.emergencyContact || {};
        name.getInputDOMNode().value = data.name || '';
        email.getInputDOMNode().value = data.email || '';
        phone.getInputDOMNode().value = data.phone || '';
        location.getInputDOMNode().value = data.location || '';
        al_name.getInputDOMNode().value = al.name || '';
        al_phone.getInputDOMNode().value = al.phone || '';
        em_name.getInputDOMNode().value = em.name || '';
        em_phone.getInputDOMNode().value = em.phone || '';
    }

};


KUI.Family_profile = class extends KUI.Page{

    getMeteorData(){
        let id = FlowRouter.current().params.id;
        let x = Meteor.subscribe('EF-Customer', {
            query : {_id : id}
        });

        let y = Meteor.subscribe('EF-Student', {
            query : {
                accountID : id
            }
        });

        let profile = KG.get('EF-Customer').getAll()[0];
        let list = KG.get('EF-Student').getAll({}, {
            sort : {
                updateTime : -1
            }
        });

        return {
            id : id,
            ready : x.ready(),
            listReady : y.ready(),
            profile : profile,
            list : list
        };
    }

    baseStyles(){
        return {
            rd : {
                textAlign : 'right'
            }
        };
    }

    render(){

        let sy = this.css.get('styles');

        return (
            <RC.Div>
                <KUI.Family_add_comp ref="form" />
                <RC.Div style={sy.rd}>
                    <KUI.YesButton style={sy.ml} onClick={this.save.bind(this)} label="Save"></KUI.YesButton>
                </RC.Div>
                <hr/>
                <h4>Students</h4>
                {this.renderStudentTable()}
                <RC.Div style={sy.rd}>
                    <KUI.YesButton style={sy.ml} onClick={this.toAdd.bind(this)} label="Add"></KUI.YesButton>
                </RC.Div>
            </RC.Div>
        );
    }

    toAdd(){
        util.goPath('/student/add/under/'+this.data.id);
    }

    save(){
        let param = this.refs.form.getValue();
        console.log(param);

        let rs = KG.get('EF-Customer').updateById(param, this.data.id);
        KG.result.handle(rs, {
            success : function(){
                util.goPath('/family');
            }
        });
    }

    runOnceAfterDataReady(){
        let data = this.data.profile;
        this.refs.form.setDefaultValue(data);
    }

    renderStudentTable(){

        if(!this.data.listReady){
            return util.renderLoading();
        }

        const titleArray = [
            {
                title : 'Name',
                key : 'nickName'
            },
            {
                title : 'Birthday',
                reactDom : function(doc){
                    return moment(doc.profile.birthday).format(util.const.dateFormat);
                }
            },
            {
                title : 'Age',
                key : 'age'
            },
            {
                title : 'Gender',
                key : 'profile.gender'
            },
            {
                title : 'Status',
                key : 'status'
            }
        ];

        let list = this.data.list;

        return (
            <KUI.Table
                style={{}}
                list={list}
                title={titleArray}
                ref="table">
            </KUI.Table>
        );

    }

};