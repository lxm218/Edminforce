
// let themes = ["regular","no-edges"]
let themes = ["double-right"]

RC.Card = React.createClass({
  mixins: [RC.Mixins.Theme, RC.Mixins.Premade],
  themeGroup: "card",
  themes: themes,
  displayName: "Card",

  propTypes: {
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    avatar: React.PropTypes.string,
    uiClass: React.PropTypes.string,

    theme: React.PropTypes.string,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
  },

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

  render(){
    var children
    let header = this.makeAvatarItem()
    let origChildren = this.props.children.map ? this.props.children : [this.props.children]

    if (!this.props.children && !header) return null
    if (this.props.theme=="double-right") {
      let color = "bg-"+(h.checkColorClass(this.props.uiBrand) ? this.props.uiBrand : "white")

      children = [origChildren[0].props.onClick ? origChildren[0] : React.cloneElement(origChildren[0], { onClick: this.toggleActive, key: "0" })]
      children.push(<RC.Animate transitionName="slide-left" key="1">
        {this.state.isActive && origChildren[1] ? origChildren[1] : null}
      </RC.Animate>)

      children.unshift(<figure
        key="2"
        className={"card-dot "+color}
      />)
    } else
      children = origChildren

    return <div className={this.getTheme()}>
      {header}
      {children}
    </div>
  },
})

if (h.nk(Meteor.settings, "public.env")!="live")
  RC.Card.Help = {
    Type: "Canvas",
    Themes: themes,
    PropTypes: {
      theme: "String",
      avatar: 'String (Use "Item", "Avatar", "Subtitle" props to auto-create a header.)',
      title: 'String (Use "Item", "Avatar", "Subtitle" props to auto-create a header.)',
      subtitle: 'String (Use "Item", "Avatar", "Subtitle" props to auto-create a header.)',
      uiClass: "String (FontAwesome)",
      uiColor: "String or HEX",
      uiBrand: "Flexible",
      uiSize: "Flexible"
    },
    Description: "Creates a card component. Similar to cards found in many Social Networking apps such as Facebook, Instagram, Twitter, or Pinterest, etc."
  }
