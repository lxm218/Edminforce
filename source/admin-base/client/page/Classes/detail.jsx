
KUI.Class_detail = class extends KUI.Page{
    constructor(p){
        super(p);

        this.state = {
            classTableReady : false,
            classTableData : [],
            checkCanBeRegister : false
        };
    }

    getClassId(){
        return FlowRouter.current().params.id;
    }

    getMeteorData(){

        let x = Meteor.subscribe('EF-Class', {
            query : {
                _id : this.getClassId()
            }
        });

        let id = this.getClassId();
        let data = KG.get('EF-Class').getDB().findOne();


        return {
            ready : x.ready(),
            data : data,
            id : id,

            checkCanBeRegister : KG.get('EF-Class').checkCanBeRegister(id)
        };
    }

    baseStyles(){
        return {

        };
    }

    getDepModule(){
        return {
            Class : KG.get('EF-Class')
        };
    }

    render(){
        if(!this.data.ready || !this.data.data){
            return util.renderLoading();
        }
        let data = this.data.data;

        return (
            <RC.Div>
                <h3>Edit Class</h3>
                <hr/>
                <KUI.Class_comp_add edit={true} init-data={data} ref="form"></KUI.Class_comp_add>
                <RC.Div style={{textAlign:'right'}}>
                    <KUI.YesButton onClick={this.update.bind(this)} label="Save Change"></KUI.YesButton>
                </RC.Div>
                <hr/>
                <h3>Registration</h3>
                {this.renderClassTable()}
                {this.renderRegisterButton()}
            </RC.Div>
        );
    }


    update(){
        let self = this;
        let data = this.refs.form.getValue();
        console.log(data);

        let rs = KG.get('EF-Class').updateById(data, this.getClassId());
        KG.result.handle(rs, {
            success : function(json){
                console.log(json);
                alert('update success');

            }
        });
    }

    renderClassTable(){

        if(!this.state.classTableReady){
            return util.renderLoading();
        }



        let titleArray = [
            {
                title : 'Student',
                reactDom(doc){
                    return <RC.URL href={`/student/${doc.studentObj._id}`}>{doc.studentObj.nickName}</RC.URL>
                }
            },
            {
                title : 'Age',
                key : 'studentObj.age'
            },
            {
                title : 'Gender',
                key : 'studentObj.profile.gender'
            },
            {
                title : 'Start Date',
                reactDom(doc){
                    return moment(doc.classObj.session.registrationStartDate).format(util.const.dateFormat);
                }
            },
            {
                title : 'End Date',
                reactDom(doc){
                    return moment(doc.classObj.session.registrationEndDate).format(util.const.dateFormat);
                }
            },
            {
                title : 'Status',
                //key : 'status'
                reactDom(doc){
                    return doc.status==='checkouted'?'success':doc.status;
                }
            }
        ];

        let list = _.filter(this.state.classTableData, (item)=>{
            return item.status === 'checkouted';
        });


        return (
            <KUI.Table
                style={{}}
                list={list}
                title={titleArray}
                ref="table"></KUI.Table>
        );
    }

    renderRegisterButton(){
        let x = this.data.checkCanBeRegister;
        if(!x.ready){
            return null;
        }

        let flag = x.flag;

        return (
            <RC.Div style={{textAlign:'right'}}>
                {flag?<KUI.YesButton onClick={function(){}} label="Register"></KUI.YesButton>:null}
                {!flag?<KUI.YesButton onClick={function(){}} label="Waitlist"></KUI.YesButton>:null}

            </RC.Div>
        );

    }

    runOnceAfterDataReady(){
        let self = this;
        KG.get('EF-ClassStudent').subscribeFullDataByClassID(this.getClassId(), 2000, function(data){
            console.log(data);
            self.setState({
                classTableReady:true,
                classTableData : data
            });
        });

    }
};