
RC.Card = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "Card",

  propTypes: {
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    avatar: React.PropTypes.string,
    uiClass: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),

    color: React.PropTypes.string,
    bgColor: React.PropTypes.string,

    theme: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),

    id: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
  },
  /**
   * @@@
   * State Control
   * @@@
   */
  getInitialState(){
    return { isActive: false }
  },
  toggleActive(){
    let active = !this.state.isActive
    this.setState({ isActive: active })
  },
  setInactive(){
    this.setState({ isActive: false })
  },
  setActive(){
    this.setState({ isActive: true })
  },
  /**
   * @@@
   * Render
   * @@@
   */
  renderAuto(){
    let themes = h.strToArray(this.props.theme)
    if (!_.intersection(themes,["double-from-right","double-from-left"]).length) {
      let keys = ["title","subtitle","avatar"].concat(RC.uiKeys)
      if (_.intersection( _.keys(this.props), keys).length)
        return <RC.Item {... _.pick(this.props, keys)} theme="avatar" />
    }
  },
  renderChildren(){
    let themes = this.css.themeNames
    if (_.intersection(themes,["double-from-right","double-from-left"]).length) {
      let children = _.isArray(this.props.children)
        ? this.props.children.slice(0,2) // Double themes only allow two children
        : [this.props.children]

      if (children[1]) {
        let css = h.getBasicStyles(children[1].props.bgColor, "white", children[1].props.color)
        let backStyle = h.assignClone(RC.cssMixins.absFull, {
          overflow: "hidden", zIndex: 10,
          color: css.textColor,
          backgroundColor: css.hex
        })
        children[1] = <RC.Animate transitionName="from-right" key="1" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          {this.state.isActive ? <div style={backStyle}>{children[1]}</div> : null}
        </RC.Animate>
      }
      return children
    }
    return this.props.children
  },
  render(){

    let styles = this.css.styles

    // if (this.props.theme=="double-from-right") {
    //   let color = "bg-"+(h.checkColorClass(this.props.uiBgColor) ? this.props.uiBgColor : "white")
    //
    //   children = [origChildren[0].props.onClick ? origChildren[0] : React.cloneElement(origChildren[0], { onClick: this.toggleActive, key: "0" })]
    //   children.push(<RC.Animate transitionName="from-right" key="1" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
    //     {this.state.isActive && origChildren[1] ? origChildren[1] : null}
    //   </RC.Animate>)
    // } else
    //   children = origChildren

    return <div style={styles.area}>
      {this.renderAuto()}
      {this.renderChildren()}
    </div>
  },
  // @@@@
  // @@@@
  // Styles Start
  // @@@@
  // @@@@
  baseStyles() {
    return {
      // Canvas Outer
      area: {
        position: "relative", overflow: "hidden",
        margin: 10, padding: 0,
        boxShadow: "0 0 3px rgba(0,0,0,.15)",
        backgroundColor: this.color.hex, color: this.color.textColor,
      },
    }
  },
  themeStyles: {
    "double-from-left": {
      area: {
        overflow: "visible",
        margin: "10px 0",
      },
    },
    "double-from-right": {
      area: {
        overflow: "visible",
        margin: "10px 0",
      },
    },
    "no-shadow": {
      area: {
        boxShadow: 0
      }
    }
  }
})
