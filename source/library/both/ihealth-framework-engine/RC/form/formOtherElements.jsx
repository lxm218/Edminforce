
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Form Checkbox
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

RC.Checkbox = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "Checkbox",

  propTypes: {
    id: React.PropTypes.string,
    theme: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),

    value: React.PropTypes.string,
    checked: React.PropTypes.bool,
    name: React.PropTypes.string,
    className: React.PropTypes.string,

    style: React.PropTypes.object,
    disabled: React.PropTypes.bool,
  },
  getInitialState(){
    return {
      checked: _.isUndefined(this.props.checked) ? false : this.props.checked, // Must be Boolean
      // value: false
    }
  },
  reset(){
    this.setState({
      checked: this.props.checked || false,
      // value: false
    })
  },
  turnOn(){
    this.setState({
      checked: true,
    })
  },
  turnOff(){
    this.setState({
      checked: false,
    })
  },
  getValue(){
    return this.state.checked
    // return trim(String(this.state.value!==false ? this.state.value : this.props.value) || "")
  },
  getChecked(){
    return _.isBoolean(this.state.checked) ? this.state.checked : this.props.checked
  },
  changeHandler() {
    // do nothing
  },
  clickHandler(e) {
    this.setState({
      checked: !this.state.checked
    })
    if (_.isFunction(this.props.onClick))
      this.props.onClick(e)
  },
  renderAuto(loopedName, key) {

    let styles = this.css.styles
    let inputType = _.contains(["checkbox","radio"],this.props.type) ? this.props.type : "checkbox"
    let input = <input {... _.omit(this.props, ["checked","type"])} type={inputType} onChange={this.changeHandler} checked={this.getChecked()} style={{display: "none"}} />
    let isChecked = this.state.checked

    if (_.contains(this.css.themeNames,"toggle")) {
      return <div style={styles.toggle}>
        {input}
        <span style={styles.ball}/>
      </div>
    }

    let uiProps = {
      style: styles.checkbox,
      uiClass: this.props.uiClass || "check",
      uiBgColor: isChecked ? (this.props.uiBgColor || "brand1") : "transparent",
      uiColor: isChecked ? (this.props.uiColor || "white") : "transparent",
    }

    return <RC.uiIcon {... uiProps}>{input}</RC.uiIcon>
    // return <span style={styles.checkbox}>{input}</span>
  },
  render() {

    let styles = this.css.styles
    /**
     * NOTE
     * <div> is used instead of <label> to overcome Web/Mobile issues
     */
    return <div style={styles.area} onClick={this.clickHandler}>
      {this.props.label}
      {this.renderAuto()}
    </div>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchProps: ["uiBgColorActive"],
  watchStates: ["checked"],
  baseStyles(np,ns) {

    if (!this.defaultBorderColor) this.defaultBorderColor = this.color.isDark ? RC.Theme.color.edges : RC.Theme.color.edgesLighter

    return {
      area: h.assignClone( RC.cssMixins.item(), {
        transition: "all .2s ease",
        paddingLeft: 48,
        fontSize: RC.Theme.font.size-1,
        backgroundColor: this.color.hex, color: this.color.textColor,
        borderStyle: "solid", borderWidth: 1 , borderColor: this.defaultBorderColor,
      }),
      checkbox: {
        width: 28, height: 28,
        top: 10, left: 10,
        border: "solid 1px "+RC.Theme.color.edges
      },
    }
  },
  themeStyles(np,ns) {

    let SIZE = 26

    if (typeof this.uiBgColor==="undefined" || np.uiBgColor!=this.props.uiBgColor)
      this.uiBgColor = np.uiBgColor
        ? h.getRealColor(np.uiBgColor, "light", null, true)
        : RC.Theme.color.light

    if (typeof this.uiBgColorActive==="undefined" || np.uiBgColorActive!=this.props.uiBgColorActive)
      this.uiBgColorActive = np.uiBgColorActive
        ? h.getRealColor(np.uiBgColorActive, "brand1", null, true)
        : RC.Theme.color.brand1

    return {
      toggle: {
        area: {
          paddingLeft: 74,
        },
        toggle: {
          transition: "background .2s ease",
          width: 54, height: SIZE+6,
          borderRadius: (SIZE+6)/2,
          backgroundColor: ns.checked ? this.uiBgColorActive : this.uiBgColor,
          borderStyle: "solid", borderWidth: 1 , borderColor: this.defaultBorderColor,
          position: "absolute", top: 9, left: 10,
        },
        ball: {
          transition: "all .2s ease",
          backgroundColor: RC.Theme.color.white,
          position: "absolute", top: "50%", margin: "-"+(SIZE/2)+"px 0 0 0",
          boxShadow: "0 0 4px rgba(0,0,0,.2)",
          left: ns.checked ? SIZE-2 : 2,
          width: SIZE, height: SIZE,
          borderRadius: "50%",
        }
      }
    }
  }
})

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Form Radio
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

