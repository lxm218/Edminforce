
const _classFields = {
    name:0,
    trial: 0,
    makeup: 0,
    createTime: 0,
    updateTime: 0,
    makeupClassFee: 0,
    makeupStudent: 0,
    trialStudent: 0,
    numberOfClass: 0,
    tuition: 0,
    level: 0
}

const _studentFields = {
    name:1,
    accountID: 1,
    profile: 1
}


/*
 * Lesson date field name used in trial & makeup count in class document
 */
 function getLessonDateFieldName(lessonDate) {
    return 'd' + moment(lessonDate).format('YYYYMMDD');
}

/**
 * returns a list of registration classes for a specified program, session, and student.
 * @param userId {String}
 * @param loadContextData {Boolean} whether return students/sessions/programs or not
 * @param studentID {String} student ID
 * @param programID {String} program ID
 * @param sessionID {String} sessionID
 * @returns {
 *      programID: String,
 *      sessionID: String,
 *      studentID: String,
 *      students: [student],
 *      programs: [program],
 *      sessions: [session],
 *      classes: [class]
 * }
 */
function getClasesForRegistration(userId, studentID, programID, sessionID) {
    let result = {
        classes:[],
    }
    let currentDate = new Date();

    result.students = Collections.student.find({accountID: userId},{fields:_studentFields}).fetch();
    result.sessions = Collections.session.find({registrationStartDate:{$lt:currentDate}, registrationEndDate:{$gt:currentDate}}).fetch();
    result.programs = Collections.program.find({}).fetch();

    if (!studentID || !_.find(result.students, {_id:studentID})) {
        result.students.length > 0 && (result.studentID = studentID = result.students[0]._id);
    }

    if (!programID || !_.find(result.programs, {_id:programID})) {
        result.programs.length > 0 && (result.programID = programID = result.programs[0]._id);
    }

    if (!sessionID || !_.find(result.sessions, {_id:sessionID})) {
        result.sessions.length > 0 && (result.sessionID = sessionID = result.sessions[0]._id);
    }

    if (!studentID || !programID || !sessionID) return result;

    let student = _.find(result.students, {_id:studentID});
    if (!student) return result;

    let selectedSession = _.find(result.sessions, {_id:sessionID});
    if (!selectedSession) return result;
    
    let program = _.find(result.programs, {_id:programID});
    if (!program) return result;

    // check if it's the priority registration time for the selected session
    result.firstRegistrationWeekSession = (currentDate >= selectedSession.registrationStartDate && currentDate <= moment(selectedSession.registrationStartDate).add(7,"d").toDate());

    if (result.firstRegistrationWeekSession) {
        
        // get all current class IDs of the selected student
        let studentClasses = Collections.classStudent.find({studentID, type:'register', status:'checkouted'}, {fields:{classID:1}}).fetch();
        let classIDs = studentClasses.map( (sc) => sc.classID );
        
        let currentClasses = Collections.class.find({status:'Active',_id: {$in:classIDs}}).fetch();
        let curProgramIDs = [];
        let curTeachers = [];
        let curClassDays = [];
        _.forEach(currentClasses, (cc) => {
            if (curProgramIDs.indexOf(cc.programID) <0) curProgramIDs.push(cc.programID);
            if (curTeachers.indexOf(cc.teacher)<0) curTeachers.push(cc.teacher);
            if (curClassDays.indexOf(cc.schedule.day)) curClassDays.push(cc.schedule.day);
        });

        // for first week registration, program list is hidden, so we are not filtering by program
        let classes = Collections.class.find({
            sessionID,
            programID: {$in: curProgramIDs},
            teacher: {$in: curTeachers},
            'schedule.day' : {$in: curClassDays}
        }, {
            fields: _classFields
        }).fetch();

        // filter by eligibility of first week registration
        //c.schedule.day === classData.schedule.day &&
        let numClasses = classes.length;
        if (numClasses > 0) {
            classes = _.filter(classes, (classData) => {
                return _.find(currentClasses,(c) => {
                    return EdminForce.utils.compareTime(c.schedule.time,classData.schedule.time)
                });
            });

            result.firstRegistrationWeekAlert = (numClasses != classes.length);
        }

        result.classes = classes;
    }
    else {
        result.classes = Collections.class.find({
            programID,
            sessionID
        }, {
            fields: _classFields
        }).fetch();
    }

    // other checks
    result.classes = _.filter(result.classes, (classInfo) => {
        //  - check available space
        if (classInfo.maxStudent <= classInfo.numberOfRegistered)
            return false;

        // - check if the student already registered
        let existedClass = Collections.classStudent.find({
            classID: classInfo["_id"],
            studentID,
            type: {
                $in:['register']
            },
            status: {
                $in: ['pending', 'checkouting', 'checkouted']
            }
        }).count();
        if (existedClass >0) return false;

        // - check gender & age
        if (!EdminForce.Registration.validateStudentForClass(classInfo, student))
            return false;

        // updateClassName
        program = _.find(result.programs, {_id:classInfo.programID});
        classInfo.name = EdminForce.utils.getClassName(program.name, selectedSession.name, classInfo);

        return true;
    });

    result.studentID = studentID;
    result.programID = programID;
    result.sessionID = sessionID;

    return result;
}

