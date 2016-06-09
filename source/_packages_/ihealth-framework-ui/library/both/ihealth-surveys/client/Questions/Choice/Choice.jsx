IH.Survey.Choice = class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			options: this.props.options || (this.props.currentQuestionObj && this.props.currentQuestionObj.options)
		}
	}

	componentDidMount() {
		//make sure the options are set when coming back from another branch
		Meteor.defer(() => {
			let currentQuestionObj = this.props.currentQuestionObj;
			if(currentQuestionObj) {
				this.setState({options: currentQuestionObj.options});
			}
		}.bind(this))
	}

	setOptions(options) {
		this.setState({
			options: options
		});
	}

	submitForm(e) {
		e.preventDefault();
	}

	handleCancel(e) {
		this.props.setSurveyState('');
		if(!this.props.editMode) {
			let previousObj = IH.Survey.history.pop();
			this.props.setCurrentQuestionId(previousObj._id);
		}
	}

	handleQuestionChange(e) {
		let emptyQuestionObj = {
			_id: Meteor.uuid()
		}
		let questionObj = this.props.currentQuestionObj || emptyQuestionObj;
		questionObj.question = this.getFormData().question || ' ';
		this.props.setCurrentQuestionObj(questionObj);
	}

	renderQuestionInput() {
		if(this.props.currentQuestionObj && this.props.currentQuestionObj.question) {
			return <RC.Input name="question" value={this.props.currentQuestionObj.question} onChange={this.handleQuestionChange.bind(this)} />
		}
		else {
			return <RC.Input name="question" onChange={this.handleQuestionChange.bind(this)} />
		}
	}

	renderOptions() {
		let commonProps = {
			options: this.state.options,
			setOptions: this.setOptions.bind(this),
			getFormData: this.getFormData
		};
		_.extend(commonProps, this.props);
		return <IH.Survey.OptionList {...commonProps} />
	}

	renderTitle() {
		if(this.props.title) {
			return this.props.title;
		}
		else {
			return 'Edit'
		}
	}

	getFormData() {
		return this.refs.form.getFormData();
	}

	renderButtons() {
		let buttonStyle = {
			'marginRight': '3em'
		}
		let commonProps = {
			buttonStyle: buttonStyle,
			handleCancel: this.handleCancel,
			getFormData: this.getFormData,
			options: this.state.options
		};
		_.extend(commonProps, this.props);
		if(this.props.editMode) {
			return <IH.Survey.ChoiceSaveButton {...commonProps} />
		}
		else {
			return <IH.Survey.ChoiceAddButton {...commonProps} />
		}
	}

	render() {
		let formStyle = {
			'width': '50vw'
		};
		return (
			<div>
				<RC.Form onSubmit={this.submitForm.bind(this)} ref="form" style={formStyle}>
					<RC.Div>
						<h2>
							{this.renderTitle()}
						</h2>
						<br />
						<h2>
							Question:
						</h2>
						<br />
						{this.renderQuestionInput()}
						<h2>
							Options:
						</h2>
						<br />
						{this.renderOptions()}
			    </RC.Div>
			    <br />
			    {this.renderButtons()}
		    </RC.Form>
			</div>
		);
	}
};
