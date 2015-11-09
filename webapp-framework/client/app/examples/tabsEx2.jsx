
App.TabsEx2 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  render() {@br\
    return <div>@br\
      <RC.Tabs theme="big" bgColor="white">@br\
        <RC.URL>One</RC.URL>@br\
        <RC.URL>Two</RC.URL>@br\
        <RC.URL>Three</RC.URL>@br\
        <RC.URL>Four</RC.URL>@br\
      </RC.Tabs>@br\
      <RC.Tabs theme="big" bgColor="fog">@br\
        <RC.URL>Letter A</RC.URL>@br\
        <RC.URL>Letter B</RC.URL>@br\
        <RC.URL>Letter C</RC.URL>@br\
      </RC.Tabs>@br\
      <RC.Tabs theme="big" bgColor="gray">@br\
        <RC.URL>Toh-ma-ae-toh</RC.URL>@br\
        <RC.URL>Toh-mah-toh</RC.URL>@br\
      </RC.Tabs>@br\
      <RC.Tabs theme="big" bgColor="brand3">@br\
        <RC.URL>Going Solo</RC.URL>@br\
      </RC.Tabs>@br\
    </div>@br\
  },@br\
})'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    renderExample() {
      return <div style={{padding: "10px 0"}}>
        <RC.Tabs theme="big" bgColor="white">
          <RC.URL>One</RC.URL>
          <RC.URL>Two</RC.URL>
          <RC.URL>Three</RC.URL>
          <RC.URL>Four</RC.URL>
        </RC.Tabs>
        <RC.Tabs theme="big" bgColor="fog">
          <RC.URL>Letter A</RC.URL>
          <RC.URL>Letter B</RC.URL>
          <RC.URL>Letter C</RC.URL>
        </RC.Tabs>
        <RC.Tabs theme="big" bgColor="gray">
          <RC.URL>Toh-ma-ae-toh</RC.URL>
          <RC.URL>Toh-mah-toh</RC.URL>
        </RC.Tabs>
        <RC.Tabs theme="big" bgColor="brand2">
          <RC.URL>Going Solo</RC.URL>
        </RC.Tabs>
      </div>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