/* 
 * book classes for a student
 */
function bookClasses(userId, studentID, classIDs) {

    let bookedIDs = [];
    classIDs.forEach( (classID) => {
        let classData = Collections.class.findOne({_id:classID}, {fields:{programID:1,maxStudent:1, numberOfRegistered:1}});
        
        if (classData && classData.numberOfRegistered < classData.maxStudent) {
            // update the class registered count
            let nUpdated = Collections.class.update({
                _id:classID,
                numberOfRegistered: {$lt:classData.maxStudent}},{
                $inc: {numberOfRegistered: 1}
            });

            if (nUpdated) {
                // insert a record in classStudent collection
                let classStudentID = Collections.classStudent.insert({
                    accountID: userId,
                    classID,
                    programID: classData.programID,
                    studentID,
                    status: "pending",
                    type: 'register',
                });
                bookedIDs.push(classStudentID);
            }
        }
    })

    return bookedIDs;
}

/*
 * Try allocate a makeup class space
 */
function updateMakeupCount(classID, lessonDate) {
    let strLessonDate = EdminForce.Registration.getLessonDateFieldName(lessonDate);
    

    let trialCountField = 'this.trial.' + strLessonDate;
    let makeupCountField = 'this.makeup.' + strLessonDate;
    
    let trialCount = `(${trialCountField}?${trialCountField}:0)`;
    let makeupCount = `(${makeupCountField}?${makeupCountField}:0)`;
    //this has to be consistent with "isAvailableForMakeup"
    let whereQuery = `${trialCount}+${makeupCount}+this.numberOfRegistered<this.maxStudent && ${makeupCount}<this.makeupStudent`;
    
    //console.log(classID);
    //console.log(whereQuery);
    
    let incData = {};
    incData['makeup.'+strLessonDate] = 1;

    return Collections.class.update({
        _id: classID,
        $where: whereQuery
    }, {
        $inc: incData
    });
}

/* 
 * book a makeup class for a student
 */
function bookMakeup(userId, studentID, classID, lessonDate) {
    let classData = Collections.class.findOne({
        _id:classID
    });
    
    if (!classData)
        throw new Meteor.Error(500, 'Class not found','Invalid class id: ' + classID);

    if (!EdminForce.Registration.isAvailableForMakeup(classData, lessonDate))
        throw new Meteor.Error(500, 'The selected class does not have space for makeup','Class id: ' + classID);;

    if (updateMakeupCount(classID, lessonDate)> 0) {
        // insert a class student record
        return Collections.classStudent.insert({
            accountID: userId,
            classID,
            studentID,
            programID: classData.programID,
            lessonDate,
            status: "pending",
            type: "makeup",
            createTime: new Date()
        });
    }

    throw new Meteor.Error(500, 'The selected class does not have space for makeup','Class id: ' + classID);;
}

/*
 * return class registration fee
 * @param - classData
 *        - session
 * @return class registration fee
 * */
function calculateRegistrationFee(classData, session) {
    let tuition = lodash.toNumber(classData.tuition.money);
    return classData.tuition.type==='class'? tuition * KG.get('EF-Class').calculateNumberOfClass(classData,session,true) : tuition
}


function getDocumentFromCache(documentName, id, cache) {
    let doc = lodash.find(cache, {_id:id});
    if (!doc) {
        doc = Collections[documentName].findOne({_id:id});
        doc && (cache.push(doc));
    }
    return doc;
}

/*
 * Apply a coupon to shopping cart
 */
