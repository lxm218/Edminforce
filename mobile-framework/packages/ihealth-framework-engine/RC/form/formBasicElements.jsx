
let labelWidth = 100
let PAD = 8

RC.Form = React.createClass({
  mixins: [RC.Mixins.PureRender],
  displayName: "Form",

  getFormData(){
    let formEl = React.findDOMNode(this.refs.rcForm)
    return h.serializeForm(formEl)
  },
  render() {
    return <form {... this.props} style={this.styles} ref="rcForm">
      {this.props.children}
    </form>
  },
  styles: {
    overflow: "hidden",
  }
})

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Form Input
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

RC.Input = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "Input",

  propTypes: {
    id: React.PropTypes.string,

    theme: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),

    value: React.PropTypes.string,
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    className: React.PropTypes.string,

    errorColor: React.PropTypes.string,
    labelColor: React.PropTypes.string,
    labelColorFocus: React.PropTypes.string,

    errorHandler: React.PropTypes.func,
    style: React.PropTypes.object,
    disabled: React.PropTypes.bool,
  },
  // @@
  // Utility Functions
  // @@
  reset(){
    this.setState({ value: this.props.value || false })
  },
  getValue(){
    return h.ltrim((this.state.value!==false ? this.state.value : this.props.value) || "")
  },
  // @@
  // States & Handlers
  // @@
  getInitialState(){
    let isError = _.isFunction(this.props.errorHandler) && this.props.value
      ? this.props.errorHandler(this.props.value)
      : false

    return {
      value: false,
      isFocused: false,
      isError: isError,
    }
  },
  focusHandler() {
    this.setState({isFocused: true})
  },
  blurHandler() {
    this.setState({isFocused: false})
  },
  changeHandler(e) {
    this.setState({value: e.target.value})

    if (_.isFunction(this.props.onChange))
      this.props.onChange(e)

    if (_.isFunction(this.props.errorHandler))
      this.setState({
        isError: this.props.errorHandler(e.target.value)
      })
  },
  render() {

    let styles = this.css.styles

    return <label style={styles.canvas}>
      {this.props.label ? <span style={styles.label}>{this.props.label}</span> : null}
      <input
        {... _.omit(this.props, ["type","labelColor","labelColorFocus"])}
        style={styles.input}
        type={this.props.type || "text"}
        value={this.getValue()}
        onFocus={this.focusHandler} onBlur={this.blurHandler}
        onChange={this.changeHandler}
      />
    </label>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchProps: ["borderColor","labelColor","labelColorFocus","errorColor"],
  watchStates: ["isFocused","isError"],
  baseStyles(np,ns) {

    if (typeof this.borderColor === "undefined" || np.borderColor!=this.props.borderColor)
      this.borderColor = np.borderColor
        ? h.getRealColor(np.borderColor, "edges", null, true)
        : RC.Theme.color.edges

    if (typeof this.labelColor === "undefined" || np.labelColor!=this.props.labelColor)
      this.labelColor = np.labelColor
        ? h.getRealColor(np.labelColor, "silver", null, true)
        : RC.Theme.color.silver

    if (typeof this.labelColorFocus === "undefined" || np.labelColorFocus!=this.props.labelColorFocus)
      this.labelColorFocus = np.labelColorFocus
        ? h.getRealColor(np.labelColorFocus, "brand1", null, true)
        : RC.Theme.color.brand1

    if (typeof this.errorColor === "undefined" || np.errorColor!=this.props.errorColor)
      this.errorColor = np.errorColor
        ? h.getRealColor(np.errorColor, "red", null, true)
        : RC.Theme.color.red

    var labelColor, borderColor
    let cPAD = RC.Theme.size.paddingPx - PAD // This must be here to allow dynamic changes

    if (!ns.isError) {
      labelColor = ns.isFocused ? this.labelColorFocus : this.labelColor
      borderColor = ns.isFocused ? this.labelColorFocus : this.borderColor
    } else
      labelColor = borderColor = this.errorColor

    return {
      canvas: {
        display: "flex", margin: "0 0 "+cPAD+"px",
        borderBottom: "solid 1px "+borderColor
      },
      label: h.assignClone( RC.cssMixins.ellipsis, {
        flex: 1,
        maxWidth: labelWidth, padding: PAD+"px "+PAD+"px 0 0",
        color: labelColor,
      }),
      input: h.assignClone( RC.cssMixins.clean(), {
        flex: 1,
        width: "100%", padding: PAD+"px 0",
        color: ns.isError ? this.errorColor : this.color.textColor,
        backgroundColor: this.color.hex,
      })
    }
  },
  themeStyles(np,ns) {
    let cPAD = RC.Theme.size.paddingPx - PAD // This must be here to allow dynamic changes
    return {
      "stacked-label": {
        canvas: {
          display: "block",
        },
        label: h.assignClone( RC.cssMixins.font("heavy"), {
          flex: "0 1 auto",
          maxWidth: "100%", display: "block", margin: "0 0 -3px",
          fontSize: RC.Theme.font.size-4,
        }),
        input: {
          flex: "0 1 auto", display: "block",
        }
      },
      overlay: {
        canvas: {
          margin: "0 0 "+RC.Theme.size.paddingPx+"px",
        },
        input: {
          backgroundColor: this.color.realHex
        }
      }
    }
  }
})

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Form Textarea
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

