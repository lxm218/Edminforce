
RC.List = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "List",

  propTypes: {
    list: React.PropTypes.array,

    theme: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),

    id: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
  },
  getInitialState() {
    return {
      selected: null
    }
  },
  setSelectedState(n) {
    if (_.isUndefined(this.props.enableClick) || this.props.enableClick)
      this.setState({selected: n})
  },
  renderAutoList() {
    let list = _.isArray(this.props.list) ? this.props.list : []
    return list.map(function(item,n){
      let listProps = _.omit(item, ["value"])
      return <RC.Item {... listProps} tagName={listProps.tagName || "li"} key={n}>
        {item.value}
      </RC.Item>
    })
  },
  render() {
    let self = this
    let curState = this.state.selected
    let enableClick = this.props.enableClick || true

    return <ul {... this.props} style={this.css.styles.canvas}>
      {this.renderAutoList()}
      {this.props.children}
    </ul>
  },
  baseStyles() {
    return {
      canvas: {
        position: "relative", overflow: "hidden",
        backgroundColor: this.color.hex, textColor: this.color.textColor,
        paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0,
        marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
      },
    }
  },
  themeStyles: {
    inset: {
      canvas: {
        marginTop: 13, marginBottom: 0, marginLeft: 13, marginRight: 13,
        boxShadow: "0 0 3px rgba(0,0,0,.15)",
      }
    },
  },
})