function applyCoupon(userId, couponId, cart) {

    let coupon = Collections.coupon.findOne({_id: couponId});
    if (!coupon) {
        cart.couponMsg = 'Cannot verify this coupon, please make sure you typed correct coupon';
        return;
    }

    // extract coupon type & value
    let reg = /^\s*([\d]*[\.]?[\d]*)\s*([%$])\s*$/;
    let result = coupon.discount.match(reg);
    if (!result) {
        cart.couponMsg = 'Invalid coupon setting';
        return;
    }
    let couponValue = Number(result[1]) || 0;
    // $ or %
    let couponType = result[2];


    // check coupon time
    coupon.startDate = coupon.startDate || new Date(1900,1,1);
    coupon.endDate = coupon.endDate || new Date(9999,1,1);
    let currentTime = new Date();
    if (currentTime < coupon.startDate || currentTime > coupon.endDate) {
        cart.couponMsg = 'Invalid Coupon';
        return;
    }

    // check if the coupon is only valid for new customers
    let customer = Collections.Customer.findOne({_id: userId});
    let isNewCustomer = customer && customer.hasRegistrationFee;
    if (coupon.validForNoBooked && !isNewCustomer) {
        cart.couponMsg = 'This Coupon is Only Valid for New Customers';
        return;
    }

    //  check how many times the coupon has been used
    let usedCoupons = Collections.customerCoupon.find({
        customerID: userId,
        couponID: couponId,
        status: {
            $nin: ['canceled']
        }
    }).count();

    let maxCount = Number(coupon.maxCount);
    if (maxCount && usedCoupons >= maxCount) {
        cart.couponMsg = "This coupon can only be used " + coupon.maxCount + " times";
        return;
    }

    // check minimum amount
    let minAmount = Number(coupon.overRequire);
    if (minAmount && cart.total < minAmount) {
        cart.couponMsg = "This coupon only valid when you buy more than " + coupon.overRequire;
        return;
    }

    // passed all validations, now calculate discount amount
    cart.couponMsg = '';

    // check class and program
    coupon.useFor = coupon.useFor || [];
    coupon.weekdayRequire = coupon.weekdayRequire || [];
    coupon.weekdayRequire = coupon.weekdayRequire.map( (w) => w.toLowerCase() );
    let forAllPrograms = coupon.useFor.indexOf('all') >=0;
    let forAllWeekdays = coupon.weekdayRequire.indexOf('all') >=0;

    cart.totalDiscountable = 0;
    let discountedClasses = [];
    cart.students.forEach( (student) => {
        student.classes.forEach( (classData) => {
            let valid = true;
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
                cart.totalDiscountable += classData.classFee;
                discountedClasses.push(classData);
            }
        })
    })

    // calculate discount amount for the entire order
    let discountAmount = 0;
    if (couponType == "$") {
        discountAmount = couponValue;
    } else if (couponType == '%') {
        discountAmount = cart.totalDiscountable * couponValue * 0.01;
    }
    discountAmount > cart.totalDiscountable && (discountAmount = cart.totalDiscountable);

    // calculate discounted fee for each class, we need to save this for refund
    let discountPercent = (couponType == "%") ? (couponValue >= 100 ? 1 : couponValue * 0.01) : discountAmount/cart.totalDiscountable;
    discountPercent = 1 - discountPercent;
    discountedClasses.forEach( (cls) => {
        cls.discounted = cls.classFee * discountPercent;
        if (cls.discounted < 0) cls.discounted = 0;
    });

    cart.discount = discountAmount;
    cart.appliedCouponId = couponId;
}

/* 
 * Retrieves registration summary for a list of pending registrations
 * {
 *      student,
 *      classes[],
 *      registrationFee
 * }
 */
