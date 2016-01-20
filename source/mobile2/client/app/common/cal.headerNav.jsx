/**
 * Created on 1/20/16.
 */
Cal.HeaderNav = class extends RC.HeaderNav {

  constructor(props) {
    super(props);
  }

  render() {

    const cusStyle = {
      logo: {
        position: "absolute",
        top: 0,
        left: "auto",
        right: "50%",
        textAlign: "center",
        width: 150,
        padding: "7px 15px",
        margin: "0 -75px 0 0"
      },
      logoImg: {
        display: "inline-block",
        margin: "0 auto",
        width: "auto",
        maxWidth: "100%",
        maxHeight: "100%"
      },
      cart:{
        display:"inline-block",
        float:"right",
        padding: "15px 15px 0 0px",
        margin: 0,
      }

    }

    let styles = this.css.get("styles")
    let ht = RC.Theme.size.headerNavHeight()
    return <div style={this.props.absolute ? {} : {paddingTop: ht, position: "relative"}}>
      <nav style={styles.area}>
        {this.renderBackButton()}
        <figure style={cusStyle.logo}>
             <img src={this.props.logoUrl} style={cusStyle.logoImg}/>
        </figure>
        {
          //this.renderMoreNav()
        }
        <RC.Div style={cusStyle.cart} href="/classEdit/billingAndPayment" >
          {
            this.props.shoppingCart && this.props.shoppingCart.items && this.props.shoppingCart.items.length
          }
          <RC.uiIcon uiClass="shopping-cart"></RC.uiIcon>
        </RC.Div>

      </nav>

      {this.renderFullNav()}
    </div>
  }

}

Cal.HeaderNav.displayName = "Cal.HeaderNav"

Cal.HeaderNav.propTypes = Object.assign({}, RC.HeaderNav.propTypes, {
  // title: React.PropTypes.string, // React elements are allowed too now
  logoUrl: React.PropTypes.string,
  nav: React.PropTypes.array,
  fullNavBgColor: React.PropTypes.string,
  fullNavColor: React.PropTypes.string
})
