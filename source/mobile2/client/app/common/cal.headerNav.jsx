/**
 * Created on 1/20/16.
 */
Cal.HeaderNav = class extends RC.HeaderNav {

  constructor(props) {
    super(props);
  }

  baseStyles(np, ns) {
    const BASE = super.baseStyles(np, ns)

    //更改sidebar按钮位置
    BASE.xContain = Object.assign({}, BASE.xContain, {
      right: 'initial',
      left: 0
    })
    //链接字体
    BASE.fullNavItem = Object.assign({}, BASE.fullNavItem, {
      fontSize: '1rem'
    })

    BASE.fullNavInner = {
      padding: "50px 24px"
    }
    BASE.fullNav = Object.assign({}, BASE.fullNav, {
      zIndex: 5001,
      width: '50%'
    })
    BASE.back = Object.assign({}, BASE.back, {
      left: '50px'
    })

    BASE.logo = {
      position: "absolute",
      top: 0,
      left: "auto",
      right: "50%",
      textAlign: "center",
      width: 150,
      padding: "7px 15px",
      margin: "0 -75px 0 0"
    }
    BASE.logoImg = {
      display: "inline-block",
      margin: "0 auto",
      width: "auto",
      maxWidth: "100%",
      maxHeight: "100%"
    }
    BASE.cart = {
      position: "absolute",
      //zIndex:6000,
      right: 0,
      //top:0
      //padding: "15px 15px 0 0px",
      //margin: 0,
    }
    BASE.backDrop=Object.assign({}, np.absolute ? RC.cssMixins.absFull : RC.cssMixins.fixedFull, {
      display: "flex", alignItems: "center",
      padding: "3%",
      backgroundColor: 'rgba(0,0,0,.3)',
      color: this.color.get("textColor"),
      overflow: "hidden",
      zIndex: 5000,
    })

    return BASE
  }
  renderFullNav() {
    let self = this
    const styles = this.css.get("styles")
    const state = this.state.obj
    if (!this.props.useMiniNav && this.props.children) {

      // Full Nav
      return   <div>

        {
          this.props.hideLeftNavToggle?null:
          <a onClick={this._toggleFull.bind(this)} style={h.assignPseudos(styles.xContain, state.get("fullNav"))}>
            <span style={h.assignPseudos(styles.xTop, state.get("fullNav"))}/>
            <span style={h.assignPseudos(styles.xMid, state.get("fullNav"))}/>
            <span style={h.assignPseudos(styles.xBot, state.get("fullNav"))}/>
          </a>
        }



        <RC.Animate transitionName={this.props.transitionName || "from-right"} transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          {
            state.get("fullNav") && !!this.props.children
              ?
              <div style={styles.fullNav}>
                <div style={styles.fullNavInner}>
                  { this.renderChildren() }
                </div>
              </div>
              :
              null
          }


        </RC.Animate>

        {
          state.get("fullNav")?<div style={styles.backDrop} onClick={this._toggleFull.bind(this)}></div>:null
        }
      </div>
    }
  }


  render() {

    let styles = this.css.get("styles")
    let ht = RC.Theme.size.headerNavHeight()
    let count = this.props.shoppingCart && this.props.shoppingCart.items && this.props.shoppingCart.items.length || 0


    return <div style={this.props.absolute ? {} : {paddingTop: ht, position: "relative"}}>
      <nav style={styles.area}>
        {this.renderBackButton()}


        <figure style={styles.logo}>
          <img src={this.props.logoUrl} style={styles.logoImg}/>
        </figure>
        {
          //this.renderMoreNav()
        }

        {
          this.props.hideShoppingCartButton?null:
            <RC.URL href="/classEdit/billingAndPayment" style={styles.cart}>
              <RC.AvatarBadge
                color="#ff7928"
                style={{backgroundColor:'none',float:'right'}}
                badgeOnLeft={true}
                uiClass="shopping-cart"
                badge={count}></RC.AvatarBadge>
            </RC.URL>
        }



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
  fullNavColor: React.PropTypes.string,

  hideBackButton:React.PropTypes.bool,
  hideLeftNavToggle:React.PropTypes.bool,
  hideShoppingCartButton:React.PropTypes.bool,
})
