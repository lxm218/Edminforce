/**
 * Created on 7/17/16.
 */

EdminForce.Components.DateSelector = class extends RC.CSS {

  constructor(p) {
    super(p);
  }
  componentWillUnmount(){
    super.componentWillUnmount()
    
  }

  componentDidMount(){
    super.componentDidMount()

    let self =this

    let pickerSettings = {}
    this.props.minDate && (pickerSettings.min = this.props.minDate);

    let picker = $(this.refs.datepicker).pickadate({
        ...pickerSettings,
        onSet: function(context) {
          self.props.onSelectDate && self.props.onSelectDate(context.select)
        }
      })

      picker = picker.pickadate('picker');
      this.props.initDate && picker.set('select', this.props.initDate);
  }

  baseStyles(np,ns) {
    return{
      area:{
        display:'block',
        textAlign:'center'
      },
      form:{
        width: "80%",
        padding:'6px 0 6px 0',
        textAlign:'center'
      }
    }
  }
  render() {
    const styles = this.css.get("styles")

    return <div  style={styles.area}>

      <input
        placeholder="Select a Date"
        style={styles.form}
        type="text" ref="datepicker"/>
    </div>
  }
};