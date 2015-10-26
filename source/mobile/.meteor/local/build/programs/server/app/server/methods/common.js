(function(){/**
 * Created on 9/30/15.
 */

Meteor.startup(function () {

    Meteor.methods({

            //this is an anti partern
            //导致 RangeError: Maximum call stack size exceeded todo check
            getAccountSwimmersClasses: function () {

                var accountId= this.userId

                if(!accountId) return{}


                //console.log(accountId)
                return accountId;


                var swimmers = DB.Swimmers.find({
                    accountId:accountId
                })


                var swimmerIds = swimmers.map(function(v){
                    return v._id
                })


                var classesRegister= DB.ClassesRegister.find({
                        swimmerId:{$in:swimmerIds}
                    }
                )


                var classIds= classesRegister.map(function(v){
                    return v.classId
                })
                classIds= _.uniq(classIds)

                var classes =DB.Classes.find({
                    _id:{$in:classIds}
                })

                var classesMap = {}
                classes.forEach(function(v){
                    classesMap[v._id]=v
                })



                var swimmerClasses={}

                classesRegister.forEach(function(v){
                    if(!swimmerClasses[v.swimmerId]){
                        swimmerClasses[v.swimmerId]=[]
                    }

                    swimmerClasses[v.swimmerId].push(v)

                })




                return{
                    swimmers:swimmers,
                    classes:classes,
                    classesMap:classesMap,
                    swimmerClasses:swimmerClasses
                }


            }
        }
    )


})
}).call(this);

//# sourceMappingURL=common.js.map
