
KUI.Registration_success = class extends KUI.Page{

    getMeteorData(){
        let id = FlowRouter.current().params.id;

        let s1 = Meteor.subscribe('EF-ClassStudent', {
            query : {
                _id : id
            }
        });

        let one = KG.get('EF-ClassStudent').getDB().findOne();

        if(!s1.ready()){
            return {
                ready : false
            };
        }


        let s2 = Meteor.subscribe('EF-Class', {
            query : {
                _id : one.classID
            }
        });
        let s3 = Meteor.subscribe('EF-Student', {
            query : {
                _id : one.studentID
            }
        });


        return {
            id : id,
            data : one,
            'class' : KG.get('EF-Class').getAll()[0],
            student : KG.get('EF-Student').getDB().findOne(),
            ready : s2.ready() && s3.ready()
        };

    }

    render(){

        if(!this.data.ready){
            return <RC.Loading isReady={false} />;
        }

        let sd = this.data.student || {},
            cd = this.data.class || {};

        let sy = {
            mb : {
                marginBottom : '20px'
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
                <h2 style={sy.mb}>Registration is successful for:</h2>
                <p>Student : {sd.nickName}</p>
                <p>Class : {cd.nickName}</p>
                <p>Teacher : {cd.teacher}</p>

                <hr/>
                <RC.Div style={sy.rd}>
                    <KUI.YesButton onClick={this.comming} label="Email Receipt and Schedule"></KUI.YesButton>
                    <KUI.YesButton onClick={this.comming} style={sy.ml} label="Print out Receipt and Schedule"></KUI.YesButton>
                </RC.Div>
            </RC.Div>
        );

    }

    comming(){
        alert('comming soon');
    }

    runOnceAfterDataReady(){
        KG.get('EF-ClassStudent').updateStatus('checkouted', this.data.id);
    }

};