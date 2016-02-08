"use strict"

RC.Header = class extends RC.CSS {
  renderChildren() {
    const styles = this.css.get("styles")
    if (h.checkIfString(this.props.children))
      return <p style={styles.subheading}>{this.props.children}</p>
    return h.renderWithFunction(this.props.children, (c,n) => {
      if (React.isValidElement(c)) {
        if (c.type=="p")
          return React.cloneElement(c, {style: styles.subheading, key: n})
        else if (typeof c.type==="string") {
          let props = { key: n }
          if (styles[c.type]) props.style = Object.assign({},styles[c.type], props.style)
          return React.cloneElement(c, props, c.props.children)
        }
      }
      return <p style={styles.subheading} key={n}>{c}</p>
    })
  }
  render() {
    return <div style={this.css.get("styles").area}>
      {this.renderChildren()}
    </div>
  }
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  baseStyles() {
    let PAD = RC.Theme.size.padding
    return {
      area: {
        position: "relative", padding: `50px ${PAD} 2%`,
        backgroundColor: this.color.get("realHex"), color: this.color.get("textColor")
      },
      subheading: {
        padding: "5px 0 0",
        opacity: .55,
        textIndent: 4,
        fontSize: RC.Theme.font.size*1.25, color: "inherit",
      },
      h1: {
        padding: 0,
        textIndent: 3,
        fontSize: RC.Theme.font.size*3.1, color: "inherit",
      },
      h2: {
        padding: 0,
        textIndent: 3,
        fontSize: RC.Theme.font.size*2.9, color: "inherit",
      },
      h3: {
        padding: 0,
        textIndent: 3,
        fontSize: RC.Theme.font.size*2.7, color: "inherit",
      },
      h4: {
        padding: 0,
        textIndent: 3,
        fontSize: RC.Theme.font.size*2.5, color: "inherit",
      },
      h5: {
        padding: 0,
        textIndent: 3,
        fontSize: RC.Theme.font.size*2.3, color: "inherit",
      },
      h6: {
        padding: 0,
        textIndent: 3,
        fontSize: RC.Theme.font.size*2.1, color: "inherit",
      },
      // Nav
      nav: {
        position: "absolute", top: 0, right: 0,
        height: 50, padding: "15px 5px",
      },
      link: {
        fontSize: RC.Theme.font.size-2,
        display: "inline-block", padding: "0 5px", margin: "0 5px"
      }
    }
  }
}


RC.Header.displayName = "RC.Header"
