
App.InputEx1 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      return <div>
        <RC.Input value="Mr." label="Prefix" />
        <RC.Input value="John" label="First Name" labelColor="brand1" />
        <RC.Input value="Smith" label="Middle Name" labelColor="brand2" />
        <RC.Input value="Doe" label="Last Name" labelColor="brand3" />
      </div>
    }
  `
    }
    renderExample() {
      return <div>
        <RC.Input value="Mr." label="Prefix" />
        <RC.Input value="John" label="First Name" labelColor="brand1" />
        <RC.Input value="Smith" label="Middle Name" labelColor="brand2" />
        <RC.Input value="Doe" label="Last Name" labelColor="brand3" />
      </div>
    }
  }
)
