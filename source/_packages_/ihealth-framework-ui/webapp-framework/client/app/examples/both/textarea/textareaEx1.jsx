
App.TextareaEx1 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      const value = "Hello everyone, I like long walks on the beach. I like to jump high in the air and catch frisbees.";
      return <div>
        <RC.Textarea name="biography" label="Biography" value={value} />
      </div>
    }
  `
    }
    renderExample() {
      const value = "Hello everyone, I like long walks on the beach. I like to jump high in the air and catch frisbees.";
      return <div>
        <RC.Textarea name="biography" label="Biography" value={value} />
      </div>
    }
  }
)
