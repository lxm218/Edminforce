
App.InputEx2 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
      let code = '\
React.createClass({@br\
  render() {@br\
    return <div>@br\
      <RC.Input theme="stacked-label" value="Mr." label="Prefix" />@br\
      <RC.Input theme="stacked-label" value="John" label="First Name" />@br\
      <RC.Input theme="stacked-label" value="Smith" label="Middle Name" />@br\
      <RC.Input theme="stacked-label" value="Doe" label="Last Name" />@br\
    </div>@br\
  },@br\
})'
      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    renderExample() {
      return <div>
        <RC.Input theme="stacked-label" value="Mr." label="Prefix" />
        <RC.Input theme="stacked-label" value="John" label="First Name" labelColor="brand1" />
        <RC.Input theme="stacked-label" value="Smith" label="Middle Name" labelColor="brand2" />
        <RC.Input theme="stacked-label" value="Doe" label="Last Name" labelColor="brand3" />
      </div>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
