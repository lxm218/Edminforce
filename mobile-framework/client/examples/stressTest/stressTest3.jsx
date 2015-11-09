
App.Stress_Test_3 = React.createClass({
  stressTest() {

    let albums = [{
      avatar: "/assets/examples/album1.jpg",
      title: "Downward Spiral",
      subtitle: "Nine Inch Nails"
    },{
      avatar: "/assets/examples/album2.jpg",
      title: "The Slip",
      subtitle: "Nine Inch Nails"
    },{
      avatar: "/assets/examples/album3.jpg",
      title: "Gone Girl",
      subtitle: "Trent Reznor & Atticus Ross"
    },{
      avatar: "/assets/examples/album4.jpg",
      title: "Daft Punk",
      subtitle: "Random Access Memories"
    },{
      avatar: "/assets/examples/album5.jpg",
      title: "Sia",
      subtitle: "1000 Forms of Fear"
    },{
      avatar: "/assets/examples/album6.jpg",
      title: "Hesitation Marks",
      subtitle: "Nine Inch Nails"
    },{
      avatar: "/assets/examples/album7.jpg",
      title: "Old World Underground",
      subtitle: "Metric"
    }]

    let self = this
    let ComposedItem = stComposition(RC.Item)
    var loop = []

    for (let i=0; i < 200; i++) {
      loop = loop.concat(
        albums.map(function(a,n){

          let key = String(i)+n

          a.theme = "thumbnail"
          a.uiClass = "chevron-right"
          a.uiColor = "gray"

          return <ComposedItem {... a} key={key} />
        })
      )
    }

    return loop
  },
  render() {

    return <RC.List>
      <RC.Item theme="body">
        <h3>Stress Test</h3>
        <p>This is a stress test. It's created for testing the performance of React, framework and the CSS in Javascript foundations.</p>
        <p>
          <strong>Details:</strong><br />
          a) 7*200 thumbnail list items looped.<br />
          b) Each list item is wrapped in a composition.<br />
          c) On mouseover, state is changed but because it is wrapped in a composition, only the single item is re-rendered.<br />
          d) This example uses inline styles.
        </p>
      </RC.Item>

      <RC.Item theme="divider">Stress Test Begin</RC.Item>
      {this.stressTest()}
    </RC.List>
  }
})

let stComposition = function(Component) {
  const Composition = React.createClass({
    getInitialState() {
      return {isHover: false}
    },
    mouseOver() {
      this.setState({ isHover: true })
    },
    mouseOut() {
      this.setState({ isHover: false })
    },
    render() {

      let areaInnerStyle = this.state.isHover ? { padding: "0 0 0 200px" } : {}
      let uiColor = this.state.isHover ? "brand1" : null

      return <Component {... this.props} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} areaInnerStyle={areaInnerStyle} uiColor={uiColor}>
        {this.props.children}
      </Component>
    }
  })
  return Composition
}
