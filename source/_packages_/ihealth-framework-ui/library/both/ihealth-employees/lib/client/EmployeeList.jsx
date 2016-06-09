/*************************************************************************
 * Copyright iHealth Lab, 2015
 *
 *************************************************************************
 *
 * @description
 * This component will display a list of the employees in the database
 *
 * @author
 * Mark Xie
 *
 *************************************************************************/

IH.RC.EmployeeList = class extends RC.CSSMeteorData {
  constructor(p) {
    super(p)
    this.itemsPerPage = 10
    this.state = {
      groupList: null,
      sortParams: {name: 1},
      lastSearchTime: new Date(),
      searchName: '',
      searchEmail: '',
      currentPage: 1,
      showBackdrop:false
    }
  }

  getMeteorData() {
    let employeeQuery = this._getEmployeeQuery()
    let employeesSubs = Meteor.subscribe('employeesTest', employeeQuery, this.state.sortParams, this.itemsPerPage, this.state.currentPage)
    let employees = IH.Coll.EmployeesTest.find({}, {sort: this.state.sortParams}).fetch()
    let totalPages = Counts.get('employeesTestCount') / this.itemsPerPage

    let groupList = _.clone(Meteor.settings.public.groupNames)
    groupList.unshift('Everyone')

    return {
      isReady: employeesSubs.ready(),
      employees: employees,
      totalPages: totalPages,
      groupList: groupList
    }
  }

  _getEmployeeQuery() {
    return {
      groups: {
        $in: this.state.groupList || this.data.groupList
      },
      name: {
        $regex: this.state.searchName,
        '$options' : 'i'
      },
      email: {
        $regex: this.state.searchEmail,
        '$options' : 'i'
      }
    }
  }

  _search(ref) {
    //ref is one of ['searchName', 'searchEmail']
    Meteor.defer( () => {
      //use defer to get the most recent value from the input
      let value = this.refs[ref].getValue()
      value = value.length > 2 ? value : ''
      if(value !== this.state[ref]) {
        //have a 1 second interval between each mongo query on the search
        let currentTime = new Date()
        let timeDifference = currentTime - this.state.lastSearchTime
        if(timeDifference > 1000) {
          let state = {
            lastSearchTime: currentTime
          }
          state[ref] = value
          this.setState(state)
        }
        else {
          Meteor.setTimeout( () => {
            this._search(ref)
          }, timeDifference)
        }
      }
    })
  }

  _handleTableHeadClick(field) {
    let sort = this.state.sortParams[field]
    let sortParams = {}
    sortParams[field] = sort ? (-1 * sort) : 1
    this.setState({sortParams: sortParams, currentPage: 1})
  }

  _getTableHead() {
    let tableHead = [{
      text: 'Name',
      onClick: this._handleTableHeadClick.bind(this, "name")
    }, {
      text: 'Email',
      onClick: this._handleTableHeadClick.bind(this, "email")
    }, {
      text: 'Age',
      onClick: this._handleTableHeadClick.bind(this, "age")
    },{
      text: 'Groups',
      onClick: this._handleTableHeadClick.bind(this, "groups")
    },{
      text: 'Height',
      onClick: this._handleTableHeadClick.bind(this, "height")
    }, {
      text: 'Weight',
      onClick: this._handleTableHeadClick.bind(this, "weight")
    }, {
      text: 'BMI',
      onClick: this._handleTableHeadClick.bind(this, "bmi")
    }, {
      text: 'Daily Activity',
      onClick: this._handleTableHeadClick.bind(this, "dailyActivity")
    }]
    tableHead = tableHead.map((item) => {
      return _.extend({sort: true}, item)
    })
    return tableHead
  }

  _handleGroupFilterChange(label, e, val) {
    if(typeof val === 'boolean') {
      //use _.clone so that shouldComponentUpdate can be triggered correctly
      let groupList = _.clone(this.state.groupList || this.data.groupList)
      if(val) {
        if(label === 'Everyone') {
          groupList = this.data.groupList
        }
        else {
          groupList.push(label)
          if(this.data.groupList.length === groupList.length + 1) {
            groupList.unshift('Everyone')
          }
        }
      }
      else {
        if(label === 'Everyone') {
          groupList = []
        }
        else {
          groupList.splice(groupList.indexOf(label), 1)
          if(groupList.indexOf('Everyone') !== -1) {
            groupList.splice(groupList.indexOf('Everyone'), 1)
          }
        }
      }
      this.setState({groupList: groupList})
    }
  }

 _renderGroupFilter() {
    let labels = this.data.groupList
    let checkboxList = labels.map( (label, index) => {
      let checked = !this.state.groupList || this.state.groupList.indexOf(label) !== -1
      return {
        label: label,
        ref: label,
        checked: checked,
        onClick: this._handleGroupFilterChange.bind(this, label)
      }
    })
    let leftList = _.clone(checkboxList).splice(0, Math.ceil(checkboxList.length / 2))
    let rightList = _.clone(checkboxList).splice(Math.ceil(checkboxList.length / 2))
    return <RC.CheckboxGroup key={Meteor.uuid()} options={[leftList, rightList]} label="Groups" labelColor="brand1" theme="smaller" />
  }

  _renderTextFilter() {
    return <div>
      <RC.Input label="Search by name" placeholder="type the name here ..." theme="smaller" labelColor="brand1" ref="searchName" onChange={this._search.bind(this, 'searchName')} />
      <RC.Input label="Search by email" placeholder="type the email address here ..." theme="smaller" labelColor="brand1" ref="searchEmail" onChange={this._search.bind(this, 'searchEmail')} />
    </div>
  }

  _editEmployee(_id) {
    FlowRouter.go('/user/profile/' + _id)
  }

  _renderTable() {
    let tableData = this.data.employees.map((employee, index) => {
      return {
        name: employee.name,
        email: employee.email,
        age: employee.age,
        groups: employee.groups.join(', '),
        height: employee.height,
        weight: employee.weight,
        bmi: employee.bmi,
        dailyActivity: employee.dailyActivity,
        rowProps: {
          onClick: this._editEmployee.bind(this, employee._id)
        }
      }
    })

    let sortParams = this.state.sortParams
    let name = 'name'
    let sort = 'desc'
    if(Object.keys(sortParams).length > 0) {
      name = Object.keys(sortParams)[0]
      sort = sortParams[name] === -1 ? 'desc' : 'asc'
    }

    const table = {
      headerBgColor: "gray",
      data: tableData,
      header: this._getTableHead(),
      sortBy: { name: name, sort: sort },
      isReady: this.data.isReady
    }

    return <RC.TableAuto {... table} />
  }

  _renderPagination() {
    const pagination = {
      total: this.data.totalPages,
      cur: this.state.currentPage,
      onChange: (val) => {
        this.setState({currentPage: parseInt(val)})
      }
    }
    return <RC.Pagination {... pagination} />
  }

  _renderFilter() {
    return (
      <RC.Grid title="Search" titleBgColor="brand2" bgColor="white" theme={["paddingPx"]}>
        <RC.GridItem theme="paddingPx-r" width="33.3333%">
          {this._renderTextFilter()}
        </RC.GridItem>
        <RC.GridItem theme="paddingPx-l" width="66.6666%">
          {this._renderGroupFilter()}
        </RC.GridItem>
      </RC.Grid>
    )
  }


  showBackdrop(){
    this.setState({
      showBackdrop:true
    });
  }

  hideBackdrop() {
    this.setState({
      showBackdrop:false
    })
  }

  _renderGroupMessage() {
    return (
      <div>
        <p>{Counts.get('employeesTestCount')} Employees</p>
        <RC.Button onClick={this.showBackdrop.bind(this)} bgColor="brand1" bgColorHover="dark">Send Group Message</RC.Button>
      </div>
    )
  }

  submitForm(e) {
    e.preventDefault();
    const formData = this.refs.form.getFormData();
    const query = this._getEmployeeQuery();
    Meteor.call("sendMassEmail", formData, query)
  }

  render() {
    const showBackdrop = this.state.showBackdrop;
    const employeeCount = Counts.get('employeesTestCount');
    const style = {
      'backgroundColor': 'white',
      'width': '50em',
      'padding': '1em',
    }
    return (
      <div>
        {showBackdrop
          ?
          <RC.BackDropArea bgColor="backdrop"  onClick={this.hideBackdrop.bind(this)}>
            <RC.Div style={style}>
              <h1>{"Send Message to " + employeeCount + " Employees"}</h1>
              <RC.Form  onSubmit={this.submitForm.bind(this)} ref="form" ref="form">
                <RC.Input theme="stackedLabel" name="subject" value="" label="Subject" />
                <RC.Textarea theme="stackedLabel" rows="8" cols="92" name="message" label="Message">
                </RC.Textarea>

                <RC.Button theme="inline" bgColor={this.props.platform=="mobile" ? "brand2" : "brand1"}>Submit</RC.Button>
                <RC.Button theme="inline" type="reset">Reset</RC.Button>
              </RC.Form>
            </RC.Div>
          </RC.BackDropArea>
          :
          null
        }
        {this._renderFilter()}
        {this._renderGroupMessage()}
        {this._renderTable()}
        {this._renderPagination()}
      </div>
    )
  }
}

IH.RC.EmployeeList.displayName = "IH.RC.EmployeeList"
