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

    $(this.refs.datepicker).pickadate({

        // onStart: function() {
        //   console.log('Hello there :)')
        // },
        // onRender: function() {
        //   console.log('Whoa.. rendered anew')
        // },
        // onOpen: function() {
        //   console.log('Opened up')
        // },
        // onClose: function() {
        //   console.log('Closed now')
        // },
        // onStop: function() {
        //   console.log('See ya.')
        // },
        onSet: function(context) {
          //console.log('Just set stuff:', context)

          self.props.onSelectDate && self.props.onSelectDate(context.select)
        }

      })
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
        placeholder="Select a date to filter"
        style={styles.form}
        type="text" ref="datepicker"/>
    </div>
  }
};