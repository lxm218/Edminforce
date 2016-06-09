IH.Survey.SurveyView = React.createClass({
	mixins: [ReactMeteorData],

  getMeteorData() {
    let survey_id = this.props.survey_id;
    let questionSort = {};
  	Meteor.subscribe('survey', survey_id);
    let survey = Surveys.find({_id: survey_id}).fetch()[0];
    let questionsSubs = Meteor.subscribe('questions', survey_id);

    let surveyQuestions = Questions.find({survey_id: survey_id}, questionSort).fetch();
    Meteor.subscribe('questionsCount', survey_id);
    let questionsCount = Counts.get('questionsCount');
    var userNamesSubs, users;
    if(survey) {
      let user_ids = [survey.survey_creator_id];
      userNamesSubs = Meteor.subscribe('userNames', user_ids);
      users = Meteor.users.find().fetch();
    }
    let allQuestions = Questions.find({survey_id: survey_id}, questionSort).fetch();
    let allQuestionIds = allQuestions.map((questionObj) => {
      return questionObj._id;
    })

    return {
      survey: survey,
      surveyQuestions: surveyQuestions,
      isReady: questionsSubs.ready() && (userNamesSubs && userNamesSubs.ready()),
      questionsCount: questionsCount,
      users: users,
      allQuestionIds: allQuestionIds
    }
  },

  getInitialState() {
    return {
      answersHash: {},
      currentQuestionId: '',
      currentQuestionObj: null
    }
  },

  componentDidMount() {
    //if there is no currentQuestionId, set the it to be the id of the question with no previous, back, or backOption
    let currentQuestionId = this.state.currentQuestionId;
    if(!currentQuestionId) {
      let questionQuery = {
        survey_id: this.props.survey_id,
        back: '',
        backOption: ''
      }
      Meteor.subscribe('questionByQuery', questionQuery, () => {
        let currentQuestionObj = Questions.findOne(questionQuery);
        if(currentQuestionObj) {
          this.setCurrentQuestionId(currentQuestionObj._id);
        }
      }.bind(this));
    }
  },

  setCurrentQuestionId(currentQuestionId) {
    this.setState({currentQuestionId: currentQuestionId});
    if(!currentQuestionId) {
      this.setCurrentQuestionObj(null);
    }
    else {
      let props = this.getCommonProps();
      IH.Survey.setCurrentQuestionObj(props, currentQuestionId);
    }
  },

  setCurrentQuestionObj(currentQuestionObj) {
    this.setState({currentQuestionObj: currentQuestionObj});
  },

  addToAnswersHash(question_id, answer) {
    let answersHash = this.state.answersHash;
    answersHash[question_id] = answer;
    this.setState({answersHash: answersHash});
  },

  renderTitle() {
    let survey = this.data.survey;
    let users = this.data.users;
    if(survey) {
      return <IH.Survey.SurveyTitle survey={survey} users={users} />;
    }
  },

  renderBody(commonProps) {
    if(this.props.survey_id) {
      commonProps.survey_id = this.props.survey_id
    }
    commonProps.title = ' ';
    return <IH.Survey.SurveyViewBody {...commonProps} />
  },

  getCommonProps() {
    let viewStyle = {
      'width': '40vw',
      'transform': 'translate(30vw, 0)'
    };
    if(IH.Survey.smallerScreen()) {
      viewStyle = {
        width: '90vw',
        'transform': 'translate(5vw, 0)'
      }
    }
    if(IH.Survey.isMobile()) {
      viewStyle = {};
    }
    return {
      survey_id: this.props.survey_id,
      surveyQuestions: this.data.surveyQuestions,
      viewStyle: viewStyle,
      questionsCount: this.data.questionsCount,
      answersHash: this.state.answersHash,
      addToAnswersHash: this.addToAnswersHash,
      allQuestionIds: this.data.allQuestionIds,
      currentQuestionId: this.state.currentQuestionId,
      setCurrentQuestionId: this.setCurrentQuestionId,
      currentQuestionObj: this.state.currentQuestionObj,
      setCurrentQuestionObj: this.setCurrentQuestionObj
    }
  },

  render() {
    let commonProps = this.getCommonProps();

   	return (
      <div>
        {this.renderTitle()}
        <div>
          {
            this.data.isReady ?
              this.renderBody(commonProps)
            : ''
          }
        </div>
				<br />
	  	</div>
    )
  }
});