function getRegistrationSummary(userId, studentClassIDs, couponId) {
    let result = {
        // isNewCustomer
        // registrationFee
        // couponMsg
        // appliedCouponId
        students:[],
        total: 0,
        totalDiscountable: 0,
        discount: 0,
        schoolCredit: 0,
    }
    
    let query = {
        accountID: userId,
        status: 'pending'
    }
    if (studentClassIDs) {
        query._id = {$in: studentClassIDs}
    }
    let studentClasses = Collections.classStudent.find(query, {
        fields: {classID:1, studentID:1, programID:1,type:1,lessonDate:1},
        sort: {studentID:-1}
    }).fetch();

    let sessions = [];
    let programs = [];

    let groupByStudent = lodash.groupBy(studentClasses, 'studentID');
    lodash.forOwn(groupByStudent, (value,key) => {
        let student = Collections.student.findOne({_id: key}, {fields:{name:1}});
        if (!student) return;

        student.classes = [];
        lodash.forEach(value, (sc) => {
            let classData = Collections.class.findOne({_id: sc.classID}, {fields:{schedule:1,programID:1,sessionID:1,tuition:1}});
            if (!classData) return;

            let session = getDocumentFromCache('session', classData.sessionID, sessions);
            if (!session) throw new Meteor.Error(500, 'Session not found','Invalid session id: ' + classData.sessionID);

            let program = getDocumentFromCache('program', classData.programID, programs);
            if (!program) throw new Meteor.Error(500, 'Program not found','Invalid program id: ' + classData.programID);

            sc.name = EdminForce.utils.getClassName(program.name, session.name, classData);
            // we need schedule for coupon validation
            sc.schedule = classData.schedule;

            if (sc.type === 'makeup') {
                sc.classFee = lodash.isNumber(classData.makeupClassFee) ? classData.makeupClassFee : 5;
                result.totalDiscountable += sc.classFee;
            }
            else {
                sc.classFee = calculateRegistrationFee(classData, session);
                result.totalDiscountable += sc.classFee;
            }
            sc.discounted = sc.classFee;
            
            result.total += sc.classFee;

            student.classes.push(sc);
        });

        result.students.push(student);
    });

    // registration fee
    let customer = Collections.Customer.findOne({_id: userId});
    result.isNewCustomer = customer && customer.hasRegistrationFee;
    if (result.isNewCustomer) {
        result.registrationFee = 25;
        (result.total > 0) && (result.total += 25);
    }
    else {
        result.registrationFee = 0;
    }

    // get customer's school credit
    customer && customer.hasOwnProperty('schoolCredit') && (result.schoolCredit = customer.schoolCredit);

    // check coupon
    if (couponId && result.totalDiscountable > 0) {
        applyCoupon(userId, couponId, result);
    }

    // save classFee back into classStudent record
    // so we can show it in billing report
    lodash.forOwn(groupByStudent, (value,key) => {
        lodash.forEach(value, (sc) => {
            Collections.classStudent.update(sc._id, {$set: {fee: sc.classFee, discounted: sc.discounted}});
        });
    });

    return result;
}


/*
 * release makeup/trial space
 */
function releaseTrialAndMakeupSpace(trialOrMakeup, classID, lessonDate) {
    let query = {
        _id: classID,
    }

    let strLessonDate =  EdminForce.Registration.getLessonDateFieldName(lessonDate);
    let lessonDateField = trialOrMakeup + '.' + strLessonDate;
    query[lessonDateField] = {$gt: 0};

    let incData = {};
    incData[lessonDateField] = -1;
    return Collections.class.update(query, {$inc: incData});
}

/*
 * update the count in class record after a registration 
 * in classStudent is removed or expired
 */
function releaseRegistrationSpace(sc) {
    
    if (sc.type == 'register') {
        // regular class
        Collections.class.update( {
            _id: sc.classID,
            numberOfRegistered: {$gt: 0}
        }, {
            $inc: {
                numberOfRegistered: -1
            }
        });
    }
    else
    if (sc.type === 'makeup' || sc.type === 'trial') {
        // makeup or trial
        releaseTrialAndMakeupSpace(sc.type, sc.classID, sc.lessonDate);
    }
}

/*
 * delete a pending registration and release the space
 */
function removePendingRegistration(userId, studentClassId) {

    let sc = Collections.classStudent.findOne({_id:studentClassId});
    if (!sc) return;
    // it's important to include status & account id in the query condition of the following
    // remove call. It will ensure we only remove pending record that belongs to the current user.
    let nRemoved = Collections.classStudent.remove({_id:studentClassId, accountID:userId, status: 'pending'});
    if (nRemoved == 0) return;

    releaseRegistrationSpace(sc);
}

/* 
 * expire a pending registration and release the space
 */
function expirePendingRegistration(sc) {

    let nUpdated = Collections.classStudent.update({
        _id: sc._id,
        status: 'pending'
    }, {
        $set: {
            status: 'canceled',
            updateTime: new Date()
        }
    });
    
    if (nUpdated <=0 ) return;
    
    // release class space
    releaseRegistrationSpace(sc);
}

function getStudentIDFromRegistration(classStudentIDs) {
    if (!classStudentIDs || classStudentIDs.length == 0)
        return "";

    // find all student IDs
    let students = Collections.classStudent.find(
        {_id: {$in: classStudentIDs}},
        {fields: {studentID:1}}).fetch();
    let studentIDs = students.map( (s) => s._id);

    return _.uniq(studentIDs).join()
}

/*
 * Update after a successful payment
 */
