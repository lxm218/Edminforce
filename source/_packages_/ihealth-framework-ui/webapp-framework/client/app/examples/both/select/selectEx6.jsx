App.SelectEx6 = App.Example(
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
        theme: "thin"
      }
      const select2 = {
        value: "Fire-Bellied Toad",
        label: "Animals",
        theme: "thin",
        labelColor: "brand2"
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
        theme: "thin"
      }
      const select2 = {
        value: "Fire-Bellied Toad",
        label: "Animals",
        theme: "thin",
        labelColor: "brand2"
      }
      return <div>
        <RC.Select {... select1} options={options} />
        <RC.Select {... select2} options={options} />
      </div>
    }
  }
)