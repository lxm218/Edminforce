
App.TabsEx2 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      return <div style={{padding: "10px 0"}}>
        <RC.Tabs theme="big" bgColor="white">
          <RC.URL>One</RC.URL>
          <RC.URL>Two</RC.URL>
          <RC.URL>Three</RC.URL>
          <RC.URL>Four</RC.URL>
        </RC.Tabs>
        <RC.Tabs theme="big" bgColor="fog">
          <RC.URL>Letter A</RC.URL>
          <RC.URL>Letter B</RC.URL>
          <RC.URL>Letter C</RC.URL>
        </RC.Tabs>
        <RC.Tabs theme="big" bgColor="gray">
          <RC.URL>Toh-ma-ae-toh</RC.URL>
          <RC.URL>Toh-mah-toh</RC.URL>
        </RC.Tabs>
        <RC.Tabs theme="big" bgColor="brand2">
          <RC.URL>Going Solo</RC.URL>
        </RC.Tabs>
      </div>
    }
  `
    }
    renderExample() {
      return <div style={{padding: "10px 0"}}>
        <RC.Tabs theme="big" bgColor="white">
          <RC.URL>One</RC.URL>
          <RC.URL>Two</RC.URL>
          <RC.URL>Three</RC.URL>
          <RC.URL>Four</RC.URL>
        </RC.Tabs>
        <RC.Tabs theme="big" bgColor="fog">
          <RC.URL>Letter A</RC.URL>
          <RC.URL>Letter B</RC.URL>
          <RC.URL>Letter C</RC.URL>
        </RC.Tabs>
        <RC.Tabs theme="big" bgColor="gray">
          <RC.URL>Toh-ma-ae-toh</RC.URL>
          <RC.URL>Toh-mah-toh</RC.URL>
        </RC.Tabs>
        <RC.Tabs theme="big" bgColor="brand2">
          <RC.URL>Going Solo</RC.URL>
        </RC.Tabs>
      </div>
    }
  }
)
