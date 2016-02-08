
App.TextareaEx2 = App.Example(
  class extends RC.Code {
    code() {
      return `
    error(val) {
      return val !== "Hello world!"
    }
    renderExample() {
      const value = "Hello world!";
      return <div>
        <RC.Textarea theme="stacked-label" name="biography" label="Biography" value={value} validations={this.error} />
      </div>
    }
  `
    }
    error(val) {
      return val !== "Hello world!"
    }
    renderExample() {
      const value = "Hello world!";
      return <div>
        <RC.Textarea theme="stacked-label" name="biography" label="Biography" value={value} validations={this.error} />
      </div>
    }
  }
)