RC.Textarea = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "Textarea",

  propTypes: {
    id: React.PropTypes.string,

    theme: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),

    value: React.PropTypes.string,
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    className: React.PropTypes.string,

    errorColor: React.PropTypes.string,
    labelColor: React.PropTypes.string,
    labelColorFocus: React.PropTypes.string,

    errorHandler: React.PropTypes.func,
    style: React.PropTypes.object,
    disabled: React.PropTypes.bool,
  },
  // @@
  // Utility Functions
  // @@
  reset(){
    this.setState({ value: this.props.value || false })
  },
  getValue(){
    return (this.state.value!==false ? this.state.value : this.props.children) || ""
  },
  // @@
  // States & Handlers
  // @@
  getInitialState(){
    let isError = _.isFunction(this.props.errorHandler) && this.props.children
      ? this.props.errorHandler(this.props.children)
      : false

    return {
      value: false,
      isFocused: false,
      isError: isError,
    }
  },
  focusHandler() {
    this.setState({isFocused: true})
  },
  blurHandler() {
    this.setState({isFocused: false})
  },
  changeHandler(e) {
    this.setState({value: e.target.value})

    if (_.isFunction(this.props.onChange))
      this.props.onChange(e)

    if (_.isFunction(this.props.errorHandler))
      this.setState({
        isError: this.props.errorHandler(e.target.value)
      })
  },
  render() {

    let styles = this.css.styles

    return <label style={styles.canvas}>
      {this.props.label ? <span style={styles.label}>{this.props.label}</span> : null}
      <textarea
        {... _.omit(this.props, ["children","type","labelColor","labelColorFocus"])}
        style={styles.textarea}
        value={this.getValue()}
        onFocus={this.focusHandler} onBlur={this.blurHandler}
        onChange={this.changeHandler} />
    </label>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchProps: ["borderColor","labelColor","labelColorFocus","errorColor"],
  watchStates: ["isFocused","isError"],
  baseStyles(np,ns) {

    if (typeof this.borderColor === "undefined" || np.borderColor!=this.props.borderColor)
      this.borderColor = np.borderColor
        ? h.getRealColor(np.borderColor, "edges", null, true)
        : RC.Theme.color.edges

    if (typeof this.labelColor === "undefined" || np.labelColor!=this.props.labelColor)
      this.labelColor = np.labelColor
        ? h.getRealColor(np.labelColor, "silver", null, true)
        : RC.Theme.color.silver

    if (typeof this.labelColorFocus === "undefined" || np.labelColorFocus!=this.props.labelColorFocus)
      this.labelColorFocus = np.labelColorFocus
        ? h.getRealColor(np.labelColorFocus, "brand1", null, true)
        : RC.Theme.color.brand1

    if (typeof this.errorColor === "undefined" || np.errorColor!=this.props.errorColor)
      this.errorColor = np.errorColor
        ? h.getRealColor(np.errorColor, "red", null, true)
        : RC.Theme.color.red

    var labelColor, borderColor
    let cPAD = RC.Theme.size.paddingPx - PAD // This must be here to allow dynamic changes

    if (!ns.isError) {
      labelColor = ns.isFocused ? this.labelColorFocus : this.labelColor
      borderColor = ns.isFocused ? this.labelColorFocus : this.borderColor
    } else
      labelColor = borderColor = this.errorColor

    return {
      canvas: {
        display: "flex", margin: "0 0 "+cPAD+"px",
        borderBottom: "solid 1px "+borderColor
      },
      label: h.assignClone( RC.cssMixins.ellipsis, {
        flex: 1,
        maxWidth: labelWidth, padding: PAD+"px "+PAD+"px 0 0",
        color: labelColor,
      }),
      textarea: h.assignClone( RC.cssMixins.clean(), {
        flex: 1,
        minHeight: 52,
        backgroundColor: this.color.hex,
        borderTop: "solid "+PAD+"px "+this.color.hex, borderBottom: "solid "+PAD+"px "+this.color.hex,
        color: ns.isError ? this.errorColor : this.color.textColor
      })
    }
  },
  themeStyles(np,ns) {
    let cPAD = RC.Theme.size.paddingPx - PAD // This must be here to allow dynamic changes
    return {
      "stacked-label": {
        canvas: {
          display: "block",
        },
        label: h.assignClone( RC.cssMixins.font("heavy"), {
          flex: "0 1 auto", display: "block", margin: "0 0 -3px",
          fontSize: RC.Theme.font.size-4,
        }),
        textarea: {
          flex: "0 1 auto", display: "block", width: "100%", margin: "0 0 "+PAD+"px",
        }
      },
      overlay: {
        canvas: {
          margin: "0 0 "+RC.Theme.size.paddingPx+"px",
        },
        textarea: {
          backgroundColor: this.color.realHex, borderColor: this.color.realHex
        }
      }
    }
  }
})

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Form Select
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

