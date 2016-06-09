
IH.RC.EmployeeProfile = class extends RC.CSSMeteorData {
  constructor(p) {
    super(p)
    this.state = {
      tab: 0
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

  _setTab(tab) {
    this.setState({tab: tab})
  }

  _edit() {
    FlowRouter.go('/user/edit/' + this.props.id)
  }

  _previous() {
    FlowRouter.go('/user/list')
  }

  sendMessage() {
    const employee = this.data.employee;
    FlowRouter.go('/correspondence?email=' + employee.email);
  }

  render() {
    let style = {
      padding: '2em',
      marginBottom: '2em'
    }
  }
  
  _renderCard() {
    let buttonStyle = {
      width: '8em'
    }
    let itemStyle = {
      fontSize: '1em'
    }
    let user = this.data.employee

    return (
      <RC.Grid titleBgColor="brand2" bgColor="white" theme={["paddingPx"]}>
        <RC.GridItem theme="paddingPx-r" width="40%">
          <RC.Item areaInnerStyle={itemStyle}>Name: {user.name}</RC.Item>
          <RC.Item areaInnerStyle={itemStyle}>Title: Product Manager</RC.Item>
          <RC.Item areaInnerStyle={itemStyle}>Department: Solutions</RC.Item>
          <RC.Item areaInnerStyle={itemStyle}>Company: iHealth Labs</RC.Item>
        </RC.GridItem>
        <RC.GridItem theme="paddingPx-r" width="40%">
          <RC.Item areaInnerStyle={itemStyle}>Address: 719 N Shoreline Blvd,  MountainView, CA</RC.Item>
          <RC.Item areaInnerStyle={itemStyle}>Phone Number: 650-555-1234</RC.Item>
          <RC.Item areaInnerStyle={itemStyle}>Email: {user.email}</RC.Item>
          <RC.Item areaInnerStyle={itemStyle}>Unique ID: 1234567</RC.Item>
        </RC.GridItem>
        <RC.GridItem theme="paddingPx-r" width="20%" style={{textAlign: 'center'}}>
          <br/><br/>
          <RC.Button type="submit" theme="inline" bgColor="brand1" style={buttonStyle} onClick={this.sendMessage.bind(this) }>Message</RC.Button> <br/>
          <RC.Button type="button" theme="inline" bgColor="brand1" style={buttonStyle} onClick={this._edit.bind(this)}>Edit</RC.Button>
        </RC.GridItem>
      </RC.Grid>
    )
  }

  _renderInformation() {
    let user = this.data.employee
    let listStyle = {
      display: '-webkit-flex',
      display: '-ms-flexbox',
      display: 'flex',
      WebkitFlexWrap: 'wrap',
      MsFlexWrap: 'wrap',
      FlexWrap: 'wrap',
      width: '100%'
    }
    let listItemStyle = {
      display: '-webkit-flex',
      display: '-ms-flexbox',
      display: 'flex',
      width: '45%',
      borderStyle: 'groove',
      padding: '2em',
      margin: '1em'
    }
    let itemtyle = {
      width: '100%'
    }
    let rightStyle = {
      float: 'right',
      display: 'inline-block'
    }
    let leftStyle = {
      display: 'inline-block'
    }
    let bigFontStyle = {
      fontSize: '1.5em'
    }
    Object.assign(bigFontStyle, rightStyle)
    
    return (
      <div>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            <div style={itemtyle}>
              <div style={leftStyle}>Gender:</div><div style={rightStyle}>Female</div><br/>
              <div style={leftStyle}>Date of birth:</div><div style={rightStyle}>01/01/1980</div><br/>
              <div style={leftStyle}>Age:</div><div style={rightStyle}>{user.age}</div><br/>
              <div style={leftStyle}>Height:</div><div style={rightStyle}>{user.height}</div><br/>
              <div style={leftStyle}>Weight:</div><div style={rightStyle}>{user.weight}</div><br/>
              <div style={leftStyle}>BMI:</div><div style={rightStyle}>{user.bmi}</div><br/>
              <div style={leftStyle}>Daily Activity:</div><div style={rightStyle}>{user.dailyActivity}</div><br/>
              <div style={leftStyle}>Conditions:</div><div style={rightStyle}>{user.groups.join(',  ')}</div>
            </div>
          </li>
          <li style={listItemStyle}>
            <div style={itemtyle}>
              <div style={leftStyle}>Points:</div><div style={bigFontStyle}>2000</div><br/>
              <div style={leftStyle}>Campaigns:</div><br/>
              <div style={leftStyle}>&nbsp;&nbsp;&nbsp;&nbsp;Active:</div><div style={bigFontStyle}>3</div><br/><br/>
              <div style={leftStyle}>&nbsp;&nbsp;&nbsp;&nbsp;Complete:</div><div style={bigFontStyle}>6</div><br/>
              <div style={leftStyle}>Rewards: </div><br/><br/>
              <div style={leftStyle}>&nbsp;&nbsp;&nbsp;&nbsp;Pending:</div><div style={bigFontStyle}>2</div>
            </div>
          </li>
        </ul>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            <div style={itemtyle}>
              <div style={leftStyle}>Baseline:</div><div style={rightStyle}>110/80 mmHg</div><br/>
              <div style={leftStyle}>Blood glucose:</div><br/>
              <div style={leftStyle}>&nbsp;&nbsp;&nbsp;&nbsp;Before meal:</div><div style={rightStyle}>100 mg/dL</div><br/>
              <div style={leftStyle}>&nbsp;&nbsp;&nbsp;&nbsp;After meal:</div><div style={rightStyle}>160 mg/dL</div><br/>
              <div style={leftStyle}>Weight goal:</div><div style={rightStyle}>180 lbs</div><br/>
              <div style={leftStyle}>Activity Tracker:</div><div style={rightStyle}>10, 000 / day</div>
            </div>
          </li>
          <li style={listItemStyle}>
            <div style={itemtyle}>
              <div style={leftStyle}>Notes:</div>
            </div>
          </li>
        </ul>
      </div>
    )
  }

  _renderTrends() {
    return 'Trends'
  }

  _renderCampaigns() {
    return <IH.RC.EmployeeCampaignList employee={this.data.employee} />
  }

  _renderTabContent() {
    let tab = this.state.tab
    var content
    if(tab === 0) {
      return this._renderInformation()
    }
    else if(tab === 1) {
      return this._renderTrends()
    }
    else {
      return this._renderCampaigns()
    }
  }

  _renderTabs() {
    let style = {
      position: "relative"
     }
    return (
      <RC.Div style={style} theme="padding" autoFix={false} bgColor="white">
        <RC.TabsFolder bgColor="white" initialTab={0}>
          <RC.URL onClick={this._setTab.bind(this, 0)}>Information</RC.URL>
          <RC.URL onClick={this._setTab.bind(this, 1)}>Trends</RC.URL>
          <RC.URL onClick={this._setTab.bind(this, 2)}>Campaigns</RC.URL>
        </RC.TabsFolder>
        {this._renderTabContent()} <br/>
      </RC.Div>
    )
  }

  render() {
    let buttonStyle = {
      width: '8em'
    }
    if(this.data.isReady) {
      return (
        <div>          
          {this._renderCard()} <br/><br/><br/>
          {this._renderTabs()} <br/>
          <RC.Button type="submit" theme="inline" bgColor="brand1" style={buttonStyle} onClick={this._previous.bind(this)}>Back</RC.Button> <br/>
        </div>
      )
    }
    else {
      return <div/>
    }
  }
}

IH.RC.EmployeeProfile.displayName = "IH.RC.EmployeeProfile"

IH.RC.EmployeeProfile.propTypes = Object.assign({}, IH.RC.EmployeeProfile.propTypes, {
  id: React.PropTypes.string
})
