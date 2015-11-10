
// ####
// ####
// AM3S - Measure & Display
// ####
// ####

IH.Device.AM3SMeasure = React.createClass({
  displayName: "AM3SMeasure",
  appName: "AM3SMeasure",
  mixins: [IH.Mixins.AM3S, RC.Mixins.CSS],

  propTypes: {
    title: React.PropTypes.string,
  },
  // @@@@
  // @@@@
  // Prep
  // @@@@
  // @@@@
  render() {
    let styles = this.css.styles
    return <div style={styles.area}>
      {
      this.state.isConnected
      ? <IH.Device.AM3SActivityDisplay />
      : <IH.Device.AM3SConnect />
      }
    </div>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  baseStyles() {
    return {
      area: {
        position: "relative", height: "100%",
        display: "flex", alignItems: "center",
      }
    }
  }
})

IH.Device.AM3SActivityDisplay = React.createClass({
  displayName: "AM3SActivityDisplay",
  appName: "AM3SActivityDisplay",
  // mixins: [IH.Mixins.AM3S, RC.Mixins.CSS],
  mixins: [IH.Mixins.AM3S, RC.Mixins.CSS],
  // @@@@
  // @@@@
  // Prep
  // @@@@
  // @@@@
  // componentWillMount() {
    // this.call("getActivityMessage")
  // },
  render() {
    return <div>"Hello, I connected!"</div>
  }
})
