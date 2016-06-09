IH.Survey.SurveySummary = class extends React.Component {
	constructor(props) {
		super(props);
	}
	renderTitle() {
		return (
			<RC.Item>
				Suvery Summary
			</RC.Item>
		)
	}

	renderDate() {
		let survey = this.props.survey;
		let date_created = survey && moment(survey.date_created).fromNow();
		if(date_created) {
			return (
				<RC.Item>
					Created: {date_created}
				</RC.Item>
			)
		}
	}

	renderQuestionsCount() {
		let questionsCount = this.props.questionsCount;
		if(questionsCount) {
			return (
				<RC.Item>
					<span>
						Questions: {questionsCount}
					</span>
				</RC.Item>
			)
		}
	}

	handleEdit() {
		let url = '/surveys/edit/' + this.props.survey._id;
		FlowRouter.go(url);
	}

	renderButtons() {
		let buttonStyle = {
			'margin': '1.5em'
		}
		return (
			<RC.Item>
				<button className="button" style={buttonStyle} onClick={this.handleLink.bind(this)}>Survey Link</button>
				<button className="button" style={buttonStyle} onClick={this.handleEdit.bind(this)}>Edit</button>
				<button className="button" style={buttonStyle} onClick={this.handleRemove.bind(this)}>Remove</button>
			</RC.Item>
		)
	}

	handleRemove() {
		let survey = this.props.survey;
		let confirmed = confirm("Are you sure you want to remove this survey?");
		if(confirmed) {
			//remove the survey, and the associated questions and responses as well
			Meteor.call('removeSurvey', survey._id);
			if(window.location.pathname !== '/surveyList') {
				FlowRouter.go('/surveyList')
			}
		}
	}

	handleLink() {
		let url = '/surveys/' + this.props.survey._id;
		window.open(url, '_blank');
	}

	render() {
		return (
			<RC.Div>
				{this.renderTitle()}
				{this.renderDate()}
				{this.renderQuestionsCount()}
				{this.renderButtons()}
			</RC.Div>
		)
	}
}
