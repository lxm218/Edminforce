
App.SelectEx4 = App.Example(
  class extends RC.Code {
    code() {
      return `
    reset() {
      this.refs.sel.reset()
    }
    value() {
      alert(this.refs.sel.getValue())
    }
    renderExample() {
      const options = [
        "African Wild Dog",
        "Badger",
        "Catfish",
        "Donkey",
        "Fire-Bellied Toad",
        "Giant Clam",
        "Hercules Beetle",
        "Italian Blue Shark"
      ]
      return <div>
        <p>
          <RC.URL onClick={this.reset.bind(this)}>Reset</RC.URL><br />
          <RC.URL onClick={this.value.bind(this)}>Get Value</RC.URL>
        </p>
        <RC.Select options={options} ref="sel" />
      </div>
    }
  `
    }
    reset() {
      this.refs.sel.reset()
    }
    value() {
      alert(this.refs.sel.getValue())
    }
    renderExample() {
      const options = [
        "African Wild Dog",
        "Badger",
        "Catfish",
        "Donkey",
        "Fire-Bellied Toad",
        "Giant Clam",
        "Hercules Beetle",
        "Italian Blue Shark"
      ]
      return <div>
        <p>
          <RC.URL onClick={this.reset.bind(this)}>Reset</RC.URL><br />
          <RC.URL onClick={this.value.bind(this)}>Get Value</RC.URL>
        </p>
        <RC.Select options={options} ref="sel" />
      </div>
    }
  }
)
