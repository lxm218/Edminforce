
App.InputEx5 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
      let code = '\
React.createClass({@br\
  resetInput() {@br\
    this.refs.input.reset()@br\
  },@br\
  render() {@br\
    return <div>@br\
      <RC.Input value="Good Morning!" ref="input" />@br\
      <RC.Button onClick={this.resetInput} theme="inline">Reset Value</RC.Button>@br\
    </div>@br\
  },@br\
})'
      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    resetInput() {
      this.refs.input.reset()
    },
    renderExample() {
      return <div>
        <RC.Input value="Good Morning!" ref="input" />
        <RC.Button onClick={this.resetInput} theme="inline">Reset Value</RC.Button>
      </div>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
