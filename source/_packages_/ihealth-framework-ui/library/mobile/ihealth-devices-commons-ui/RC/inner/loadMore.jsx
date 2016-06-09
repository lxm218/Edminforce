"use strict"

DevicePrivate.LoadMore = class extends React.Component {
  constructor(p) {
    super(p)
    this.style = {
      height: 38,
      display: "flex", alignItems: "center",
      background: IH.Device.Color[p.deviceType],
      fontSize: RC.Theme.font.size-2, textAlign: "center", color: "#FFF"
    }
  }
  render() {
    return <div {... this.props} style={this.style}>
      <span style={{margin: "0 auto"}}>
        {
        this.props.isReady
        ?
        "Load More"
        :
        <RC.Loading theme={["tiny","inline"]} />
        }
      </span>
    </div>
  }
}