function postPaymentUpdate(userId, order, paymentType, paymentTotal, paymentSource) {

    // update registration fee flag
    Collections.Customer.update({
        _id: userId,
        hasRegistrationFee:true
    },{
        $set: {
            hasRegistrationFee: false
        }
     });

    // update order
    let orderUpdate = {
        status: 'success',
        paymentType,
        paymentTotal,
        paymentSource,
    };

    if (order.couponID) {
        orderUpdate.customerCouponID = Collections.customerCoupon.insert({
            customerID: userId,
            couponID: order.couponID,
            status: 'checkouted'
        });
    }

    Collections.orders.update({
        _id: order._id,
        accountID: userId
    }, {
        $set: orderUpdate
    });

    // update classStudent
    let nUpdated = Collections.classStudent.update( {
        _id: {$in: order.details},
        status: 'pending'
    }, {
        $set: {
            status: 'checkouted'
        }
    });

    let result = {};

    // check if any pending booking has expired
    if (nUpdated < order.details.length) {
        let expiredRegistrations = Collections.classStudent.find({
            _id: {$in: order.details},
            status: {$ne:'checkouted'}
        }).fetch();

        console.log('expired registrations');
        console.log(expiredRegistrations);
        
        let failedRegistrations = [];

        // try to re-book
        expiredRegistrations.forEach( (sc) => {
            let nRebooked = 0;
            if (sc.type === 'register') {
                let classData = Collections.class.findOne({_id: sc.classID});
                if (classData) {
                    nRebooked = Collections.class.update({
                        _id: sc.classID,
                        numberOfRegistered: {$lt: classData.maxStudent}
                    }, {
                        $inc: {
                            numberOfRegistered: 1
                        }
                    })
                }
            }
            else
            if (sc.type === 'makeup') {
                nRebooked = updateMakeupCount(sc.classID, sc.lessonDate)
            }

            // rebooked
            if (nRebooked>0) {
                Collections.classStudent.update({_id: sc._id}, {$set:{status:'checkouted'}});
            }
            else {
                failedRegistrations.push(sc._id);
            }
        });

        if (failedRegistrations.length > 0) {
            // fill failed bookings with student name and class name
            //result.error = 'registrationExpired';
            result.expiredRegistrationIDs = failedRegistrations.join();
        }
    }

    // send confirmation email
    let emailData = {
        "amount": order.amount,
        //"classes": classes,
        "registrationFee" : order.registrationFee || 0,
        "couponDiscount": order.discount || 0,
        "processFee": paymentTotal - order.amount,
        "total": paymentTotal
    };

    let content;
    let subject;
    let sc0 = Collections.classStudent.findOne({_id: order.details[0]}, {fields:{type:1}});
    if (sc0.type === 'makeup') {
        emailData.classes = EdminForce.Registration.getMakeupClassesForEmail(order.details);
        content = EdminForce.Registration.getMakeupConfirmEmailTemplate(emailData);
        subject = "Make Up Class Booking Confirmation";
    }
    else {
        emailData.classes = EdminForce.Registration.getClassesForEmail(order.details);
        content = EdminForce.Registration.getRegularClassConfirmEmailTemplate(emailData);
        subject = "Registration Confirmation";
    }
    EdminForce.utils.sendEmailHtml(Meteor.user().emails[0].address, subject,content);

    return result;
}

/*
 * get a list of expired class student records that can't be re-booked becase
 * there is no space in the classes.
 */
function getExpiredRegistrations(userId, expiredRegistrationIDs) {
    
    let expiredRegistrations = Collections.classStudent.find({
        _id: {$in: expiredRegistrationIDs},
        accountID: userId
    }).fetch();

    let result = [];
    let sessions = [];
    let programs = [];
    let students = [];
    expiredRegistrations.forEach( (sc) => {
        let classData = Collections.class.find({_id: sc.classID});
        let program = null;
        let session = null;
        let student = null;
        if (classData) {
            session = getDocumentFromCache('session', classData.sessionID, sessions);
            program = getDocumentFromCache('program', classData.programID, programs);
            student = getDocumentFromCache('student', sc.studentID, students);
        }
       
        if (classData && program && session) {
            sc.className = EdminForce.utils.getClassName(program.name, session.name, classData);
        }
        if (student) {
            sc.studentName = student.name;
        }
       
        result.push(sc);
    })
    
    return result;
}

function applySchoolCredit(userId, amount) {
    if (amount == 0)
        return true;
    
    return Collections.Customer.update({
        _id: userId,
        schoolCredit: {$gte: amount}
    }, {
        $inc: {
            schoolCredit: -amount
        }
    });
}

