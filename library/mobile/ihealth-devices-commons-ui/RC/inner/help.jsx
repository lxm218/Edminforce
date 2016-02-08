"use strict"

DevicePrivate.Help = class extends React.Component {
  constructor(p) {
    super(p)
    this.state = {
      cur: 0
    }
  }
  // @@
  // @@
  // Prep
  // @@
  // @@
  componentWillMount() {
    this.styles = this.getStyles()
  }
  _updatePage(val) {
    this.setState({
      cur: val
    })
  }
  // @@
  // @@
  // Render
  // @@
  // @@
  render() {
    const swipe = {
      bgColor: "#FFF",
      continuous: false,
      callback: this._updatePage.bind(this),
      childStyle: this.styles.child,
      outerContent: [<div style={this.styles.xContain} onClick={this.props.closeFunc} key={0}>
        <span style={this.styles.xTop} />
        <span style={this.styles.xBot} />
      </div>,
      <div style={this.styles.dots} key={1}>
        {
        this.props.panes.map( (pane,n) => {
          return <span style={h.assignPseudos(this.styles.dot,n==this.state.cur)} key={n} />
        })
        }
      </div>]
    }
    return <RC.Swipe {... swipe}>
      {
      this.props.panes.map( (pane,n) => {
        const handler = this.props.panes.length-1==n ? this.props.closeFunc : null
        const img = pane.img ? <img src={pane.img} style={this.styles.paneImg} onClick={handler} /> : null
        const paneStyle = Object.assign(RC.cssMixins.font("light"),{
          fontSize: pane.fontSize || RC.Theme.font.size+5
        })
        return <div key={n}>
          {img}
          <p style={paneStyle} onClick={handler}>{pane.text}</p>
        </div>
      })
      }
    </RC.Swipe>
  }
  getStyles() {
    const xLine = {
      position: "absolute", top: "50%", left: "50%",
      backgroundColor: "#424242"
    }

    return {
      child: {
        display: "flex", alignItems: "center", justifyContent: "center"
      },
      // Inside Pane
      paneImg: {
        maxHeight: 320, width: "auto"
      },
      // X
      xContain: {
        position: "absolute", zIndex: 100,
        top: -10, right: -17,
        transform: "rotate(45deg)", WebkitTransform: "rotate(45deg)",
        width: 70, height: 70
      },
      xTop: Object.assign({}, xLine, {
        height: 2, width: 20, margin: "-1px 0 0 -10px"
      }),
      xBot: Object.assign({}, xLine, {
        height: 20, width: 2, margin: "-10px 0 0 -1px"
      }),
      // Dots
      dots: {
        position: "absolute", bottom: 10, left: 0, right: 0,
        textAlign: "center"
      },
      dot: {
        display: "inline-block", borderRadius: "50%",
        width: 6, height: 6, margin: 2,
        border: "solid 1px rgba(0,0,0,.2)",
        ":on": {
          border: "none",
          backgroundColor: IH.Device.Color[this.props.deviceType] || "#3d3d3d"
        }
      },
    }
  }
}
DevicePrivate.Help.propTypes = Object.assign({}, DevicePrivate.Help.propTypes, {
  panes: React.PropTypes.array.isRequired,
  closeFunc: React.PropTypes.func.isRequired,
  deviceType: React.PropTypes.string
})

const fadedOpacity = .55
const tn = "all ease .35s"

DevicePrivate.HelpButton = class extends React.Component {
  componentWillMount() {
    this.style = {
      width: 50, height: 50, margin: "0 0 0 -25px",
      position: "absolute", bottom: 33, left: "50%", zIndex: 10,
      borderRadius: "50%",
      display: "flex", alignItems: "center", justifyContent: "center",
      backgroundColor: "rgba(0,0,0,.25)",
      borderStyle: "solid", borderWidth: 1, borderColor: `rgba(255,255,255,${fadedOpacity})`,
      fontSize: RC.Theme.font.size-2, color: "rgba(255,255,255,.8)",
      transition: tn, opacity: 1,
      ":glow": {
        borderColor: IH.Device.Color[`${this.props.deviceType}alt`] || "#FF3"
      },
      ":hidden": {
        opacity: 0
      }
    }
  }
  render() {
    let cssStates = []
    if (this.props.isFocused) cssStates.push(":glow")
    if (this.props.isHidden) cssStates.push(":hidden")

    return <span {... this.props} style={h.assignPseudos(this.style, cssStates)}>
      {this.props.children}
    </span>
  }
}
DevicePrivate.HelpButton.propTypes = Object.assign({}, DevicePrivate.HelpButton.propTypes, {
  isOn: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired
})
