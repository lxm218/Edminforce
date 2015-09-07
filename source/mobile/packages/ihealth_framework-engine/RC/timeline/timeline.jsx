
// @@@@@
// Timeline Canvas
// @@@@@

let timelineThemes = []
RC.Timeline = React.createClass({
  mixins: [RC.Mixins.Theme],
  themeGroup: "timeline",
  themes: timelineThemes,

  propTypes: {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    theme: React.PropTypes.string,

    lineColor: React.PropTypes.string,
    dateFormat: React.PropTypes.string,
    list: React.PropTypes.array,

    title: React.PropTypes.string,
    dateFormat: React.PropTypes.string,
  },

  render() {

    let defaultFormat = this.props.dateFormat || "MMM Do, YYYY"
    let count = 0

    if (!this.props.list)
      return <ul {... this.props} className={this.getTheme()+(h.checkColorClass(this.props.lineColor) ? " timeline-"+this.props.lineColor : "")}>
        {this.props.children}
      </ul>

    return <ul className={"timeline "+this.getTheme(this.props.theme)} id={this.props.id}>
      {
      this.props.list.map(function(item,n){

        var odd_or_even = "" // This is used for className, don't set it to null
        var itemLabel = null
        var itemRender = null

        let brand = ["bg-brand","bg-brand2","bg-brand3"]
        let brandClass = _.isNumber(item.brand) && brand[item.brand] ? brand[item.brand] : ""
        let uiIcon = <figure className={"round "+brandClass}>
          {
          item.type=="title"
            ? <RC.uiIcon uiClass={item.uiClass} uiSize={item.uiSize || 0} theme="tiny"/>
            : null
          }
        </figure>

        switch(item.type){
          case "title":
            itemRender = <h4 className="title sub">
              {fw.getDateFromProps(item.label, item.dateFormat, defaultFormat)}
            </h4>
          break
          case "list-item":
          default:
            odd_or_even = count++%2 ? " even" : " odd"
            itemLabel = <strong className="block label">
              {_.isDate(item.title) ? fw.getDateFromProps(item.title, item.dateFormat, defaultFormat) : item.title}
            </strong>
            item.type = "listItem"
            itemRender = item.href ? <a className="block" href={item.href}>{item.text}</a> : item.text
        }

        return <li className={"type-"+item.type+odd_or_even} key={n}>
          <div className="inner">
            {uiIcon}
            {itemLabel}
            {itemRender}
          </div>
        </li>
      })
      }
    </ul>
  },
})

// @@@@@
// Journal Item
// @@@@@

let journalThemes = ["title"]
RC.Journal = React.createClass({
  mixins: [RC.Mixins.Theme],
  themeGroup: "journal",
  themes: journalThemes,

  propTypes: {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    theme: React.PropTypes.string,

    title: React.PropTypes.string,
    dateFormat: React.PropTypes.string,
  },

  render() {

    // Format Setups
    let dateFormat = this.props.dateFormat || "MMM Do, YYYY"
    let brand = this.props.uiBrand || "brand"
    let classes = this.getTheme()+" journal-"+brand

    // Declarations
    var title = _.isDate(this.props.title) ? fw.getDateFromProps(this.props.title, dateFormat) : this.props.title
    var content = null
    var ui = null

    switch(this.props.theme){
      case "title":
        // @@@@
        // Title
        // @@@@
        if (this.props.uiClass) {
          var uiObject = _.pick(this.props, fw.uiKeysCircle)
          ui = <RC.uiIcon {... _.defaults(uiObject,{ uiBrand: brand })} />
        }
        content = <strong>{title}</strong>
      break
      default:
        // @@@@
        // Default
        // @@@@
        content = <div>
          <strong className={"block "+brand}>{title}</strong>
          {this.props.children}
        </div>
    }

    return <li {... _.omit(this.props, ["children","dateFormat","className"])} className={classes}>
      {ui}
      {content}
    </li>
  },
})

if (h.nk(Meteor.settings, "public.env")!="live") {
  RC.Timeline.Help = {
    Type: "canvas",
    Themes: timelineThemes,
    PropTypes: {
      dateFormat: 'String (Defaults to "MMM Do, YYYY", use momentJS formats)',
      lineColor: "String, Hex, CSS",
      list: "Array (Optional)",
    },
    "PropTypes for List": {
      brand: "Integer (0 to 2, chooses from one of the 3 theme colours) or Brand CSS",
      type: 'Array, ["title", "list-item"] Defaults to list-item',
      dateFormat: 'String (Defaults to "MMM Do, YYYY", use momentJS formats)',
      title: "String",
      href: "String"
    },
    Description: "Created for documenting series of events. Especially useful for documenting times."
  }
  RC.Journal.Help = {
    Type: "Item",
    Themes: journalThemes,
    PropTypes: {
      dateFormat: 'String (Defaults to "MMM Do, YYYY", use momentJS formats)',
      uiBrand: "Flexible",
      title: "String"
    },
    Description: "Created for documenting snippets of information with dates and bullet points. Use this component with the <RC.Timeline /> component."
  }
}
