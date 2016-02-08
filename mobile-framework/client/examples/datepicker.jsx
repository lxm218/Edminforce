
App.DatePicker = React.createClass({

  render () {
    const datepicker1 = {
      date: new Date(moment(new Date()).format('MM-DD-YYYY')),
      maxWidth: 350, theme: "inline",
      maxDate: new Date(new Date().setYear(new Date().getFullYear() + 1)),
      lineColor: "rgba(0,0,0,.3)",
      firstPage: new Date(moment(new Date()).format('MM-DD-YYYY'))
    }

    return<RC.BackDropArea bgColor="transparent" transitionName="fade-up" absolute={true} style={{padding: 0}}>
        <RC.DatePicker {... datepicker1} />
        <RC.DatePicker date={new Date}
                       firstPage={ moment().subtract(20,"years").toDate()}
                       minDate={moment().subtract(125,"years").toDate()}
                       maxDate={new Date()}
                       lineColor="rgba(0,0,0,.3)"
                       disableClickState={true}
                       theme="full" bgColor="edges" />
      </RC.BackDropArea>
  }
})