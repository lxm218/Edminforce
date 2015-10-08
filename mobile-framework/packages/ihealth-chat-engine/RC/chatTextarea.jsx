
RC.ChatTextArea = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "ChatTextArea",
  propTypes: {
    uiClass: React.PropTypes.string,
    color: React.PropTypes.string,
    bgColor: React.PropTypes.string,

    id: React.PropTypes.string,
    style: React.PropTypes.object,
    theme: React.PropTypes.string,

    onSubmit: React.PropTypes.func,
    onPlus: React.PropTypes.func,
    value: React.PropTypes.string,
    name: React.PropTypes.string,
    placeholder: React.PropTypes.string,
  },

  getTheme(name){
    return _.contains(["regular","opacity","flat"], name) ? name : "regular"
  },
  getInitialState() {
    return {
      selected: null
    }
  },
  submitHandler(e) {
    if (_.isFunction(this.props.onSubmit)) {
      e.preventDefault()
      this.props.onSubmit(this.refs.msg.getDOMNode().value)
      this.refs.msg.getDOMNode().value = ""
    }
  },
  plusHandler(e) {
    if (_.isFunction(this.props.onPlus)) {
      e.preventDefault()
      this.props.onPlus()
      this.refs.msg.getDOMNode().value = ""
    }
  },
  keyHandler(e) {
    if (e.which==13) this.submitHandler(e)
  },
  render() {
    let styles = this.css.styles
    let textAreaProps = _.pick(this.props, ["value", "name", "placeholder"])

    return <div {... this.props} style={styles.canvas}>
      <textarea {... textAreaProps} style={styles.textArea} ref="msg" onKeyDown={this.keyHandler}/>

      <button style={styles.submitPlus} onClick={this.plusHandler}><RC.uiIcon uiClass="plus" uiColor="lightGrey" theme="absCenter" /></button>
      <button style={styles.submitMsg} onClick={this.submitHandler}><RC.uiIcon uiClass={this.props.uiClass || "paper-plane"} uiColor="white" theme="absCenter" /></button>
    </div>
  },

  defBgColor: function() {
    return this.props.isUser ? "white" : "brand1"
  },
  baseStyles(np,ns) {

    return {
      canvas: {
        position: "fixed", bottom: "0", left: "0", right: "0", zIndex: "100",
        padding: "5px 65px 0",
        background: "#fff",
        boxShadow: "0 -1px rgba(0,0,0,.08))"
      },
      textArea: {
        height: "35px", minHeight: "0",
        padding: "8px 10px 8px 0", border: "none"
      },
      submitMsg: {
        width: "43px", height: "37px",
        backgroundColor: RC.Theme.color.brand1,
        border: "none", borderRadius: "2px",
        position: "absolute", left: "auto", right: "4px", top: "auto", bottom: "4px"
      },
      submitPlus: {
        width: "37px", height: "37px",
        backgroundColor: "#fff",
        border: "solid 1px #c7c7c7",
        borderRadius: "50%", position: "absolute",
        left: "4px", right: "auto", top: "auto", bottom: "4px"
      }
    }
  },
  themeStyles(np,ns) {
    return {
      opacity: {
        canvas: {
          boxShadow: "0 -2px 3px rgba(0,0,0,.03))",
          background: "rgba(255,255,255,.91)"
        }
      },
      flat: {
        canvas: {
          boxShadow: "none",
          background: "rgba(255,255,255,.91)"
        }
      }
    }
  }
})
