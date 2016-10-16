let Base = KG.getClass('Base');
KG.define('EF-Coupon', class extends Base{
    defineDBSchema(){
        return Schema.Coupon;
    }

    getDepModule(){
        return {
            Order : KG.get('EF-Order'),
            ClassStudent : KG.get('EF-ClassStudent'),
            CustomerCoupon : KG.get('EF-CustomerCoupon')
        };
    }


    defineMeteorMethod(){
        let self = this;

        return {
            checkRecordById(id){
                return !!this._db.findOne({_id: id.toUpperCase()});
            },

            checkCouponCodeValidByCustomerID(opts){
                let m = KG.DataHelper.getDepModule();

                opts = _.extend({
                    accountID : null,
                    couponCode : null,
                    overRequire : 0,
                    programID : null,
                    weekdayRequire : null
                }, opts);

                let one = this._db.findOne({_id:opts.couponCode.toUpperCase()});
                if(!one){
                    one = this._db.findOne({_id : (new RegExp('^'+opts.couponCode+'$', 'i'))});
                }
                if(!one){
                    return KG.result.out(false, new Meteor.Error('-1', 'Coupon Code is not valid'));
                }

                let count = one.maxCount,
                    forNewUser = one.validForNoBooked;
console.log(one);

                if(!_.contains(one.useFor, 'all') && !_.contains(one.useFor, opts.programID)){
                    console.log(one.useFor, opts.programID);
                    return KG.result.out(false, new Meteor.Error('-1', 'Coupon code can not be used for this program'));
                }
                if(!_.contains(one.weekdayRequire, 'all') && !_.contains(one.weekdayRequire, opts.weekdayRequire)){
                    return KG.result.out(false, new Meteor.Error('-1', `Coupon code can not be used for ${opts.weekdayRequire}`));
                }

                let over = parseFloat(one.overRequire||0) || 0;
                if(opts.overRequire < over){
                    return KG.result.out(false, new Meteor.Error('-1', `Coupon code only be used for more than $${over}`));
                }

                if(forNewUser){
                    var order = m.Order.getDB().findOne({
                        accountID : opts.accountID,
                        customerCouponID : opts.couponCode
                    });
                    if(order){
                        return KG.result.out(false, new Meteor.Error('-1', `Coupon code already used`));
                    }

                    let ctp = m.ClassStudent.getDB().find({
                        accountID : opts.accountID,
                        type : 'register',
                        status : {'$in' : ['checkouted']}
                    }).count();
                    if(ctp > 0){
                        return KG.result.out(false, new Meteor.Error('-1', 'Coupon code can not used because Customer' +
                            ' booked class before'));
                    }

                }
                else{
                    if(count < 1){
                        return KG.result.out(false, new Meteor.Error('count error', 'Coupon code is invalid'));
                    }
                    else{
                        let tpt = m.CustomerCoupon.getDB().find({
                            customerID : opts.accountID,
                            couponID : opts.couponCode,
                            status : 'checkouted'
                        }).count();

                        if(tpt >= count){
                            return KG.result.out(false, new Meteor.Error('count error', 'This coupon code is invalid for this account.'));
                        }
                    }
                }


                let d = moment(new Date());
                if(d.isBefore(moment(one.startDate), 'd') || d.isAfter(moment(one.endDate), 'd')){
                    return KG.result.out(false, new Meteor.Error('date error', 'Coupon code is invalid'));
                }



                return KG.result.out(true, one);
            },

            checkCouponCodeValidByClassList : function(opts){
                let m = KG.DataHelper.getDepModule();
                opts = _.extend({
                    accountID : null,
                    couponCode : null,
                    overRequire : 0,
                    classList : [],
                    amount : []
                }, opts);

                let rs = {
                    discountClass : [],
                    total : 0
                };
                let total = opts.overRequire,
                    coupon = null,
                    errorText = [];
                _.each(opts.classList, (cid, i)=>{
                    let co = m.Class.getDB().findOne({_id : cid});
                    let param = {
                        accountID : opts.accountID,
                        couponCode : opts.couponCode,
                        overRequire : opts.overRequire,
                        programID : co.programID,
                        weekdayRequire : co.schedule.day
                    };

                    let tmp = self.callMeteorMethod('checkCouponCodeValidByCustomerID', [param]);

                    rs[cid] = {
                        fee : opts.amount[i]
                    };
                    if(tmp.status){
                        rs.discountClass.push(cid);
                        coupon = tmp.data;
                        rs[cid].valid = true;
                    }
                    else{
                        rs[cid].valid = false;
                        errorText.push(tmp.statusText)
                    }
                });

                if(rs.discountClass.length < 1){
                    return {
                        flag : false,
                        error : errorText.join(' | ')
                    };
                }

                let reg = /^([0-9\.]+)([%/\$]{1})$/,
                    match = coupon.discount.match(reg);
                let n = match[1],
                    unit = match[2];

                _.each(opts.classList, (cid, i)=>{
                    if(!rs[cid].valid){
                        rs[cid].discount = 0;
                    }
                    else if(unit === '$'){
                        rs[cid].discount = parseFloat((n/rs.discountClass.length).toFixed(2));
                    }
                    else if(unit === '%'){
                        rs[cid].discount = parseFloat(rs[cid].fee*(n/100)).toFixed(2);
                    }

                    rs[cid].pay = rs[cid].fee - rs[cid].discount;
                    if(rs[cid].pay < 0){
                        rs[cid].pay = 0;
                    }

                    rs.total += rs[cid].pay;

                });

                if(unit === '$'){
                    rs.total = opts.overRequire - n;
                }



                if(rs.total < 0){
                    rs.total = 0;
                }

                rs.discountTotal = opts.overRequire - rs.total;

                rs.flag = true;
                rs.coupon = coupon;
                return rs;
            }
        };
    }

    insert(data){
        if(!data.maxCount){
            data.maxCount = 9999999999;
        }

        return super.insert(data);

    }

    insertWithCallback(data, callback){
        if(!data.maxCount){
            data.maxCount = 9999999999;
        }

        let self = this;
        if(!data._id){
            //data._id = Meteor.uuid();
            return callback(KG.result.out(false, new Meteor.Error(-601, 'Coupon Code is required')));
        }
        this.callMeteorMethod('checkRecordById', [data._id], {
            context : this,
            success : function(flag){
                if(flag){
                    return callback(KG.result.out(false, new Meteor.Error(-602, 'Coupon Code already existed')));
                }
                else{
                    return callback(this.insert(data));
                }
            }
        });

    }

    updateById(data, id){
        try{
            let rs = this._db.update({_id : id}, {'$set' : data});
            return KG.result.out(true, rs);
        }catch(e){
            return KG.result.out(false, e, e.reason);
        }
    }

    calculateDiscountResult(discount, num){
        let reg = /^([0-9\.]+)([%/\$]{1})$/,
            match = discount.match(reg);
        let n = match[1],
            unit = match[2];
        let rs = num;
        if(unit === '$'){
            rs = num - n;
        }
        else if(unit === '%'){
            rs = num-(num*(n/100));
        }
        if(rs < 0){
            rs = 0;
        }

        return rs;
    }

    useOnce(couponId, accountID){
        //TODO change to meteor method

        //let n = this._db.update({_id : couponId}, {
        //    '$inc' : {maxCount : -1}
        //});
        //console.log(n);
        let m = this.getDepModule();
        let n = m.CustomerCoupon.getDB().insert({
            customerID : accountID,
            couponID : couponId,
            status : 'checkouted'
        });

        return n;
    }
});

KG.define('EF-CustomerCoupon', class extends Base {
    defineDBSchema() {
        return Schema.CustomerCoupon;
    }
});
