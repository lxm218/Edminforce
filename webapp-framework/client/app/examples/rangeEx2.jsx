
App.RangeEx2 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  render() {@br\
    return <div>@br\
      <RC.Range value={50} bgColor="brand1" />@br\
      <RC.Range value={50} bgColor="brand2" />@br\
      <RC.Range value={25} bgColor="brand3" />@br\
      <RC.Range value={75} bgColor="red"/>@br\
  },@br\
})'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    renderExample() {
      return <div>
        <RC.Range value={50} bgColor="brand1" />
        <RC.Range value={50} bgColor="brand2" />
        <RC.Range value={25} bgColor="brand3" />
        <RC.Range value={75} bgColor="red"/>
      </div>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
