let Base = KG.getClass('Base');
KG.define('EF-Coupon', class extends Base{
    defineDBSchema(){
        return Schema.Coupon;
    }

    getDepModule(){
        return {
            Order : KG.get('EF-Order')
        };
    }

    defineMeteorMethod(){
        let m = this.getDepModule();

        return {
            checkRecordById(id){
                return !!this._db.findOne({_id: id});
            },

            checkCouponCodeValidByCustomerID(opts){
                opts = _.extend({
                    accountID : null,
                    couponCode : null,
                    overRequire : 0,
                    programID : null,
                    weekdayRequire : null
                }, opts);

                let one = this._db.findOne({_id:opts.couponCode});
                if(!one){
                    return KG.result.out(false, new Meteor.Error('-1', 'Coupon Code is not valid'));
                }

                let count = one.maxCount,
                    forNewUser = one.validForNoBooked;

                if(!_.contains(one.useFor, 'all') && !_.contains(one.userFor, opts.programID)){
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
                    var order = m.Order.getDB.findOne({
                        accountID : opts.accountID,
                        customerCouponID : opts.couponCode
                    });
                    if(order){
                        return KG.result.out(false, new Meteor.Error('-1', `Coupon code already used`));
                    }

                }
                else{
                    if(count < 1){
                        return KG.result.out(false, new Meteor.Error('count error', 'Coupon code is invalid'));
                    }
                }

                let d = moment(new Date());
                if(d.isBefore(moment(one.startDate), 'd') || d.isAfter(moment(one.endDate), 'd')){
                    return KG.result.out(false, new Meteor.Error('date error', 'Coupon code is invalid'));
                }

                return KG.result.out(true, one);
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
            return callback(KG.result.out(false, new Meteor.Error(-601, 'Coupon Code is require')));
        }
        this.callMeteorMethod('checkRecordById', [data._id], {
            context : this,
            success : function(flag){
                if(flag){
                    return callback(KG.result.out(false, new Meteor.Error(-602, 'Coupon Code is exist')));
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
        let reg = /^([0-9]+)([%/\$]{1})$/,
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

    useOnce(couponId){
        this._db.update({_id : couponId}, {
            '$inc' : {maxCount : -1}
        });
        let n = this._db.findOne({_id:couponId}).maxCount;
        console.log(n);
        return n;
    }
});