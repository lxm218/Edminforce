

KUI.Student_profile = class extends KUI.Page{
    constructor(p){
        super(p);

        this.m = KG.DataHelper.getDepModule();

        this.state = {
            waitForPayList : [],

            refresh : null,


            editCommentID : null
        };

        this.cmBoxShown = false;
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
                _id : this.getProfileId()
            });

        }
        //return {ready : false};

        //find from ClassStudent
        let s1 = Meteor.subscribe('EF-ClassStudent', {
            query : {
                studentID : id,
                status : {$in:['checkouted']}
            }
        });
        let s2 = Meteor.subscribe('EF-Class');
        if(!s1.ready() || !s2.ready()){
            return {ready : false};
        }

        let cs = this.m.ClassStudent.getDB().find({status:'checkouted'}, sort).fetch();
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

        let scx = Meteor.subscribe('EF-StudentComment', {
            studentID : this.getProfileId()
        });
        console.log(profile)
        return {
            id,
            ready : sub.ready(),
            profile,
            classStudentData : cs,
            classData : classData,

            scReady : scx.ready(),
            scList : this.m.StudentComment.getDB().find({
                studentID : this.getProfileId()
            }, {sort:{createTime:-1}}).fetch()
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


                <hr/>
                <h3>Current Class</h3>
                {this.renderClassTable()}
                <RC.Div style={sy.rd}>
                    <KUI.YesButton style={sy.ml} href={`/registration/register?studentID=${this.data.id}`} label="Register New Class"></KUI.YesButton>
                </RC.Div>
                <hr/>
                <h3>Class History</h3>
                {this.renderClassHistoryTable()}
                <hr/>
                <h3>Trial / Makeup Class / Waitlist</h3>
                {this.renderTrailOrMakeupClassTable()}
                <RC.Div style={sy.rd}>

                    <KUI.YesButton style={sy.ml} href={`/student/trailclass/${this.data.id}`} label="Trial Class"></KUI.YesButton>
                </RC.Div>
                <hr/>

                <h3>Wait for payment</h3>
                {this.renderWaitForPaymentTable()}
                <hr/>
                <h3>Student Comment</h3>
                {this.renderStudentCommentTable()}
                <hr/>
                {this.sendCommentBox()}

            </RC.Div>
        );

    }

    sendCommentBox(){
        let p = {
            comment : {
                labelClassName : 'col-xs-2',
                wrapperClassName : 'col-xs-10',
                ref : 'sendCommentText',
                label : 'Comment'
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

        let text = this.state.editCommentID ? 'Save' : 'Add Comment';

        return (
            <form className="form-horizontal">
                <RB.Row>
                    <RB.Col ref="cmBox" md={12}>
                        <RB.Input type="textarea" {... p.comment} />
                    </RB.Col>
                </RB.Row>
                <RC.Div style={sy.rd}>
                    <KUI.YesButton style={sy.ml} onClick={this.sendComment.bind(this)} label={text}></KUI.YesButton>
                </RC.Div>
            </form>
        );

    }

    sendComment(){
        if(!util.user.checkPermission('studentComment', 'insert')){
            return swal(util.const.NoOperatorPermission, '', 'error');
        }

        let self = this;

        if(!this.cmBoxShown){
            util.getReactJQueryObject(this.refs.cmBox).show();
            this.cmBoxShown = true;
            return;
        }

        if(this.state.editCommentID){
            //edit
            let data = {
                comment : this.refs.sendCommentText.getValue()
            };
            this.m.StudentComment.getDB().update({
                _id : this.state.editCommentID
            }, {
                $set : data
            });
            util.toast.alert('update Comment success');
            self.refs.sendCommentText.getInputDOMNode().value = '';
            self.cmBoxShown = false;
            util.getReactJQueryObject(self.refs.cmBox).hide();
            this.setState({
                editCommentID : null
            });
            return;
        }

        let data = {
            studentID : this.getProfileId(),
            studentName : this.data.profile.name,
            fromID : Meteor.user()._id,
            fromName : Meteor.user().username,
            comment : this.refs.sendCommentText.getValue()
        };
        console.log(data);

        let rs = this.m.StudentComment.insert(data);
        KG.result.handle(rs, {
            success : function(){
                util.toast.alert('Send Comment success');
                self.refs.sendCommentText.getInputDOMNode().value = '';
                self.cmBoxShown = false;
                util.getReactJQueryObject(self.refs.cmBox).hide();
            }
        });
    }

    renderClassHistoryTable(){
        if(!this.data.ready){
            return util.renderLoading();
        }
        let self = this;
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
                    return doc.status==='checkouted'?'complete':doc.status;
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
            if(!cls) return true;
            item.class = cls.nickName;
            item.teacher = cls.teacher;
            item.session = cls.sessionName;

            if(moment().isAfter(moment(cls.session.endDate), 'day')){
                json.push(item);
            }

        });

        return (
            <KUI.Table
                style={{}}
                list={json}
                title={titleArray}
                ref="table"></KUI.Table>
        );
    }


    renderClassTable(){

        if(!this.data.ready){
            return util.renderLoading();
        }

        let self = this;

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
            },
            {
                title : 'Action',
                style : {
                    textAlign : 'center'
                },
                reactDom(doc){
                    let sy = {
                        lineHeight : '24px',
                        height : '24px',
                        fontSize : '12px',
                        padding : '0 12px',
                        marginRight: '10px'
                    };

                    let id = self.getProfileId();

                    return (
                        <RC.Div style={{textAlign:'center'}}>
                            <KUI.NoButton style={sy} href={`/student/makeupclass/${id}/${doc.classID}`}
                                          label="Make up"></KUI.NoButton>
                            <KUI.NoButton style={sy} href={`/student/changeclass/${doc._id}`}
                             label="Change"></KUI.NoButton>

                            <KUI.NoButton style={sy} href={`/student/cancelclass/${doc._id}`}
                                          label="Cancel"></KUI.NoButton>
                        </RC.Div>
                    );
                }
            }
        ];

        let json = [];
        _.each(this.data.classStudentData, (item)=>{
            if(item.type !== 'register'){
                return true;
            }
            if(item.status !== 'checkouted'){
                return true;
            }
            let cls = this.data.classData[item.classID];
            if(!cls) return true;
            item.class = cls.nickName;
            item.teacher = cls.teacher;
            item.session = cls.sessionName;

            if(moment().isBefore(moment(cls.session.endDate), 'day')){
                json.push(item);
            }


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
        //check permission
        if(!util.user.checkPermission('student', 'edit')){
            swal(util.const.NoOperatorPermission, '', 'error');
            return false;
        }

        let sd = this.refs.form.getValue();

        console.log(sd);

        //update data
        let rs = this.getStudentModule().getDB().update({
            _id : this.getProfileId()
        }, {'$set' : sd});

        alert('update success');
    }

    runOnceAfterDataReady(){
        let self = this;
        this.setDefaultValue();
        console.log(this.data.profile);
        this.m.ClassStudent.callMeteorMethod('getAllByQuery', [{studentID : this.data.id, status : 'pending', pendingFlag:true}, {
            sort : {updateTime : -1},
            pageNum : 1,
            pageSize : 999
        }], {
            success : function(list){
                self.setState({
                    waitForPayList : list
                });
            }
        });

        util.getReactJQueryObject(this.refs.cmBox).hide();
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

        let self = this;

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
                    if(doc.lessonDate){
                        return moment(doc.lessonDate).format(util.const.dateFormat);
                    }
                    return '';

                }
            },
            {
                title : 'Type',
                reactDom(doc){
                    if(doc.type === 'wait'){
                        return 'waitlist';
                    }
                    return doc.type;
                }
            },
            {
                title : 'Status',
                //key : 'status'
                reactDom(doc){
                    return doc.status==='checkouted'?'success':doc.status;
                }
            },
            {
                title : 'Action',
                reactDom(doc){
                    let sy = {
                        lineHeight : '24px',
                        height : '24px',
                        fontSize : '12px',
                        padding : '0 12px',
                        marginRight: '10px'
                    };

                    if(doc.type === 'trial' || doc.type === 'wait'){
                        let del = function(){
                            swal({
                                title: "Cancel this class?",
                                text: "",
                                type: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "Yes, delete it!",
                                closeOnConfirm: false
                            }, function(){
                                self.m.Class.callMeteorMethod('syncClassTrialOrMakeupNumber', [doc._id, {
                                    isDelete : true
                                }], {
                                    success : function(){
                                        self.m.ClassStudent.getDB().remove({_id : doc._id});
                                        swal("cancel class success.", "", "success");
                                    }
                                });


                            });

                        };

                        return (
                            <RC.Div style={{textAlign:'center'}}>
                                <KUI.NoButton style={sy} onClick={del}
                                              label="Cancel"></KUI.NoButton>
                            </RC.Div>
                        );
                    }
                    else if(doc.type === 'makeup'){

                        return (
                            <RC.Div style={{textAlign:'center'}}>


                                <KUI.NoButton style={sy} href={`/student/cancelmakeupclass/${doc._id}`}
                                              label="Cancel"></KUI.NoButton>
                            </RC.Div>
                        );
                    }

                }
            }
        ];

        let json = [];
        _.each(this.data.classStudentData, (item)=>{
            if(item.type !== 'trial' && item.type !== 'makeup' && item.type !== 'wait'){
                return true;
            }
            if(item.type !== 'wait' && (!item.lessonDate || moment(moment(item.lessonDate)).isBefore(moment(), 'days'))){
                return true;
            }
            let cls = this.data.classData[item.classID] || {};
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

    renderStudentCommentTable(){
        console.log(this.data.scReady, this.data.scList);
        if(!this.data.scReady){
            return util.renderLoading();
        }

        let self = this;
        let titleArray = [
            {
                title : 'Date',
                reactDom(doc){
                    return moment(doc.createTime).format(util.const.dateFormat)
                }
            },
            {
                title : 'Comments',
                key : 'comment'
            },
            {
                title : 'Action',
                style : {
                    textAlign : 'center'
                },
                reactDom(doc){

                    const ml = {
                        marginLeft : '10px',
                        cursor : 'pointer'
                    };

                    let del = function(){
                        if(!util.user.checkPermission('studentComment', 'delete')){
                            return swal(util.const.NoOperatorPermission, '', 'error');
                        }

                        self.m.StudentComment.getDB().remove({_id : doc._id});
                    };

                    let edit = function(){
                        if(!util.user.checkPermission('studentComment', 'edit')){
                            return swal(util.const.NoOperatorPermission, '', 'error');
                        }

                        console.log(doc)
                        self.setState({
                            editCommentID : doc._id
                        });

                        self.cmBoxShown = true;
                        util.getReactJQueryObject(self.refs.cmBox).show();

                        _.delay(function(){
                            self.refs.sendCommentText.getInputDOMNode().value = doc.comment;
                        }, 500);


                    };

                    return (
                        <RC.Div style={{textAlign:'center'}}>
                            <KUI.Icon icon="edit" font="18px" onClick={edit} color="#1ab394" style={ml}></KUI.Icon>
                            <KUI.Icon onClick={del} icon="trash-o" font="18px" color="#cdcdcd" style={ml}></KUI.Icon>
                        </RC.Div>
                    );
                }
            }
        ];

        return (
            <KUI.Table
                style={{}}
                list={this.data.scList}
                title={titleArray}
                ref="table1"></KUI.Table>
        );
    }

    renderWaitForPaymentTable(){
        let self = this;

        let titleArray = [
            {
                title : 'Class',
                reactDom(doc){
                    return doc.class[0].nickName;
                }
            },
            {
                title : 'Teacher',
                reactDom(doc){
                    return doc.class[0].teacher;
                }
            },
            {
                title : 'Session',
                reactDom(doc){
                    return doc.class[0].sessionName;
                }
            },

            {
                title : 'Type',
                key : 'type'
            },
            {
                title : 'Lesson Date',
                reactDom(doc){
                    if(doc.lessonDate){
                        return moment(doc.lessonDate).format(KG.const.dateFormat);
                    }
                    return '';
                }
            },

            {
                title : 'Status',
                key : 'status'
            },
            {
                title : 'Action',
                style : {
                    textAlign : 'center'
                },
                reactDom(doc, index){
                    let sy = {
                        lineHeight : '24px',
                        height : '24px',
                        fontSize : '12px',
                        padding : '0 12px',
                        marginRight: '10px'
                    };

                    let id = self.data.id;

                    let del = function(){
                        self.m.ClassStudent.getDB().remove({_id:doc._id});

                        self.state.waitForPayList.list.splice(index, 1);

                        self.setState({
                            waitForPayList : self.state.waitForPayList,
                            refresh : Meteor.uuid()
                        });
                    };

                    let goToPay = function(){
                        if(doc.type === 'register'){
                           util.goPath(`/registration/payment/${doc._id}`);
                        }
                        else if(doc.type === 'makeup'){
                            util.goPath('/payment/makeup?classstudentID='+doc._id);
                        }
                    };

                    return (
                        <RC.Div style={{textAlign:'center'}}>
                            <KUI.NoButton style={sy} onClick={goToPay}
                                          label="pay now"></KUI.NoButton>
                            <KUI.NoButton style={sy} onClick={del}
                                          label="Cancel"></KUI.NoButton>

                        </RC.Div>
                    );
                }
            }
        ];

        let list = this.state.waitForPayList;
        console.log(list);
        return (
            <KUI.Table
                style={{}}
                list={list.list}
                title={titleArray}
                ref="table1"></KUI.Table>
        );
    }

};

