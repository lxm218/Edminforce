
let themes_form = []
RC.Form = React.createClass({
  getFormData(){
    var formEl = React.findDOMNode(this.refs.rcForm)
    var form = h.serializeForm(formEl)
    return form
  },
  render() {
    return <form {...this.props} ref="rcForm">
      {this.props.children}
    </form>
  }
})

// @@@@@
// <Input/> Form Element
// @@@@@

let themes_input = ["stacked-label","small-label","overlay-light","overlay-dark"]
RC.Input = React.createClass({
  mixins: [RC.Mixins.Theme],
  themeGroup: "item",
  themes: themes_input,

  propTypes: {
    id: React.PropTypes.string,
    theme: React.PropTypes.string,
    value: React.PropTypes.string,
    name: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    className: React.PropTypes.string,
    changeHandler: React.PropTypes.func,
    label: React.PropTypes.string,
    labelColor: React.PropTypes.string,
    error: React.PropTypes.bool,
    style: React.PropTypes.object,
    disabled: React.PropTypes.bool,
  },
  reset(){
    this.setState({ value: this.props.value || false })
  },
  getInitialState(){
    return {
      value: false
    }
  },
  getValue(){
    let val = (this.state.value!==false ? this.state.value : this.props.value) || ""
    return h.ltrim(val)
  },
  changeHandler: function(e) {
    this.setState({value: e.target.value})
    if (_.isFunction(this.props.changeHandler))
      this.props.changeHandler(e)
  },
  render() {

    let inputProps = _.omit(this.props, ["changeHandler","value","type","labelColor"])
    var classes = this.getTheme() + (this.props.error ? " has-error" : "") + " item-input"

    return <label className={classes}>
      {this.props.label ? <span className={"input-label"+(h.checkColorClass(this.props.labelColor) ? " colored "+this.props.labelColor : "")}>{this.props.label}</span> : null}
      <input {... inputProps} type={this.props.type || "text"} value={this.getValue()} onChange={this.changeHandler} />
    </label>
  }
})

// @@@@@
// <Input range/> Form Element
// @@@@@

RC.Range = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    className: React.PropTypes.string,
    changeHandler: React.PropTypes.func,

    value: React.PropTypes.number,
    min: React.PropTypes.number,
    max: React.PropTypes.number,

    error: React.PropTypes.bool,
    style: React.PropTypes.object,
    disabled: React.PropTypes.bool,
  },
  getInitialState(){
    return {
      value: false
    }
  },
  reset(){
    this.setState({ value: this.props.value || false })
  },
  getValue(){
    return (this.state.value!==false ? this.state.value : this.props.value) || null
  },
  changeHandler: function(e) {
    this.setState({value: e.target.value})
    if (_.isFunction(this.props.changeHandler))
      this.props.changeHandler(e)
  },
  render() {

    var ui = {}
    if (this.props.uiClass) {
      let self = this
      let uiKeys = ["uiClass","uiSize","uiColor"]
      ui = _.object( uiKeys, _.map( uiKeys, function(u){
        if (_.isString(self.props[u]))
          return self.props[u].split(",")
        else
          return []
      }))
    }

    let classes = "item range"+(this.props.error ? " has-error" : "")+(h.checkColorClass(this.props.rangeColor) ? " range-"+this.props.rangeColor : "")

    return <div className={classes}>
      {ui.uiClass && ui.uiClass[0] ? <RC.uiIcon uiClass={ui.uiClass[0]} uiSize={ui.uiSize[0]} uiColor={ui.uiColor[0]}/> : null}
      <input
        type="range" onChange={this.changeHandler}
        {... _.omit(this.props, ["changeHandler","value","type"])}
        value={this.getValue()}
        min={_.isNumber(this.props.min) ? this.props.min : 0}
        max={_.isNumber(this.props.max) ? this.props.max : 100}
      />
    {ui.uiClass && ui.uiClass[1] ? <RC.uiIcon uiClass={ui.uiClass[1]} uiSize={ui.uiSize[1]} uiColor={ui.uiColor[1]}/> : null}
    </div>
  }
})

// @@@@@
// <Input checkbox/> Form Element
// @@@@@

