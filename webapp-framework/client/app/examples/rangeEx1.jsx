
App.RangeEx1 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  render() {@br\
    return <div>@br\
      <RC.Range value={50} color="brand1" />@br\
      <RC.Range value={50} min={-50} max={150} color="brand2" />@br\
      <RC.Range value={50} max={200} color="gray" />@br\
      <RC.Range value={300} max={400} color="red"/>@br\
    </div>@br\
  },@br\
})'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    renderExample() {
      return <div>
        <RC.Range value={50} color="brand1" />
        <RC.Range value={50} min={-50} max={150} color="brand2" />
        <RC.Range value={50} max={200} color="gray" />
        <RC.Range value={300} max={400} color="red"/>
      </div>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
