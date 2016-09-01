/**
 * Created on 8/7/16.
 */


RC.DayPickerInput = class extends RC.CSS {
  constructor(p) {
    super(p)
    this.state = {
      opened: false,	//是否已经打开
    }
  }
  open() {

    this.setState({
      opened: true
    })
  }

  close() {
    this.setState({
      opened: false
    })
  }

  formatDate(date) {
    return date? moment(date).format('YYYY-MM-DD'):''
  }

  openOnInput(e) {

    e.stopPropagation();
    e.preventDefault()
    this.open()
  }

  baseStyles(np, ns) {

    const pickerAreaHeight = this.props.height || 300

    return {
      pickerArea:{
        position:'fixed',
        left:0,
        bottom:0,
        width:"100%",
        height:pickerAreaHeight,
        background: "#fff",
        zIndex: 9999999,


        fontSize: '1.33em',
        border: '1px solid #777',
        borderTopColor: '#898989',
        borderBottomWidth: 0,
        borderRadius: '5px 5px 0 0',
        boxShadow: '0 12px 36px 16px rgba(0,0,0,.24)',
      },
      inputLabel:{
        textAlign:'center',
      },
      inputElement:{
        width: '80%',
        padding: '6px 0 6px 0',
        textAlign: 'center'
      }
    }
  }

  componentDidMount() {
    var self = this

    function closeOnHTMLClick(e) {


      if (!self.state.opened) return;

      if (self._input) {
        if (e.target !== self._input) {//???.getDOMNode()
          if ($(e.target).parents('.picker-modal').length === 0) {
            self.close();
          }
        }
      }
      else {

        if ($(e.target).parents('.picker-modal').length === 0)
          self.close();
      }
    }

    $('html').on('click', closeOnHTMLClick);

  }
  render() {
    let self= this
    let styles = this.css.get("styles")

    let displayValue = self.formatDate(this.props.date)


    return <div>

      <div style={styles.inputLabel}>
        {
          self.props.label?<div style={styles.inputText}>
            {self.props.label }
          </div>:''
        }


        <input
          name={this.props.name}
          placeholder="Select a Date"
          style={styles.inputElement}
          ref={(c) => self._input = c}
          value={displayValue}
          type="text"
          readOnly={self.props.readOnly || true}
          onClick={self.openOnInput.bind(self)}/>
      </div>

      {
        self.state.opened ? <RC.Portal >
          <div style={styles.pickerArea} className="picker-modal picker-calendar">
            <RC.DayPicker
              enableOutsideDays={true}
              disabledDays={ self.props.disabledDays }
              selectedDays={ self.props.selectedDays}
              onDayClick={self.props.onDayClick}
            />
          </div>

        </RC.Portal> : ''
      }


    </div>
  }

}