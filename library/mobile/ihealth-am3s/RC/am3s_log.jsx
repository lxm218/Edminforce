
IH.Device.AMLog = React.createClass({
  mixins: [RC.Mixins.PureRender],

  // @@@@
  // @@@@
  // Prep
  // @@@@
  // @@@@


  // @@@@
  // @@@@
  // Render
  // @@@@
  // @@@@
  render() {
    let date = null

    return <div>
      {
      (this.props.measurements || []).map( function(amVal, n) {
        let amDate = moment(amVal.MDate).format("MM/DD/YY")
        let showDate = amDate!==date
        date = amDate
        return <IH.Device.AMLogItem amVal={amVal} showDate={showDate} order={n} key={n} />
      })
      }
    </div>
  },
})

IH.Device.AMLogItem = React.createClass({
  mixins: [RC.Mixins.PureRender],
  propTypes: {
    amVal: React.PropTypes.object.isRequired
  },
  // @@@@
  // @@@@
  // Render
  // @@@@
  // @@@@
  render() {
    let amVal = this.props.amVal
    // let zoneColor = h.getBGColor(bgVal)
    let zoneColor = "#fff"

    return <IH.Device.ListItem header={this.props.showDate ? moment(amVal.MDate).format("ddd, MMM Do, YYYY") : false} zoneColor={zoneColor} alt={this.props.order%2}>
      <IH.Device.ListCircle val={amVal.BG} unit="mg/dl" theme="left" />
      <IH.Device.ListArea title="title" time={moment(amVal.MDate).format("h:mm A")}>

      </IH.Device.ListArea>
    </IH.Device.ListItem>
  },
})
