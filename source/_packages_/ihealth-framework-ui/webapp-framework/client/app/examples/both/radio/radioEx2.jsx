
App.RadioEx2 = App.Example(
  class extends RC.Code {
    code() {
      return `
    get() {
      return alert(this.refs.rg.getValue())
    }
    reset() {
      this.refs.rg.reset()
    }
    renderExample() {
      const options = [{
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
          <a onClick={this.get.bind(this)}>Get Value</a><br />
          <a onClick={this.reset.bind(this)}>Reset</a>
        </RC.Div>
        <RC.RadioGroup list={options} value="friendly-tiger" ref="rg" />
      </div>
    }
  `
    }

    get() {
      return alert(this.refs.rg.getValue())
    }
    reset() {
      this.refs.rg.reset()
    }
    renderExample() {
      const options = [{
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
          <a onClick={this.get.bind(this)}>Get Value</a><br />
          <a onClick={this.reset.bind(this)}>Reset</a>
        </RC.Div>
        <RC.RadioGroup list={options} value="friendly-tiger" ref="rg" />
      </div>
    }
  }
)
