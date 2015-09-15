
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
  openCam() {
    IH.Camera.getPicture({}, function(e,r){
      if (e)
        console.log(e)
      else{
        console.log('saving pics',typeof r)
        Meteor.call("saveImage", r)
      }
    })
  },
  render() {

    let Commons = [
      { value: "Cards", href: "/examples/Cards", uiClass: "check-circle-o" },
      { value: "Lists", href: "/lists/List_Index", uiClass: "check-circle-o" },
      { value: "Tabs", href: "/tabs/Tabs_Index", uiClass: "check-circle-o" },
      { value: "Form", href: "/forms/Form_Index", uiClass: "check-circle-o" },
    ]

    let Uniques = [
      { value: "Graphs", href: "/graphs/Graph_Index", uiClass: "check-circle-o" },
      { value: "Global Layout", href: "/examples/Global_Layout", uiClass: "circle-o" },
      { value: "Global Nav", href: "/globalNav/Global_Nav_Index", uiClass: "check-circle-o" },
      { value: "Swipe", href: "/examples/Swipe", uiClass: "check-circle-o" },
      { value: "Timeline", href: "/timelines/Timeline_Index", uiClass: "check-circle-o" },
      { value: "Left Nav", onClick: this.openNav, uiClass: "check-circle-o" },
      { value: "Chat", href: "/examples/Chat", uiClass: "check-circle-o" },
    ]

    let Devices = [
      { value: "BP Component", href: "/BPComponent", uiClass: "check-circle-o" },
      { value: "BP5 Cordova JS", href: "/BP5", uiClass: "check-circle-o" },
      { value: "BG Component", href: "/BGComponent", uiClass: "check-circle-o" },
      { value: "BG5 Cordova JS", href: "/BG5", uiClass: "check-circle-o" },
    ]

    let Complex = [
      { value: "User App", href: "/user/User_Index", uiClass: "check-circle-o" },
      { value: "Chat App", href: "/chat/Chat_Index", uiClass: "circle-o" },
      { value: "Chat Demo", href: "/chat_channel/all", uiClass: "circle-o" },
      //{ value: "camera", onClick: this.openCam, uiClass: "circle-o" },
    ]

    return <RC.List>

      <RC.Item theme="divider">Common Components</RC.Item>
      <RC.Item theme="text-wrap">
        <p>Common components that you will most likely need when building an app.</p>
      </RC.Item>
      {this.loop(Commons, "brand")}

      <RC.Item theme="divider">Unique Components</RC.Item>
      <RC.Item theme="text-wrap">
        <p>Important, unique components that aren't needed in every app.</p>
      </RC.Item>
      {this.loop(Uniques, "brand2")}

      <RC.Item theme="divider">iHealth Device Packages</RC.Item>
      <RC.Item theme="text-wrap">
        <p>iHealth device JS classes and UI components.</p>
      </RC.Item>
      {this.loop(Devices, "brand3")}

      <RC.Item theme="divider">Complex Packages</RC.Item>
      <RC.Item theme="text-wrap">
        <p>Complex packages and apps that may include UI, server code or both.</p>
      </RC.Item>
      {this.loop(Complex, "red")}

    </RC.List>
  }
})
