/**
 * Created by Jeffreyfan on 10/10/15.
 */


//一轮选择中 class重复检测
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

App.class_in_shoppingCart=function(classItem, shoppingCart){
    var shoppingCartItems = (shoppingCart && shoppingCart.items)||[]

    var exist= _.some(shoppingCartItems,function(cartItem){
        return cartItem.classId == classItem._id
               && cartItem.class1
               && cartItem.class2  //三个preference填写完整才算
               && cartItem.class3
    })

    return exist;

}