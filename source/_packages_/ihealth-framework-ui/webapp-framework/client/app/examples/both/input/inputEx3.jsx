
App.InputEx3 = App.Example(
  class extends RC.Code {
    code() {
      return `
    errorCheck(val) {
      return val!=="Oranges"
    }
    renderExample() {
      return <RC.Input
          theme="stacked-label"
          validations={this.errorCheck}
          value="Apple" label="Must be equal to 'Oranges'"
        />
  `
    }
    errorCheck(val) {
      return val!=="Oranges"
    }
    renderExample() {
      return <RC.Input
          theme="stacked-label"
          validations={this.errorCheck}
          value="Apple" label="Must be equal to 'Oranges'"
        />
    }
  }
)
