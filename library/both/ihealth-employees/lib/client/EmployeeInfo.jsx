
IH.RC.EmployeeInfo = class extends RC.CSS {
  constructor(p) {
    super(p)
    this.criticalWidth = 1180
    this.today = new Date()
  }

  _calculateAge(dob) {
    return Math.floor((this.today - dob) / 31556952000)
  }

  _renderGroups() {
    let profile = this.props.employee.profile
    let groups = profile.groups.map( (group, n) => {
      return <div key={n}>{group}<br/></div>
    })
    return groups
  }

  render() {
    let user = this.props.employee
    let profile = user.profile

    let itemWidth = '46%'
    if(this.props.windowWidth < this.criticalWidth) {
      itemWidth = '100%'
    }
    let listStyle = {
      display: '-webkit-flex',
      display: '-ms-flexbox',
      display: 'flex',
      WebkitFlexWrap: 'wrap',
      MsFlexWrap: 'wrap',
      FlexWrap: 'wrap',
      justifyContent: 'space-between',
      width: '100%'
    }
    let cardStyle = {
      display: '-webkit-flex',
      display: '-ms-flexbox',
      display: 'flex',
      padding: '2em',
      margin: '1em',
      backgroundColor: 'white',
      boxShadow: '0.05em 0.1em 0.1em #888888',
      color: '#696969'
    }
    let listItemStyle = {
      width: itemWidth
    }
    Object.assign(listItemStyle, cardStyle)
    let itemtyle = {
      width: '100%',
      color: 'rgba(1,1,1,0.7)'
    }
    let rightStyle = {
      float: 'right',
      display: 'inline-block'
    }
    let leftStyle = {
      display: 'inline-block'
    }
    let bigFontStyle = {
      fontSize: '1.2em'
    }
    Object.assign(bigFontStyle, rightStyle)
    let brand1 = "#0082ec"
    let brand2 = "#ff7928"
    let brand3 = "#36d317"
    
    return (
      <div>
        <div style={listStyle}>
          <div style={listItemStyle}>
            <div style={itemtyle}>
              <RC.Input theme="right" value={profile.gender} label="Gender" labelColor="brand1" disabled />
              <RC.Input theme="right" value={moment(profile.dob).format('MM/DD/YYYY')} label="Date of birth" labelColor="brand2" disabled />
              <RC.Input theme="right" value={this._calculateAge(profile.dob)} label="Age" labelColor={brand3} disabled />
              <RC.Input theme="right" value={profile.height} label="Height" labelColor="brand1" disabled />
              <RC.Input theme="right" value={profile.weight} label="Weight" labelColor="brand2" disabled />
              <RC.Input theme="right" value={profile.bmi} label="BMI" labelColor={brand3} disabled />
            </div>
          </div>
          <div style={listItemStyle}>
            <div style={itemtyle}>
              <RC.Input theme="right" value="2000" label="Points" labelColor="brand1" formStyle={bigFontStyle} disabled />
              <RC.Input theme="right" value="" label="Campaigns" labelColor="brand2" disabled />
              <RC.Div style={_.extend({color: brand3},leftStyle)}>&nbsp;&nbsp;&nbsp;&nbsp;Active:</RC.Div><div style={bigFontStyle}>3</div><br/><br/>
              <RC.Div style={_.extend({color: brand1},leftStyle)} labelColor="brand1">&nbsp;&nbsp;&nbsp;&nbsp;Complete:</RC.Div><div style={bigFontStyle}>3</div><br/><br/>
              <RC.Input theme="right" value="" label="Rewards" labelColor="brand2" disabled />
              <div style={_.extend({color: brand3},leftStyle)}>&nbsp;&nbsp;&nbsp;&nbsp;Pending:</div><div style={bigFontStyle}>2</div>
            </div>
          </div>
        </div>
        <div style={listStyle}>
          <div style={listItemStyle}>
            <div style={itemtyle}>
              <RC.Input theme="right" value="110/80 mmHg" label="Baseline" labelColor="brand1" disabled />
              <RC.Input theme="right" label="Blood glucose" labelColor="brand2" disabled />
              <div style={leftStyle}>&nbsp;&nbsp;&nbsp;&nbsp;Before meal:</div><div style={rightStyle}>100 mg/dL</div><br/>
              <div style={leftStyle}>&nbsp;&nbsp;&nbsp;&nbsp;After meal:</div><div style={rightStyle}>160 mg/dL</div><br/><br/>
              <RC.Input theme="right" value="180 lbs" label="Weight Goal" labelColor={brand3} disabled />
              <RC.Input theme="right" value="10, 000 / day" label="Activity Tracker" labelColor="brand1" disabled />
            </div>
          </div>
          <div style={listItemStyle}>
            <div style={itemtyle}>
              <RC.Input theme="right" value={profile.dailyActivity} label="Daily Activity" labelColor="brand1" disabled /><br/>
              <div style={_.extend({color: brand2},leftStyle)}>Conditions:</div><div style={rightStyle}>{this._renderGroups()}</div>
            </div>
          </div>
        </div>
        <div style={cardStyle}>Notes:</div>
      </div>
    )
  }
}

IH.RC.EmployeeInfo.displayName = "IH.RC.EmployeeInfo"

IH.RC.EmployeeInfo.propTypes = Object.assign({}, IH.RC.EmployeeInfo.propTypes, {
  employee: React.PropTypes.object,
  windowWidth: React.PropTypes.number
})
