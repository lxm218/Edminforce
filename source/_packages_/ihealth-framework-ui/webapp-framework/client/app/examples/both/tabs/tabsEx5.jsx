
App.TabsEx5 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      return <div>
        <RC.Div theme="padding" bgColor="brand1">
          <p>What would you like to eat for breakfast?</p>
        </RC.Div>
        <RC.Tabs bgColor="brand1" initialTab={0}>
          <RC.URL uiClass="square" uiClassCur="check-square">Eggs</RC.URL>
          <RC.URL uiClass="square" uiClassCur="check-square">Bacon</RC.URL>
          <RC.URL uiClass="square" uiClassCur="check-square">Ham</RC.URL>
        </RC.Tabs>
      </div>
    }
  `
    }
    renderExample() {
      return <div>
        <RC.Div theme="padding" bgColor="brand1">
          <p>What would you like to eat for breakfast?</p>
        </RC.Div>
        <RC.Tabs bgColor="brand1" initialTab={0}>
          <RC.URL uiClass="square" uiClassCur="check-square">Eggs</RC.URL>
          <RC.URL uiClass="square" uiClassCur="check-square">Bacon</RC.URL>
          <RC.URL uiClass="square" uiClassCur="check-square">Ham</RC.URL>
        </RC.Tabs>
      </div>
    }
  }
)
