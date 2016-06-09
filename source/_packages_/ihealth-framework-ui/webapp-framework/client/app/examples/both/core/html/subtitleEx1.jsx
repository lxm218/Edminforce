App.SubtitleEx1 = App.Example(
  class extends RC.Code {
    renderExample() {
      return (
        <RC.Subtitle theme="line">
          some name
        </RC.Subtitle>
      )
    }
    code() {
      return `
    renderExample() {
      return (
        <RC.Subtitle theme="line">
          some name
        </RC.Subtitle>
      )
    }
  `
    }
  }
)
