
IH.RC.EmployeeProfile = class extends RC.CSSMeteorData {
  constructor(p) {
    super(p)
    this.state = {
      tab: 0,
      windowWidth: window.innerWidth,
      showBaseline: false,
      measurement: {device:0, units:'mmHg'}
    }
    this.setWindowWidth = () => {
      this.setState({windowWidth: window.innerWidth})
    }
    this.criticalWidth = 935
  }

  getMeteorData() {
    let _id = this.props.id
    let subs = Meteor.subscribe('employeeTest', _id)
    let employee = Meteor.users.findOne(_id)

    //for testing only
    if(employee) {
      let profileEmpty = {name: '', groups: [''], dob: '', gender: '', dailyActivity: ''}
      employee.profile = Object.assign(profileEmpty, employee.profile)
    }

    return {
      isReady: subs.ready(),
      employee: employee
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

  getButtonCSS(measurement) {
    return measurement === this.state.measurement.device ? "brand1" : null;
  }

  _setTab(tab) {
    this.setState({tab: tab})
  }

  _setBaseline(measurement){
    this.setState({measurement:measurement});
  }

  _showBaseline(){
    this.setState({showBaseline:!this.state.showBaseline});

  }

  _edit() {
    FlowRouter.go('/user/edit/' + this.props.id)
  }

  _previous() {
    FlowRouter.go('/user/list')
  }

  sendMessage() {
    const employee = this.data.employee;
    const email = employee.emails && employee.emails[0] && employee.emails[0].address
    FlowRouter.go('/correspondence?email=' + email);
  }

  _renderImage() {
    let style = {
      width: '100%'
    }
    let imageUrl = this.data.employee.profile.imageUrl
    imageUrl = imageUrl || "http://placehold.it/150x200"
    return <img src={imageUrl} style={style} />
  }

  _renderCard() {
    let buttonStyle = {
      width: '8em'
    }
    let itemStyle = {
      fontSize: '1em'
    }
    let user = this.data.employee
    let profile = user.profile
    let email = user.emails && user.emails[0] && user.emails[0].address

    let widthArr = ['15%', '30%', '35%', '20%']
    if(this.state.windowWidth < this.criticalWidth) {
      widthArr = ['30%', '70%', '100%', '100%']
    }

    return (
      <RC.Grid titleBgColor="brand2" bgColor="white" theme={["paddingPx"]}>
        <RC.GridItem theme="paddingPx-r" width={widthArr[0]}>
          {this._renderImage()}
        </RC.GridItem>
        <RC.GridItem theme="paddingPx-r" width={widthArr[1]}>
          <RC.Item areaInnerStyle={itemStyle}>Name: {profile.name}</RC.Item>
          <RC.Item areaInnerStyle={itemStyle}>Unique ID: 1234567</RC.Item>
          <RC.Item areaInnerStyle={itemStyle}>Title: Product Manager</RC.Item>
          <RC.Item areaInnerStyle={itemStyle}>Department: Solutions</RC.Item>
        </RC.GridItem>
        <RC.GridItem theme="paddingPx-r" width={widthArr[2]}>
          <RC.Item areaInnerStyle={itemStyle}>Company: iHealth Labs</RC.Item>
          <RC.Item areaInnerStyle={itemStyle}>Address: 719 N Shoreline Blvd,  MountainView, CA</RC.Item>
          <RC.Item areaInnerStyle={itemStyle}>Phone Number: 650-555-1234</RC.Item>
          <RC.Item areaInnerStyle={itemStyle}>Email: {email}</RC.Item>
        </RC.GridItem>
        <RC.GridItem theme="paddingPx-r" width={widthArr[3]} style={{textAlign: 'center'}}>
          <br/><br/>
          <RC.Button type="submit" theme="inline" bgColor="brand1" style={buttonStyle} onClick={this.sendMessage.bind(this) }>Message</RC.Button> <br/>
          <RC.Button type="button" theme="inline" bgColor="brand1" style={buttonStyle} onClick={this._showBaseline.bind(this)}>Set Baseline</RC.Button>
          <RC.Button type="button" theme="inline" bgColor="brand1" style={buttonStyle} onClick={this._edit.bind(this)}>Edit</RC.Button>
        </RC.GridItem>
      </RC.Grid>
    )
  }

  _renderTabContent() {
    let tab = this.state.tab
    let props = {
      employee: this.data.employee,
      windowWidth: this.state.windowWidth
    }
    if(tab === 0) {
      return <IH.RC.EmployeeInfo {...props} />
    }
    else if(tab === 1) {
      return <IH.RC.EmployeeTrends {...props} />
    }
    else {
      return <IH.RC.EmployeeCampaignList {...props} />
    }
  }

  _renderTabs() {
    let style = {
      position: "relative"
    }
    return (
      <RC.Div style={style} theme="padding" autoFix={false} bgColor="#e5e5e5">
        <RC.TabsFolder bgColor="#e5e5e5" initialTab={0}>
          <RC.URL onClick={this._setTab.bind(this, 0)}>Information</RC.URL>
          <RC.URL onClick={this._setTab.bind(this, 1)}>Trends</RC.URL>
          <RC.URL onClick={this._setTab.bind(this, 2)}>Campaigns</RC.URL>
        </RC.TabsFolder>
        {this._renderTabContent()}<br/>
      </RC.Div>
    )
  }

  _renderBaseline() {
    const showBaseline = this.state.showBaseline;
    const divStyle = {
      width: "55em",
      height: "20em",
      backgroundColor:"white",
      color: "black"
    }
    const buttonStyle = {
      width: '8em'
    }
    const leftUnits = {
      float: 'left',
      marginLeft:'3em'
    };
    const rightUnits = {
      float: 'right',
      marginRight:'3em',
      marginTop:'-1em'
    }

    return (
      <div>
      {
        showBaseline
        ?
        <RC.BackDropArea onClick={this._showBaseline.bind(this)}>
          <RC.Div style={divStyle}>
            <RC.VerticalAlign center={true} className="padding" height="300px">
            Devices:<br/>
            <RC.Button type="button" theme="inline" bgColor={this.getButtonCSS(0)} style={buttonStyle} onClick={this._setBaseline.bind(this, {device:0, units:"mmHg"})}>Blood Pressure</RC.Button>
            <RC.Button type="button" theme="inline" bgColor={this.getButtonCSS(1)} style={buttonStyle} onClick={this._setBaseline.bind(this, {device:1, units:"mmol/L"})}>Blood Glucose</RC.Button>
            <RC.Button type="button" theme="inline" bgColor={this.getButtonCSS(2)} style={buttonStyle} onClick={this._setBaseline.bind(this, {device:2, units:"lbs"})}>Weight</RC.Button>
            <RC.Button type="button" theme="inline" bgColor={this.getButtonCSS(3)} style={buttonStyle} onClick={this._setBaseline.bind(this, {device:3, units:"steps"})}>Activity</RC.Button>
            <RC.Button type="button" theme="inline" bgColor={this.getButtonCSS(4)} style={buttonStyle} onClick={this._setBaseline.bind(this, {device:4, units:"hours"})}>Sleep</RC.Button><br />
            <span style={leftUnits}>{this.state.measurement.units}</span><IH.RC.Slider device={this.state.measurement.device} /><span style={rightUnits}>{this.state.measurement.units}</span>
            {
              this.state.measurement.device === 1
              ?
              <div style={{marginTop:"4em"}}><span style={leftUnits}>{this.state.measurement.units}</span><IH.RC.Slider device={this.state.measurement.device} /><span style={rightUnits}>{this.state.measurement.units}</span></div>
              :
              null
            }
            </RC.VerticalAlign>
           </RC.Div>
        </RC.BackDropArea>
        :
        null
      }
      </div>
    )
  }

  render() {
    let buttonStyle = {
      width: '8em'
    }
    if(this.data.isReady) {
      return (
        <div>
          {this._renderBaseline()}
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

IH.RC.Slider = class extends RC.CSSMeteorData {
  constructor(p) {
    super(p);
  }

  getMeteorData() {
    return {};
  }

  componentDidMount() {
    noUiSlider.create(ReactDOM.findDOMNode(this.refs.slider), {
      connect: true,
      range: {
        min: 0,
        max: 100
      },
      pips: {
    		mode: 'values',
    		values: [20, 80],
    		density: 4
    	},
      start: [10, 50]
    });
  }

  render() {
    const sliderStyle = {
      marginRight:'7em',
      marginLeft:'7em'
    }
    return (
      <div>
        <div ref="slider" style={sliderStyle}></div>
      </div>
    )
  }
}
