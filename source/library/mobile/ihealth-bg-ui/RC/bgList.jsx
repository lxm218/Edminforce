
IH.Device.BGList = React.createClass({
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
      this.props.measurements.map( function(bgVal, n) {
        let bgDate = moment(bgVal.MDate).format("MM/DD/YY")
        let showDate = bgDate!==date
        date = bgDate
        return <IH.Device.BGListItem bgVal={bgVal} showDate={showDate} order={n} key={n} />
      })
      }
    </div>
  },
})

IH.Device.BGListItem = React.createClass({
  mixins: [RC.Mixins.PureRender],
  propTypes: {
    bgVal: React.PropTypes.object.isRequired
  },
  // @@@@
  // @@@@
  // Render
  // @@@@
  // @@@@
  render() {
    let bgVal = this.props.bgVal
    let zoneColor = h.getBGColor(bgVal)

    return <IH.Device.ListItem header={this.props.showDate ? moment(bgVal.MDate).format("ddd, MMM Do, YYYY") : false} zoneColor={zoneColor} alt={this.props.order%2}>
      <IH.Device.ListCircle val={bgVal.BG} unit="mg/dl" theme="left" />
      <IH.Device.ListArea title={h.getBGTitle(bgVal.mealType, bgVal.beforeMeal)} time={moment(bgVal.MDate).format("h:mm A")}>

      </IH.Device.ListArea>
    </IH.Device.ListItem>
  },
})
