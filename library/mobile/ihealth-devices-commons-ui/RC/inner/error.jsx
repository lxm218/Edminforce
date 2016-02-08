"use strict"

DevicePrivate.Error = class extends React.Component {
  // @@
  // @@
  // Prep
  // @@
  // @@
  componentWillMount() {
    this.styles = this.getStyles()
  }
  // @@
  // @@
  // Render
  // @@
  // @@
  render() {
    return <div style={this.styles.area}>
      <p style={this.styles.desc}>{this.props.errorMsg}</p>
      <span style={this.styles.button} onClick={this.props.closeFunc}>Close</span>
    </div>
  }
  getStyles() {
    return {
      area: Object.assign({}, RC.cssMixins.font("light"), RC.cssMixins.absFull, {
        zIndex: 200,
        background: "rgba(0,0,0,.4)", color: "#FFF", textAlign: "center",
        display: "flex", alignItems: "center", alignContent: "center", flexWrap: "wrap"
      }),
      desc: {
        fontSize: RC.Theme.font.size+2,
        width: "90%", margin: "0 5% 20px", padding: "8px 0 0"
      },
      button: {
        borderRadius: "50%",
        width: 70, height: 70, margin: "0 auto 20px",
        display: "flex", alignItems: "center", justifyContent: "center",
        backgroundColor: "#FFF", color: "#444",
        fontSize: RC.Theme.font.size
      }
    }
  }
}

DevicePrivate.Error.propTypes = Object.assign({}, DevicePrivate.Error.propTypes, {
  errorMsg: React.PropTypes.string.isRequired,
  closeFunc: React.PropTypes.func.isRequired
})
