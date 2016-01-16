{

    //定义store依赖 发生于初始化过程
    let CalMainStore;
    Dependency.autorun(function () {
        CalMainStore = Dependency.get('Cal.Main.Store');
    });


    let leftNavList = [
        {text: "Calphin", type: "title"},
        {
            href: "/", text: "Home"
        }, {
            href: "/account",
            text: "Your Account"
        }, {
            href: "/classEdit/swimmerList",
            text: "Your Swimmers"
        }, {
            href: "/",
            text: "Class Registration"
        },
        {
            href: "/classEdit/billingAndPayment",
            text: "Your BIlling & Payment"
        }, {
            href: "/ContactInfoPage",
            text: "Contact Us"
        }, {
            //href: "/",
            text: "Sign Out",
            onClick:function(){

                Dispatcher.dispatch({actionType:'LEFT_NAV_CLOSE'})
                Dispatcher.dispatch({actionType:'AUTH_LOGOUT'})


            }
        }]


    Cal.Main = React.createClass({

        mixins: [ReactMeteorData],
        getMeteorData() {

            Meteor.subscribe('activeShoppingCart')
            var shoppingCart= DB.ShoppingCart.findOne({
                status:'active'
            })

            console.log(shoppingCart)


            return {
                leftNavIsOpen: CalMainStore.leftNavStatus.get(),
                shoppingCart:shoppingCart
            }
        },


        render() {
            return <RC.Body>
                  <RC.HeaderNav nav={this.props.headerNav} title={this.props.title} useMiniNav={!!this.props.headerNav}>
                      <RC.URL>This is an Example</RC.URL>
                      <RC.URL>Ripe Peaches</RC.URL>
                      <RC.URL>Red Apples</RC.URL>
                      <RC.URL>Blue Blueberries</RC.URL>
                      <RC.URL>Rotten Tomatoes</RC.URL>
                  </RC.HeaderNav>

                  <RC.MobileContentArea>
                      {this.props.body}
                  </RC.MobileContentArea>
              </RC.Body>


            {

                //<div className={h.getPlatform()} id="app-root">
                //    {
                //        //  <RC.LeftNav2 navList={leftNavList} ref="LeftNav" openOnInit={this.data.leftNavIsOpen}/>
                //
                //    }
                //
                //    <RC.HeaderNav nav={this.props.headerNav}
                //
                //                  hideBackButton= {this.props.hideBackButton}
                //                  hideLeftNavToggle={this.props.hideLeftNavToggle}
                //                  hideShoppingCartButton={this.props.hideShoppingCartButton}
                //                  shoppingCart={this.data.shoppingCart}
                //                  showLogo={true}
                //                  title={this.props.title} theme="flat"/>
                //    <RC.GlobalNav isVisible={this.props.showGlobalNav} list={this.props.globalNav}
                //                  location={this.props.globalNavLocation} theme="flat"/>
                //    <Cal.Body tmpl={this.props.body}/>
                //</div>
            }

        }
    })


}

