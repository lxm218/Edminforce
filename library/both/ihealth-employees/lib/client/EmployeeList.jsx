
IH.RC.EmployeeList = class extends RC.CSSMeteorData {
  constructor(p) {
    super(p)
    this.itemsPerPage = 10
    this.genderArr = ['Both', 'Male', 'Female']
    this.ageArr = ['All', '20-30 years old', '30-40 years old', '40-50 years old', '50-60 years old', '60+ years old']
    this.activityArr = ['All', 'Sedentary', 'Active', 'Modest']
    this.conditionArr = _.clone(Meteor.settings.public.groupNames)
    this.conditionArr.unshift('All')
    this.state = {
      genderArr: this.genderArr,
      ageArr: this.ageArr,
      activityArr: this.activityArr,
      conditionArr: this.conditionArr,
      sortParams: {username: 1},
      lastSearchTime: new Date(),
      search: '',
      currentPage: 1,
      showBackdrop:false,
      windowWidth: window.innerWidth,
      showTemplates: false,
      templateId: ""
    }
    this.setWindowWidth = () => {
      this.setState({windowWidth: window.innerWidth})
    }
    this.criticalWidthArr = [1300, 1070, 760, 600]
    this.today = new Date()
    this.testUsers = ['jason', 'qdmark1']
  }

  getMeteorData() {
    let employeeQuery = this._getEmployeeQuery()
    let employeesSubs = Meteor.subscribe('employeesTest', employeeQuery, this.state.sortParams, this.itemsPerPage, this.state.currentPage)
    let employees = Meteor.users.find(employeeQuery, {sort: this.state.sortParams}).fetch()
    let totalPages = Counts.get('employeesTestCount') / this.itemsPerPage
    commConn.subscribe("emailTemplates", Meteor.absoluteUrl())

    //for testing only
    employees.map( (employee) => {
      let profileEmpty = {name: '', groups: [''], dob: '', gender: '', dailyActivity: ''}
      employee.profile = Object.assign(profileEmpty, employee.profile)
      return employee
    })

    return {
      isReady: employeesSubs.ready(),
      employees: employees,
      totalPages: totalPages,
      conditionArr: this._getConditionArr(),
      templates: EmailTemplates.find().fetch()
    }
  }

  componentDidMount() {
    super.componentDidMount && super.componentDidMount()
    window.addEventListener('resize', this.setWindowWidth)
  }

  componentWillUnmount() {
    super.componentWillUnmount && super.componentWillUnmount()
    window.removeEventListener('resize', this.setWindowWidth)
  }

  _getConditionArr() {
    let conditionArr = _.clone(Meteor.settings.public.groupNames)
    conditionArr.unshift('All')
    return conditionArr
  }

  _getEmployeeQuery() {
    let ageQuery = this._getAgeQuery()
    let genderQuery = this._getGenderQuery()
    let query = {
      '$or': [
        {'username': {'$in': this.testUsers}}, 
        {
          'profile.roleTest': 'employee',
          '$and': [
            ageQuery,
              {"$or": [{
                'profile.name': {
                  $regex: this.state.search,
                  '$options' : 'i'
                }
              }, {
                'emails.address': {
                  $regex: this.state.search,
                  '$options' : 'i'
                }
              }]}
          ],
          'profile.groups': {
            $in: this.state.conditionArr || this._getConditionArr()
          },
          'profile.dailyActivity': {
            $in: this.state.activityArr
          }
        }
      ]
    }
    Object.assign(query, genderQuery)
    return query
  }

  _getGenderQuery() {
    let genderArr = _.unique(this.state.genderArr)
    let genderQuery = {}
    if(genderArr.length === 0) {
      genderQuery = {'profile.gender': null}
    }
    else if(genderArr.length === 1) {
      genderQuery = {'profile.gender': genderArr[0]}
    }
    return genderQuery
  }

  _getAgeQuery() {
    let ageQuery = {}
    let ageArr = _.unique(this.state.ageArr)
    if(ageArr.indexOf('All') === -1) {
      ageArr = ageArr.map( (ageStr) => {
        let ageRange = ageStr.split(' ')[0].split('-')
        if(ageRange.length === 2) {
          return {
            '$and': [
              {'profile.dob': {'$lte': this._calculateDate(parseInt(ageRange[0]))}},
              {'profile.dob': {'$gte': this._calculateDate(parseInt(ageRange[1]))}}
            ]
          }
        }
        else {
          return { 'profile.dob': {'$lte': this._calculateDate(parseInt(ageRange[0]))} }
        }
      })
      if(ageArr.length > 1) {
        ageQuery = {'$or': ageArr}
      }
      else if(ageArr.length === 1) {
        ageQuery = ageArr[0]
      }
      else {
        ageQuery = { 'profile.dob': {'$lte': -1} }
      }
    }
    return ageQuery
  }

  _calculateAge(dob) {
    return Math.floor((this.today - dob) / 31556952000)
  }

  _calculateDate(age) {
    return new Date(this.today - age * 31556952000)
  }

  _search() {
    Meteor.defer( () => {
      //use defer to get the most recent value from the input
      let value = this.refs.search.getValue()
      value = value.length > 2 ? value : ''
      if(value !== this.state.search) {
        //have a 1 second interval between each mongo query on the search
        let currentTime = new Date()
        let timeDifference = currentTime - this.state.lastSearchTime
        if(timeDifference > 1000) {
          let state = {
            lastSearchTime: currentTime,
            search: value
          }
          this.setState(state)
        }
        else {
          Meteor.setTimeout( () => {
            this._search()
          }, timeDifference)
        }
      }
    })
  }

  _handleTableHeadClick(field) {
    let sort = this.state.sortParams[field]
    let sortParams = {}
    sortParams[field] = sort ? (-1 * sort) : 1
    if(field === 'profile.dob') {
      sortParams[field] = sort ? (-1 * sort) : -1
    }
    this.setState({sortParams: sortParams, currentPage: 1})
  }

  _getTableHead() {
    let widthArr = ['10%', '15%', '33%', '18%', '6%', '8%', '10%']
    let tableHead = [{
      text: 'Username',
      onClick: this._handleTableHeadClick.bind(this, "username")
    }, {
      text: 'Name',
      onClick: this._handleTableHeadClick.bind(this, "profile.name")
    }, {
      text: 'Conditions',
      onClick: this._handleTableHeadClick.bind(this, "profile.groups")
    }, {
      text: 'Email',
      onClick: this._handleTableHeadClick.bind(this, "emails")
    }, {
      text: 'Age',
      onClick: this._handleTableHeadClick.bind(this, "profile.dob")
    }, {
      text: 'Gender',
      onClick: this._handleTableHeadClick.bind(this, "profile.gender")
    }, {
      text: 'Daily Activity',
      onClick: this._handleTableHeadClick.bind(this, "profile.dailyActivity")
    }]
    tableHead.forEach( (item, index) => {
      Object.assign(item, {sort: true, width: widthArr[index]})
    })
    return tableHead
  }

  _renderTextFilter() {
    let labelStyle = {
      fontSize: '1.2em'
    }
    return <div>
      <RC.Input label="Search" placeholder="type the name or email here ..." theme="smaller" labelColor="brand1" ref="search" onChange={this._search.bind(this)} labelStyle={labelStyle} />
    </div>
  }

  _editEmployee(_id) {
    FlowRouter.go('/user/profile/' + _id)
  }

  _renderTable() {
    let tableData = this.data.employees.map((employee, index) => {
      let profile = employee.profile
      return {
        'username': employee.username,
        'profile.name': profile.name,
        'profile.groups': profile.groups.join(', '),
        'emails': employee.emails[0].address,
        'profile.dob': this._calculateAge(profile.dob),
        'profile.gender': profile.gender,
        'profile.dailyActivity': profile.dailyActivity,
        rowProps: {
          onClick: this._editEmployee.bind(this, employee._id)
        }
      }
    })

    let sortParams = _.clone(this.state.sortParams)
    let name = 'username'
    let sort = 'desc'
    if(Object.keys(sortParams).length > 0) {
      name = Object.keys(sortParams)[0]
      sort = sortParams[name] === -1 ? 'desc' : 'asc'
      if(name === 'profile.dob') {
        sort = sortParams[name] === 1 ? 'desc' : 'asc'
      }
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

  _renderTop() {
    let widthArr = ['50%', '25%', '25%']
    let itemTheme = "paddingPx-l"
    if(this.state.windowWidth < this.criticalWidthArr[1]) {
      widthArr = ['100%', '100%', '100%']
      itemTheme = ''
    }
    let itemStyle = {
      marginTop: '1.2em'
    }

    return (
      <div>
        <RC.Grid theme={["paddingPx"]}>
          <RC.GridItem width={widthArr[0]} style={itemStyle}>
            {this._renderTextFilter()}
          </RC.GridItem>
          <RC.GridItem theme={itemTheme} width={widthArr[1]}>
            {this._renderGroupMessage()}
          </RC.GridItem>
          <RC.GridItem theme={itemTheme} width={widthArr[2]}>
            {this._renderExport()}
          </RC.GridItem>
        </RC.Grid>
      </div>
    )
  }

  _renderFilterGender() {
    return this._renderFilterCommon('genderArr', 'Gender')
  }

  _renderFilterAge() {
    return this._renderFilterCommon('ageArr', 'Age Range')
  }

  _renderFilterActivity() {
    return this._renderFilterCommon('activityArr', 'Activity Level')
  }

  _renderFilterCondition() {
    return this._renderFilterCommon('conditionArr', 'Conditions')
  }

  _renderFilterCommon(arrName, text) {
    let originalArr = _.clone(this[arrName] || this.data[arrName])
    let currentArr = _.clone(this.state[arrName])
    let checkboxList = originalArr.map( (value, n) => {
      let index = currentArr && currentArr.indexOf(value)
      return {
        label: value,
        ref: value,
        checked: index !== -1,
        onClick: this._handleFilterClick.bind(this, arrName, value, index)
      }
    })
    let options = [checkboxList]
    if(checkboxList.length > 6) {
      let leftList = _.clone(checkboxList).splice(0, Math.ceil(checkboxList.length / 2))
      let rightList = _.clone(checkboxList).splice(Math.ceil(checkboxList.length / 2))
      options = [leftList, rightList]
    }

    return (
      <div>
        <span>{text}:</span><br/><br/>
        <RC.CheckboxGroup key={Meteor.uuid()} options={options} labelColor="brand1" theme="smaller" />
      </div>
    )
  }

  _handleFilterClick(arrName, value, index) {
    let originalArr = _.clone(this[arrName] || this.data[arrName])
    let currentArr = _.clone(this.state[arrName])
    if(index === -1) {
      if(value === 'All' || value === 'Both') {
        currentArr = originalArr
      }
      else {
        currentArr.push(value)
        if(originalArr.length === currentArr.length + 1) {
          if(currentArr.length === 2) {
            currentArr.push('Both')
          }
          else {
            currentArr.push('All')
          }
        }
      }
    }
    else {
      if(value === 'All' || value === 'Both') {
        currentArr = []
      }
      else {
        currentArr.splice(index, 1)
        if(currentArr.indexOf('All') !== -1) {
          currentArr.splice(currentArr.indexOf('All'), 1)
        }
        if(currentArr.indexOf('Both') !== -1) {
          currentArr.splice(currentArr.indexOf('Both'), 1)
        }
      }
    }
    let stateObj = {}
    stateObj[arrName] = currentArr
    this.setState(stateObj)
  }

  _renderFilters() {
    let windowWidth = this.state.windowWidth
    var widthArr
    if(windowWidth > this.criticalWidthArr[0]) {
      widthArr = ['15%', '20%', '20%', '45%']
    }
    else if(windowWidth > this.criticalWidthArr[1]) {
      widthArr = ['10%', '18%', '15%', '45%']
    }
    else if(windowWidth > this.criticalWidthArr[2]) {
      widthArr = ['33.3%', '33.3%', '33.3%', '100%']
    }
    else if(windowWidth > this.criticalWidthArr[3]) {
      widthArr = ['50%', '50%', '100%', '100%']
    }
    else {
      widthArr = ['100%', '100%', '100%', '100%']
    }
    let itemStyle = {
      marginBottom: '1em'
    }

    return (
      <RC.Grid titleBgColor="brand2" bgColor="white" theme={["paddingPx"]}>
        <RC.GridItem theme="paddingPx-r" width={widthArr[0]} style={itemStyle}>
          {this._renderFilterGender()}
        </RC.GridItem><br/>
        <RC.GridItem theme="paddingPx-r" width={widthArr[1]} style={itemStyle}>
          {this._renderFilterAge()}
        </RC.GridItem><br/>
        <RC.GridItem theme="paddingPx-r" width={widthArr[2]} style={itemStyle}>
          {this._renderFilterActivity()}<br/>
        </RC.GridItem><br/>
         <RC.GridItem theme="paddingPx-r" width={widthArr[4]} style={itemStyle}>
          {this._renderFilterCondition()}
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
    return <RC.Button onClick={this.showBackdrop.bind(this)} bgColor="brand2" bgColorHover="dark" >Send Group Message</RC.Button>
  }

  _renderExport() {
    return <RC.Button bgColor="brand1" bgColorHover="dark" >Export</RC.Button>
  }

  submitForm(e) {
    e.preventDefault();
    const formData = this.refs.form.getFormData();
    const query = this._getEmployeeQuery();
    const save = this.refs.save_template.checked;
    Meteor.call("sendMassEmail", formData, query, save);
    this.setState({
      showBackdrop:false
    });
  }

  showTemplates(e){
    e.preventDefault();
    this.setState({
      showTemplates:!this.state.showTemplates,
      showBackdrop:true
    })
  }

  addBorder(id) {
    this.setState({
      templateId:id
    })
  }

  _renderEmails(){
    const style={
      color:"black"
    }
    let emailStyle = {}
    const emails = this.data.templates;
    return emails.map((email) =>{
      if(this.state.templateId === email._id) {
        emailStyle[email._id] ={
          'border' : '2px solid #0082ec'
        };
      } else {
        emailStyle[email._id] = {}
      }
      return (
        <RC.Div onClick={this.addBorder.bind(this, email._id)} style={emailStyle[email._id]} key={email._id}>
          <h2 style={style}>Subject: {email.subject}</h2>
          <p style={style}>Message: {email.text}</p>
        </RC.Div>
      )
    })
  }

  sendEmailFromTemplate(){
    const template = EmailTemplates.findOne({_id:this.state.templateId});
    const query = this._getEmployeeQuery();
    const email = {
      subject: template.subject,
      message: template.text
    }
    Meteor.call("sendMassEmail", email, query, false);
    this.setState({
      showBackdrop:false
    });
  }

  render() {
    const showBackdrop = this.state.showBackdrop;
    const employeeCount = Counts.get('employeesTestCount');
    const style = {
      'backgroundColor': 'white',
      'width': '50em',
      'padding': '1em',
    }
    const showTemplates = this.state.showTemplates;
    return (
      <div>
        {showBackdrop
          ?
          <RC.BackDropArea bgColor="backdrop"  onClick={this.hideBackdrop.bind(this)}>
            <RC.Div style={style}>
              <h1>{`Send Message to ${employeeCount} Employees`}</h1>
              {showTemplates
                ?
                <div >
                {this._renderEmails()}
                <RC.Button theme="inline" onClick={this.sendEmailFromTemplate.bind(this)} bgColor="brand1"> Send Email</RC.Button>
                <RC.Button theme="inline" onClick={this.showTemplates.bind(this)}> Custom Email</RC.Button>
                </div>

                :
                <RC.Form  onSubmit={this.submitForm.bind(this)} ref="form" ref="form">
                  <RC.Input theme="stackedLabel" name="subject" value="" label="Subject" />
                  <RC.Textarea theme="stackedLabel" rows="8" cols="92" name="message" label="Message"></RC.Textarea>
                  <RC.Button theme="inline" bgColor={this.props.platform=="mobile" ? "brand2" : "brand1"}>Submit</RC.Button>
                  <RC.Button theme="inline" type="reset">Reset</RC.Button>
                  <input type="checkbox" ref="save_template"/><span style={{marginRight:1 +"em"}}> Save template</span>
                  <RC.Button theme="inline" onClick={this.showTemplates.bind(this)}> Show Templates</RC.Button>
                </RC.Form>
              }
            </RC.Div>
          </RC.BackDropArea>
          :
          null
        }
        {this._renderTop()}
        {this._renderFilters()}
        {this._renderTable()}
        {this._renderPagination()}
      </div>
    )
  }
}

IH.RC.EmployeeList.displayName = "IH.RC.EmployeeList"
