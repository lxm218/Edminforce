
App.InputEx4 = App.Example(
  class extends RC.Code {
    code() {
      return `
    getVal() {
      alert(this.refs.input.getValue())
    }
    renderExample() {
      return <div>
        <RC.Input value="Hello World!" ref="input" />
        <RC.Button onClick={this.getVal.bind(this)} theme="inline">Get Value</RC.Button>
      </div>
    }
  `
    }
    getVal() {
      alert(this.refs.input.getValue())
    }
    renderExample() {
      return <div>
        <RC.Input value="Hello World!" ref="input" />
        <RC.Button onClick={this.getVal.bind(this)} theme="inline">Get Value</RC.Button>
      </div>
    }
  }
)
