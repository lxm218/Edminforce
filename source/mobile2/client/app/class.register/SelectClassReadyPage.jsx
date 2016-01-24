/**
 * Created on 9/16/15.
 */

{
    //let CRSelectClassPageStore;
    //Dependency.autorun(function () {
    //    CRSelectClassPageStore = Dependency.get('classRegister.SelectClassPage.store');
    //});

    Cal.CRSelectClassReadyPage = React.createClass({
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

        goToEdit(swimmerId, classId, preferenceNum){

            var url = '/classRegister/SelectClassEdit'
                + '?swimmerId=' + swimmerId
                + '&classId=' + classId
                + '&preferenceNum=' + preferenceNum
                + '&cartId=' + this.props.cartId

            FlowRouter.go(url);

        },

        componentWillUnmount(){
            var comment =this.refs.comment.getValue()
            Meteor.call('add_comment_to_cart_item',{
                cartId:this.props.cartId,
                swimmerId:this.props.swimmerId,
                classId:this.props.classId,
                comment:comment
            },function( err,result){

                if(err) console.error(err)
            })

        },
        updateComment(){
            //todo remove
            console.log(this.refs.comment.getValue())
        },
        render() {
            let self = this


            console.log('CRSelectClassReadyPage cart',this.data.cartItem)

            //let swimmer = this.data.selectedClassesMap.get('swimmer')
            //
            //let class1 = this.data.selectedClassesMap.get('class1')
            //let class2 = this.data.selectedClassesMap.get('class2')
            //let class3 = this.data.selectedClassesMap.get('class3')

            if(this.data.cartItem){
                var swimmer = this.data.cartItem['swimmer']

                var class1 = this.data.cartItem['class1']
                var class2 = this.data.cartItem['class2']
                var class3 = this.data.cartItem['class3']
            }

            let RegBillingPageUrl= "/classRegister/RegBillingPage?cartId="+this.props.cartId


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
                        <div>
                            <RC.Textarea
                                ref="comment"
                                placeholder="Add a comment(optional)"
                                changeHandler={this.updateComment}
                                label="Comment:"
                                value="{comment}"
                                />
                        </div>

                    </RC.Item>


                    <RC.URL href="/classRegister/SelectClass">
                        <RC.Button name="button" type="submit" bgColor="brand1"
                                   theme="full" buttonColor="brand">
                            Register More
                        </RC.Button>

                    </RC.URL>


                    <RC.URL href={RegBillingPageUrl}>
                        <RC.Button name="button" type="submit" bgColor="brand1"
                                   theme="full" buttonColor="brand">
                            Checkout
                        </RC.Button>

                    </RC.URL>

                </RC.List>
            </div>
        }
    })
}
