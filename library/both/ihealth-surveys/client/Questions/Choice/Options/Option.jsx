IH.Survey.Option = class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      redirectObj: {
        redirectValue: ''
      },
      isNewBranch: false
    }
  }

  setIsNewBranch(isNewBranch) {
    this.setState({isNewBranch: isNewBranch});
  }

  componentDidMount() {
    Meteor.defer(() => {
      let redirectObj = IH.Survey.findQuestionObjById(this.props.surveyQuestions, this.props.option.redirect);
      if(redirectObj) {
        this.setRedirectObj(redirectObj);
        if(IH.Survey.isDifferentBranch(redirectObj, this.props.currentQuestionObj)) {
          this.setState({isNewBranch: true});
        }
      }
    }.bind(this))
  }

  setRedirectObj(questionObj) {
    this.setState({redirectObj: questionObj});
  }

  handleChange(e) {
    let option = this.props.option;
    let index = this.props.index;
    option.value = e.target.value;
    if(option.value) {
      this.checkEmptyOptions();
    }
    let options = this.props.options;
    options[index] = option;
    this.props.setOptions(options);
    let questionObj = this.props.currentQuestionObj;
    if(questionObj) {
      questionObj.options = options;
      this.props.setCurrentQuestionObj(questionObj);
    }
  }

  checkEmptyOptions() {
    //automatically add a new input field if there are no empty input fields
    let options = this.props.options;
    let hasEmpty = false;
    _.each(options, (option) => {
      if(!option.value || option.value.length === 0) {
        hasEmpty = true;
      }
    });
    if(!hasEmpty) {
      let emptyOption = {
        value: '',
        _id: Meteor.uuid()
      }
      options.push(emptyOption);
      this.props.setOptions(options);
    }
  }

  addOption(e) {
    let option = this.props.option;
    e.preventDefault();
    let options = this.props.options;
    let emptyOption = {
      value: '',
      _id: Meteor.uuid()
    };
    let index = options.indexOf(option) + 1;
    options.splice(index, 0, emptyOption);
    this.props.setOptions(options);
  }

  removeOption(e) {
    e.preventDefault();
    let option = this.props.option;
    let options = this.props.options;
    options.splice(options.indexOf(option), 1);
    if(options.length >= 2) {
      this.props.setOptions(options);
    }
  }

  getRedirectDropdownList() {
    if(this.props.currentQuestionObj) {
      let redirectList = IH.Survey.allowedRedirectList(this.props.surveyQuestions, this.props.currentQuestionObj);
      redirectList = redirectList.map((questionObj, index) => {
        return questionObj;
      });
      return redirectList;
    }
  }

  renderOptionRedirect() {
    let commonProps = this.getCommonProps();
    return <IH.Survey.OptionRedirect {...commonProps} />
  }

  renderInput() {
    let inputStyle = {
      'width': '30vw',
      'height': '7vh',
      'margin': '1em',
      'fontSize': '1em'
    }
    return <RC.Input value={this.props.option.value} onChange={this.handleChange.bind(this)} style={inputStyle} />
  }

  renderAddOptionButton() {
    let buttonStyle1 = {
      'marginRight': '1em',
      'transform': 'translate(9em,-4em)'
    }
    _.extend(buttonStyle1, this.getButtonStyle());
    return <button className="button button-small" onClick={this.addOption.bind(this)} style={buttonStyle1}><span> + </span></button>
  }

  renderRemoveOptionButton() {
     let buttonStyle2 = {
      'marginRight': '-10em',
      'transform': 'translate(9em,-4em)'
    }
    _.extend(buttonStyle2, this.getButtonStyle());
    return <button className="button button-small" onClick={this.removeOption.bind(this)} style={buttonStyle2}><span> - </span></button>
  }

  renderOptionRedirectButton() {
    let props = this.getCommonProps();
    return <IH.Survey.OptionRedirectButton {...props} />
  }

  getCommonProps() {
    let props = {
      redirectObj: this.state.redirectObj,
      setRedirectObj: this.setRedirectObj.bind(this),
      isNewBranch: this.state.isNewBranch,
      setIsNewBranch: this.setIsNewBranch.bind(this),
      redirectList: this.getRedirectDropdownList()
    }
    _.extend(props, this.props);
    return props;
  }

  getButtonStyle() {
    return {
      'borderRadius': '1em',
      'borderColor': 'rgba(0,0,0,0)'
    }
  }

  render() {
    return (
      <div>
        {this.renderInput()}
        {this.renderAddOptionButton()}
        {this.renderRemoveOptionButton()}
        {this.renderOptionRedirectButton()}
        {this.renderOptionRedirect()}
      </div>
    );
  }
};
