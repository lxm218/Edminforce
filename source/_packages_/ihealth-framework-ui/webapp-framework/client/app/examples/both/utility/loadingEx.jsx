App.LoadingEx1 = App.Example(
  class extends RC.Code {
    renderExample() {
      return <RC.Loading isReady={false} />
    }
    code() {
      return `
    renderExample() {
      return <RC.Loading isReady={false} />
    }
  `
    }
  }
);

App.LoadingEx2 = App.Example(
  class extends RC.Code {
    renderExample() {
      const props = {
        isReady: false,
        loadingText: "You can also add loadingText or change spinning wheel.",
        loadingTextStyle: { width: 450, left: "20%", color: "blue" },
        progressStyle: { border: "solid 3px orange" }
      };
      return <RC.Loading {...props}/>
    }
    code() {
      return `
    renderExample() {
      const props = {
        isReady: false,
        loadingText: "You can also add loadingText or change spinning wheel.",
        loadingTextStyle: { width: 450, left: "20%", color: "blue" },
        progressStyle: { border: "solid 3px orange" }
      };
      return <RC.Loading {...props}/>
    }
  `
    }
  }
);

App.LoadingEx3 = App.Example(
  class extends RC.Code {
    constructor(p) {
      super(p);
      this.state = {
        obj: Immutable.Map({isReady: false})
      }
    }
    toggleReady(){
      this.setStateObj({
        isReady: v => !v
      })
    }
    renderExample() {
      const isReady = this.state.obj.get("isReady")
      return <RC.List>
          <RC.Item bgColor="brand2">
            <RC.URL uiClass="chevron-right" uiColor="white"
                    onClick={this.toggleReady.bind(this)}>Toggle Loading</RC.URL>
          </RC.Item>
          <RC.Loading isReady={isReady} />
        </RC.List>
    }
    code() {
      return `
    constructor(p) {
      super(p);
      this.state = {
        obj: Immutable.Map({isReady: false})
      }
    }
    toggleReady(){
      this.setStateObj({
        isReady: v => !v
      })
    }
    renderExample() {
      const isReady = this.state.obj.get("isReady")
      return <RC.List>
          <RC.Item bgColor="brand2">
            <RC.URL uiClass="chevron-right" uiColor="white"
                    onClick={this.toggleReady.bind(this)}>Toggle Loading</RC.URL>
          </RC.Item>
          <RC.Loading isReady={isReady} />
        </RC.List>
    }
  `
    }
  }
);
App.LoadingEx4 = App.Example(
  class extends RC.Code {
    renderExample() {
      return <RC.Loading isReady={false} theme="inline" />
    }
    code() {
      return `
    renderExample() {
      return <RC.Loading isReady={false} theme="inline" />
    }
  `
    }
  }
);
App.LoadingEx5 = App.Example(
  class extends RC.Code {
    renderExample() {
      return <RC.Loading isReady={false} theme="tiny" />
    }
    code() {
      return `
    renderExample() {
      return <RC.Loading isReady={false} theme="tiny" />
    }
  `
    }
  }
);
App.LoadingEx6 = App.Example(
  class extends RC.Code {
    renderExample() {
      return <RC.Item bgColor="brand2"><RC.Loading isReady={false} theme="absFull" /></RC.Item>
    }
    code() {
      return `
    renderExample() {
      return <RC.Item bgColor="brand2"><RC.Loading isReady={false} theme="absFull" /></RC.Item>
    }
  `
    }
  }
);
App.LoadingEx7 = App.Example(
  class extends RC.Code {
    renderExample() {
      return <RC.Div><RC.Loading isReady={false} theme="noWheel" />This one doesn't have a wheel.</RC.Div>
    }
    code() {
      return `
    renderExample() {
      return <RC.Div><RC.Loading isReady={false} theme="noWheel" />This one doesn't have a wheel.</RC.Div>
    }
  `
    }
  }
);