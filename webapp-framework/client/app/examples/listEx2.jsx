
App.ListEx2 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  render() {@br\
    let colors = [{@br\
      uiColor: "brand1",@br\
      value: "brand1",@br\
      note: "Theme color property",@br\
    },{@br\
      uiColor: "brand2",@br\
      value: "brand2",@br\
      note: "Theme color property",@br\
    },{@br\
      uiColor: "brand3",@br\
      value: "brand3",@br\
      note: "Theme color property",@br\
    },{@br\
      uiColor: "white",@br\
      value: "white",@br\
      note: "Theme color property",@br\
    },{@br\
      uiColor: "maroon",@br\
      value: "maroon",@br\
      note: "Valid color string"@br\
    },{@br\
      uiColor: "#00dac8",@br\
      value: "#00dac8",@br\
      note: "Custom HEX string"@br\
    }]@br\
    return <RC.Div bgColor="blue" theme="full">@br\
      <RC.List theme="inset">@br\
        <RC.Item theme="body">@br\
          <h3>Description</h3>@br\
          <p>You can create your own color palettes from the Theme variable. You can choose colors by its name or hex.</p>@br\
        </RC.Item>@br\
        <RC.Item theme="divider">Common Colors</RC.Item>@br\
        {@br\
        colors.map(function(c,n){@br\
          c.theme = "icons"@br\
          c.uiClass = "thumbs-up"@br\
          return <RC.Item {... _.omit(c,"value")} key={n}>{c.value}</RC.Item>@br\
        })@br\
        }@br\
      </RC.List>@br\
    </RC.Div>@br\
  },@br\
})'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    renderExample() {
      let colors = [{
        uiColor: "brand1",
        value: "brand1",
        note: "Theme color property",
      },{
        uiColor: "brand2",
        value: "brand2",
        note: "Theme color property",
      },{
        uiColor: "brand3",
        value: "brand3",
        note: "Theme color property",
      },{
        uiColor: "white",
        value: "white",
        note: "Theme color property",
      },{
        uiColor: "maroon",
        value: "maroon",
        note: "Valid color string"
      },{
        uiColor: "#00dac8",
        value: "#00dac8",
        note: "Custom HEX string"
      }]
      return <RC.Div bgColor="blue" theme="full">
        <RC.List theme="inset">
          <RC.Item theme="body">
            <h3>Description</h3>
            <p>You can create your own color palettes from the Theme variable. You can choose colors by its name or hex.</p>
          </RC.Item>
          <RC.Item theme="divider">Common Colors</RC.Item>
          {
          colors.map(function(c,n){
            c.theme = "icons"
            c.uiClass = "thumbs-up"
            return <RC.Item {... _.omit(c,"value")} key={n}>{c.value}</RC.Item>
          })
          }
        </RC.List>
      </RC.Div>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
