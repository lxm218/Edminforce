IH.Survey.SurveyEdit = React.createClass({
	mixins: [ReactMeteorData],

  getMeteorData() {
    let survey_id = this.props.survey_id;
  	Meteor.subscribe('survey', survey_id);
    let survey = Surveys.find({_id: survey_id}).fetch()[0];
    var userNamesSubs, users;
    if(survey) {
      let user_ids = [survey.survey_creator_id];
      userNamesSubs = Meteor.subscribe('userNames', user_ids);
      users = Meteor.users.find().fetch();
    }
    let questionSort = {};
    let questionsSubs = Meteor.subscribe('questions', survey_id);
    let surveyQuestions = Questions.find({survey_id: survey_id}, questionSort).fetch();
    let allQuestionIds = surveyQuestions.map((questionObj) => {
      return questionObj._id;
    })

    return {
      survey: survey,
      users: users,
      allQuestionIds: allQuestionIds,
      surveyQuestions: surveyQuestions,
      isReady: questionsSubs.ready(),
    }
  },

  getInitialState() {
    return {
      surveyState: '',
      currentQuestionId: '',
      back: '',
      backOption: '',
      currentQuestionObj: null,
      newQuestionMode: false
    }
  },

  componentDidMount() {
    Meteor.defer(() => {
      let props = this.getCommonProps();
      IH.Survey.setCurrentQuestionObj(props);
    }.bind(this))
    IH.Survey.history = [];
    IH.Survey.updateSurvey(this.props.survey_id);
  },

  setSurveyState(surveyState) {
    this.setState({surveyState: surveyState});
  },

  setCurrentQuestionId(currentQuestionId, IdOnly) {
    this.setState({currentQuestionId: currentQuestionId});
    if(!currentQuestionId) {
      this.setCurrentQuestionObj(null);
    }
    else if(!IdOnly) {
      let props = this.getCommonProps();
      IH.Survey.setCurrentQuestionObj(props, currentQuestionId);
    }
  },

  setBack(back) {
    this.setState({back: back});
  },

  setBackOption(backOption) {
    this.setState({backOption: backOption});
  },

  setCurrentQuestionObj(currentQuestionObj) {
    this.setState({currentQuestionObj: currentQuestionObj});
  },

  setNewQuestionMode(newQuestionMode) {
    this.setState({newQuestionMode: newQuestionMode});
  },

  renderTitle() {
    let survey = this.data.survey;
    let users = this.data.users;
    let props = {
      survey: survey,
      users: users,
      addMode: true
    }
    if(survey) {
      return <IH.Survey.SurveyTitle {...props} />;
    }
  },

  renderBody() {
    let commonProps = this.getCommonProps();
    return <IH.Survey.SurveyPreview {...commonProps} />
  },

  renderTypeList() {
    let commonProps = this.getCommonProps();
    return <IH.Survey.TypeList {...commonProps} />
  },

  renderBackButton() {
    let style = {
      'transform': 'translate(35vw, 4vh)',
      'height': '3em',
      'width': '5em',
      'zIndex': '2',
      'position': 'absolute'
    }
    if(this.state.back && this.state.back.length > 0) {
      return (
        <button style={style} onClick={this.handleBack}>
          Back
        </button>
      )
    }
  },

  handleBack() {
    //go back to the question edit page with _id equal to the back value, reset the back and backOption value to be the ones from this question
    //set the currentQuestionObj to be null at first and use Meteor.defer to make the page transition less snappy
    this.setCurrentQuestionObj(null);
    Meteor.defer(() => {
      let questionId = this.state.back;
      let commonProps = this.getCommonProps();
      this.setCurrentQuestionId(questionId);
      let questionObj = IH.Survey.findQuestionObjById(this.data.surveyQuestions, questionId);
      if(questionObj) {
        let back = questionObj.back;
        let backOption = questionObj.backOption;
        this.setBack(back);
        this.setBackOption(backOption);
        let editState = IH.Survey.getEditState(questionObj.type);
        this.setSurveyState(editState);
        //make sure Survey.history does not keep the histories from that branch
        //keep doing Survey.history.pop() until the last item in Survey.history does not have back value that is different from the current back value
        while(IH.Survey.history.length > 0 && IH.Survey.history[IH.Survey.history.length - 1].back !== back) {
          IH.Survey.history.pop();
        }
      }
      this.setNewQuestionMode(false);
    }.bind(this))
  },

  getCommonProps() {
    let commonProps = {
      setSurveyState: this.setSurveyState,
      surveyState: this.state.surveyState,
      survey_id: this.props.survey_id,
      back: this.state.back,
      setBack: this.setBack,
      backOption: this.state.backOption,
      setBackOption: this.setBackOption,
      currentQuestionId: this.state.currentQuestionId,
      setCurrentQuestionId: this.setCurrentQuestionId,
      currentQuestionObj: this.state.currentQuestionObj,
      setCurrentQuestionObj: this.setCurrentQuestionObj,
      newQuestionMode: this.state.newQuestionMode,
      setNewQuestionMode: this.setNewQuestionMode,
      allQuestionIds: this.data.allQuestionIds,
      surveyQuestions: this.data.surveyQuestions,
      isReady: this.data.isReady
    }
    return commonProps;
  },

  render() {
   	return (
      <div>
        {this.renderTitle()}
        <div>
          {this.renderBackButton()}
          {this.renderTypeList()}
          {this.renderBody()}
        </div>
				<br />
	  	</div>
    )
  }
});
