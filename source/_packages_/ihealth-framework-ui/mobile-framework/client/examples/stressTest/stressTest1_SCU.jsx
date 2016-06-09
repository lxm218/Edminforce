// https://facebook.github.io/react/docs/thinking-in-react.html#step-5-add-inverse-data-flow
// https://facebook.github.io/react/docs/multiple-components.html#data-flow
// https://facebook.github.io/react/docs/multiple-components.html#a-note-on-performance
// https://facebook.github.io/react/docs/advanced-performance.html#immutable-js-to-the-rescue

App.Stress_Test_1_SCU = React.createClass({
  getInitialState() {
    return {
      hoverKey: null
    }
  },
  stressTest() {

    let albums = [{
      src: "/assets/examples/album1.jpg",
      title: "Downward Spiral",
      subtitle: "Nine Inch Nails"
    },{
      src: "/assets/examples/album2.jpg",
      title: "The Slip",
      subtitle: "Nine Inch Nails"
    },{
      src: "/assets/examples/album3.jpg",
      title: "Gone Girl",
      subtitle: "Trent Reznor & Atticus Ross"
    },{
      src: "/assets/examples/album4.jpg",
      title: "Daft Punk",
      subtitle: "Random Access Memories"
    },{
      src: "/assets/examples/album5.jpg",
      title: "Sia",
      subtitle: "1000 Forms of Fear"
    },{
      src: "/assets/examples/album6.jpg",
      title: "Hesitation Marks",
      subtitle: "Nine Inch Nails"
    },{
      src: "/assets/examples/album7.jpg",
      title: "Old World Underground",
      subtitle: "Metric"
    }]

    let self = this
    var loop = []

    for (let i=0; i < 200; i++) {
      loop = loop.concat(
        albums.map(function(a,n) {

          let key = String(i)+n;
          let b = _.extend({
            onMouseEnter: function() {
              self.setState({
                hoverKey: key
              });
            }
          }, a);

          return <NewItem b={b} key={key} isHover={key===self.state.hoverKey} />
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

      <RC.ItemDivider>Stress Test Begin</RC.ItemDivider>
      {this.stressTest()}
    </RC.List>
  }
})

let NewItem = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.isHover !== this.props.isHover
  },
  render() {
    let c = _.extend({
      theme: "thumbnail",
      uiClass: "chevron-right",
      areaInnerStyle: this.props.isHover ? { padding: "0 0 0 200px" } : {},
      uiColor: this.props.isHover ? "brand1" : null
    }, this.props.b);
    return <RC.Item {... c} />
  }
})