RC.Select = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "Select",

  propTypes: {
    theme: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),

    value: React.PropTypes.string,
    label: React.PropTypes.string,
    name: React.PropTypes.string,

    errorColor: React.PropTypes.string,
    labelColor: React.PropTypes.string,
    labelColorFocus: React.PropTypes.string,

    errorHandler: React.PropTypes.func,
    style: React.PropTypes.object,
    disabled: React.PropTypes.bool,
  },
  // @@
  // Utility Functions
  // @@
  reset(){
    this.setState({ value: this.props.value || false })
  },
  getValue(){
    return (this.state.value!==false ? this.state.value : this.props.value) || ""
  },
  // @@
  // States & Handlers
  // @@
  getInitialState(){
    let isError = _.isFunction(this.props.errorHandler) && this.props.value
      ? this.props.errorHandler(this.props.value)
      : false

    return {
      value: false,
      isFocused: false,
      isError: isError,
    }
  },
  focusHandler() {
    this.setState({isFocused: true})
  },
  blurHandler() {
    this.setState({isFocused: false})
  },
  changeHandler(e) {
    this.setState({value: e.target.value})

    if (_.isFunction(this.props.onChange))
      this.props.onChange(e)

    if (_.isFunction(this.props.errorHandler))
      this.setState({
        isError: this.props.errorHandler(e.target.value)
      })
  },
  render() {

    let styles = this.css.styles

    return <label style={styles.canvas}>
      {this.props.label ? <span style={styles.label}>{this.props.label}</span> : null}

      <span style={styles.arrow}/>
      <select
        {... _.omit(this.props, ["value","type","labelColor"])}
        style={styles.select}
        onChange={this.changeHandler}
        onFocus={this.focusHandler} onBlur={this.blurHandler}
        value={this.getValue()}
      >
        {
        this.props.options.map(function(o,n){
          if (_.isString(o)) o = { value: o }
          o = _.isObject(o) && o.value ? o : { value: undefined }
          return <option value={o.value} key={n}>{o.text || o.value}</option>
        })
        }
      </select>
    </label>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchProps: ["borderColor","labelColor","labelColorFocus","errorColor"],
  watchStates: ["isFocused","isError"],
  baseStyles(np,ns) {

    if (typeof this.borderColor === "undefined" || np.borderColor!=this.props.borderColor)
      this.borderColor = np.borderColor
        ? h.getRealColor(np.borderColor, "edges", null, true)
        : RC.Theme.color.edges

    if (typeof this.labelColor === "undefined" || np.labelColor!=this.props.labelColor)
      this.labelColor = np.labelColor
        ? h.getRealColor(np.labelColor, "silver", null, true)
        : RC.Theme.color.silver

    if (typeof this.labelColorFocus === "undefined" || np.labelColorFocus!=this.props.labelColorFocus)
      this.labelColorFocus = np.labelColorFocus
        ? h.getRealColor(np.labelColorFocus, "brand1", null, true)
        : RC.Theme.color.brand1

    if (typeof this.errorColor === "undefined" || np.errorColor!=this.props.errorColor)
      this.errorColor = np.errorColor
        ? h.getRealColor(np.errorColor, "red", null, true)
        : RC.Theme.color.red

    var labelColor, borderColor, arrowColor
    let cPAD = RC.Theme.size.paddingPx - PAD // This must be here to allow dynamic changes

    if (!ns.isError) {
      labelColor = ns.isFocused ? this.labelColorFocus : this.labelColor
      borderColor = ns.isFocused ? this.labelColorFocus : this.borderColor
      arrowColor = ns.isFocused ? this.labelColorFocus : RC.Theme.color.edgesDarker
    } else
      labelColor = borderColor = arrowColor = this.errorColor

    return {
      canvas: {
        display: "flex", position: "relative", margin: "0 0 "+cPAD+"px",
        borderBottom: "solid 1px "+borderColor
      },
      label: h.assignClone( RC.cssMixins.ellipsis, {
        flex: 1,
        maxWidth: labelWidth, padding: PAD+"px "+PAD+"px 0 0",
        color: labelColor,
      }),
      select: h.assignClone( RC.cssMixins.clean(), {
        flex: 1,
        width: "100%", padding: PAD+"px 0",
        backgroundColor: this.color.hex, borderRight: "solid 25px "+this.color.hex,
        color: ns.isError ? this.errorColor : this.color.textColor
      }),
      arrow: {
        position: "absolute", bottom: 11, right: 10, zIndex: 10,
        width: 0, height: 0,
        borderTop: "5px solid "+arrowColor, borderRight: "5px solid transparent", borderLeft: "5px solid transparent",
      }
    }
  },
  themeStyles(np,ns) {
    let cPAD = RC.Theme.size.paddingPx - PAD // This must be here to allow dynamic changes
    return {
      "stacked-label": {
        canvas: {
          display: "block",
        },
        label: h.assignClone( RC.cssMixins.font("heavy"), {
          flex: "0 1 auto", display: "block", margin: "0 0 -3px",
          fontSize: RC.Theme.font.size-4,
        }),
      },
      overlay: {
        canvas: {
          margin: "0 0 "+RC.Theme.size.paddingPx+"px",
        },
        select: {
          backgroundColor: this.color.realHex, borderColor: this.color.realHex
        }
      }
    }
  }
})

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Form Button
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

