
App.CheckEx1 = App.Example(
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
      let groceries = [{
        checked: true,
        label: "7 Cabbages"
      },{
        checked: true,
        label: "Bag of Carrots"
      },{
        checked: false,
        label: "Box of Diet Coke",
        uiBgColor: "red"
      },{
        checked: true,
        label: "Box of Oranges",
        uiBgColor: "red"
      },{
        checked: true,
        label: "2 Bottles of Soy Sauce",
        uiBgColor: "brand2"
      },{
        checked: false,
        label: "4 Cartons of Milk",
        uiBgColor: "brand2"
      },{
        checked: false,
        label: "2 Boxes of Apples",
        uiBgColor: "brand3"
      },{
        checked: true,
        label: "1 Rainbow Trout",
        uiBgColor: "brand3"
      },{
        checked: true,
        label: "2 Loaf of Bread",
        uiBgColor: "gray"
      },{
        checked: true,
        label: "Bottle of General Tsao Sauce",
        uiBgColor: "gray"
      }]

      return <RC.List>
        <RC.Item theme="divider">Grocery List</RC.Item>
        {
        groceries.map(function(g,n){
          return <RC.Checkbox {... g} key={n}/>
        })
        }
      </RC.List>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
