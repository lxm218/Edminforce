
App.ButtonEx1 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  render() {@br\
    return <RC.Form>@br\
      <RC.Button>Button (Default)</RC.Button>@br\
      <RC.Button bgColor="brand1" bgColorHover="dark">Button (Brand1)</RC.Button>@br\
      <RC.Button bgColor="brand2" bgColorHover="dark">Button (Brand2)</RC.Button>@br\
      <RC.Button bgColor="gray" theme="inline">Button (Inline, Gray)</RC.Button>@br\
      <RC.Button bgColor="fog" color="red" theme="inline">Button (Inline, Fog)</RC.Button>@br\
      <RC.Button bgColor="green" theme="circle">Circle</RC.Button>@br\
    </RC.Form>@br\
  },@br\
})'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    renderExample() {
      return <RC.Form>
        <RC.Button>Button (Default)</RC.Button>
        <RC.Button bgColor="brand1" bgColorHover="dark">Button (Brand1)</RC.Button>
        <RC.Button bgColor="brand2" bgColorHover="dark">Button (Brand2)</RC.Button>
        <RC.Button bgColor="gray" theme="inline">Button (Inline, Gray)</RC.Button>
        <RC.Button bgColor="fog" color="red" theme="inline">Button (Inline, Fog)</RC.Button>
        <RC.Button bgColor="green" theme="circle" style={{marginTop: 15}}>Circle</RC.Button>
      </RC.Form>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