RC.RadioGroup = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "RadioGroup",

  propTypes: {
    id: React.PropTypes.string,

    value: React.PropTypes.string,
    name: React.PropTypes.string,
    className: React.PropTypes.string,

    style: React.PropTypes.object,
    disabled: React.PropTypes.bool,
  },
  getInitialState(){
    let list = _.isArray(this.props.list) ? this.props.list : []
    let self = this

    return {
      checked: list.map( function(c){
        return c.value && c.value==self.props.value ? true : false
      })
    }
  },
  reset(){
    let list = _.isArray(this.props.list) ? this.props.list : []
    let self = this
    let checked = list.map( function(c){
      return c.value && c.value==self.props.value ? true : false
    })
    this.setState({ checked: checked })
  },
  getValue(n){
    if (_.isUndefined(n)) {
      var realVal = null
      let self = this
      _.every(this.state.checked, function(c,nn){
        if (c)
          realVal = self.props.list[nn].value
        return !c
      })
      return realVal
    }
    return this.state.checked[n]
  },

  changeHandler() {
    // do nothing
  },
  clickHandler: function(n) {
    let checked = this.state.checked
    this.setState({checked: checked.map(function(c,nn){
      return nn==n
    })})
    if (_.isFunction(this.props.onClick))
      this.props.onClick()
  },
  makeRadio(radio,n){
    let styles = this.css.styles
    let isChecked = this.getValue(n)
    let uiProps = {
      style: styles.radio,
      uiClass: this.props.uiClass || "check",
      uiBgColor: isChecked ? (this.props.uiBgColor || "brand1") : "transparent",
      uiColor: isChecked ? (this.props.uiColor || "white") : "transparent",
    }
    /**
     * NOTE
     * <div> is used instead of <label> to overcome Web/Mobile issues
     */
    return <div style={styles.area} key={n} onClick={this.clickHandler.bind(null,n)}>
      <input {... _.omit(radio, ["checked","label"])} type="radio" onChange={this.changeHandler} checked={isChecked} />
      {radio.label}
      <RC.uiIcon {... uiProps}/>
    </div>
  },
  render() {

    let self = this
    if (!this.props.name && !this.radioGroup)
      this.radioGroupName = h.randomString()
    let radioGroup = this.props.name || this.radioGroupName

    return <div>
      {(this.props.list || []).map(function(g,n){
        g.name = radioGroup
        return self.makeRadio(g,n)
      })}
    </div>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  baseStyles(np,ns) {

    if (!this.defaultBorderColor) this.defaultBorderColor = this.color.isDark ? RC.Theme.color.edges : RC.Theme.color.edgesLighter

    return {
      area: h.assignClone( RC.cssMixins.item(), {
        paddingLeft: 48,
        fontSize: RC.Theme.font.size-1,
        backgroundColor: this.color.realHex, color: this.color.realText,
        borderStyle: "solid", borderWidth: "1px 0" , borderColor: this.defaultBorderColor,
      }),
      radio: {
        width: 28, height: 28,
        top: 10, left: 10,
        border: "solid 1px "+RC.Theme.color.edges,
      },
    }
  },
})

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Form Range Sliders
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

