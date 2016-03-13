/**
 * Created on 1/10/16.
 */

Cal.CRRegBillingDetailCard = React.createClass({
    propTypes: {
        cartId: React.PropTypes.string,
        view:React.PropTypes.string  //view1 view2
    },
    mixins: [ReactMeteorData],
    getMeteorData() {
        Meteor.subscribe("accountShoppingCartByCartId", this.props.cartId);

        return {
            ShoppingCart: DB.ShoppingCart.findOne({
                _id: this.props.cartId
            }),
        }
    },

    componentWillMount(){
        //update ShoppingCart
        Meteor.call('update_annual_fee_in_cart',this.props.cartId)

    },
    componentWillUnmount(){

    },
    //actions
    delete(shoppingCartItem){

        console.log(shoppingCartItem)

        Meteor.call('delete_class_from_cart',{
            classId :shoppingCartItem.class1._id,
            swimmerId :shoppingCartItem.swimmer._id,
            cartId:this.data.ShoppingCart._id,

            cartItem:shoppingCartItem // 完整的购物信息 回滚时需要
        },function(err, result){
            if(err){
                console.error(err)
                return;
            }

        })

    },

    render: function () {

        var self = this;
        let items = this.data.ShoppingCart && this.data.ShoppingCart.items
        let oweAnnualFeeSwimmers = this.data.ShoppingCart
                                && this.data.ShoppingCart.oweAnnualFeeSwimmers

        //计算总费用
        let all=0

        if(items){
            items.forEach(function(item){
                all+=item.class1.price
            })
        }

        if(oweAnnualFeeSwimmers){
            all+= oweAnnualFeeSwimmers.length*25
        }


        if (!items || !items.length) return <div className="padding">
            you have not added item in shopping cart
        </div>;


        let view1 = (
            <div>
                {
                    items.map(function (item, index, all) {

                        return <Cal.Grid justifyContent="space-between" key={index}>
                            <Cal.GridItem >{item.swimmer.name}</Cal.GridItem>
                            <Cal.GridItem >{item.class1.name}</Cal.GridItem>
                            <Cal.GridItem >{item.class1.price}</Cal.GridItem>
                            {
                                !item.isBookTheSameTime ?
                                    <Cal.GridItem  onClick={self.delete.bind(self,item)}>Delete</Cal.GridItem>
                                    : <Cal.GridItem ></Cal.GridItem>

                            }

                        </Cal.Grid>
                    })


                }

                {
                    oweAnnualFeeSwimmers.map(function(swimmer, index, all){

                        return <Cal.Grid justifyContent="space-between" key={index}>
                                <Cal.GridItem>
                                    {swimmer.name}
                                </Cal.GridItem>
                                <Cal.GridItem>
                                    Annual Fee
                                </Cal.GridItem>
                                <Cal.GridItem>
                                    25
                                </Cal.GridItem>
                                <Cal.GridItem>
                                </Cal.GridItem>

                            </Cal.Grid>

                    })

                }

                <Cal.Grid justifyContent="space-between">
                    <Cal.GridItem>
                        All :
                    </Cal.GridItem>
                    <Cal.GridItem>

                    </Cal.GridItem>
                    <Cal.GridItem>
                        {all}
                    </Cal.GridItem>
                    <Cal.GridItem>

                    </Cal.GridItem>

                </Cal.Grid>

            </div>
        )

        let title_view2="You’ve choose to pay in store. Please go to our store to " +
            "make a payment of "+ all+"$— within 24 hours in order to secure your spot!"
        let view2 =(

            <RC.Card  className="item-text-wrap"
                      key={Math.random()} title={title_view2}>

            </RC.Card>
        )


        return <div style={{padding:10}}>

            {
                this.props.view == 'view2'? view2:view1
            }

        </div>


    }
})