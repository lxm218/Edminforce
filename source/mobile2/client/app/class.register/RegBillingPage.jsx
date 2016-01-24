/**
 * Created on 9/19/15.
 */

{

    //let AgreementWaiverPageStore;
    //Dependency.autorun(function () {
    //    AgreementWaiverPageStore = Dependency.get('classRegister.AgreementWaiverPage.store');
    //});


    let hasNewSwimmer = new ReactiveVar(true)

    let swimmerIds = new ReactiveVar([])



    Cal.CRRegBillingPage = React.createClass({
        propTypes: {
            cartId: React.PropTypes.string
        },
        mixins: [ReactMeteorData],
        getMeteorData() {
            Meteor.subscribe("accountShoppingCartByCartId",this.props.cartId);
            Meteor.subscribe("accountWithSwimmersAndClasses");



            return {
                //当前的 ShoppingCart
                ShoppingCart: DB.ShoppingCart.findOne({
                    _id:this.props.cartId
                    //status:'active',
                    //type:'register'
                }),
                hasNewSwimmer:hasNewSwimmer.get(),
            }
        },

        componentWillMount(){
            var self= this;


            console.log(self.props.cartId)

            this._businessCompution = Tracker.autorun(function () {
                var shoppingCart = DB.ShoppingCart.findOne({
                    _id:self.props.cartId
                })

                var items = shoppingCart && shoppingCart.items;

                var _hasNewSwimmer = _.some(items, function (item) {
                    return item.isFistTime == true;
                })
                hasNewSwimmer.set(_hasNewSwimmer)


                 })


        },
        componentWillUnmount(){

            this._businessCompution.stop()
        },


        //如果有new swimmer就 waiver form 否则 payment option
        goToNextPage(e){
            e.preventDefault();

            var hasNewSwimmer= this.data.hasNewSwimmer

            console.log('hasNewSwimmer', hasNewSwimmer)
            if(hasNewSwimmer){

                let href= '/classRegister/waiver?cartId='+this.props.cartId
                FlowRouter.go(href);

            }else{
                let href= '/classRegister/paymentOptionsPage?cartId='+this.props.cartId

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

               <Cal.CRRegBillingDetailCard
                   cartId={this.props.cartId}
               />

                <br/><br/>
                    <RC.Button name="button" type="submit" bgColor="brand1"
                               onClick={this.goToNextPage}
                               theme="full" buttonColor="brand">
                        Process To Checkout
                    </RC.Button>


            </div>
        }
    })

}
