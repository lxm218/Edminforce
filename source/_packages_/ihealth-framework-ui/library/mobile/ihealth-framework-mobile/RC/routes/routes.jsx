
RC.AnimateRoute = class extends RC.CSS {

  constructor(props){
    super(props)

    this.watchProps = ["createHeaderSpace","lock"]
  }

  render() {
    const styles = this.css.get("styles")
    const animateKeys = ["transitionName","transitionEnterTimeout","transitionLeaveTimeout"]
    const props = _.omit(this.props, animateKeys.concat("tmpl"))

    let defaults = {
      transitionName: "from-right",
      transitionEnterTimeout: 300,
      transitionLeaveTimeout: 300
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
  }
  // @@@@
  // Start Styles

  baseStyles(np,ns) {
    return {
      // Canvas Outer
      area: Object.assign({}, RC.cssMixins.absFull, {
        top: np.createHeaderSpace ? RC.Theme.size.headerNavHeight() : 0, zIndex: 5010,
        overflowY: np.lock ? "hidden" : "auto", overflowX: "hidden",
        backgroundColor: this.color.get("hex"),
      }),
    }
  }
}


RC.AnimateRoute.displayName = "RC.AnimateRoute";
