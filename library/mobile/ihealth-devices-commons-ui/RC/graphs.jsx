"use strict"

DevicePrivate.Graphs = class extends RC.MeteorData {
  constructor(p) {
    super(p)
    this._graphHeight = [210,190,170]
    this._graphPoints = [10,8,6]

    this.state = { cond: "latest" }
    this.styles = this.getStyles()
  }
  _switchGraph(graphType) {
    this.setState({ cond: graphType })
  }
  _MQ() {
    if (RC.MQ.device>=2)
      return {
        height: this._graphHeight[0],
        points: this._graphPoints[0]
      }
    else if (RC.MQ.device>=1)
      return {
        height: this._graphHeight[1],
        points: this._graphPoints[1]
      }
    else
      return {
        height: this._graphHeight[2],
        points: this._graphPoints[2]
      }
  }
  render(){
    return <div>
      <RC.TabsSlider bgColor={IH.Device.Color[this._deviceType]} forceClicked={_.indexOf(this._dtOpts, this.state.cond)} initialTab={0} activateOnClick={false} cursorColor="rgba(255,255,255,.58)">
        {
        this._dtOpts.map( (dt,n) => {
          return <RC.URL onMouseDown={this._switchGraph.bind(this,dt)} onTouchStart={this._switchGraph.bind(this,dt)} key={n}>{h.capitalize(dt)}</RC.URL>
        })
        }
      </RC.TabsSlider>
      {this.renderGraph()}
    </div>
  }
  getStyles() {
    const fontSize = RC.Theme.font.size
    return {
      area: {
        padding: "10px 0 0"
      },
      title: {
        fontSize: fontSize-2, textAlign: "center",
        padding: "10px 0 0",
      },
      titleInner: {
        display: "inline-block",
        height: 24, padding: "3px 15px 0",
        background: IH.Device.Color.alt,
        borderRadius: 12
      },
      graphArea: {
        height: this._MQ().height
      }
    }
  }
}
