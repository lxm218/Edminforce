
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
  render() {

    let RCExamples = [
      { text: "Swipe", href: "/examples/Swipe" },
      { text: "Chat", href: "/examples/Chat" },
      { text: "Cards", href: "/examples/Cards" },
      { text: "Timeline", href: "/examples/Timeline" },
      { text: "List", href: "/examples/List" },
      { text: "Tabs", href: "/examples/Tabs" },
      { text: "Form Elements", href: "/examples/FormElements" },
      { text: "Form Handling", href: "/examples/Form" },
      { text: "Header Nav", href: "/examples/Header" },
      { text: "Left Nav", onClick: this.openNav },
      { text: "Global Nav", href: "/examples/Global_Nav" },
    ]

    let devicesExamples = [
      { text: "BP Component", href: "/BPComponent" },
      { text: "BP5 Cordova JS", href: "/BP5" },
    ]

    return <div className="padding">
      <h4>Component Examples</h4>
      {
      RCExamples.map(function(item,n){
        return <a href={item.href} onClick={item.onClick} className="block padding-both" key={n}>{item.text}</a>
      })
      }
      <h4 className="margin-t">iHealth Device Examples</h4>
      {
      devicesExamples.map(function(item,n){
        return <a href={item.href} className="block padding-both" key={n}>{item.text}</a>
      })
      }
    </div>
  }
})
