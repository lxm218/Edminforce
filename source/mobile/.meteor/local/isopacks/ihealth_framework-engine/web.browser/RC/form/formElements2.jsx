/**
 * Created on 9/16/15.
 */
{

    let themes_select = []
    RC.Select2 = React.createClass({
        mixins: [RC.Mixins.Theme],
        themeGroup: "item",
        themes: themes_select,

        propTypes: {
            theme: React.PropTypes.string,
            value: React.PropTypes.oneOfType([
                React.PropTypes.string,
                React.PropTypes.number
            ]),
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

        //提供通过属性 render组件的接口
        componentWillReceiveProps(nextProps){
            if(nextProps.value!=this.state.value){
                this.setState({ value: nextProps.value })
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



    //////
    RC.RadioGroup2 = React.createClass({
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
            }
            return this.state.checked[n]
        },
        changeHandler: function(n) {
            let checked = this.state.checked
            this.setState({checked: checked.map(function(c,nn){
                return nn==n
            })})
            if (_.isFunction(this.props.changeHandler))
                this.props.changeHandler(this.props.list[n])
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



}
