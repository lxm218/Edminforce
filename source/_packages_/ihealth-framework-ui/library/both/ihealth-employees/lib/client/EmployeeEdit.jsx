
IH.RC.EmployeeEdit = class extends RC.CSSMeteorData {
  constructor(p) {
    super(p)
    this.timeoutDuration = 600
    this.state = {
      groupList: null
    }
  }

  getMeteorData() {
    let _id = this.props.id
    let subs = Meteor.subscribe('employeeTest', _id)
    let employee = IH.Coll.EmployeesTest.findOne(_id)

    return {
      isReady: subs.ready(),
      employee: employee
    }
  }

  _getEmployee() {
    let employee = Object.assign({}, this.data.employee)
    Object.assign(employee, this.refs.form.getFormData())
    employee.groups = this.state.groupList || employee.groups
    return employee
  }

  _showSuccessToastr() {
    let text = 'You have successfully edited the employee information'
    let newMsg = {
      title: 'Success',
      text: text,
      timeoutDuration: 6000
    }
    IH.Dispatcher.App.dispatch({type:"AddToastr", payload: newMsg})
  }

  _submit(e) {
    e.preventDefault()
    let redirectUrl = '/user/profile/' + this.props.id
    let employee = this._getEmployee()
    if(!_.isEqual(employee, this.data.employee)) {
      let updateObj = {
        '$set': _.omit(employee, '_id')
      }
      this._showSuccessToastr()
      let message = 'Submitting...You will be redirected to the employee profile page'
      IH.Dispatcher.App.dispatch({type: "Freeze", payload: {message: message}})
      this.submitTime = new Date()

      IH.Coll.EmployeesTest.update({_id: this.props.id}, updateObj, (err, result) => {
        this.timeoutDuration -= (new Date() - this.submitTime) //have the same timeout each time to make the page transition more smooth
        Meteor.setTimeout( () => {
          IH.Dispatcher.App.dispatch({type: "Unfreeze"})
          FlowRouter.go(redirectUrl)
        }, this.timeoutDuration)
      })
    }
    else {
      FlowRouter.go(redirectUrl)
    }
  }

  _cancel(e) {
    e.preventDefault()
    let redirectUrl = '/user/profile/' + this.props.id
    let employee = this._getEmployee()
    let redirect = function() {
      FlowRouter.go(redirectUrl)
    }
    if(!_.isEqual(employee, this.data.employee)) {
      IH.Dispatcher.App.dispatch({
        type: "Confirm",
        payload: {
          message: 'Are you sure you want to cancel the editing?',
          callback: redirect.bind(this)
        }
      })
    }
    else {
      redirect()
    }

  }

  _handleGroupChange(label, e, val) {
    if(typeof val === 'boolean') {
      let groupList = _.clone(this.state.groupList || this.data.employee.groups)
      if(val) {
        groupList.push(label)
      }
      else {
        groupList.splice(groupList.indexOf(label), 1)
      }
      this.setState({groupList: groupList})
    }
  }

  _renderGroups() {
    let user = this.data.employee
    let labels = Meteor.settings.public.groupNames
    let checkboxList = labels.map( (label, index) => {
      let checked = user.groups.indexOf(label) !== -1
      return {
        label: label,
        ref: label,
        checked: checked,
        onClick: this._handleGroupChange.bind(this, label)
      }
    })
    let leftList = _.clone(checkboxList).splice(0, Math.ceil(checkboxList.length / 2))
    let rightList = _.clone(checkboxList).splice(Math.ceil(checkboxList.length / 2))
    return <RC.CheckboxGroup key={Meteor.uuid()} options={[leftList, rightList]} label="Groups" labelColor="brand1" theme="smaller" />
  }

  render() {
    let style = {
      padding: '2em',
      marginBottom: '2em'
    }

    if(this.data.isReady) {
      let user = this.data.employee
      return (
        <RC.Form onSubmit={this._submit.bind(this)} ref="form" style={style}>

          <RC.Input name="name" value={user.name} label="Name" /> <br/>

          <RC.Input name="email" value={user.email} label="Email" /> <br/>

          <RC.Input name="age" value={user.age} label="Age" /> <br/>

          <RC.Input name="height" value={user.height} label="Height" /> <br/>

          <RC.Input name="weight" value={user.weight} label="Weight" /> <br/>

          <RC.Input name="bmi" value={user.bmi} label="BMI" /> <br/>

          <RC.Select name="dailyActivity" options={["Sedentary", "Modest", "Active"]} label="Daily Activity" value={user.dailyActivity} /> <br/>

          {this._renderGroups()} <br/><br/><br/><br/><br/>

          <RC.Button type="submit" theme="inline" bgColor="brand1">Submit</RC.Button>
          <RC.Button type="button" theme="inline" onClick={this._cancel.bind(this)}>Cancel</RC.Button>
        </RC.Form>
      )
    }
    else {
      return <div/>
    }
  }
}

IH.RC.EmployeeEdit.displayName = "IH.RC.EmployeeEdit"

IH.RC.EmployeeEdit.propTypes = Object.assign({}, IH.RC.EmployeeEdit.propTypes, {
  id: React.PropTypes.string
})

