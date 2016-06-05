
KUI.Registration_success = class extends KUI.Page{

    getMeteorData(){
        let id = FlowRouter.current().params.id;

        let s1 = Meteor.subscribe('EF-ClassStudent', {
            query : {
                _id : id
            }
        });

        let one = KG.get('EF-ClassStudent').getDB({
            _id : id
        }).findOne();

        if(!s1.ready()){
            return {
                ready : false
            };
        }

        let x1 = Meteor.subscribe('EF-Order', {
            query : {_id : one.orderID}
        });
        if(!x1.ready()){
            return {
                ready : false
            };
        }
        //console.log(x1.ready(), KG.get('EF-Order').getDB().findOne({}));
        let order = KG.get('EF-Order').getDB().findOne({
            _id : one.orderID
        });
        if(!order){
            return {
                ready : false
            };
        }

        let coupon = order.customerCouponID || order.couponID || '';

        if(coupon){
            let x2 = Meteor.subscribe('EF-Coupon', {
                query : {_id : coupon}
            });
            if(!x2.ready()){
                return {ready : false};
            }
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
            ready : s2.ready() && s3.ready(),
            coupon : coupon,
            order : order
        };

    }

    render(){

        if(!this.data.ready){
            return <RC.Loading isReady={false} />;
        }

        if(this.data.invalid){
            return <RC.Div><h3>This registration is invalid.</h3></RC.Div>;
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
                <p>Student : {sd.name || sd.nickName}</p>
                <p>Class : {cd.nickName}</p>
                <p>Teacher : {cd.teacher}</p>

                <hr/>
                <RC.Div style={sy.rd}>
                    <KUI.YesButton ref="sendEmailBtn" onClick={this.sendEmail.bind(this)} label="Email Receipt and Schedule"></KUI.YesButton>
                    <KUI.YesButton onClick={this.printPage.bind(this)} style={sy.ml} label="Print out Receipt and Schedule"></KUI.YesButton>
                </RC.Div>
            </RC.Div>
        );

    }

    sendEmail(e){

        let self = this;
        let param = {
            accountID : this.data.data.accountID,
            student : this.data.student,
            'class' : this.data.class
        };

        self.refs.sendEmailBtn.loading(true);
        KG.get('EF-Email').callMeteorMethod('sendClassRegistrationCReceiptAndSchedule', [param], {
            success : function(rs){
                self.refs.sendEmailBtn.loading(false);
                if(rs && rs.error){
                    util.toast.showError(rs.error);
                }
                else{
                    util.toast.alert('Send receipt and schedule success');
                }

            }
        });

    }

    printPage(){
        window.print();
    }

    runOnceAfterDataReady(){
        console.log(this.data.order);
        if(this.data.data.status !== 'checkouted'){
            if(this.data.coupon){
                KG.get('EF-Coupon').useOnce(this.data.coupon, this.data.student.accountID);
            }


            let schoolCredit = this.data.order.schoolCredit || 0;
            console.log(schoolCredit)
            KG.get('EF-Customer').callMeteorMethod('useSchoolCreditById', [schoolCredit, this.data.student.accountID], {
                success : function(){
                    console.log(arguments)
                }
            });
        }


        KG.get('EF-ClassStudent').updateStatus('checkouted', this.data.id);
        //sync data
        KG.get('EF-ClassStudent').callMeteorMethod('syncNumberOfRegister', [this.data.class._id], {
            success : function(rs){
                console.log(rs);
            }
        });
    }

};