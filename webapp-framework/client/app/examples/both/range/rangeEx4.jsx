
App.RangeEx4 = App.Example(
  class extends RC.Code {
    code() {
      return `
    constructor(props) {
      super(props);
      this.state = {
        obj: Immutable.Map({val: 50})
      }
    }
    changeSlider(e) {
      this.setStateObj({
        val: e.target.value
      })
    }
    renderExample() {
      return <div>
        <RC.Div theme="padding">
          The value of this range slider is <strong>{this.state.obj.get("val")}</strong>.
        </RC.Div>
        <RC.Range onChange={this.changeSlider.bind(this)} value={50} color="brand1" />
      </div>
    }
  `
    }
    constructor(props) {
      super(props);
      this.state = {
        obj: Immutable.Map({val: 50})
      }
    }
    changeSlider(e) {
      this.setStateObj({
        val: e.target.value
      })
    }
    renderExample() {
      return <div>
        <RC.Div theme="padding">
          The value of this range slider is <strong>{this.state.obj.get("val")}</strong>.
        </RC.Div>
        <RC.Range onChange={this.changeSlider.bind(this)} value={50} color="brand1" />
      </div>
    }
  }
)
