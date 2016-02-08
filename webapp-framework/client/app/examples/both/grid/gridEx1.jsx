App.GridEx1 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      let style = {
        'padding': '2em'
      }
      return (
        <RC.Grid theme={["content","padding-l","padding-r","padding-b"]} style={style} bgColor="brand2">
          <RC.GridItem style={{position: "relative"}} theme={["padding-r","padding-t"]}>
            <RC.TabsFolder initialTab={0} bgColor="light" ref="paneTabs" style={{marginBottom: 12}}>
              <RC.URL colorHover="text" key="1">first url</RC.URL>
              <RC.URL colorHover="text" key="2">second url</RC.URL>
            </RC.TabsFolder>
            <div>
            {
            // Render Main Content
            "the main content"
            }
            </div>
          </RC.GridItem>
        </RC.Grid>
      )
    }
  `
    }

    renderExample() {
      let style = {
        'padding': '2em'
      }
      return (
        <RC.Grid theme={["content","padding-l","padding-r","padding-b"]} style={style} bgColor="brand2">
          <RC.GridItem style={{position: "relative"}} theme={["padding-r","padding-t"]}>
            <RC.TabsFolder initialTab={0} bgColor="light" ref="paneTabs" style={{marginBottom: 12}}>
              <RC.URL colorHover="text" key="1">first url</RC.URL>
              <RC.URL colorHover="text" key="2">second url</RC.URL>
            </RC.TabsFolder>
            <div>
            {
            // Render Main Content
            "the main content"
            }
            </div>
          </RC.GridItem>
        </RC.Grid>
      )
    }
  }
)