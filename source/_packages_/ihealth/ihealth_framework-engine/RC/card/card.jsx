  
// let themes = ["regular","no-edges"]
let themes = []

RC.Card = React.createClass({
  mixins: [RC.Mixins.Theme, RC.Mixins.Premade],
  themeGroup: "card",
  themes: themes,
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

  render(){
    let header = this.makeAvatarItem()
    let children = fw.uniformChildren(this.props.children, "Item")
    if (!children.length && !header) return null

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