function payECheck(userId, checkPaymentInfo) {

    let order = Collections.orders.findOne({_id: checkPaymentInfo.orderId});
    if (!order) throw new Meteor.Error(500, 'Order not found','Invalid order id: ' + checkPaymentInfo.orderId);

    // deduct school credit if it's applied
    if (order.schoolCredit > 0) {
        let schoolCreditApplied = applySchoolCredit(userId, order.schoolCredit);
        if (!schoolCreditApplied) {
            // school credit is not enough
            throw new Meteor.Error('insufficientSchoolCredit');
        }
    }


    // process payment
    // if success,
    //      update pending class, try to rebook if expired
    //      update order
    //      update custom coupon
    var paymentInfo = {
        "createTransactionRequest": {
            "merchantAuthentication": {
                "name": "9XD2ru9Z",
                "transactionKey": "5yZ52WCb2EC5et2c"
            },
            "refId": "123461",
            "transactionRequest": {
                "transactionType": "authCaptureTransaction",
                "amount": "5",
                "payment": {
                    "bankAccount": {
                        "accountType": "checking",
                        "routingNumber": "125000024",
                        "accountNumber": "12345678",
                        "nameOnAccount": "John Doe"
                    }
                },
                "profile":{
                    "createProfile": false
                },
                "poNumber": "456654",
                "customer": {
                    "id": "99999456656"
                },
                "customerIP": "192.168.1.1",
                "transactionSettings": {
                    "setting": {
                        "settingName": "testRequest",
                        "settingValue": "false"
                    }
                },
            }
        }
    };

    paymentInfo.createTransactionRequest.transactionRequest.payment.bankAccount.routingNumber = checkPaymentInfo.routingNumber
    paymentInfo.createTransactionRequest.transactionRequest.payment.bankAccount.accountNumber = checkPaymentInfo.accountNumber
    paymentInfo.createTransactionRequest.transactionRequest.payment.bankAccount.nameOnAccount = checkPaymentInfo.nameOnAccount

    paymentInfo.createTransactionRequest.refId = checkPaymentInfo.orderId;
    paymentInfo.createTransactionRequest.transactionRequest.customer.id = userId;
    let paymentTotal = order.amount - order.schoolCredit + 0.5;
    paymentTotal = Number(paymentTotal.toFixed(2));
    paymentInfo.createTransactionRequest.transactionRequest.amount = paymentTotal;

    var URL = 'https://api.authorize.net/xml/v1/request.api'
    var response = HTTP.call('POST',URL, {data: paymentInfo});

    //console.log(response);

    if (response &&
        response.data &&
        response.data.messages &&
        response.data.messages.message[0].code == "I00001") {
        return postPaymentUpdate(userId, order, 'echeck', paymentTotal, checkPaymentInfo.paymentSource);
    }
    else {
        throw new Meteor.Error(500, 'unsuccessful payment transaction');
    }
}

