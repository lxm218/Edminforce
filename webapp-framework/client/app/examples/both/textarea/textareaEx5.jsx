
App.TextareaEx5 = App.Example(
  class extends RC.Code {
    renderExample() {
      const value = "Hello everyone, I like long walks on the beach. I like to jump high in the air and catch frisbees.";
      return <div>
        <RC.Textarea theme="overlay" name="biography" label="Biography" value={value} />
      </div>
    }
    code() {
      return `
    renderExample() {
      const value = "Hello everyone, I like long walks on the beach. I like to jump high in the air and catch frisbees.";
      return <div>
        <RC.Textarea theme="overlay" name="biography" label="Biography" value={value} />
      </div>
    }
  `
    }
  }
)
