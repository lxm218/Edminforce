
App.TabsEx3 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      return <RC.Tabs activateOnHold={false} activateOnClick={false} bgColor="white">
        <RC.URL uiClass="paperclip">Paperclip</RC.URL>
        <RC.URL uiClass="cut">Scissors</RC.URL>
        <RC.URL uiClass="eraser">Eraser</RC.URL>
      </RC.Tabs>
    }
  `
    }
    renderExample() {
      return <RC.Tabs activateOnHold={false} activateOnClick={false} bgColor="white">
        <RC.URL uiClass="paperclip">Paperclip</RC.URL>
        <RC.URL uiClass="cut">Scissors</RC.URL>
        <RC.URL uiClass="eraser">Eraser</RC.URL>
      </RC.Tabs>
    }
  }
)
