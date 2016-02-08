
App.SelectEx2 = App.Example(
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
      const select1 = {
        value: "Donkey",
        label: "Animals",
        theme: "stackedLabel"
      }
      const select2 = {
        value: "Fire-Bellied Toad",
        label: "Animals",
        theme: "stackedLabel",
        labelColor: "brand1"
      }
      const select3 = {
        value: "Giant Clam",
        label: "Animals",
        theme: "stackedLabel",
        labelColor: "brand2"
      }
      return <div>
        <RC.Select {... select1} options={options} />
        <RC.Select {... select2} options={options} />
        <RC.Select {... select3} options={options} />
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
      const select1 = {
        value: "Donkey",
        label: "Animals",
        theme: "stackedLabel"
      }
      const select2 = {
        value: "Fire-Bellied Toad",
        label: "Animals",
        theme: "stackedLabel",
        labelColor: "brand1"
      }
      const select3 = {
        value: "Giant Clam",
        label: "Animals",
        theme: "stackedLabel",
        labelColor: "brand2"
      }
      return <div>
        <RC.Select {... select1} options={options} />
        <RC.Select {... select2} options={options} />
        <RC.Select {... select3} options={options} />
      </div>
    }
  }
)
