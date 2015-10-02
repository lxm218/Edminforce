/**
 * Created on 9/14/15.
 */

{
    let classRegisterStore;
    Dependency.autorun(function () {
        classRegisterStore = Dependency.get('ClassRegister.ViewControl.store');
    });

    Cal.CRClassRegisterViewControl = React.createClass({

        mixins: [ReactMeteorData],
        getMeteorData() {
            return {
                registerStatus:classRegisterStore.registerStatus.get()
            }
        },
        getRegisterView(){


            if(this.data.registerStatus ==1){

                return <Cal.CRBookTheSameTimePage />

            }else{//2 3 4

                return <Cal.CRSelectClassPage />

            }
            //0

        },

        render() {

            return this.getRegisterView()
        }

    })
}
