
App.ItemEx1 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      return <RC.Div bgColor="brand2">
        <RC.Item>Default background color is white</RC.Item>
        <RC.Item bgColor="transparent">You can make it transparent</RC.Item>
      </RC.Div>
    }
  `
    }
    renderExample() {
      return <RC.Div bgColor="brand2">
        <RC.Item>Default background color is white</RC.Item>
        <RC.Item bgColor="transparent">You can make it transparent</RC.Item>
      </RC.Div>
    }
  }
)
