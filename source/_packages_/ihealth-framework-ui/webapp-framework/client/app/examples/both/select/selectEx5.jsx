
App.SelectEx5 = App.Example(
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
        theme: "right"
      }
      const select2 = {
        value: "Fire-Bellied Toad",
        label: "Animals",
        theme: "right",
        labelColor: "brand1"
      }
      return <div>
        <RC.Select {... select1} options={options} />
        <RC.Select {... select2} options={options} />
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
        theme: "right"
      }
      const select2 = {
        value: "Fire-Bellied Toad",
        label: "Animals",
        theme: "right",
        labelColor: "brand1"
      }
      return <div>
        <RC.Select {... select1} options={options} />
        <RC.Select {... select2} options={options} />
      </div>
    }
  }
)
