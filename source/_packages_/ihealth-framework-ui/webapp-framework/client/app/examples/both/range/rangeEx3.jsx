
App.RangeEx3 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      const range1 = {
        value: 50,
        color: "silver",
        uiClass: ["heart-o","heart"],
        uiColor: ["dark","dark"]
      }
      const range2 = {
        value: 50,
        color: "brand1",
        uiClass: ["thumbs-down","thumbs-up"],
        uiColor: ["brand1","brand1"]
      }
      return <div>
        <RC.Range {... range1} />
        <RC.Range {... range2} />
      </div>
    }
  `
    }
    renderExample() {
      const range1 = {
        value: 50,
        color: "silver",
        uiClass: ["heart-o","heart"],
        uiColor: ["dark","dark"]
      }
      const range2 = {
        value: 50,
        color: "brand1",
        uiClass: ["thumbs-down","thumbs-up"],
        uiColor: ["brand1","brand1"]
      }
      return <div>
        <RC.Range {... range1} />
        <RC.Range {... range2} />
      </div>
    }
  }
)
