
App.RadioEx2 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  get() {@br\
    return alert(this.refs.rg.getValue())@br\
  },@br\
  reset() {@br\
    this.refs.rg.reset()@br\
  },@br\
  render() {@br\
    let options = [{@br\
      value: "friendly-tiger",@br\
      label: "Tigger"@br\
    },{@br\
      value: "honey-loving-bear",@br\
      label: "Pooh"@br\
    },{@br\
      value: "gloomy-donkey",@br\
      label: "Eeyore"@br\
    },{@br\
      value: "shy-pig",@br\
      label: "Piglet"@br\
    }]@br\
@br\
    return <div>@br\
      <RC.Div theme="padding">@br\
        <a onClick={this.get}>Get Value</a><br />@br\
        <a onClick={this.reset}>Reset</a>@br\
      </RC.Div>@br\
      <RC.RadioGroup list={options} value="friendly-tiger" ref="rg" />@br\
    </div>@br\
  },@br\
})'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    get() {
      return alert(this.refs.rg.getValue())
    },
    reset() {
      this.refs.rg.reset()
    },
    renderExample() {
      let options = [{
        value: "friendly-tiger",
        label: "Tigger"
      },{
        value: "honey-loving-bear",
        label: "Pooh"
      },{
        value: "gloomy-donkey",
        label: "Eeyore"
      },{
        value: "shy-pig",
        label: "Piglet"
      }]

      return <div>
        <RC.Div theme="padding">
          <a onClick={this.get}>Get Value</a><br />
          <a onClick={this.reset}>Reset</a>
        </RC.Div>
        <RC.RadioGroup list={options} value="friendly-tiger" ref="rg" />
      </div>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