RC.Button = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "Button",

  propTypes: {
    id: React.PropTypes.string,
    theme: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),
    type: React.PropTypes.string,
    form: React.PropTypes.string,
    name: React.PropTypes.string,
    className: React.PropTypes.string,
  },
  getInitialState() {
    return {
      isHover: false,
      isActive: true,
    }
  },
  onHoverStart(){
    this.setState({ isHover: true })
  },
  onHoverStop(){
    this.setState({ isHover: false })
  },
  renderIcon(){
    if (!this.props.uiClass) return null
    return <RC.uiIcon
      {... _.pick(this.props, _.without(RC.uiKeys,"uiBgColor"))}
      uiColor={this.props.uiColor || this.props.color}
      itemStyle={{margin: "3px 5px 0 0", verticalAlign: "top"}}
      theme="inline-block-left" uiSize={12} />
  },
  render() {
    let styles = this.css.styles

    return <button
      {... _.omit(this.props,RC.uiKeys)} style={styles.canvas}
      onMouseOver={this.onHoverStart} onTouchStart={this.onHoverStart}
      onMouseOut={this.onHoverStop} onTouchEnd={this.onHoverStop}
    >
      {this.renderIcon()}
      {this.props.children}
    </button>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  defBgColor: "light",
  watchProps: ["bgColorHover","colorHover"],
  watchStates: ["isHover","isActive"],
  baseStyles(np,ns) {

    if (typeof this.bgColorHover === "undefined" || np.bgColorHover!=this.props.bgColorHover)
      this.bgColorHover = np.bgColorHover
        ? h.getRealColor(np.bgColorHover, "brand1", null, true)
        : RC.Theme.color.brand1

    if (typeof this.colorHover === "undefined" || np.colorHover!=this.props.colorHover)
      this.colorHover = np.colorHover
        ? h.getRealColor(np.colorHover, "onBrand1", null, true)
        : RC.Theme.color.onBrand1

    let buttonColor = ns.isHover && ns.isActive ? this.bgColorHover : this.color.hex
    let textColor = ns.isHover && ns.isActive ? this.colorHover : this.color.textColor
    let buttonPAD = 10

    return {
      canvas: h.assignClone( RC.cssMixins.clean(), {
        position: "relative", width: "100%", minHeight: 36,
        zIndex: ns.isHover && ns.isActive ? 2 : 1,
        transition: "all .2s ease",
        padding: (buttonPAD-1)+"px "+buttonPAD+"px "+buttonPAD+"px",
        margin: "0 0 "+RC.Theme.size.paddingPx+"px",
        color: textColor,
        cursor: ns.isActive ? "pointer" : "auto",
        backgroundColor: buttonColor,
        border: "solid 1px "+RC.Theme.color.edgesLighter,
      }),
      label: h.assignClone( RC.cssMixins.ellipsis, {
        flex: 1,
        maxWidth: labelWidth, padding: PAD+"px 0 "+PAD+"px "+PAD+"px",
        color: buttonColor,
      }),
    }
  },
  themeStyles(np,ns) {
    let cPAD = RC.Theme.size.paddingPx - PAD // This must be here to allow dynamic changes
    return {
      inline: {
        canvas: {
          display: "inline-block", width: "auto",
        },
        label: h.assignClone( RC.cssMixins.font("heavy"), {
          flex: "0 1 auto", display: "block", padding: "0 "+PAD+"px", margin: "0 0 -3px",
          fontSize: RC.Theme.font.size-4,
        }),
      },
      overlay: {
        canvas: {
          border: "none",
        }
      },
      circle: {
        canvas: {
          borderRadius: "50%",
          width: 78, height: 78, margin: "0 auto"
        }
      }
    }
  }
})
