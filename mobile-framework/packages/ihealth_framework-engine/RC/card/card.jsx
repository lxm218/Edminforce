
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

if (!h.nk(Meteor.settings, "public.dev"))
  RC.Card.Help = {
    Type: "Canvas",
    Themes: themes,
    PropTypes: {
      theme: "String",
      title: "String",
      subtitle: "String",
      avatar: "String",
      uiClass: "String",
      uiSize: "Flexible",
      uiBrand: "Number",
      uiColor: "String",
    },
    Description: "This component is generally used as a canvas. It's great for putting things inside."
  }
