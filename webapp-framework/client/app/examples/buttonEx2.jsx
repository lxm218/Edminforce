
App.ButtonEx2 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  render() {@br\
    return <RC.Form>@br\
      <RC.Button uiClass="thumbs-up">Thumbs Up</RC.Button>@br\
      <RC.Button uiClass="train">Train</RC.Button>@br\
      <RC.Button uiClass="rocket">Rocket</RC.Button>@br\
    </RC.Form>@br\
  },@br\
})'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    renderExample() {
      return <RC.Form>
        <RC.Button uiClass="thumbs-up">Thumbs Up</RC.Button>
        <RC.Button uiClass="train">Train</RC.Button>
        <RC.Button uiClass="rocket">Rocket</RC.Button>
      </RC.Form>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
