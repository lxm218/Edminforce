App.UIIconEx1 = App.Example(
  class extends RC.Code {
    renderExample() {
      return <RC.Div>
          <RC.Item><RC.uiIcon uiClass="spinner" color="orange"/></RC.Item>
          <RC.Button><RC.uiIcon uiClass="paw" uiColor="orange"/>Inside a button</RC.Button>
        </RC.Div>
    }
    code() {
      return `
    renderExample() {
      return <RC.Div>
          <RC.Item><RC.uiIcon uiClass="spinner" color="orange"/></RC.Item>
          <RC.Button><RC.uiIcon uiClass="paw" uiColor="orange"/>Inside a button</RC.Button>
        </RC.Div>
    }
  `
    }
  }
)

App.UIIconEx2 = App.Example(
  class extends RC.Code {
    renderExample() {
      return <RC.Div>
          <RC.Button><RC.uiIcon uiClass="paw" uiColor="orange" theme="inlineBlock" />Inside a button</RC.Button>
        </RC.Div>
    }
    code() {
      return `
    renderExample() {
      return <RC.Div>
          <RC.Button><RC.uiIcon uiClass="paw" uiColor="orange" theme="inlineBlock" />Inside a button</RC.Button>
        </RC.Div>
    }
  `
    }
  }
)

App.UIIconEx3 = App.Example(
  class extends RC.Code {
    renderExample() {
      return <RC.Div>
          <RC.Item><RC.uiIcon uiClass="spinner" color="orange" theme="absCenter" /></RC.Item>
        </RC.Div>
    }
    code() {
      return `
    renderExample() {
      return <RC.Div>
          <RC.Item><RC.uiIcon uiClass="spinner" color="orange" theme="absCenter" /></RC.Item>
        </RC.Div>
    }
  `
    }
  }
)

App.UIIconEx4 = App.Example(
  class extends RC.Code {
    renderExample() {
      return <RC.Div>
          <RC.Button><RC.uiIcon uiClass="paw" uiColor="orange" theme="right" />Inside a button</RC.Button>
        </RC.Div>
    }
    code() {
      return `
    renderExample() {
      return <RC.Div>
          <RC.Button><RC.uiIcon uiClass="paw" uiColor="orange" theme="right" />Inside a button</RC.Button>
        </RC.Div>
    }
  `
    }
  }
)
