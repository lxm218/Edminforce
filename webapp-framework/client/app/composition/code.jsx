
// @@@@
// @@@@
// Code
// @@@@
// @@@@
App.Code = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],

  renderCodeSnippet() {
    if (this.props.tmpl && App[this.props.tmpl])
      return React.createElement(App[this.props.tmpl], {code: true})
  },
  render() {
    let styles = this.css.styles
    return <div style={styles.area}>
      <div style={styles.areaInner}>
        {this.renderCodeSnippet()}
      </div>
    </div>
  },
  baseStyles() {
    return {
      area: {
        minHeight: "100vh", overflowY: "auto",
        padding: "6% 4%",
        backgroundColor: "#f8f5ec", color: "#57686d",
        position: "fixed", top: 0, bottom: 0, left: "50%", right: 0, zIndex: 9999,
      },
      areaInner: {
        maxWidth: 800,
        fontSize: RC.Theme.font.size-2, lineHeight: 1.7
      },
    }
  },
})

// @@@@
// @@@@
// Backdrop
// @@@@
// @@@@
App.CodeBackdrop = React.createClass({
  render() {

    let style = h.assignClone(RC.cssMixins.fixedFull, {
      backgroundColor: "rgba(0,0,0,.5)",
      zIndex: 1000,
    })

    return <div {... this.props} style={style}/>
  }
})
