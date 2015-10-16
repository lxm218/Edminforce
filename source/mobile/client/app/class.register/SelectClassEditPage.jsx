

{
    //let CRSelectClassEditPageStoreClass;
    //Dependency.autorun(function () {
    //    CRSelectClassEditPageStoreClass = Dependency.get('classRegister.CRSelectClassEditPage.storeClass');
    //});
    let PageStore;
    Dependency.autorun(function () {
        PageStore = Dependency.get('classRegister.CRSelectClassEditPage.store');
    });




    function getShoppingItem(cart,swimmerId, classId){
        if(!cart || !cart.items) return;
        var items = cart.items

        for(var i=0;i<items.length;i++){
            if(items[i].swimmerId ==swimmerId
                &&items[i].classId == classId
            ){
                return items[i]
            }
        }
        return null
    }


    Cal.CRSelectClassEditPage = React.createClass({
        propTypes:{
            cartId:React.PropTypes.string,
            swimmerId:React.PropTypes.string,
            classId:React.PropTypes.string,
            preferenceNum:React.PropTypes.number //preferenceNumber

        },
        mixins: [ReactMeteorData],

        getMeteorData() {

            //////////////////subscribe/////////////////////////
            Meteor.subscribe("swimmersByAccountId", Meteor.userId());
            //Meteor.subscribe("appInfo");
            Meteor.subscribe("classes");
            Meteor.subscribe("activeShoppingCart");
            //Meteor.subscribe("accountShoppingCart");


            //var PageStore = new CRSelectClassEditPageStoreClass;



            var data = {

                cart:PageStore.cart.get(),

                //account: Meteor.users.find().fetch(),
                currentSwimmer: PageStore.currentSwimmer.get(),
                currentClass:PageStore.currentClass.get(),

                currentLevel:PageStore.currentLevel.get(), //next level


                //should wait for currentSwimmer
                avaiableDays: PageStore.avaiableDays.get(),
                avaiableTimes: PageStore.avaiableTimes.get(),
                currentDay: PageStore.currentDay.get(),
                currentTime: PageStore.currentTime.get(),

                //currentStep: PageStore.currentStep.get(),

                //一次选课流程的所有信息
                //selectedClasses: PageStore.selectedClasses.get()

            }

            //debugger
            return data;

        },


        componentWillMount(){
///         ///PASS  props value to store
            Dispatcher.dispatch({
                actionType: 'CRSelectClassEditPage_PROPS_UPDATE',
                props: this.props
            });

        },
        formSubmit(e){
            e.preventDefault()

            Dispatcher.dispatch({
                actionType: 'CRSelectClassEditPage_CLASS_SELECT',
                props: this.props
            });

        },


        ///////////////actions////////////////

        render: function () {

            let items = this.data.cart && this.data.cart.items ;
            var item = _.findWhere(items,{
                swimmerId:this.props.swimmerId,
                classId:this.props.classId
            })
            console.log(item)
            //debugger


            return <div>

                <RC.Card className="padding">
                    <h4 className="brand">Register Class Edit Preference{this.props.preferenceNum}</h4>

                    <div>
                        now :{item && item['class'+this.props.preferenceNum] && item['class'+this.props.preferenceNum].name}
                    </div>
                    <div>
                        changed :{this.data.currentClass && this.data.currentClass.name}
                    </div>


                </RC.Card>

                <RC.Form ref="myForm"  onSubmit={this.formSubmit}>

                    <RC.Item uiColor="brand1">
                        Swimmer: {this.data.currentSwimmer && this.data.currentSwimmer.name}
                    </RC.Item>
                    <RC.Item uiColor="brand1">
                        Level: {this.data.currentLevel}
                    </RC.Item>

                    <Cal.SelectDay
                        avaiableDays={this.data.avaiableDays}
                        currentDay={this.data.currentDay}
                        changeMessage="CRSelectClassEditPage_DAY_CHANGE"
                        />
                    <Cal.SelectTime
                        avaiableTimes={this.data.avaiableTimes}
                        currentTime={this.data.currentTime}
                        changeMessage="CRSelectClassEditPage_TIME_CHANGE"
                        />

                    <RC.Button name="button" type="submit"
                               onClick={this.formSubmit}
                               theme="full" buttonColor="brand">
                        {this.data.currentStep == 1 ? 'Book':'Select'}
                    </RC.Button>

                </RC.Form>



                </div>;
        }

    });

}
