
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

    let animateKeys = ["transitionName","transitionEnterTimeout","transitionLeaveTimeout"]
    let props = _.omit(this.props, animateKeys.concat("tmpl"))
    let styles = this.css.styles

    let defaults = {
      transitionName: "from-right",
      transitionEnterTimeout: 180,
      transitionLeaveTimeout: 180
    }
    let animateProps = Object.assign(defaults, _.pick(this.props, animateKeys))

    return <RC.Animate {... animateProps}>
      {
      !!this.props.tmpl
      ?
      <div {... props} style={styles.area} key="route-animation">
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
    //   <div {... props} style={styles.area} key={"route-animation"}>
    //     {this.state.template}
    //   </div>
    //   : null
    //   }
    // </RC.Animate>
  },
  // @@@@
  // Start Styles
  watchProps: ["createHeaderSpace","lock"],
  baseStyles(np,ns) {
    return {
      // Canvas Outer
      area: h.assignClone( RC.cssMixins.absFull, {
        top: np.createHeaderSpace ? RC.Theme.size.headerNavHeight+(RC.Theme.statusBar ? 20 : 0) : 0, zIndex: 5010,
        overflowY: np.lock ? "hidden" : "auto", overflowX: "hidden",
        backgroundColor: this.color.hex,
      }),
    }
  },
})
