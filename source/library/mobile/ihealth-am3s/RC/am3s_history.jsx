
// ####
// ####
// AM3S - Measure & Display
// ####
// ####

IH.Device.AM3SHistory = React.createClass({
  displayName: "AM3SHistory",
  appName: "AM3SHistory",
  mixins: [ReactMeteorData,IH.Mixins.TabContents,RC.Mixins.CSS],

  getMeteorData() {

    let cond = {
      deviceType: "AM"
    }
    let opts = {
      sort: { MDate: -1 },
      limit: 20
    }

    switch (this.state.tab) {
      case 0:
        // Latest View
        // break
      case 1:
        // Log View
        // break
    }

    IH.DeviceSubs.subscribe("AMMeasurements", cond, opts)

    let isReady = IH.DeviceSubs.ready()
    let measurements = []

    if (isReady) {
      measurements = IH.Coll.Measurements.find(cond, opts).fetch()
    }

    return {
      isReady: isReady,
      m: measurements
    }
  },

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

    return <RC.Loading isReady={this.data.isReady} style={styles.area}>
      {
      this.state.tab
      ? <IH.Device.AMLog measurements={this.data.m} />
      : <IH.Device.AMList measurements={this.data.m} />
      }
    </RC.Loading>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  baseStyles() {
    return {
      area: {

      }
    }
  }
})