function payCreditCard(userId, creditCardPaymentInfo) {
    let order = Collections.orders.findOne({_id: creditCardPaymentInfo.orderId});
    if (!order) throw new Meteor.Error(500, 'Order not found', 'Invalid order id: ' + creditCardPaymentInfo.orderId);

    // deduct school credit if it's applied
    if (order.schoolCredit > 0) {
        let schoolCreditApplied = applySchoolCredit(userId, order.schoolCredit);
        if (!schoolCreditApplied) {
            // school credit is not enough
            throw new Meteor.Error('insufficientSchoolCredit');
        }
    }

    var paymentInfo = {
        "createTransactionRequest": {
            "merchantAuthentication": {
                // "name": "42ZZf53Hst",
                // "transactionKey": "3TH6yb6KN43vf76j"
                "name": "9XD2ru9Z",
                "transactionKey": "5yZ52WCb2EC5et2c"
            },
            "refId": "123461",
            "transactionRequest": {
                "transactionType": "authCaptureTransaction",
                "amount": "5",
                "payment": {
                    "creditCard": {
                        "cardNumber": "5424000000000015",
                        "expirationDate": "1220",
                        "cardCode": "999"
                    }
                },
                "profile":{
                    "createProfile": false

                },
                "poNumber": "456654",
                "customer": {
                    "id": "99999456656"
                },
                "billTo": {
                    "firstName": "Ellen",
                    "lastName": "Johnson",
                    "company": "Souveniropolis",
                    "address": "14 Main Street",
                    "city": "Pecan Springs",
                    "state": "TX",
                    "zip": "44628",
                    "country": "USA"
                },

                "customerIP": "192.168.1.1",
                "transactionSettings": {
                    "setting": {
                        "settingName": "testRequest",
                        "settingValue": "false"
                    }
                },
            }
        }
    };

    paymentInfo.createTransactionRequest.transactionRequest.payment.creditCard.cardNumber = creditCardPaymentInfo.creditCardNumber;
    paymentInfo.createTransactionRequest.transactionRequest.payment.creditCard.expirationDate = creditCardPaymentInfo.expirationDate;
    paymentInfo.createTransactionRequest.transactionRequest.payment.creditCard.cardCode = creditCardPaymentInfo.ccv;
    paymentInfo.createTransactionRequest.transactionRequest.billTo.firstName = creditCardPaymentInfo.firstName;
    paymentInfo.createTransactionRequest.transactionRequest.billTo.lastName = creditCardPaymentInfo.lastName;
    paymentInfo.createTransactionRequest.transactionRequest.billTo.address = creditCardPaymentInfo.address;
    paymentInfo.createTransactionRequest.transactionRequest.billTo.city = creditCardPaymentInfo.city;
    paymentInfo.createTransactionRequest.transactionRequest.billTo.state = creditCardPaymentInfo.state;
    paymentInfo.createTransactionRequest.transactionRequest.billTo.zip = creditCardPaymentInfo.zip;

    paymentInfo.createTransactionRequest.refId = creditCardPaymentInfo.orderId;
    paymentInfo.createTransactionRequest.transactionRequest.customer.id = userId;
    let paymentTotal = (order.amount-order.schoolCredit) * 1.03;
    paymentTotal = Number(paymentTotal.toFixed(2));
    paymentInfo.createTransactionRequest.transactionRequest.amount = paymentTotal;
    let URL = 'https://api.authorize.net/xml/v1/request.api';
    // let URL = 'https://apitest.authorize.net/xml/v1/request.api';
    let response = HTTP.call('POST',URL, {data: paymentInfo});
    // console.log(response);

    // console.log(creditCardPaymentInfo);
    // let response = {
    //     data: {
    //         messages: {
    //             message: [{
    //                 code: 'I00001'
    //             }]
    //         }
    //     }
    // }

    if (response &&
        response.data &&
        response.data.messages &&
        response.data.messages.message[0].code == "I00001") {
        return postPaymentUpdate(userId, order, 'credit card', paymentTotal, creditCardPaymentInfo.paymentSource);
    }
    else {
        let userName = creditCardPaymentInfo.firstName + ' ' + creditCardPaymentInfo.lastName;
        let errorMessage = {
            "orderID" : creditCardPaymentInfo.orderId,
            "type" : "creditCard",
            "name" : userName,
            "message": response
        }
        Collections.log.insert({type: "Payment Error" ,logData: errorMessage});
        throw new Meteor.Error(500, 'unsuccessful payment transaction');
    }
}

/*
 * pay the entire order using school credit
 */
function payWithSchoolCredit(userId, paymentInfo) {

    // deduct school credit
    let schoolCreditApplied = applySchoolCredit(userId, paymentInfo.amount);
    if (!schoolCreditApplied) {
        // school credit is not enough
        throw new Meteor.Error('insufficientSchoolCredit');
    }

    // add a new order record
    let order = {
        accountID: userId,
        studentID: getStudentIDFromRegistration(paymentInfo.details),
        details: paymentInfo.details,
        status: 'waiting',
        amount: paymentInfo.amount,
        paymentType: 'school credit',
        paymentSource: paymentInfo.paymentSource,
        discount: paymentInfo.discount,
        registrationFee: paymentInfo.registrationFee,
        couponID: paymentInfo.couponID,
        schoolCredit: paymentInfo.amount
    }
    order._id = Collections.orders.insert(order);

    // update registration
    return postPaymentUpdate(userId, order, 'school credit', 0, paymentInfo.paymentSource);
}

/*
 * Returns billing summary, current & history
 */
function getBillingSummary(userId) {
    let currentOrder = getRegistrationSummary(userId);
    let historyOrders = Collections.orders.find({accountID:userId, status:'success'}, {fields:{updateTime:1, paymentTotal:1,status:1,schoolCredit:1}}).fetch();

    return {
        historyOrders,
        // current pending billing items, grouped by student
        currentOrder,
    }
}

