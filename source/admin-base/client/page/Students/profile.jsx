

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
        let sort = {
            sort : {
                updateTime : -1
            }
        };

        let sub = Meteor.subscribe('EF-Student', {
            _id : this.getProfileId()
        });

        let id = this.getProfileId(),
            profile = {};

        if(sub.ready()){
            profile = this.getStudentModule().getDB().findOne();

        }

        //find from ClassStudent
        let s1 = Meteor.subscribe('EF-ClassStudent', {
            query : {studentID : id}
        });
        let s2 = Meteor.subscribe('EF-Class');
        if(!s1.ready() || !s2.ready()){
            return {ready : false};
        }

        let cs = KG.get('EF-ClassStudent').getDB().find({}, sort).fetch();
        let classData = {};
        _.each(cs, (item)=>{
            let clsId = item.classID;
            let obj = KG.get('EF-Class').getAll({
                _id : clsId
            })[0];
            if(obj){
                classData[clsId] = obj;
            }

        });


        return {
            id,
            ready : sub.ready(),
            profile,
            classStudentData : cs,
            classData : classData
        };
    }

    getStudentModule(){
        return KG.get('EF-Student');
    }

    getProfileId(){
        return FlowRouter.current().params.id;
    }


    render(){

        if(!this.data.ready){
            return util.renderLoading();
        }

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


        //run after render
        util.delay(()=>{
            if(this.data.ready){
                this.setDefaultValue();
            }
        }, 500);

        return (
            <RC.Div>
                <h3>Student Profile</h3>
                <hr />

                {this.getProfileBox()}

                <hr />
                <h3>Class History</h3>
                {this.renderClassTable()}

                <RC.Div style={sy.rd}>
                    <KUI.YesButton style={sy.ml} href="/registration" label="Register New Class"></KUI.YesButton>
                </RC.Div>

            </RC.Div>
        );

    }

    renderClassTable(){

        if(this.data.classStudentData.length > 0 && _.keys(this.data.classData).length < 1){
            return util.renderLoading();
        }

        const titleArray = [
            {
                title : 'Class',
                key : 'class'
            },
            {
                title : 'Teacher',
                key : 'teacher'
            },
            {
                title : 'Session',
                key : 'session'
            },
            {
                title : 'Status',
                key : 'status'
            }
        ];

        let json = _.map(this.data.classStudentData, (item)=>{
            let cls = this.data.classData[item.classID];
            item.class = cls.nickName;
            item.teacher = cls.teacher;
            item.session = cls.sessionName;

            return item;
        });

        return (
            <KUI.Table
                style={{}}
                list={json}
                title={titleArray}
                ref="table"></KUI.Table>
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



};

