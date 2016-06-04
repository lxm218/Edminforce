
/*
 * Apply a coupon to class registrations
 */
function applyCoupon(couponId, classStudents) {

    let coupon = Collections.coupon.findOne({_id: couponId});
    if (!coupon) {
        console.log('coupon not found:' + couponId);
        classStudents.forEach( (sc) => {sc.discounted = 0;});
        return;
    }

    // extract coupon type & value
    let reg = /^\s*([\d]*[\.]?[\d]*)\s*([%$])\s*$/;
    let result = coupon.discount.match(reg);
    if (!result) {
        consoloe.log('Invalid coupon setting', couponId);
        classStudents.forEach( (sc) => {sc.discounted = 0;});
        return;
    }
    let couponValue = Number(result[1]) || 0;
    // $ or %
    let couponType = result[2];

    console.log(couponType, couponValue);

    // check class and program
    coupon.useFor = coupon.useFor || [];
    coupon.weekdayRequire = coupon.weekdayRequire || [];
    coupon.weekdayRequire = coupon.weekdayRequire.map( (w) => w.toLowerCase() );
    let forAllPrograms = coupon.useFor.indexOf('all') >=0;
    let forAllWeekdays = coupon.weekdayRequire.indexOf('all') >=0;

    let totalDiscountable = 0;
    let discountedClasses = [];
    classStudents.forEach( (classData) => {
        let valid = true;

        classData.discounted = classData.fee;
        if (classData.type != 'makeup' && classData.type != 'register')
            return;

        let classInfo = Collections.class.findOne({_id: classData.classID}, {fields:{schedule:1,programID:1,sessionID:1,tuition:1}});
        if (!classInfo) {
            console.log("class not found", classData.classID);
            classData.discounted = 0;
            return;
        }

        // validate class program
        if (!forAllPrograms) {
            if (coupon.useFor.indexOf(classData.programID)<0)
                valid = false;
        }

        // validate class weekday
        if (valid && !forAllWeekdays) {
            if (coupon.weekdayRequire.indexOf(classData.schedule.day.toLowerCase()) < 0)
                valid = false;
        }

        if (valid) {
            totalDiscountable += classData.fee;
            discountedClasses.push(classData);
        }
    })
    
    // calculate discount amount for the entire order
    let discountPercent = 0;
    if (couponType == "$") {
        discountPercent = (totalDiscountable == 0) ? 1 : (couponValue / totalDiscountable);
    } else if (couponType == '%') {
        discountPercent = couponValue * 0.01;
    }
    discountPercent = 1 - discountPercent;
    discountedClasses.forEach( (cls) => {
        cls.discounted = cls.fee * discountPercent;
        if (cls.discounted < 0) cls.discounted = 0;
    });
}

function updateClassStudentDiscountedFee() {
    let orders = Collections.orders.find({
        status:"success",
        type: {$in:["register class", "makeup class"]}
    }).fetch();

    orders.forEach( (order) => {
        console.log(order._id, order.type, order.couponID, order.details);
        //console.log(order.amount, order.paymentTotal, order.discount);
        
        let scs = Collections.classStudent.find({
            _id: {$in: order.details}
        }).fetch();
        
        if (scs.length > 0 && scs[0].hasOwnProperty("discounted")) {
            console.log('already has discounted');
            return;
        }

        let result = EdminForce.Registration.getRegistrationSummary(order.accountID, order.details, order.couponID);
        console.log(result.students);
        
        //
        // calcCalssFee(scs);
        //
        // if (order.couponID) {
        //     console.log(order.couponID);
        //     applyCoupon(order.couponID, scs);
        // }
        //
        // scs.forEach( (sc) => {
        //     if(!order.couponID) {
        //         sc.discounted = sc.fee;
        //     }
        //     console.log(sc._id, sc.fee, sc.discounted);
        //
        //     //Collections.classStudent.update({_id: sc._id}, {$set: {discounted: sc.discounted}});
        // })
    })
}

Meteor.startup( () => {
    //EdminForce.Registration.syncClassRegistrationCount();
    updateClassStudentDiscountedFee();
})