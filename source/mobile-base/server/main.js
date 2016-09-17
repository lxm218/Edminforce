// function testEmailTemplate() {
//     fs = Npm.require( 'fs' ) ;
//     let order = Collections.orders.findOne({_id:'hcm949Pne249qpd6d'});
//     let email0 = EdminForce.Registration.sendRegistrationConfirmationEmail(order);
//     fs.writeFile( "test0.html", email0, (err)=>{console.log(err)}) ;
//
//     let classID = 'art_exploration_spring_2016_rachel_thursday_15_45';
//     let studentID = '4cmQpzRSwyHPvEJ32';
//     let lessonDate = new Date();
//     let email = EdminForce.Registration.sendTrialClassConfirmationEmail(studentID, classID, lessonDate);
//
//     fs.writeFile( "test.html", email, (err)=>{console.log(err)}) ;
// }

/**
 * Get all students of a session
 * @param sessionName
 * @returns {Array}
 */
function getStudentsBySession(sessionName) {
    let session = Collections.session.findOne({name:sessionName});
    if (!session) {
        console.log(`Session ${sessionName} not found`);
        return [];
    }

    console.log(`Loading students for session ${sessionName}`);

    let programs = Collections.program.find({}).fetch();

    // get all classes for this session
    let classes = Collections.class.find({sessionID:session._id}).fetch();
    let sessionStudents = [];
    classes.forEach( cls => {
        let classStudents = Collections.classStudent.find({
            classID:cls._id,
            status:'checkouted',
            type:'register'}).fetch();

        let studentIDs = classStudents.map( classStudent => classStudent.studentID );
        let students = Collections.student.find({_id: {$in: studentIDs}}, {fields:{name:1,accountID:1}}).fetch();
        students.forEach( student => {
            if (_.find(sessionStudents, {_id:student._id})) return;

            let customer = Collections.Customer.findOne({_id:student.accountID});
            if (customer) {
                let program = _.find(programs, {_id:cls.programID});
                student.phone = customer.phone;
                student.email = customer.email;
                student.className = EdminForce.utils.getClassName(program.name,session.name,cls);
                sessionStudents.push(student);
            }
            else {
                console.log(`Customer ${student.accountID} not found, studentID: ${student._id}`);
            }

            //console.log(student);
        });
    });

    console.log(`${sessionStudents.length} students for session ${sessionName}`);

    return sessionStudents;
}

/**
 * Generate a report that shows all non-returning students between two sessions
 */
function generateReport() {
    let fs = Npm.require( 'fs' );

    // get all students for a session
    let springStudents = getStudentsBySession('Spring 2016');
    let fallStudents = getStudentsBySession('Fall 2016');

    let nonReturningStudents = [];
    springStudents.forEach( student => {
        if (!_.find(fallStudents, {_id: student._id})) {
            nonReturningStudents.push(student);
            console.log(student);
        }
    })

    var buffer = new Buffer(JSON.stringify(nonReturningStudents)) ;
    fs.writeFileSync( "/vagrant/source/report.json", buffer ) ;
    console.log('Done');
}

Meteor.startup( () => {
    //EdminForce.Registration.syncClassRegistrationCount();
    //generateReport();
})