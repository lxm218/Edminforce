
App.TabsEx4 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      return <RC.TabsSlider bgColor="white" cursorColor="brand1" initialTab={0}>
        <RC.URL uiClass="hand-rock-o">Rock</RC.URL>
        <RC.URL uiClass="hand-paper-o">Paper</RC.URL>
        <RC.URL uiClass="hand-scissors-o">Scissors</RC.URL>
      </RC.TabsSlider>
    }
  `
    }
    renderExample() {
      return <RC.TabsSlider bgColor="white" cursorColor="brand1" initialTab={0}>
        <RC.URL uiClass="hand-rock-o">Rock</RC.URL>
        <RC.URL uiClass="hand-paper-o">Paper</RC.URL>
        <RC.URL uiClass="hand-scissors-o">Scissors</RC.URL>
      </RC.TabsSlider>
    }
  }
)
