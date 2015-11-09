
App.InputEx4 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
      let code = '\
React.createClass({@br\
  getVal() {@br\
    alert(this.refs.input.getValue())@br\
  },@br\
  render() {@br\
    return <div>@br\
      <RC.Input value="Hello World!" ref="input" />@br\
      <RC.Button onClick={this.getVal} theme="inline">Get Value</RC.Button>@br\
    </div>@br\
  },@br\
})'
      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    getVal() {
      alert(this.refs.input.getValue())
    },
    renderExample() {
      return <div>
        <RC.Input value="Hello World!" ref="input" />
        <RC.Button onClick={this.getVal} theme="inline">Get Value</RC.Button>
      </div>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
