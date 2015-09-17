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



}
