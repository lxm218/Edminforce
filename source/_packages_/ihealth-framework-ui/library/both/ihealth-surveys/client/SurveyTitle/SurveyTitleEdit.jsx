IH.Survey.SurveyTitleEdit = class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {editTitle: false};
	}

	handleEditTitleState(e) {
		e.preventDefault();
		this.setState({editTitle: true});
	}

	handleSaveTitle() {
		let survey_id = this.props.survey._id;
		let title = this.props.title;
		Surveys.update({
			_id: survey_id
		}, {
			$set: {
				title: title
			}
		});
		this.setState({editTitle: false});
	}

	handleCancelTitleEdit() {
		this.props.setTitle(title);
		this.setState({editTitle: false});
	}

	handleTitleEditKeydown(e) {
		//pressing the enter key will save the title
		if(e.keyCode === 13 || e.which === 13) {
			this.handleSaveTitle();
		}
	}

	handleTitleEditChange(e) {
		Meteor.defer(() => {
			let survey_id = this.props.survey._id;
			let ref = survey_id + '-' + 'title';
			let title = this.refs[ref].getValue();
			this.props.setTitle(title);
		}.bind(this));
	}

	renderEditTitle() {
		let style = {
			'width': '40vw',
			'transform': 'translate(30vw, 0)'
		}
		let buttonStyle = {
			'margin': '1.5em'
		}
		if(this.state.editTitle) {
			return (
				<div>
					<br />
					<RC.Input ref={this.props.survey._id + '-' + 'title'} value={this.props.survey.title} style={style} onKeyDown={this.handleTitleEditKeydown.bind(this)} onChange={this.handleTitleEditChange.bind(this)} />
					<button className="button" style={buttonStyle} onClick={this.handleSaveTitle.bind(this)}>Save</button>
					<button className="button" style={buttonStyle} onClick={this.handleCancelTitleEdit.bind(this)}>Cancel</button>
				</div>
			)
		}
	}

	renderButton() {
		let buttonStyle = {
			'margin': '1.1em',
			'marginBottom': '0em'
		}
		if(this.props.summaryMode || this.props.addMode) {
			return (
				<span>
					<button className="button" style={buttonStyle} onClick={this.handleEditTitleState.bind(this)}>Edit Title</button>
				</span>
			)
		}
	}

	render() {
		return (
			<div>
				{this.renderEditTitle()}
				{this.renderButton()}
			</div>
		)
	}
}
