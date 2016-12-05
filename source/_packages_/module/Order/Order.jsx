
let Base = KG.getClass('Base');
KG.define('EF-Order', class extends Base{
    defineDBSchema(){
        return Schema.Order;
    }


    updateById(data, id){
        try{
            let rs = this._db.update({_id : id}, {'$set' : data});
            return KG.result.out(true, rs);
        }catch(e){
            return KG.result.out(false, e, e.reason);
        }
    }

    insert(data){
        data.paymentSource = 'admin';
        return super.insert(data);
    }

    defineMeteorMethod(){
        let self = this;

        return {
            insertData : function(data, classListObj){
                let m = KG.DataHelper.getDepModule();

                console.log(data, classListObj);
                let way = data.paymentType;

                if(data.type === 'register class'){

                    _.each(data.details, function(csID){
                        //each dettails
                        let p = {
                            fee : classListObj[csID].fee,
                            discounted : classListObj[csID].pay
                        };
                        if(way === 'holding'){
                            p.pendingFlag = true;
                            p.discounted = p.fee;
                        }

                        m.ClassStudent.getDB().update({
                            _id : csID
                        }, {$set : p});

                        let cs = m.ClassStudent.getDB().findOne({_id : csID});
                        m.Class.callMeteorMethod('syncNumberOfRegister', [cs.classID]);
                    });
                }

                //insert data to order
                data.paymentSource = 'admin';
                return self._db.insert(data);
            },

            getAllByQuery : function(query){
                let m = KG.DataHelper.getDepModule();
                let list = m.Order.getDB().find(query, {sort : {updateTime:-1}}).fetch();

                return _.map(list, (item)=>{
                    item.customer = m.Customer.getDB().findOne({_id : item.accountID});
                    item.details = _.map(item.details, (csID)=>{
                        let d = m.ClassStudent.callMeteorMethod('getAllByQuery', [{_id:csID}]).list[0];
                        return d;
                    });
                    return item;
                });
            },

            paySuccessByOrder : function(orderID){
                let m = KG.DataHelper.getDepModule();

                let order = m.Order.getDB().findOne({_id : orderID});
                _.each(order.details, (csID)=>{
                    m.ClassStudent.getDB().update({
                        _id : csID
                    }, {$set : {
                        status : 'checkouted',
                        orderID : orderID
                    }});
                });

                if(order.couponID || order.customerCouponID){
                    m.Coupon.useOnce((order.couponID || order.customerCouponID), order.accountID);
                }

                if(order.registrationFee){
                    m.Customer.callMeteorMethod('changeRegistrationFeeStatusById', [order.accountID]);
                }

                if(order.schoolCredit){
                    m.Customer.callMeteorMethod('useSchoolCreditById', [order.schoolCredit, order.accountID]);
                }

                m.Order.getDB().update({_id : orderID}, {$set : {
                    status : 'success',
                    paymentSource : 'admin'
                }});

                //add log
                _.each(order.details, (id)=>{
                    let oo = m.ClassStudent.getDB().findOne({_id : id});
                    KG.RequestLog.addByType('register class', {
                        id : id,
                        data : oo
                    });
                });


                //send email
                Meteor.setTimeout(function(){
                    m.Email.callMeteorMethod('sendRegistrationClassConfirmEmail', [{orderID : orderID}]);
                }, 100);



                return orderID;
            }
        };
    }


});