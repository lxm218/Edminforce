
App.CardEx3 = App.Example(
  class extends RC.Code {
    code() {
      return `
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
    }
  `
    }

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
    }
  }
)
