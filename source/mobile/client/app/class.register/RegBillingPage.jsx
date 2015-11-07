/**
 * Created on 9/19/15.
 */

{

    let AgreementWaiverPageStore;
    Dependency.autorun(function () {
        AgreementWaiverPageStore = Dependency.get('classRegister.AgreementWaiverPage.store');
    });


    Cal.CRRegBillingPage = React.createClass({

        mixins: [ReactMeteorData],
        getMeteorData() {
            Meteor.subscribe("activeShoppingCart");

            return {
                //当前的 ShoppingCart
                ShoppingCart: DB.ShoppingCart.findOne({
                    status:'active',
                    type:'register'
                }),
                hasNewSwimmer:AgreementWaiverPageStore.hasNewSwimmer.get()
            }
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

        //如果有new swimmer就 waiver form 否则 payment option
        goToNextPage(e){
            e.preventDefault();

            var hasNewSwimmer= this.data.hasNewSwimmer

            console.log('hasNewSwimmer', hasNewSwimmer)
            if(hasNewSwimmer){

                let href= '/classRegister/waiver'
                FlowRouter.go(href);

            }else{
                let href= '/classRegister/paymentOptionsPage'

                FlowRouter.go(href);

            }

        },
        render() {

            var self = this;
            let items = this.data.ShoppingCart && this.data.ShoppingCart.items


            if (!items || !items.length) return <div className="padding">
                you have not added item in shopping cart
            </div>;

            return <div className="padding">
                <div className="row">
                    <div className="col">Student</div>
                    <div className="col">Class</div>
                    <div className="col">Amt</div>
                    <div className="col"></div>
                </div>
                {
                    items.map(function (item, index, all) {

                        return <div className="row" key={index}>
                            <div className="col">{item.swimmer.name}</div>
                            <div className="col">{item.class1.name}</div>
                            <div className="col">{item.class1.price}</div>
                            {
                                !item.isBookTheSameTime?
                                    <div className="col" onClick={self.delete.bind(self,item)}>Delete</div>
                                    :<div className="col"></div>

                            }

                        </div>
                    })


                }

                <br/><br/>
                    <RC.Button name="button" type="submit"
                               onClick={this.goToNextPage}
                               theme="full" buttonColor="brand">
                        Process To Checkout
                    </RC.Button>


            </div>
        }
    })

}
