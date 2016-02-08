
App.TextareaEx3 = App.Example(
  class extends RC.Code {
    code() {
      return `
    reset() {
      this.refs.ta.reset()
    }
    value() {
      alert(this.refs.ta.getValue())
    }
    renderExample() {
      const value = "Hello everyone, I like long walks on the beach. I like to jump high in the air and catch frisbees.";
      return <div>
        <p>
          <RC.URL onClick={this.reset.bind(this)}>Reset</RC.URL><br />
          <RC.URL onClick={this.value.bind(this)}>Get Value</RC.URL>
        </p>
        <RC.Textarea theme="stacked-label" name="biography" label="Biography" value={value} ref="ta" />
      </div>
    }
  `
    }
    reset() {
      this.refs.ta.reset()
    }
    value() {
      alert(this.refs.ta.getValue())
    }
    renderExample() {
      const value = "Hello everyone, I like long walks on the beach. I like to jump high in the air and catch frisbees.";
      return <div>
        <p>
          <RC.URL onClick={this.reset.bind(this)}>Reset</RC.URL><br />
          <RC.URL onClick={this.value.bind(this)}>Get Value</RC.URL>
        </p>
        <RC.Textarea theme="stacked-label" name="biography" label="Biography" value={value} ref="ta" />
      </div>
    }
  }
)
