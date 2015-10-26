(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.register/classRegisterViewControl.jsx              //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/14/15.                                                 //
 */                                                                    //
                                                                       //
//{                                                                    //
//    let classRegisterStore;                                          //
//    Dependency.autorun(function () {                                 //
//        classRegisterStore = Dependency.get('ClassRegister.ViewControl.store');
//    });                                                              //
//                                                                     //
//    Cal.CRClassRegisterViewControl = React.createClass({             //
//                                                                     //
//        mixins: [ReactMeteorData],                                   //
//        getMeteorData() {                                            //
//                                                                     //
//                                                                     //
//                                                                     //
//            return {                                                 //
//                registerStage:classRegisterStore.registerStage.get(),
//                isActive:classRegisterStore.getCurrentClassCount().count(), //当前session是否有课程
//                hasHistory:classRegisterStore.getHistoryClassCount().count()  //上个session是否有课程
//            }                                                        //
//        },                                                           //
//        getRegisterView(){                                           //
//                                                                     //
//                                                                     //
//                                                                     //
//            if(this.data.registerStage ==1){//                       //
//                console.log('stage1')                                //
//                                                                     //
//                return <Cal.CRBookTheSameTimePage />                 //
//                                                                     //
//            }else if(this.data.registerStage ==2){//current可自由选择     //
//                                                                     //
//                return <Cal.CRSelectClassPage />                     //
//                                                                     //
//            }else if(this.data.registerStage ==3){//return user可选择   //
//                                                                     //
//                return <Cal.CRSelectClassPage />                     //
//                                                                     //
//            }else if(this.data.registerStage ==4){//所有用户可选择          //
//                                                                     //
//                return <Cal.CRSelectClassPage />                     //
//                                                                     //
//            }                                                        //
//                                                                     //
//                                                                     //
//        },                                                           //
//                                                                     //
//        render() {                                                   //
//                                                                     //
//                                                                     //
//            return this.getRegisterView()                            //
//        }                                                            //
//                                                                     //
//    })                                                               //
//}                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
