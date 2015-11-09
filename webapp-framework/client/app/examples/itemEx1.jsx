
App.ItemEx1 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  render() {@br\
    return <RC.Div>@br\
      <RC.Item>Good Morning</RC.Item>@br\
      <RC.Item>Good Afternoon</RC.Item>@br\
      <RC.Item>Good Evening</RC.Item>@br\
      <RC.Item>Hello World</RC.Item>@br\
    </RC.Div>@br\
  },@br\
})'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    renderExample() {
      return <RC.Div>
        <RC.Item>Good Morning</RC.Item>
        <RC.Item>Good Afternoon</RC.Item>
        <RC.Item>Good Evening</RC.Item>
        <RC.Item>Hello World</RC.Item>
      </RC.Div>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
