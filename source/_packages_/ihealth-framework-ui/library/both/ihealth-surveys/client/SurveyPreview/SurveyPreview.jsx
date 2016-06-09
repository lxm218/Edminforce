IH.Survey.SurveyPreview = React.createClass({
	mixins: [ReactMeteorData],

  getMeteorData() {
    let survey_id = this.props.survey_id;
    Meteor.subscribe('questionsCount', survey_id);
    let questionsCount = Counts.get('questionsCount');
    return {
      questionsCount: questionsCount
    }
  },

  getInitialState() {
  	return {
      answersHash: {}
  	}
  },

  componentDidMount() {
    //if there is no currentQuestionId, set the it to be the id of the question with no previous, back, or backOption
    let currentQuestionId = this.props.currentQuestionId;
    if(!currentQuestionId) {
      let questionQuery = {
        survey_id: this.props.survey_id,
        back: this.props.back,
        backOption: this.props.backOption
      }
      Meteor.subscribe('questionByQuery', questionQuery, () => {
        let currentQuestionObj = Questions.findOne(questionQuery);
        if(currentQuestionObj) {
          this.props.setCurrentQuestionId(currentQuestionObj._id);
        }
      }.bind(this));
    }
  },

  addToAnswersHash(question_id, answer) {
    let answersHash = this.state.answersHash;
    answersHash[question_id] = answer;
    this.setState({answersHash: answersHash});
  },

  renderBody() {
    let previewStyle = {
      'width': '40vw'
    };

    let commonProps = {};
    _.extend(commonProps, this.props);

    let editProps = commonProps;
    let addProps = {
      questionsCount: this.data.questionsCount
    }
    _.extend(addProps, commonProps);
    let previewProps = {
      previewStyle: previewStyle,
      questionsCount: this.data.questionsCount,
      answersHash: this.state.answersHash,
      addToAnswersHash: this.addToAnswersHash,
      previewMode: true
    }
    _.extend(previewProps, commonProps);

    return (
      <div>
        {
          this.props.surveyState === 'addSingleText' ?
            <IH.Survey.SingleText {...addProps} />
          : this.props.surveyState === 'addCommentBox' ?
            <IH.Survey.CommentBox {...addProps} />
          : this.props.surveyState === 'addSingleChoice' ?
            <IH.Survey.SingleChoice {...addProps} />
          : this.props.surveyState === 'addMultipleChoice' ?
            <IH.Survey.MultipleChoice {...addProps} />
          : this.props.surveyState === 'editSingleText' ?
            <IH.Survey.SingleTextEdit {...editProps} />
          : this.props.surveyState === 'editCommentBox' ?
            <IH.Survey.CommentBoxEdit {...editProps} />
          : this.props.surveyState === 'editSingleChoice' ?
            <IH.Survey.SingleChoiceEdit {...editProps} />
          : this.props.surveyState === 'editMultipleChoice' ?
            <IH.Survey.MultipleChoiceEdit {...editProps} />
          : (this.props.isReady) ?
            <IH.Survey.SurveyPreviewBody {...previewProps} />
          : ''
        }
      </div>
    )
  },

  render() {
  	let SurveyBodyStyle = {
			'textAlign': 'center',
	    'display': 'inline-block',
	    'position': 'absolute',
	    'transform': 'translate(5vw, 3.3vh)'
		};

		return (
			<div style={SurveyBodyStyle}>
				{this.renderBody()}
				<br /><br />
			</div>
		);
	}
});
