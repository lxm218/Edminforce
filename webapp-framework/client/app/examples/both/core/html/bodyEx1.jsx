App.BodyEx1 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      let style = {
        'padding': '5em'
      }
      return (
        <RC.Body style={style}>
          This is the app content
        </RC.Body>
      )
    }
  `
    }

    renderExample() {
      let style = {
        'padding': '5em'
      }
      return (
        <RC.Body style={style}>
          This is the app content
        </RC.Body>
      )
    }
  }
)