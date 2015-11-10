
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
  render() {
    let self = this
    return <ul {... this.props} style={this.css.styles.area}>
      {this.props.children}
    </ul>
  },
  baseStyles() {
    return {
      area: {
        position: "relative", overflow: "hidden",
        backgroundColor: this.color.hex, textColor: this.color.textColor,
        paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0,
        marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
      },
    }
  },
  themeStyles: {
    inset: {
      area: {
        marginTop: 13, marginBottom: 0, marginLeft: 13, marginRight: 13,
        boxShadow: "0 0 3px rgba(0,0,0,.15)",
      }
    },
  },
})
