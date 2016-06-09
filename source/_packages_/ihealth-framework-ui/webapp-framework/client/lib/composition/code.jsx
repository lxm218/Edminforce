
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

    let style = Object.assign({},RC.cssMixins.fixedFull, {
      backgroundColor: "rgba(0,0,0,.5)",
      zIndex: 1000,
    })

    return <div {... this.props} style={style}/>
  }
})

RC.Code = class extends RC.CSS {
  render() {
    return this.props.code
      ? this.renderCode()
      : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
  }

  renderCode() {
    const methods = Object.getPrototypeOf(this);
    if(_.isFunction(methods.code)) {
      let str = `class extends RC.Code {${methods.code().replace('renderExample', 'render')}}`
      return <pre dangerouslySetInnerHTML={{__html: h.stringToCodeHL(str)}} />
    }
    else {
      // Don't use this, needs improvement.
      const code = _.chain(methods)
        .map( m => {
          const list = (m + '').substr(9).replace('renderExample', 'render').split('\n');
          return list.map( line => line.split('//')[0].replace(' ? ', '@br    ? ').replace(' : ', '@br    : ') ).join('@br');
        }).join('@br  ')
        .value();
      const str = `class extends RC.Code {@br  ${code}@br}`
      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(str)}} />
    }
  }
}