function getHistoryOrderDetails(userId, orderId) {
    let result = {
        registrationFee: 0,
        students:[],
        total: 0,
        discount: 0,
    }
    
    let order = Collections.orders.findOne(orderId);
    if (!order) return result;

    result.registrationFee = order.registrationFee;
    result.total = order.amount;
    order.hasOwnProperty('discount') && (result.discount = order.discount);

    let classStudents = Collections.classStudent.find({
        _id: {$in: order.details}
    }, {
        fields: {
            classID:1, 
            studentID:1, 
            programID:1,
            type:1,
            lessonDate:1, 
            fee:1
        }
    }).fetch();

    for (let sc of classStudents) {
        let student = lodash.find(result.students, {_id: sc.studentID});
        if (!student) {
            student = Collections.student.findOne(sc.studentID, {fields: _studentFields});
            if (student) {
                student.classes = [];
                result.students.push(student);
            }
        }
        if (!student) continue;
        sc.classFee = sc.fee || 0;

        if (order.type === "register class" && sc.type === "makeup")
            sc.name = "makeup class";
        else
            sc.name = order.type;

        student.classes.push(sc);
    }
    
    return result;
}


/*
 * Sync classStudent collection and class collection
 */
function syncClassRegistrationCount() {

    // db['EF-ClassStudent'].aggregate( [ {$match: {status:'checkouted', type:'register'}}, {$group: {_id: {classID: "$classID", type: "$type"}, count:{$sum:1}}} ]);
    // db['EF-ClassStudent'].aggregate( [ {$match: {status:'checkouted'}}, {$group: {_id: {classID: "$classID", type: "$type"}, count:{$sum:1}}} ]);
    // db['EF-ClassStudent'].aggregate( [ {$match: {classID: classItem._id, status: 'checkouted', type: 'trial'}}, {$group: {_id: "$lessonDate", count:{$sum:1}}} ]);
    // db['EF-ClassStudent'].aggregate( [ {$match: {status: 'checkouted', type: 'trial'}}, {$group: {_id: {classID: "$classID", lessonDate:"$lessonDate"}, count:{$sum:1}}} ]);
    console.log('update class registration data')

    let classes = Collections.class.find({},{fields:{_id:1}}).fetch();
    console.log('Number of classes: ' + classes.length);

    classes.forEach( (classItem) => {

        console.log('Update class ' + classItem._id);

        // get number of registered regular students
        let numberOfRegistered = Collections.classStudent.find({classID: classItem._id, status: 'checkouted', type:'register'}).count();
        let updateData = {
            numberOfRegistered,
            trial: {},
            makeup: {}
        }

        // use mongo aggregate pipeline to get trial & make up info for each class day
        let pipeline = [
            {$match: {classID: classItem._id, status: 'checkouted', type: {$in:['trial','makeup']}}},
            {$group: {_id: {lessonDate: "$lessonDate", type: "$type"}, count:{$sum:1}}}
        ];
        let trialAndMakeups = Collections.classStudent.aggregate(pipeline);

        console.log(trialAndMakeups);

        trialAndMakeups.forEach( (res) => {
            let lessonDateStr = EdminForce.Registration.getLessonDateFieldName(res._id.lessonDate);
            updateData[res._id.type][lessonDateStr] = res.count;
        })

        Collections.class.update({_id: classItem._id}, {$set: updateData});
    });
}


EdminForce.Registration.calculateRegistrationFee = calculateRegistrationFee;
EdminForce.Registration.getLessonDateFieldName = getLessonDateFieldName;
EdminForce.Registration.getClasesForRegistration = getClasesForRegistration;
EdminForce.Registration.bookClasses = bookClasses;
EdminForce.Registration.getRegistrationSummary = getRegistrationSummary;
EdminForce.Registration.removePendingRegistration = removePendingRegistration;
EdminForce.Registration.expirePendingRegistration = expirePendingRegistration;
EdminForce.Registration.payECheck = payECheck;
EdminForce.Registration.payCreditCard = payCreditCard;
EdminForce.Registration.getExpiredRegistrations = getExpiredRegistrations;
EdminForce.Registration.bookMakeup = bookMakeup;
EdminForce.Registration.getBillingSummary = getBillingSummary;
EdminForce.Registration.getHistoryOrderDetails = getHistoryOrderDetails;
EdminForce.Registration.syncClassRegistrationCount = syncClassRegistrationCount;
EdminForce.Registration.payWithSchoolCredit = payWithSchoolCredit;
EdminForce.Registration.getStudentIDFromRegistration = getStudentIDFromRegistration;