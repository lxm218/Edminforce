// customize RC.HeaderNav to add support for shopping cart
EdminForce.Components.HeaderNav = class extends RC.HeaderNav {
  constructor(props) {
    super(props);
  }

  renderFullNav() {
    let self = this
    const styles = this.css.get("styles")
    const state = this.state.obj
    const count = 1;

    if (!this.props.useMiniNav && this.props.children) {
      // Full Nav
      return <div>
        <RC.URL href={this.props.shoppingCartUrl} style={Object.assign(h.assignPseudos(styles.xContain, state.get("fullNav")), {right:30, top: 5}) }>
          <RC.AvatarBadge
              color="#ff7928"
              style={{backgroundColor:'none',float:'right'}}
              badgeOnLeft={false}
              uiClass="shopping-cart"></RC.AvatarBadge>
        </RC.URL>
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