let themes_checkbox = ["toggle"]
RC.Checkbox = React.createClass({
  mixins: [RC.Mixins.Theme],
  themeGroup: "item",
  themes: themes_checkbox,

  propTypes: {
    id: React.PropTypes.string,
    theme: React.PropTypes.string,
    value: React.PropTypes.bool,
    name: React.PropTypes.string,
    className: React.PropTypes.string,

    error: React.PropTypes.bool,
    style: React.PropTypes.object,
    disabled: React.PropTypes.bool,
  },
  getInitialState(){
    return {
      value: this.props.value || false // Must be Boolean
    }
  },
  reset(){
    this.setState({ value: this.props.value || false })
  },
  getValue(){
    return _.isBoolean(this.state.value) ? this.state.value : this.props.value
  },
  changeHandler: function(e) {
    this.setState({value: !this.state.value})
    if (_.isFunction(this.props.changeHandler))
      this.props.changeHandler(e)
  },
  render() {
    var classes = this.getTheme() + (this.props.theme ? "" : " item-checkbox")
    let input = <input {... _.omit(this.props, ["value","checked","type"])} type="checkbox" onChange={function(){}} checked={this.getValue()} />
    /**
     * NOTE
     * <div> is used instead of <label> to overcome Web/Mobile issues
     */
     switch(this.props.theme){
       case "toggle":
        var checkbox = <div className={"toggle"+(h.checkColorClass(this.props.uiColor) ? " toggle-"+this.props.uiColor : "")}>
          {input}
          <div className="track"><div className="handle"/></div>
        </div>
       break
       default:
        var checkbox = <span className="checkbox">{input}</span>
     }

    return <div className={classes} onClick={this.changeHandler}>
      {this.props.label}
      {checkbox}
    </div>
  }
})

// @@@@@
// <Input checkbox/> with Toggle, Form Element
// @@@@@
//
// RC.Checkbox = React.createClass({
//   propTypes: {
//     id: React.PropTypes.string,
//     theme: React.PropTypes.string,
//     value: React.PropTypes.bool,
//     name: React.PropTypes.string,
//     className: React.PropTypes.string,
//
//     error: React.PropTypes.bool,
//     style: React.PropTypes.object,
//     disabled: React.PropTypes.bool,
//   },
//   getInitialState(){
//     return {
//       value: this.props.value || false // Must be Boolean
//     }
//   },
//   getValue(){
//     return _.isBoolean(this.state.value) ? this.state.value : this.props.value
//   },
//   changeHandler: function(e) {
//     this.setState({value: !this.state.value})
//     if (_.isFunction(this.props.changeHandler))
//       this.props.changeHandler(e)
//   },
//   render() {
//     let inputProps = _.omit(this.props, ["value","checked","type"])
//     var classes = "item-checkbox "+(this.props.className || "")
//     /**
//      * NOTE
//      * <div> is used instead of <label> to overcome Web/Mobile issues
//      */
//     return <div className={classes} onClick={this.changeHandler}>
//       <span className="checkbox">
//         <input {... inputProps} type="checkbox" onChange={function(){}} checked={this.getValue()} />
//       </span>
//       {this.props.label}
//     </div>
//   }
// })

// @@@@@
// <Input radio/> Form Element
// @@@@@

RC.RadioGroup = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    theme: React.PropTypes.string,

    list: React.PropTypes.array,
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    className: React.PropTypes.string,

    error: React.PropTypes.bool,
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
      return realVal  //calphin
    }
    return this.state.checked[n]
  },
  changeHandler: function(n) {
    let checked = this.state.checked
    this.setState({checked: checked.map(function(c,nn){
      return nn==n
    })})
    if (_.isFunction(this.props.changeHandler))
      this.props.changeHandler()
  },
  makeRadio(radio,n){
    let checked = this.getValue(n)
    let classes = "item item-radio "+(radio.className || "")
    /**
     * NOTE
     * <div> is used instead of <label> to overcome Web/Mobile issues
     */
    return <div className={classes} key={n} onClick={this.changeHandler.bind(null,n)}>
      <input {... _.omit(radio, ["checked","type","label"])} type="radio" onChange={function(){}} checked={checked} />
      <div className="item-content">{radio.label}</div>
      <RC.uiIcon uiClass={this.props.uiClass || "check"} uiColor={this.props.uiColor} uiSize={this.props.uiSize} className="radio-fa" />
    </div>
  },
  render() {

    if (!this.props.list.length) return null

    let self = this
    let radioGroup = this.props.name || h.random_string()

    return <div>
      {
      this.props.list.map(function(g,n){
        g.name = radioGroup
        return self.makeRadio(g,n)
      })
      }
    </div>
  }
})

// @@@@@
// <textarea/> Form Element
// @@@@@