RC.Range = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "FormRange",

  propTypes: {
    id: React.PropTypes.string,
    theme: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),
    name: React.PropTypes.string,
    className: React.PropTypes.string,

    value: React.PropTypes.number,
    min: React.PropTypes.number,
    max: React.PropTypes.number,

    style: React.PropTypes.object,
    disabled: React.PropTypes.bool,
  },
  getInitialState(){
    return {
      value: false
    }
  },
  // @@@@
  // Utility
  // @@@@
  reset(){
    this.setState({ value: this.props.value || false })
  },
  getValue(np,ns){
    if (typeof np==="undefined") np = this.props || {}
    if (typeof ns==="undefined") ns = this.state || {}

    return (ns.value!==false ? ns.value : np.value) || null
  },
  getPerCent(np,ns){
    if (typeof np==="undefined") np = this.props
    if (typeof ns==="undefined") ns = this.state

    this.min = !isNaN(np.min) ? np.min : 0
    this.max = !isNaN(np.max) ? np.max : 100

    var value = (this.getValue(np,ns) || 0) - this.min
    return value / (this.max-this.min) * 100
  },
  onChange: function(e) {
    this.setState({value: e.target.value})
    if (_.isFunction(this.props.onChange))
      this.props.onChange(e)
  },
  // @@@@
  // Render
  // @@@@
  render() {

    let styles = this.css.styles

    return <div {... _.omit(this.props,["onChange","value","type","min","max"])} style={styles.area}>
      {this.uiProps[0] ? <RC.uiIcon {... this.uiProps[0]} itemStyle={styles.uiIcon1} /> : null}
      <input
        style={styles.rangeHidden}
        type="range" onChange={this.onChange}
        value={this.getValue()}
        min={this.min}
        max={this.max}
        disabled={this.props.disabled}
      />
    <div style={styles.range}><div style={styles.progress}><span style={styles.ball} /></div></div>
    {this.uiProps[1] ? <RC.uiIcon {... this.uiProps[1]} itemStyle={styles.uiIcon2} /> : null}
    </div>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchProps: ["max","min"],
  watchStates: ["value"],
  baseStyles(np,ns) {

    if (typeof this.uiProps==="undefined" || np.uiProps!=this.props.uiProps)
      this.uiProps = h.splitProps(np, RC.uiKeys, "uiClass", 2)

    return {
      area: h.assignClone( RC.cssMixins.item(), {
        display: "flex", alignItems: "center",
        padding: "20px"+(this.uiProps[1] ? " 28px " : " 10px " )+"20px"+(this.uiProps[0] ? " 28px" : " 10px"),
        background: this.color.realHex
      }),
      range: {
        display: "inline-block", position: "relative",
        background: RC.Theme.color.edgesLighter,
        width: "100%", height: 2,
        margin: "5px 10px", padding: "0 2px 0",
      },
      progress: {
        position: "absolute", top: 0, bottom: 0, left: 0, right: Math.max( Math.min(100-this.getPerCent(np,ns), 100), 0)+"%",
        background: this.color.textColor
      },
      rangeHidden: h.assignClone( RC.cssMixins.absFull, {
        opacity: 0, zIndex: 2,
      }),
      ball: {
        background: RC.Theme.color.white, borderRadius: "50%",
        position: "absolute", right: 0, top: "50%",
        width: 20, height: 20, margin: "-10px -10px 0 0",
        boxShadow: "0 0 3px rgba(0,0,0,.3)"
      },
      uiIcon1: {
        top: 20, left: 4,
      },
      uiIcon2: {
        top: 20, left: "auto", right: 4,
      }
    }
  },
})
