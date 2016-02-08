
App.SelectEx3 = App.Example(
  class extends RC.Code {
    code() {
      return `
    error(val) {
      return val!="Donkey"
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
        <p>Must be equal to "Donkey".</p>
        <RC.Select options={options} validations={this.error}/>
      </div>
    }
  `
    }
    error(val) {
      return val!="Donkey"
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
        <p>Must be equal to "Donkey".</p>
        <RC.Select options={options} validations={this.error}/>
      </div>
    }
  }
)
