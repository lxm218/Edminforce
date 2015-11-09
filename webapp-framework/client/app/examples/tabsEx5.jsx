
App.TabsEx5 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  render() {@br\
    return <div>@br\
      <RC.Div theme="padding" bgColor="brand1">@br\
        <p>What would you like to eat for breakfast?</p>@br\
      </RC.Div>@br\
      <RC.Tabs bgColor="brand1" initialTab={0}>@br\
        <RC.URL uiClass="square" uiClassCur="check-square">Eggs</RC.URL>@br\
        <RC.URL uiClass="square" uiClassCur="check-square">Bacon</RC.URL>@br\
        <RC.URL uiClass="square" uiClassCur="check-square">Ham</RC.URL>@br\
      </RC.Tabs>@br\
    </div>@br\
  },@br\
})'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    renderExample() {
      return <div>
        <RC.Div theme="padding" bgColor="brand1">
          <p>What would you like to eat for breakfast?</p>
        </RC.Div>
        <RC.Tabs bgColor="brand1" initialTab={0}>
          <RC.URL uiClass="square" uiClassCur="check-square">Eggs</RC.URL>
          <RC.URL uiClass="square" uiClassCur="check-square">Bacon</RC.URL>
          <RC.URL uiClass="square" uiClassCur="check-square">Ham</RC.URL>
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
