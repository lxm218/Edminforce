
App.ButtonEx2 = App.Example(
  class extends RC.Code {
    renderExample() {
      return <RC.Form>
        <RC.Button uiClass="thumbs-up">Thumbs Up</RC.Button>
        <RC.Button uiClass="train">Train</RC.Button>
        <RC.Button uiClass="rocket">Rocket</RC.Button>
      </RC.Form>
    }
    code() {
      return `
    renderExample() {
      return <RC.Form>
        <RC.Button uiClass="thumbs-up">Thumbs Up</RC.Button>
        <RC.Button uiClass="train">Train</RC.Button>
        <RC.Button uiClass="rocket">Rocket</RC.Button>
      </RC.Form>
    }
  `
    }
  }
)
