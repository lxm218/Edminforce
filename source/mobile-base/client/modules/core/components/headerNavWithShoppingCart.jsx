// customize RC.HeaderNav to add support for shopping cart
EdminForce.Components.HeaderNav = class extends RC.HeaderNav {
  constructor(props) {
    super(props);
  }

  baseStyles(np,ns) {
    let style = super.baseStyles(np, ns);
    style.fullNavInner.padding = "6% 24px";
    style.fullNavInner.verticalAlign = "top";
    style.fullNavItem.fontSize = 26;
    return style;
  }

  renderFullNav() {
    let self = this
    const styles = this.css.get("styles")
    const state = this.state.obj
    const count = 1;

    if (!this.props.useMiniNav && this.props.children) {
      // Full Nav
      return <div>
        {
          this.props.shoppingCartUrl ? (
              <RC.URL href={this.props.shoppingCartUrl} style={Object.assign(h.assignPseudos(styles.xContain, state.get("fullNav")), {right:30, top: 5, zIndex: 6000}) }>
                <RC.AvatarBadge
                    color="#ff7928"
                    style={{backgroundColor:'none',float:'right'}}
                    badgeOnLeft={true}
                    badge={this.props.shoppingCartCount}
                    uiClass="shopping-cart"></RC.AvatarBadge>
              </RC.URL>
          ) : null
        }
        <a onClick={this._toggleFull.bind(this)} style={h.assignPseudos(styles.xContain, state.get("fullNav"))}>
          <span style={h.assignPseudos(styles.xTop, state.get("fullNav"))}/>
          <span style={h.assignPseudos(styles.xMid, state.get("fullNav"))}/>
          <span style={h.assignPseudos(styles.xBot, state.get("fullNav"))}/>
        </a>
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
      </div>
    }
  }
}
EdminForce.Components.HeaderNav.displayName = "EdminForce.HeaderNav"
