
RC.RouteFromBottom = React.createClass({
  animationDelay() {
    console.log("Hey Yo")
  },
  render() {
    let props = _.omit(this.props, "tmpl")
    props.className = (props.className || "")+" fixed-full route-top"

    return <RC.Animate transitionName="slide-up">
      {
      !!this.props.tmpl
      ?
      <div {... props}>
        {h.returnComponent(this.props.tmpl)}
      </div>
      : null
      }
    </RC.Animate>
  }
})

// RC.Delay = React.createClass({
//   propTypes: {
//     wait: React.PropTypes.number,
//   },
//   componentDidMount() {
//     let self = this
//     Meteor.setTimeout(function(){
//       self.setState({
//         waiting: false
//       })
//     }, this.props.wait || 1000)
//   },
//   getInitialState() {
//     return {
//       waiting: true
//     }
//   },
//   render() {
//     return <div {... _.omit(this.props, "wait")}>
//       {this.props.children}
//     </div>
//   }
// })
