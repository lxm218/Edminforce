"use strict"

DevicePrivate.Result = class extends React.Component {
  componentWillMount() {
    this.styles = this.baseStyles()
  }
  renderDate() {
    return <div style={this.styles.dateTitle} key="date">
      {this._getDateString()}
      <div style={this.styles.xContain} onClick={this.props.closeFunc} key={0}>
        <span style={this.styles.xTop} />
        <span style={this.styles.xBot} />
      </div>
    </div>
  }
  render() {
    return <div style={this.styles.area}>
      {this.renderDate()}
      {this.renderResult()}
    </div>
  }
  baseStyles() {
    const row = {
      width: "100%", margin: "0 auto",
    }
    const col = {
      display: "inline-block", width: "50%"
    }
    const fontSize = RC.Theme.font.size
    const xLine = {
      position: "absolute", top: "50%", left: "50%",
      backgroundColor: RC.Theme.color.text
    }
    const title = Object.assign(RC.cssMixins.font("heavy"), {
      fontSize: fontSize-3, padding: 7,
      position: "relative", textAlign: "center"
    })
    let areaStyle = Object.assign({}, RC.cssMixins.absFull, RC.cssMixins.font("light"), {
      width: "100%", padding: "0 0 15px",
      overflowY: "auto", overflowX: "hidden", zIndex: 100,
      background: "#FFF", color: RC.Theme.color.text
    })

    if (typeof this.props.style=="object")
      Object.assign( areaStyle, this.props.style)

    // ## Start Styles
    return {
      area: areaStyle,
      // Title & Date
      title: Object.assign({}, title, {
        borderBottom: "solid 1px #e4e4e4",
      }),
      dateTitle: Object.assign({}, title, {
        color: RC.Theme.color.text
      }),
      // X
      xContain: {
        position: "absolute", zIndex: 100,
        top: -5, right: -3,
        transform: "rotate(45deg)", WebkitTransform: "rotate(45deg)",
        width: 40, height: 40
      },
      xTop: Object.assign({}, xLine, {
        height: 2, width: 14, margin: "-1px 0 0 -7px"
      }),
      xBot: Object.assign({}, xLine, {
        height: 14, width: 2, margin: "-7px 0 0 -1px"
      }),
      // Row
      rowFirst: Object.assign({}, row,{
        background: IH.Device.Color.alt, color: RC.Theme.color.text,
        ":nth-child(1)": {
          padding: "20px 0 0"
        },
        ":nth-child(3)": {
          padding: "0 0 22px"
        }
      }),
      rowSecond: Object.assign({}, row,{
        padding: "5px 0 4px",
        ":nth-child(1)": {
          padding: "20px 0 4px"
        },
        // ":nth-child(2)": {
        //   padding: "5px 0 20px"
        // },
      }),
      // Col
      colLeft: Object.assign({}, col, {
        paddingTop: 0, paddingRight: 14, paddingBottom: 0, paddingLeft: 0,
        textAlign: "right"
      }),
      colRight: Object.assign({}, col, {
        paddingTop: 3, paddingRight: 0, paddingBottom: 4, paddingLeft: 14,
        textAlign: "left", fontSize: fontSize*3.1
      }),
      colTitle: {
        paddingTop: 0, paddingBottom: 0,
        fontSize: fontSize+2, lineHeight: `${fontSize+2}px`,
        verticalAlign: "top",
      },
      colUnit: {
        display: "block",
        fontSize: fontSize-3, lineHeight: `${fontSize}px`
      },
    }
  }
}
