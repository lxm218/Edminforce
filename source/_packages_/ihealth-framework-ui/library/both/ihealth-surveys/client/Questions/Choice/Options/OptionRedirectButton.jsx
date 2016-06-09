IH.Survey.OptionRedirectButton = class extends React.Component {
	constructor(props) {
		super(props);
	}

	renderRedirectButton(option, index) {
		let redirectButtonStyle = {
			'transform': 'translate(20em,-4em)',
			'position': 'absolute'
		}
		let addRedirectButtonStyle = {
			'transform': 'translate(30em,-4em)',
			'position': 'absolute'
		}
		let hasValue = this.props.option.value && this.props.option.value.length > 0;
		hasValue = !!hasValue;
		if(hasValue) {
			if(!option.redirect) {
				return (
					<span>
						<button className="button button-small" style={redirectButtonStyle} onClick={this.handleNewBranch.bind(this)}>New Question</button>
						<button className="button button-small" style={addRedirectButtonStyle} onClick={this.handleAddRedirect.bind(this)}>Add Redirect</button>
					</span>
				)
			}
			else {
				return <button className="button button-small" style={redirectButtonStyle} onClick={this.removeRedirect.bind(this)}>Remove Redirect</button>
			}
		}
	}

	handleNewBranch(e) {
		e.preventDefault();
		//save the current question to mongo
		IH.Survey.addSaveChoiceQuestion(this.props, false);
		let option = this.props.option;
		this.props.setSurveyState('');
		this.props.setBack(this.props.currentQuestionObj._id);
		this.props.setBackOption(option._id);
		this.props.setCurrentQuestionId(null);
		this.props.setNewQuestionMode(true);
	}

	handleAddRedirect(e) {
		e.preventDefault();
		let redirectObj = {question: ' '};
    this.props.setRedirectObj(redirectObj);
	}

	removeRedirect() {
		let redirectObj = {question: null};
		this.props.setRedirectObj(redirectObj);
		this.props.option.redirect = false;
		this.props.setIsNewBranch(false);
	}

	render() {
		return (
			<span>
				{this.renderRedirectButton(this.props.option, this.props.index)}
			</span>
		)
	}
}
