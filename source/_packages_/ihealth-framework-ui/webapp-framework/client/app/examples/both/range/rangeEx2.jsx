
App.RangeEx2 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      return <div>
        <RC.Range value={50} bgColor="brand1" />
        <RC.Range value={50} bgColor="brand2" />
        <RC.Range value={25} bgColor="brand3" />
        <RC.Range value={75} bgColor="red"/>
      </div>
    }
  `
    }
    renderExample() {
      return <div>
        <RC.Range value={50} bgColor="brand1" />
        <RC.Range value={50} bgColor="brand2" />
        <RC.Range value={25} bgColor="brand3" />
        <RC.Range value={75} bgColor="red"/>
      </div>
    }
  }
)
