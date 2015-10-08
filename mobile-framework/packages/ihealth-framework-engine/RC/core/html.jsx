
RC.Body = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "Body",

  componentWillMount() {
    if (!RC.cssMixins.hasOwnProperty("stylesheet")) return null

    const pureProps = ["line-height","font-weight"]
    const stylesheet = autoprefix(RC.cssMixins.stylesheet())
    const keys = Object.keys(stylesheet)

    const cssProperty = function(property){
      property = property.split(/(?=[A-Z])/).map(function(p){
        p = p.replace("Webkit","-webkit").replace("Moz","-moz")
        if (p=="ms") p = "-ms"
        if (p=="o") p = "-o"
        return p.toLowerCase()
      })
      return property.join("-")
    }

    const stylesComputed = keys.map(function(k){
      let css = stylesheet[k]
      let cssInner = Object.keys(css).map(function(ck){
        let cssProp = cssProperty(ck)
        let cssVal = !isNaN(css[ck]) && !_.contains(pureProps, cssProp) ? css[ck]+"px" : css[ck]
        return [cssProp+":", cssVal+";"].join("")
      }).join("")

      return [k,"{"+cssInner+"}"].join("")
    }).join("")

    this.stylesheet = <style dangerouslySetInnerHTML={{__html: stylesComputed}} />
  },
  render() {
    let styles = this.css.styles

    return <div {... this.props} style={styles.canvas}>
      {this.stylesheet}
      {this.props.children}
    </div>
  },
  baseStyles(){
    return {
      canvas: h.assignClone( RC.cssMixins.main(), {
        backgroundColor: this.color.realHex, color: this.color.textColor,
      })
    }
  },
  themeStyles(){
    return {
      wrapper: {
        canvas: {
          position: "relative", minHeight: "100vh", overflow: "hidden",
          maxWidth: RC.Theme.size.wrapper, margin: "0 auto"
        }
      }
    }
  }
})

RC.Div = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "Div",
  render() {
    var styles = this.css.styles

    // TODO
    // Deprecate this part
    if (this.props.createGlobalNavSpace)
      styles.canvas.paddingBottom = 50

    return <div {... this.props} style={styles.canvas}>
      {this.props.children}
    </div>
  },
  baseStyles() {
    return {
      canvas: {
        backgroundColor: this.color.realHex, color: this.color.textColor,
        overflowY: "auto", overflowX: "hidden",
      }
    }
  },
  themeStyles(){
    return {
      // Mobile Canvas
      "mobile-canvas": {
        canvas: {
          paddingTop: RC.Theme.size.headerNavHeight,
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        }
      },
      // Full
      full: {
        canvas: RC.cssMixins.fullHeight(),
      },
      // Padding
      padding: {
        canvas: {
          paddingTop: RC.Theme.size.padding, paddingRight: RC.Theme.size.padding, paddingBottom: RC.Theme.size.padding, paddingLeft: RC.Theme.size.padding,
        }
      },
      // Padding Top
      "padding-t": {
        canvas: {
          paddingTop: RC.Theme.size.padding
        }
      },
      // Padding Bottom
      "padding-b": {
        canvas: {
          paddingBottom: RC.Theme.size.padding,
        }
      },
      // Padding Top/Bottom
      "padding-tb": {
        canvas: {
          paddingTop: RC.Theme.size.padding, paddingBottom: RC.Theme.size.padding,
        }
      },
      // Padding Left
      "padding-l": {
        canvas: {
          paddingLeft: RC.Theme.size.padding
        }
      },
      // Padding Right
      "padding-r": {
        canvas: {
          paddingRight: RC.Theme.size.padding,
        }
      },
      // Padding Left/Right
      "padding-lr": {
        canvas: {
          paddingLeft: RC.Theme.size.padding, paddingRight: RC.Theme.size.padding,
        }
      },
      // Smaller
      smaller: {
        canvas: {
          fontSize: RC.Theme.font.size-1,
        }
      }
    }
  },
})
