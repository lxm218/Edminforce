
App.TabsEx6 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      const headerImg = {
        height: 170,
        backgroundImage: "url(/assets/examples/img1.jpg)"
      }
      const innerStyle = {
        position: "relative"
      }
      return <RC.Div bgColor="dark">
        <RC.Div theme="background" style={headerImg} />
        <RC.Div style={innerStyle} theme="padding" autoFix={false} bgColor="brand2">
          <RC.TabsFolder bgColor="brand2" initialTab={0}>
            <RC.URL>Superman</RC.URL>
            <RC.URL>Batman</RC.URL>
            <RC.URL>Wonderwoman</RC.URL>
          </RC.TabsFolder>
          <p>Enter page content here.</p>
        </RC.Div>
      </RC.Div>
    }
  `
    }
    renderExample() {
      const headerImg = {
        height: 170,
        backgroundImage: "url(/assets/examples/img1.jpg)"
      }
      const innerStyle = {
        position: "relative"
      }
      return <RC.Div bgColor="dark">
        <RC.Div theme="background" style={headerImg} />
        <RC.Div style={innerStyle} theme="padding" autoFix={false} bgColor="brand2">
          <RC.TabsFolder bgColor="brand2" initialTab={0}>
            <RC.URL>Superman</RC.URL>
            <RC.URL>Batman</RC.URL>
            <RC.URL>Wonderwoman</RC.URL>
          </RC.TabsFolder>
          <p>Enter page content here.</p>
        </RC.Div>
      </RC.Div>
    }
  }
)
