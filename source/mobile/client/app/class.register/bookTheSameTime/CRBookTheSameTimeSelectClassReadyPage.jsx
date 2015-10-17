/**
 * Created on 10/6/15.
 */


{
   //todo 与CRSelectClassReadyPage 合并

    //let bookTheSameTimePageStore;
    //Dependency.autorun(function () {
    //    bookTheSameTimePageStore = Dependency.get('classRegister.bookTheSameTimePage.store');
    //});


    Cal.CRBookTheSameTimeSelectClassReadyPage = React.createClass({
        propTypes:{
            cartId:React.PropTypes.string,
            swimmerId:React.PropTypes.string,
            classId:React.PropTypes.string

        },
        mixins: [ReactMeteorData],
        getMeteorData() {

            Meteor.subscribe("activeShoppingCart");


            var shoppingCart= DB.ShoppingCart.findOne({
                _id:this.props.cartId,
                type:'register',
                status:'active'
            })


            console.log(shoppingCart)

            debugger

            var cartItem={}
            if(shoppingCart && shoppingCart.items){

                cartItem= _.findWhere(shoppingCart.items,{
                    swimmerId:this.props.swimmerId,
                    classId:this.props.classId
                })

            }



            return {
                //selectedClassesMap: CRSelectClassPageStore.selectedClasses.get()

                cartItem:cartItem
            }
        },

        //actions
        selectMore(e){
            e.preventDefault();

            var href = "/classRegister/BookTheSameTimePage"
            FlowRouter.go(href);
        },
        goToEdit(swimmerId, classId, preferenceNum){

            var url = '/classRegister/SelectClassEdit'
                + '?swimmerId=' + swimmerId
                + '&classId=' + classId
                + '&preferenceNum=' + preferenceNum
                + '&cartId=' + this.props.cartId

            FlowRouter.go(url);

        },

        render() {
            let self = this


            //let swimmer = this.data.selectedClassesMap.get('swimmer')
            //let class1 = this.data.selectedClassesMap.get('class1')
            //let class2 = this.data.selectedClassesMap.get('class2')
            //let class3 = this.data.selectedClassesMap.get('class3')


            if(this.data.cartItem){
                var swimmer = this.data.cartItem['swimmer']

                var class1 = this.data.cartItem['class1']
                var class2 = this.data.cartItem['class2']
                var class3 = this.data.cartItem['class3']
            }


            return <div>
                <RC.List theme="inset">
                    <RC.Item theme="body">
                        <h2 className="brand">Register for spring 2015</h2>
                        {
                            swimmer ? <div className="row">
                                <div className="col">
                                    Swimmer:
                                </div>
                                <div className="col">
                                    {swimmer.name}
                                </div>
                            </div> : ''
                        }


                        {
                            class1 ? <div className="row">
                                <div className="col">
                                    Preference 1
                                </div>
                                <div className="col">
                                    {class1.name}
                                </div>
                                <div className="col col-20">
                                    <button className="button button-clear"
                                            onClick={this.goToEdit.bind(self,swimmer._id,class1._id,1)}>Edit
                                    </button>
                                </div>

                            </div> : ''

                        }
                        {
                            class2 ? <div className="row">
                                <div className="col">
                                    Preference 2
                                </div>
                                <div className="col">
                                    {class2.name}
                                </div>
                                <div className="col col-20">
                                    <button className="button button-clear"
                                            onClick={this.goToEdit.bind(self,swimmer._id,class1._id,2)}>Edit
                                    </button>
                                </div>

                            </div> : ''

                        }
                        {
                            class3 ? <div className="row">
                                <div className="col">
                                    Preference 3
                                </div>
                                <div className="col">
                                    {class3.name}
                                </div>
                                <div className="col col-20">
                                    <button className="button button-clear"
                                            onClick={this.goToEdit.bind(self,swimmer._id,class1._id,3)}>Edit
                                    </button>
                                </div>

                            </div> : ''

                        }

                    </RC.Item>
                        <RC.Button name="button" type="submit"
                                    onClick={this.selectMore}
                                   theme="full" buttonColor="brand">
                            Register More
                        </RC.Button>



                    <RC.URL href="/classRegister/RegBillingPage">
                        <RC.Button name="button" type="submit"
                                   theme="full" buttonColor="brand">
                            Checkout
                        </RC.Button>

                    </RC.URL>

                </RC.List>
            </div>
        }
    })
}
