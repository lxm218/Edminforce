IH.Survey.ResponseSummary = class extends React.Component {
	constructor(props) {
		super(props);
	}

	renderTitle() {
		return (
			<RC.Item>
				Response Summary
			</RC.Item>
		)
	}

	renderResponseCount() {
		let responsesCount = this.props.responsesCount || 0;
		return (
			<RC.Item>
				<span>
					Total Responses: {responsesCount}
				</span>
			</RC.Item>
		)
	}

	renderButton() {
		let buttonStyle = {
			'margin': '1.5em'
		}
		return (
			<RC.Item>
				<button className="button" style={buttonStyle} onClick={this.handleViewResponses.bind(this)}>View Responses</button>
			</RC.Item>
		)
	}

	handleViewResponses() {
		let url = "/responseList/" + this.props.survey_id;
		FlowRouter.go(url);
	}

	render() {
		return (
			<RC.Div>
				{this.renderTitle()}
				{this.renderResponseCount()}
				{this.renderButton()}
			</RC.Div>
		)
	}
}
