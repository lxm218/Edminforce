
IH.CampaignCommon = class extends React.Component {
  constructor(p) {
    super(p)

    this.state = {
      obj: Immutable.Map({
        stage: 0
      }),
      campaign: this.props.campaign,
      showBackdrop: false,
      errorMessage: ''
    }
  }

  componentDidMount() {
    this.dispatcherHandle = IH.Dispatcher.App.register( (action) => {
      switch(action.type) {
        case "error":
          if(action.errorMessage){
            this.setState({errorMessage: action.errorMessage})
          }
          break
      }
    })
  }

  componentWillUnmount() {
    IH.Dispatcher.App.unregister(this.dispatcherHandle)
  }

  // @@@@
  // @@@@
  // Private
  // @@@@
  // @@@@
  _setShowBackdrop(showBackdrop) {
    this.setState({showBackdrop: showBackdrop})
  }
  
  _handleStage(num, isValid) {
    let stages = this.props.stages
    if(arguments.length === 1 || isValid) {
      const cur = this.state.obj.get("stage")
      const change = cur+num

      if (change >= 0 && change < stages.length)
        this.setState(({obj}) => ({
          obj: obj.set("stage", change)
        })) 
        //this.setStateObj({state: change})
      else if (change >= stages.length) { // Do Finish Function Here
      }
      // Do nothing if change is less than 0 (this should never occur)
    }
    else {
      this._setShowBackdrop(true)
    }
  }

  _hideBackDrop() {
    this.setState({showBackdrop: false})
  }
  // @@@@
  // @@@@
  // Render
  // @@@@
  // @@@@
  _renderBackDrop() {
    let areaInnerStyle = {
      'backgroundColor': 'orange'
    }
    if(this.state.showBackdrop) {
      return (
        <RC.BackDropArea bgColor="backdrop" onClick={this._hideBackDrop.bind(this)} bgColor="rgba(255,69,0,0.5)" areaInnerStyle={areaInnerStyle}>
          {this.state.errorMessage}
          <br/><br/><br/>Click anywhere on the backdrop to close this message.
        </RC.BackDropArea>
      )
    }
  }

  render() {
    const Component = IH[this.props.stages[this.state.obj.get("stage")]]
    let props = {
      submitHandler: this._handleStage.bind(this),
      campaign: this.state.campaign
    }
    _.extend(props, this.props)
    return <RC.Div theme="padding-t">
      <RC.TabsSteps bgColor="brand2Faint" cursorColor="brand1" forceClicked={this.state.obj.get("stage")}>
        <RC.URL>Qualification</RC.URL>
        <RC.URL>Campaign Time</RC.URL>
        <RC.URL>Goal</RC.URL>
        <RC.URL>Reward</RC.URL>
      </RC.TabsSteps>
      {this._renderBackDrop()}
      <Component {...props} />
    </RC.Div>
  }
}

IH.CampaignCommon.displayName = "IH.CampaignCommon"
