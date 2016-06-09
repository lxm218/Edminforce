
App.SelectEx1 = App.Example(
  class extends RC.Code {
    code() {
      return `
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
        <RC.Select options={options} value="Donkey" label="Animals" />
        <RC.Select options={options} value="Fire-Bellied Toad" label="Animals" labelColor="brand1" />
        <RC.Select options={options} value="Giant Clam" label="Animals" labelColor="brand2" />
      </div>
    }
  `
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
        <RC.Select options={options} value="Donkey" label="Animals" />
        <RC.Select options={options} value="Fire-Bellied Toad" label="Animals" labelColor="brand1" />
        <RC.Select options={options} value="Giant Clam" label="Animals" labelColor="brand2" />
      </div>
    }
  }
)
