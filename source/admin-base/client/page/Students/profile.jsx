

KUI.Student_profile = class extends KUI.Page{
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
            query : {
                _id : this.getProfileId()
            }
        });

        let id = this.getProfileId(),
            profile = {};

        if(sub.ready()){
            profile = this.getStudentModule().getDB().findOne({
                //_id : this.getProfileId()
            });

        }
        //return {ready : false};

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

        if(cs.length>0 && _.size(classData) < 1){
            return {ready : false};
        }
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
        return FlowRouter.getParam('id');
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


        return (
            <RC.Div>
                <h3>Student Profile</h3>
                <hr />

                {this.getProfileBox()}

                <hr />
                <h3>Class History</h3>
                {this.renderClassTable()}
                <RC.Div style={sy.rd}>
                    <KUI.YesButton style={sy.ml} href={`/registration/index/student/${this.data.id}`} label="Register New Class"></KUI.YesButton>
                </RC.Div>

                <hr/>
                <h3>Trail / Makeup Class</h3>
                {this.renderTrailOrMakeupClassTable()}
                <RC.Div style={sy.rd}>
                    <KUI.YesButton style={sy.ml} href={`/student/trailclass/${this.data.id}`} label="Trail Class"></KUI.YesButton>
                </RC.Div>

            </RC.Div>
        );

    }


    renderClassTable(){

        if(!this.data.ready){
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
            //{
            //    title : 'Type',
            //    key : 'type'
            //},
            {
                title : 'Status',
                //key : 'status'
                reactDom(doc){
                    return doc.status==='checkouted'?'success':doc.status;
                }
            }
        ];

        let json = [];
        _.each(this.data.classStudentData, (item)=>{
            if(item.type !== 'register' && item.type !== 'wait'){
                return true;
            }
            if(item.status !== 'checkouted'){
                return true;
            }
            let cls = this.data.classData[item.classID];
            item.class = cls.nickName;
            item.teacher = cls.teacher;
            item.session = cls.sessionName;

            json.push(item);
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


        return (
            <RC.Div>
                <KUI.Student_comp_add ref="form" />
                <RC.Div style={sy.rd}>

                    <KUI.YesButton onClick={this.save.bind(this)} label="Save"></KUI.YesButton>
                    <KUI.YesButton style={sy.ml} href={`/family/profile/${this.data.profile.accountID}`} label="Family Information"></KUI.YesButton>
                </RC.Div>
            </RC.Div>
        );
    }


    save(){
        let sd = this.refs.form.getValue();

        console.log(sd);

        //update data
        let rs = this.getStudentModule().getDB().update({
            _id : this.getProfileId()
        }, {'$set' : sd});

        alert('update success');
    }

    runOnceAfterDataReady(){
        this.setDefaultValue();
    }

    setDefaultValue(){

        let data = this.data.profile;
        console.log(data);
        this.refs.form.setDefaultValue(data);

    }

    renderTrailOrMakeupClassTable(){
        if(!this.data.ready){
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
                title : 'Lesson Date',
                reactDom(doc){
                    return moment(doc.lessonDate).format(util.const.dateFormat);
                }
            },
            {
                title : 'Status',
                key : 'status'
            }
        ];

        let json = [];
        _.each(this.data.classStudentData, (item)=>{
            if(item.type !== 'trail' && item.type !== 'makeup'){
                return true;
            }
            let cls = this.data.classData[item.classID];
            item.class = cls.nickName;
            item.teacher = cls.teacher;
            item.session = cls.sessionName;

            json.push(item);
        });

        return (
            <KUI.Table
                style={{}}
                list={json}
                title={titleArray}
                ref="table"></KUI.Table>
        );
    }



};

