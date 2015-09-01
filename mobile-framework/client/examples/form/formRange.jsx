
App.Range_Sliders = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      range: Session.get("range"),
    }
  },
  componentWillUnmount() {
    delete Session.keys["range"]
  },
  sliderControl(name){
    let slider = this.refs[name]
    let msg = "Value is "+slider.getValue()+" max is "+slider.props.max+" and min is "+slider.props.min+"."
    Session.set("range", msg)
  },
  render() {

    return <RC.List>
      <RC.Item theme="body">
        <h2 className="brand">Description</h2>
        <p>Try sliding a range bar. Its value will show below this paragraph. By default, <em>max</em> is 100 and <em>min</em> is 0.</p>
        <p>{this.data.range ? <em className="red">{this.data.range}</em> : <em className="gray">Move a slider...</em>}</p>
        {this.data.test}
      </RC.Item>

      <RC.Item theme="divider">Slider Demos</RC.Item>

      <RC.Range
        value={50}
        ref="range1" changeHandler={this.sliderControl.bind(null,"range1")}
      />
      <RC.Range
        value={50} min={0} max={1000}
        ref="range2" changeHandler={this.sliderControl.bind(null,"range2")}
        rangeColor="brand" uiClass="circle-o, circle" uiColor="gray,gray"
      />
      <RC.Range
        value={40} min={-100} max={100}
        ref="range3" changeHandler={this.sliderControl.bind(null,"range3")}
        rangeColor="brand2" uiClass="heart-o, heart"
      />
      <RC.Range
        value={200} min={100} max={500}
        ref="range4" changeHandler={this.sliderControl.bind(null,"range4")}
        uiClass="hand-peace-o, hand-spock-o" uiColor="brand1,brand2"
      />
      <RC.Range
        value={0} min={-1000} max={100}
        ref="range5" changeHandler={this.sliderControl.bind(null,"range5")}
        rangeColor="brand3" uiClass="bell-o, bell" uiColor="brand1,brand1"
      />
    </RC.List>
  }
})
