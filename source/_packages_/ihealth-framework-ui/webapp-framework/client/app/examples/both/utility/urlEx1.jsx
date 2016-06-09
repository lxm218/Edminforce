App.URLEx1 = App.Example(
  class extends RC.Code {
    clickHandler() {
      alert("You can pass a click handler to RC.URL.")
    }
    renderExample() {
      return <RC.List>
        <RC.Item theme="body"><RC.URL href="#href">[No uiClass] You can use it without a uiClass/uiStyle etc.</RC.URL></RC.Item>
        <RC.Item theme="body"><RC.URL uiClass="anchor" href="#href">You can pass href as a prop</RC.URL></RC.Item>
        <RC.Item theme="body"><RC.URL uiClass="cloud" tagName="span">Or a tagName passed to React.createElement</RC.URL></RC.Item>
        <RC.Item theme="body"><RC.URL uiClass="chevron-right" href="https://facebook.github.io/react/docs/top-level-api.html">
           ( Click to find more info about React.createElement API Doc )</RC.URL></RC.Item>
        <RC.Item theme="body"><RC.URL uiClass="paw" onClick={this.clickHandler.bind(this)}>Or a click handler</RC.URL></RC.Item>
      </RC.List>
    }
    code() {
      return `
    clickHandler() {
      alert("You can pass a click handler to RC.URL.")
    }
    renderExample() {
      return <RC.List>
        <RC.Item theme="body"><RC.URL href="#href">[No uiClass] You can use it without a uiClass/uiStyle etc.</RC.URL></RC.Item>
        <RC.Item theme="body"><RC.URL uiClass="anchor" href="#href">You can pass href as a prop</RC.URL></RC.Item>
        <RC.Item theme="body"><RC.URL uiClass="cloud" tagName="span">Or a tagName passed to React.createElement</RC.URL></RC.Item>
        <RC.Item theme="body"><RC.URL uiClass="chevron-right" href="https://facebook.github.io/react/docs/top-level-api.html">
           ( Click to find more info about React.createElement API Doc )</RC.URL></RC.Item>
        <RC.Item theme="body"><RC.URL uiClass="paw" onClick={this.clickHandler.bind(this)}>Or a click handler</RC.URL></RC.Item>
      </RC.List>
    }
  `
    }
  }
)