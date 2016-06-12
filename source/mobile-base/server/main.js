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

Meteor.startup( () => {
    //EdminForce.Registration.syncClassRegistrationCount();
})