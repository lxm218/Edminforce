/**
 * Created by Jeffreyfan on 10/10/15.
 */


//
App.currentClass_in_selectedClasses=function(currentClass,selectedClasses){
    var classItem;
    for(var i=1;i<=3; i++){
        classItem = selectedClasses.get('class'+i)
        if(classItem && classItem._id == currentClass._id){
            return true
        }
    }
    return false;
}