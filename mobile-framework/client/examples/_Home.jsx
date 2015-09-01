
/**
 * This page is just the homepage that lists all the examples.
 */
App.Home = React.createClass({
  render() {

    return <div className="padding">
      This is an app for storing all the additional third party iHealth packages. Click the more button at top right corner for navigation.
    </div>
  }
})


App.Home = React.createClass({
  openNav() {
    this.props.openLeftNav()
  },
  loop(arr,brand) {
    return arr.map(function(item,n){
      item.theme = "icon-left"
      if (item.uiClass=="check-circle-o") item.uiColor = brand
      return <RC.Item {... _.omit(item, ["value"])} key={n}>
        {item.value}
      </RC.Item>
    })
  },
  render() {

    let Commons = [
      { value: "Cards", href: "/examples/Cards", uiClass: "check-circle-o" },
      { value: "Lists", href: "/lists/List_Index", uiClass: "check-circle-o" },
      { value: "Tabs", href: "/examples/Tabs", uiClass: "circle-o" },
      { value: "Form", href: "/forms/Form_Index", uiClass: "check-circle-o" },
    ]

    let Uniques = [
      { value: "Swipe", href: "/examples/Swipe", uiClass: "check-circle-o" },
      { value: "Timeline", href: "/timelines/Timeline_Index", uiClass: "check-circle-o" },
      { value: "Left Nav", onClick: this.openNav, uiClass: "check-circle-o" },
      { value: "Chat", href: "/examples/Chat", uiClass: "check-circle-o" },
      { value: "Global Nav", href: "/globalNav/Global_Nav_Index", uiClass: "check-circle-o" },
    ]

    let Devices = [
      { value: "BP Component", href: "/BPComponent", uiClass: "check-circle-o" },
      { value: "BP5 Cordova JS", href: "/BP5", uiClass: "check-circle-o" },
    ]

    return <RC.List>

      <RC.Item theme="divider">Common Components</RC.Item>
      <RC.Item theme="text-wrap">
        <p>Examples of common components that you will most likely need when building an app.</p>
      </RC.Item>

      {this.loop(Commons, "brand")}

      <RC.Item theme="divider">Unique Components</RC.Item>
      <RC.Item theme="text-wrap">
        <p>Examples of common components that you will most likely need when building an app.</p>
      </RC.Item>
      {this.loop(Uniques, "brand2")}

      <RC.Item theme="divider">iHealth Device Components</RC.Item>
      <RC.Item theme="text-wrap">
        <p>Examples of iHealth device JS classes and UI components.</p>
      </RC.Item>
      {this.loop(Devices, "brand3")}
    </RC.List>
  }
})
