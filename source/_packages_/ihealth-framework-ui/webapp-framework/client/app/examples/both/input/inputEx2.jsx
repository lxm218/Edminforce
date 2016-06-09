
App.InputEx2 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      return <div>
        <RC.Input theme="stackedLabel" value="Mr." label="Prefix"/>
        <RC.Input theme="stackedLabel" value="John" label="First Name" labelColor="brand1"/>
        <RC.Input theme="stackedLabel" value="Smith" label="Middle Name" labelColor="brand2"/>
        <RC.Input theme="stackedLabel" value="Doe" label="Last Name" labelColor="brand3"/>
      </div>
    }
  `
    }
    renderExample() {
      return <div>
        <RC.Input theme="stackedLabel" value="Mr." label="Prefix"/>
        <RC.Input theme="stackedLabel" value="John" label="First Name" labelColor="brand1"/>
        <RC.Input theme="stackedLabel" value="Smith" label="Middle Name" labelColor="brand2"/>
        <RC.Input theme="stackedLabel" value="Doe" label="Last Name" labelColor="brand3"/>
      </div>
    }
  }
)
