
RC.AnimateRoute = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "AnimateRoute",
  // componentWillMount() {
  //   this.lastTmpl = this.props.tmpl
  // },
  // getInitialState() {
  //   return {
  //     template: this.props.tmpl || null
  //   }
  // },
  // componentDidUpdate() {
  //   let self = this
  //
  //   if (this.lastTmpl!=this.props.tmpl) {
  //     this.lastTmpl = this.props.tmpl
  //     this.setState({ template: null })
  //
  //     Meteor.setTimeout(function(){
  //       self.setState({
  //         template: self.props.tmpl
  //       })
  //     },250)
  //   }
  // },
  render() {
    let props = _.omit(this.props, ["tmpl","transitionName"])
    let styles = this.css.styles

    // {h.returnComponent(this.props.tmpl)}

    return <RC.Animate transitionName={this.props.transitionName || "from-right"}>
      {
      !!this.props.tmpl
      ?
      <div {... props} style={styles.canvas} key="route-animation">
        {this.props.tmpl}
      </div>
      :
      null
      }
    </RC.Animate>

    // return <RC.Animate transitionName={this.props.transitionName || "from-right"}>
    //   {
    //   !!this.state.template
    //   ?
    //   <div {... props} style={styles.canvas} key={"route-animation"}>
    //     {this.state.template}
    //   </div>
    //   : null
    //   }
    // </RC.Animate>
  },
  // @@@@
  // Start Styles
  baseStyles() {

    return {
      // Canvas Outer
      canvas: h.assignClone( RC.cssMixins.fixedFull, {
        top: this.props.createHeaderSpace ? RC.Theme.size.headerNavHeight : 0, zIndex: 4010,
        overflowY: "auto", overflowX: "hidden",
        backgroundColor: this.color.hex,
      }),
    }
  },
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
