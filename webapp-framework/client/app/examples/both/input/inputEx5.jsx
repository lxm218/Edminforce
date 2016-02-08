
App.InputEx5 = App.Example(
  class extends RC.Code {
    code() {
      return `
    resetInput() {
      this.refs.input.reset()
    }

    renderExample() {
      return <div>
        <RC.Input value="Good Morning!" ref="input"/>
        <RC.Button onClick={this.resetInput.bind(this)} theme="inline">Reset Value</RC.Button>
      </div>
    }
  `
    }
    resetInput() {
      this.refs.input.reset()
    }

    renderExample() {
      return <div>
        <RC.Input value="Good Morning!" ref="input"/>
        <RC.Button onClick={this.resetInput.bind(this)} theme="inline">Reset Value</RC.Button>
      </div>
    }
  }
)
