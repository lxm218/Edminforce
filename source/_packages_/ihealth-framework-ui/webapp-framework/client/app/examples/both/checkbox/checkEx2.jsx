
App.CheckEx2 = App.Example(
  class extends RC.Code {
    code() {
      return `
    reset() {
      this.refs.check.reset()
    }

    value() {
      alert(this.refs.check.getValue())
    }

    turnOff() {
      this.refs.check.turnOff()
    }

    turnOn() {
      this.refs.check.turnOn()
    }

    renderExample() {
      let checkbox = {
        checked: true,
        label: "Hello World!"
      }
      return <div>
        <RC.Div theme="padding">
          <RC.URL onClick={this.reset.bind(this)}>Reset</RC.URL><br />
          <RC.URL onClick={this.value.bind(this)}>Get Value</RC.URL><br />
          <RC.URL onClick={this.turnOff.bind(this)}>Turn Off</RC.URL><br />
          <RC.URL onClick={this.turnOn.bind(this)}>Turn On</RC.URL>
        </RC.Div>
        <RC.Checkbox {... checkbox} ref="check" />
      </div>
    }
  `
    }
    reset() {
      this.refs.check.reset()
    }

    value() {
      alert(this.refs.check.getValue())
    }

    turnOff() {
      this.refs.check.turnOff()
    }

    turnOn() {
      this.refs.check.turnOn()
    }

    renderExample() {
      let checkbox = {
        checked: true,
        label: "Hello World!"
      }
      return <div>
        <RC.Div theme="padding">
          <RC.URL onClick={this.reset.bind(this)}>Reset</RC.URL><br />
          <RC.URL onClick={this.value.bind(this)}>Get Value</RC.URL><br />
          <RC.URL onClick={this.turnOff.bind(this)}>Turn Off</RC.URL><br />
          <RC.URL onClick={this.turnOn.bind(this)}>Turn On</RC.URL>
        </RC.Div>
        <RC.Checkbox {... checkbox} ref="check" />
      </div>
    }
  }
)
