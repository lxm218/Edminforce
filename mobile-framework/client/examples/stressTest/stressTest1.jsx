
App.Stress_Test_1 = React.createClass({
  getInitialState() {
    return {
      hoverKey: null
    }
  },
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
    var loop = []

    for (let i=0; i < 200; i++) {
      loop = loop.concat(
        albums.map(function(a,n){

          let key = String(i)+n

          a.theme = "thumbnail"
          a.uiClass = "chevron-right"
          a.uiColor = "gray"
          a.onMouseOver = function(){
            self.setState({
              hoverKey: key
            })
          }

          a.canvasInnerStyle = key===self.state.hoverKey ? { padding: "0 0 0 200px" } : {}
          a.uiColor = key===self.state.hoverKey ? "brand1" : null

          return <RC.Item {... a} key={key} />
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
          b) On mouseover, state is changed causing all 1400 list items to re-render.<br />
          c) When list item re-renders, it updates with new inline styles and its inner uiIcon component is refreshed.
        </p>
      </RC.Item>

      <RC.Item theme="divider">Stress Test Begin</RC.Item>
      {this.stressTest()}
    </RC.List>
  }
})
