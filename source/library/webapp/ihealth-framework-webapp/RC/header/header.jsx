
RC.Header = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "Header",
  propTypes: {
    id: React.PropTypes.string,

    theme: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),
  },
  renderNav() {
    if (!this.props.nav)
      return null

    let styles = this.css.styles
    let textColor = this.color.textColor

    return <div style={styles.nav}>
    {
    React.isValidElement(this.props.nav)
    ?
    this.props.nav
    :
    this.props.nav.map(function(c,n){
      if (c.children && typeof c.children==="string") {
        c.key = n
        c.color = c.color || textColor
        c.colorHover = c.colorHover || textColor
        c.style = h.assignClone(styles.link, c.style)

        if (c.uiClass && !c.uiSize)
          c.uiSize = styles.link.fontSize+2
        return <RC.URL {... c}>{c.children}</RC.URL>
      } else if (!c.children && c.uiClass) {
        Object.assign(c, {
          key: n,
          uiSize: c.uiSize || styles.link.fontSize+2,
          theme: "inline-block",
        })

        if (c.uiBgColor)
          Object.assign(c, {style: {margin: "0 10px 0 5px"}})
        else
          Object.assign(c, {itemStyle: {margin: "0 10px 0 5px"}})

        return <RC.uiIcon {... c} />
      }
    })
    }
    </div>
  },
  renderChildren() {
    let styles = this.css.styles
    if (h.checkIfString(this.props.children))
      return <p style={styles.subheading}>{this.props.children}</p>
    else if (this.props.children) {
      return this.props.children.map(function(c,n){
        if (React.isValidElement(c)) {
          if (c.type=="p")
            return React.cloneElement(c, {style: styles.subheading, key: n})
          else if (typeof c.type==="string") {
            let props = c.props
            props.key = n
            if (styles[c.type])
              props.style = h.assignClone(styles[c.type], props.style)
            return React.createElement(c.type, props, c.props.children)
          }
        }
        return <p style={styles.subheading} key={n}>{c}</p>
      })
    }
  },
  render() {
    let styles = this.css.styles
    return <div style={styles.area}>
      {this.renderNav()}
      {this.renderChildren()}
    </div>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  defBgColor: "dark",
  baseStyles() {
    let PAD = RC.Theme.size.padding
    return {
      area: {
        position: "relative", padding: PAD,
        backgroundColor: this.color.hex, color: this.color.textColor
      },
      subheading: {
        padding: "5px 0 0",
        opacity: .6,
        fontSize: RC.Theme.font.size*1.25, color: "inherit",
      },
      h1: {
        textIndent: -2, padding: 0,
        fontSize: RC.Theme.font.size*3.3, color: "inherit",
      },
      h2: {
        textIndent: -2, padding: 0,
        fontSize: RC.Theme.font.size*3.1, color: "inherit",
      },
      h3: {
        textIndent: -2, padding: 0,
        fontSize: RC.Theme.font.size*2.9, color: "inherit",
      },
      h4: {
        textIndent: -2, padding: 0,
        fontSize: RC.Theme.font.size*2.7, color: "inherit",
      },
      h5: {
        textIndent: -1, padding: 0,
        fontSize: RC.Theme.font.size*2.5, color: "inherit",
      },
      h6: {
        textIndent: -1, padding: 0,
        fontSize: RC.Theme.font.size*2.3, color: "inherit",
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
  },
})
