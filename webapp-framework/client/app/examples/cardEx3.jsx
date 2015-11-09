
App.CardEx3 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  render() {@br\
    return <RC.Card>@br\
      <RC.Item theme="divider">Tabs in Card</RC.Item>@br\
      <RC.Item theme="body">@br\
        <p>@br\
          Aenean at luctus urna. Nulla laoreet ligula et quam mollis, ut cursus nulla elementum. Nullam sagittis felis sit amet quam bibendum.@br\
        </p>@br\
      </RC.Item>@br\
      <RC.Item theme="body">@br\
        <p>@br\
          Nunc ligula neque, semper quis turpis ac, consectetur auctor ex. Quisque faucibus ornare faucibus. Phasellus congue tempus tellus, et eleifend tortor. Nam faucibus malesuada ullamcorper bibendum.@br\
        </p>@br\
      </RC.Item>@br\
      <RC.Tabs theme="no-borders" color="gray">@br\
        <RC.URL uiClass="chrome">Chrome</RC.URL>@br\
        <RC.URL uiClass="safari">Safari</RC.URL>@br\
        <RC.URL uiClass="firefox">Firefox</RC.URL>@br\
      </RC.Tabs>@br\
    </RC.Card>@br\
  },@br\
})'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    renderExample() {
      return <RC.Card>
        <RC.Item theme="divider">Tabs in Card</RC.Item>
        <RC.Item theme="body">
          <p>
            Aenean at luctus urna. Nulla laoreet ligula et quam mollis, ut cursus nulla elementum. Nullam sagittis felis sit amet quam bibendum.
          </p>
        </RC.Item>
        <RC.Item theme="body">
          <p>
            Nunc ligula neque, semper quis turpis ac, consectetur auctor ex. Quisque faucibus ornare faucibus. Phasellus congue tempus tellus, et eleifend tortor. Nam faucibus malesuada ullamcorper bibendum.
          </p>
        </RC.Item>
        <RC.Tabs theme="no-borders" color="gray">
          <RC.URL uiClass="chrome">Chrome</RC.URL>
          <RC.URL uiClass="safari">Safari</RC.URL>
          <RC.URL uiClass="firefox">Firefox</RC.URL>
        </RC.Tabs>
      </RC.Card>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
