
App.ButtonEx1 = App.Example(
  class extends RC.Code {
    renderExample() {
      return <RC.Form>
        <RC.Button>Button (Default)</RC.Button>
        <RC.Button bgColor="brand1" bgColorHover="dark">Button (Brand1)</RC.Button>
        <RC.Button bgColor="brand2" bgColorHover="dark">Button (Brand2)</RC.Button>
        <RC.Button bgColor="gray" theme="inline">Button (Inline, Gray)</RC.Button>
        <RC.Button bgColor="fog" color="red" theme="inline">Button (Inline, Fog)</RC.Button>
        <RC.Button bgColor="green" theme="circle" style={{marginTop: 15}}>Circle</RC.Button>
      </RC.Form>
    }
    code() {
      return `
    renderExample() {
      return <RC.Form>
        <RC.Button>Button (Default)</RC.Button>
        <RC.Button bgColor="brand1" bgColorHover="dark">Button (Brand1)</RC.Button>
        <RC.Button bgColor="brand2" bgColorHover="dark">Button (Brand2)</RC.Button>
        <RC.Button bgColor="gray" theme="inline">Button (Inline, Gray)</RC.Button>
        <RC.Button bgColor="fog" color="red" theme="inline">Button (Inline, Fog)</RC.Button>
        <RC.Button bgColor="green" theme="circle" style={{marginTop: 15}}>Circle</RC.Button>
      </RC.Form>
    }
  `
    }
  }
)
