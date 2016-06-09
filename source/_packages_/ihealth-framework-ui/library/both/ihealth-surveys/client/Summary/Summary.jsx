IH.Survey.Summary = React.createClass({
	mixins: [ReactMeteorData],

  getMeteorData() {
  	let survey_id = this.props.survey_id;
  	let surveySubs = Meteor.subscribe('survey', survey_id);
  	let survey = Surveys.findOne({_id: survey_id});
  	Meteor.subscribe('questionsCount', survey_id);
    let questionsCount = Counts.get('questionsCount');
    Meteor.subscribe('responsesCount', survey_id);
    let responsesCount = Counts.get('responsesCount');
    let user = Meteor.user();
  	return {
  		survey: survey,
  		isReady: surveySubs.ready(),
  		questionsCount: questionsCount,
  		responsesCount: responsesCount,
  		user: user
  	};
  },

  commonStyle() {
  	return {
			'width': '50%',
	    //'position': 'absolute',
	    'padding': '3em 3em'
		}
  },

  renderTitle() {
  	let survey = this.data.survey;
  	let users = [this.data.user];
  	let props = {
  		survey: survey,
  		users: users,
  		summaryMode: true
  	}
  	if(survey && users) {
	  	return <IH.Survey.SurveyTitle {...props} />
	  }
  },

  renderLeft() {
  	let styleLeft = this.commonStyle();
  	let props = {
  		survey: this.data.survey,
  		questionsCount: this.data.questionsCount,
  		survey_id: this.props.survey_id
  	}
  	return (
  		<div style={styleLeft}>
				<IH.Survey.SurveySummary {...props} />
			</div>
  	)
  },

  renderRight() {
  	let styleRight = {
			'transform': 'translate(50vw, 0)',
			'top': '6.65em',
			'position': 'absolute'
  	}
  	_.extend(styleRight, this.commonStyle())

  	let props = {
  		responsesCount: this.data.responsesCount,
  		survey_id: this.props.survey_id
  	}

  	return (
	  	<div style={styleRight}>
				<IH.Survey.ResponseSummary {...props} />
			</div>
		)
  },

  renderBottom() {
  	let styleBottom = {
  		'position': 'absolute',
    	'margin': '0vh 0 8vh 30vw',
    	'width': '40vw'
  	}
  	return (
  		<div style={styleBottom}>
  			<IH.Survey.QuestionSummaryList survey_id={this.props.survey_id} />
  		</div>
  	)
  },

	render() {
		let style = {
			'textAlign': 'center'
		}

		return (
			<div style={style}>
				{this.renderTitle()}
				{this.renderLeft()}
				{this.renderRight()}
				{this.renderBottom()}
			</div>
		)
	}
})
