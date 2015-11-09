
App.TabsEx3 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  render() {@br\
    return <RC.Tabs activateOnHold={false} activateOnClick={false} bgColor="white">@br\
      <RC.URL uiClass="paperclip">Paperclip</RC.URL>@br\
      <RC.URL uiClass="cut">Scissors</RC.URL>@br\
      <RC.URL uiClass="eraser">Eraser</RC.URL>@br\
    </RC.Tabs>@br\
  },@br\
})'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    renderExample() {
      return <RC.Tabs activateOnHold={false} activateOnClick={false} bgColor="white">
        <RC.URL uiClass="paperclip">Paperclip</RC.URL>
        <RC.URL uiClass="cut">Scissors</RC.URL>
        <RC.URL uiClass="eraser">Eraser</RC.URL>
      </RC.Tabs>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
