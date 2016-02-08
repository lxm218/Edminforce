
App.RangeEx1 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      return <div>
        <RC.Range value={50} color="brand1" />
        <RC.Range value={50} min={-50} max={150} color="brand2" />
        <RC.Range value={50} max={200} color="gray" />
        <RC.Range value={300} max={400} color="red"/>
      </div>
    }
  `
    }
    renderExample() {
      return <div>
        <RC.Range value={50} color="brand1" />
        <RC.Range value={50} min={-50} max={150} color="brand2" />
        <RC.Range value={50} max={200} color="gray" />
        <RC.Range value={300} max={400} color="red"/>
      </div>
    }
  }
)
