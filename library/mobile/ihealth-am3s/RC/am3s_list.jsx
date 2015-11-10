
IH.Device.AMList = React.createClass({
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
        return <IH.Device.AMListItem amVal={amVal} showDate={showDate} order={n} key={n} />
      })
      }
    </div>
  },
})

IH.Device.AMListItem = React.createClass({
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

    /**
     * Styles
     */
    // let zoneColor = h.getAMColor(amVal)
    let zoneColor = "green"
    let fontSize = RC.Theme.font.size
    let styles = {
      measurement: h.assignClone( RC.cssMixins.font("light"), {
        padding: "7px 0 0",
      }),
      block: {
        display: "inline-block", padding: 0, minWidth: 95
      },
      big: {
        display: "inline-block", verticalAlign: "bottom",
        fontSize: fontSize*1.7, lineHeight: `${fontSize*1.8}px`
      },
      small: {
        display: "inline-block", verticalAlign: "bottom",
        fontSize: fontSize-4, lineHeight: `${fontSize-4}px`, margin: "0 0 3px 3px"
      }
    }

    return <IH.Device.ListItem header={this.props.showDate ? moment(amVal.MDate).format("ddd, MMM Do, YYYY") : false} zoneColor={zoneColor} alt={this.props.order%2}>
      <IH.Device.ListCircle val="51%" unit="of 10,000" theme={["left","smaller"]} />
      <IH.Device.ListArea time={moment(amVal.MDate).format("h:mm A")} theme="right">
        <div style={styles.measurement}>
          <span style={styles.big}>3,589</span><span style={styles.small}>kcal</span>
          <p style={styles.block}><span style={styles.big}>85</span><span style={styles.small}>sleep %</span></p>
        </div>
      </IH.Device.ListArea>
    </IH.Device.ListItem>
  },
})