let themes_textarea = ["stacked-label","small-label"]
RC.Textarea = React.createClass({
  mixins: [RC.Mixins.Theme],
  themeGroup: "item",
  themeDefault: "stacked-label",
  themes: themes_textarea,

  propTypes: {
    id: React.PropTypes.string,
    theme: React.PropTypes.string,
    value: React.PropTypes.string,
    name: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    className: React.PropTypes.string,
    changeHandler: React.PropTypes.func,
    label: React.PropTypes.string,
    labelColor: React.PropTypes.string,
    error: React.PropTypes.bool,
    style: React.PropTypes.object,
    disabled: React.PropTypes.bool,
  },
  getInitialState(){
    return {
      value: false
    }
  },
  reset(){
    this.setState({ value: false })
  },
  getValue(){
    return (this.state.value!==false ? this.state.value : this.props.children) || ""
  },
  changeHandler: function(e) {
    this.setState({value: e.target.value})
    if (_.isFunction(this.props.changeHandler))
      this.props.changeHandler(e)
  },
  render() {

    var classes = this.getTheme() + (this.props.error ? " has-error" : "") + " item-input"

    return <label className={classes}>
      {this.props.label ? <span className={"input-label"+(h.checkColorClass(this.props.labelColor) ? " colored "+this.props.labelColor : "")}>{this.props.label}</span> : null}
      <textarea {... _.omit(this.props, ["changeHandler","value","type","children","labelColor"])} type={this.props.type || "text"} value={this.getValue()} onChange={this.changeHandler} />
    </label>
  }
})

let themes_button = ["full","overlay-light","overlay-dark","circle"]
RC.Button = React.createClass({
  mixins: [RC.Mixins.Theme],
  themeGroup: "button",
  themes: themes_button,

  propTypes: {
    id: React.PropTypes.string,
    theme: React.PropTypes.string,
    type: React.PropTypes.string,
    form: React.PropTypes.string,
    name: React.PropTypes.string,
    className: React.PropTypes.string,
    href: React.PropTypes.string,

  },
  render() {

    var classes = this.getTheme() + (this.props.buttonColor ? " button-"+this.props.buttonColor : "")
    let themes = h.strToArray(this.props.theme)
    let intersection = _.intersection(["overlay-light","overlay-dark"], themes)
    let button = <button {... this.props} className={classes}>
      {this.props.children}
    </button>


    if(this.props.href){

      return <a {... this.props} className={classes}>
        {this.props.children}
      </a>
    }


    return intersection.length
    ? <div className={"wrap-"+intersection[0]+(this.props.active ? " active" : "")}>{button}</div>
    : button
  }
})

let themes_select = []
RC.Select = React.createClass({
  mixins: [RC.Mixins.Theme],
  themeGroup: "item",
  themes: themes_select,

  propTypes: {
    theme: React.PropTypes.string,
    value: React.PropTypes.string,
    name: React.PropTypes.string,
    error: React.PropTypes.bool,
    label: React.PropTypes.string,
    labelColor: React.PropTypes.string,
  },
  getInitialState(){
    return {
      value: false
    }
  },
  reset(){
    this.setState({ value: false })
  },
  getValue(){
    return (this.state.value!==false ? this.state.value : this.props.value) || ""
  },
  changeHandler: function(e) {
    this.setState({value: e.target.value})
    if (_.isFunction(this.props.changeHandler)) {
      this.state.value = e.target.value // This may seem unnecessary, but it's needed. Consult me if you need to know why.
      this.props.changeHandler(e)
    }
  },
  render() {

    var classes = this.getTheme() + (this.props.error ? " has-error" : "") + " item-input item-select"

    return <label className={classes}>
      {this.props.label ? <span className={"input-label"+(h.checkColorClass(this.props.labelColor) ? " colored "+this.props.labelColor : "")}>{this.props.label}</span> : null}
      <select {... _.omit(this.props, ["changeHandler","value","type","labelColor"])} onChange={this.changeHandler} value={this.getValue()} ref="select">
        {
        this.props.options.map(function(o,n){
          if (_.isString(o)) o = { value: o }
          o = _.isObject(o) && o.value ? o : { value: undefined }
          return <option value={o.value} key={n}>{o.text || o.value}</option>
        })
        }
      </select>
    </label>
  }
})


if (h.nk(Meteor.settings, "public.env")!="live") {
  RC.Form.Help = {
    Type: "Canvas",
    Themes: themes_form,
    PropTypes: "TODO",
    Description: "Creates a <form> canvas with a useful getFormData() function. *Note: In order for getFormData() to work, all form items must have a \"name\" value.",
    Example: "http://localhost:3000/forms/Form_Index"
  }

  RC.Input.Help = {
    Type: "Item",
    Themes: themes_input,
    PropTypes: "TODO",
    Description: "React helper for <input>.",
    Example: "http://localhost:3000/forms/Form_Index"
  }

  RC.Textarea.Help = {
    Type: "Item",
    Themes: themes_textarea,
    PropTypes: "TODO",
    Description: "React helper for <textarea>.",
    Example: "http://localhost:3000/forms/Form_Index",
    TODO: "Add auto-resize"
  }
}
