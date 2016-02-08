"use strict"

DevicePrivate.Circle = class extends React.Component {
  constructor(p) {
    super(p)

    // Config
    this.radius = 120
    this.strokeWidth = 4
    this.fullRadius = this.radius+this.strokeWidth // This is *not* the diameter
    this.circle = Math.PI*(this.radius*2)
    // this.svg = this.calculateSVG()
  }
  shouldComponentUpdate(np) {
    return np.perCent!=null && !isNaN(np.perCent) && np.perCent != this.props.perCent
  }
  render() {
    const styles = this.calculateSVG()

    // let styles = _.clone(this.svg)
    // const pc = this.getVal(this.props.perCent)
    // if (!isNaN(pc))
    //   styles.progress.style.strokeDashoffset = pc

    return <svg {... styles.main} onClick={this.props.onClick}>
      <circle {... styles.full} />
      <circle {... styles.progress} />
    </svg>
  }
  _getVal(pc) {
    if (isNaN(pc) || pc==null) pc = 0
    // const c = Math.PI*(this.radius*2)
    const val = Math.max( Math.min(pc, 100), 0)
    return ((100-val)/100)*this.circle
  }
  calculateSVG() {
    const pc = this._getVal(this.props.perCent)
    let colorPrimary, colorSecondary, colorFill

    switch (this.props.deviceType) {
      case "AM":
        colorFill = "transparent"
        colorPrimary = IH.Device.Color.AMalt
        colorSecondary = IH.Device.Color.AMrgba(.3)
      break
      case "BP":
        colorFill = "transparent"
        colorPrimary = IH.Device.Color.BPalt
        colorSecondary = IH.Device.Color.BPrgba(.55)
      break
      default:
        colorFill = "rgba(0,0,0,.1)"
        colorPrimary = "#FFF"
        colorSecondary = "rgba(255,255,255,.5)"
      break
    }

    const circle = {
      r: this.radius, cx: this.fullRadius, cy: this.fullRadius,
      strokeDasharray: this._getVal(0), strokeWidth: this.strokeWidth,
    }

    return {
      main: {
        width: this.fullRadius*2, height: this.fullRadius*2,
        viewPort: "0 0 100 100",
        style: {
          position: "absolute", left: "50%", top: "50%", zIndex: 5,
          margin: `${(this.fullRadius*-1)+(this.props.offset || -25)}px 0 0 ${this.fullRadius*-1}px`,
          // transform: "rotate(-90deg);-webkit-transform:rotate(-90deg);-moz-transform:rotate(-90deg);-ms-transform:rotate(-90deg)"
          transform: "rotate(-90deg)", WebkitTransform: "rotate(-90deg)"
        }
      },
      full: Object.assign({}, circle, {
        fill: colorFill,
        stroke: colorSecondary,
        style: {
          strokeDashoffset: this._getVal(100)
        }
      }),
      progress: Object.assign({}, circle, {
        fill: "transparent",
        stroke: colorPrimary,
        style: {
          transition: `stroke-dashoffset 1s ease`, WebkitTransition: `stroke-dashoffset 1s ease`,
          strokeDashoffset: pc || 0
        }
      }),
    }
  }
}

DevicePrivate.Circle.displayName = "DevicePrivate.Circle"
