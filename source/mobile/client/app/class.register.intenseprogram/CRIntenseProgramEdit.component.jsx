{

    let CRIntenseProgramEditStore;

    Dependency.autorun(function () {
        CRIntenseProgramEditStore = Dependency.get('classRegister.intenseProgramEdit.store');
    });


    Cal.CRIntenseProgramEdit = React.createClass({
        mixins: [ReactMeteorData],
        getMeteorData: function () {

            CRIntenseProgramEditStore.passedCartId.set(this.props.cartId);
            CRIntenseProgramEditStore.passedSwimmerId.set(this.props.swimmerId);
            CRIntenseProgramEditStore.passedSessionId.set(this.props.sessionId);

            var data = {
                account: Meteor.users.find().fetch(),
                swimmers: CRIntenseProgramEditStore.swimmers.get(),
                currentSwimmer: CRIntenseProgramEditStore.currentSwimmer.get(),
                avaiableIntenses: CRIntenseProgramEditStore.avaiableIntenseSessions.get(),
                currentIntense: CRIntenseProgramEditStore.currentIntenseSession.get(),
                avaialbeClasses: CRIntenseProgramEditStore.avaialbeClasses.get(),
                currentClass: CRIntenseProgramEditStore.currentClass.get(),
                selectedClasses: CRIntenseProgramEditStore.selectedClasses.get(),
                passedClassName: this.props.className
            };

            return data;
        },
        timeChange: function(){
            console.log("[info][%s]: timeChange", new Date().getTime());
            var value = this.refs.time.getValue();
            console.log("))))timeChange: %o", value);
            var currentClass = _.find(this.data.avaialbeClasses, function(item){
                return item._id === value;
            });

            Dispatcher.dispatch({
                subject: "CRIntenseProgramEditStore_Time_Change",
                data: currentClass
            });
        },
        formSubmit: function(event){
            event.preventDefault();

            var cartItems = this.data.cart && this.data.cart.items;


            var cartItem = _.findWhere(cartItems,{
                classId:this.props.classId,
                swimmerId:this.props.swimmerId
            });

            console.log(cartItem);

            Dispatcher.dispatch({
                subject: 'CRIntenseProgramEditStore_CLASS_SELECT',
                data:{
                    cartId:this.props.cartId,
                    swimmerId:this.props.swimmerId,
                    classId:this.props.classId,
                    preferenceNum:this.props.preferenceNum,
                    cartItem:cartItem
                }
            });
        },
        componentDidUpdate: function(){
            this.refs.swimmer.refs.select.getDOMNode().disabled = true;
            this.refs.intense.refs.select.getDOMNode().disabled = true;
        },
        render: function () {

            let class1 = this.data.selectedClasses.get('class1');
            let class2 = this.data.selectedClasses.get('class2');
            let class3 = this.data.selectedClasses.get('class3');

            //this.refs.swimmer.refs.select.getDOMNode().disabled = true;

            return (
                <div>
                    <RC.Card key={Math.random()} className="padding">
                        <h4 className="brand">Intense Program Edit Class</h4>

                        <div>
                            now : {this.data.passedClassName}
                        </div>
                        <div>
                            changed : {this.data.currentClass && this.data.currentClass.name}
                        </div>

                    </RC.Card>

                    <RC.Form ref="myForm" key={Math.random()} onSubmit={this.formSubmit}>
                        <RC.List theme="inset">

                            <RC.Select2
                                ref="swimmer"
                                options={this.data.swimmers || []}
                                value= {this.data.currentSwimmer&&this.data.currentSwimmer._id}
                                name="swimmer"
                                label="Swimmer"
                                />

                            <RC.Item uiColor="brand1">
                                Level: {this.data.currentSwimmer&&this.data.currentSwimmer.level}
                            </RC.Item>

                            <RC.Select2
                                ref="intense"
                                options={this.data.avaiableIntenses || []}
                                value={this.data.currentIntense&&this.data.currentIntense._id}
                                name="intense"
                                label="Intense Session"
                                />

                            <RC.Select2
                                ref="time"
                                options={this.data.avaialbeClasses || []}
                                value={this.data.currentClass&&this.data.currentClass._id}
                                name="time"
                                changeHandler={this.timeChange}
                                label="Time"
                                />
                            <RC.Button name="button" type="submit"
                                       onClick={this.formSubmit}
                                       theme="full" buttonColor="brand">
                                Select
                            </RC.Button>


                        </RC.List>
                    </RC.Form>
                </div>
            );
        }
    });
}