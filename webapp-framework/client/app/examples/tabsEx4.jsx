
App.TabsEx4 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  render() {@br\
    return <RC.Tabs theme="slider" bgColor="white" cursorColor="brand1" initialTab={0}>@br\
      <RC.URL uiClass="hand-rock-o">Rock</RC.URL>@br\
      <RC.URL uiClass="hand-paper-o">Paper</RC.URL>@br\
      <RC.URL uiClass="hand-scissors-o">Scissors</RC.URL>@br\
    </RC.Tabs>@br\
  },@br\
})'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    renderExample() {
      return <RC.Tabs theme="slider" bgColor="white" cursorColor="brand1" initialTab={0}>
        <RC.URL uiClass="hand-rock-o">Rock</RC.URL>
        <RC.URL uiClass="hand-paper-o">Paper</RC.URL>
        <RC.URL uiClass="hand-scissors-o">Scissors</RC.URL>
      </RC.Tabs>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
