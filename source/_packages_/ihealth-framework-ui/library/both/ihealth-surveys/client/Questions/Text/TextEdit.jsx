IH.Survey.TextEdit = class extends React.Component {
	constructor(props){
		super(props);
	}
	handleSave(e) {
		e.preventDefault();
		let formData = this.refs.form.getFormData();
		if(formData.question.length > 0) {
			let questionObj = {
				question: formData.question
			}
			let question_id = this.props.currentQuestionObj._id;
			IH.Survey.editSurveyQuestion(this.props, this.props.survey_id, question_id, questionObj);
			let currentQuestionObj = this.props.currentQuestionObj;
			currentQuestionObj.question = formData.question;
			this.props.setCurrentQuestionObj(currentQuestionObj);
		}
	}

	handleCancel(e) {
		this.props.setSurveyState('');
		//this.props.setCurrentQuestionId(this.props.questionObj._id);
	}

	renderQuestionInput() {
		if(this.props.currentQuestionObj && this.props.currentQuestionObj.question) {
			return <RC.Input name="question" value={this.props.currentQuestionObj.question} />
		}
		else {
			return <RC.Input name="question" />
		}
	}

	render() {
		let formStyle = {
			'width': '50vw'
		};
		let buttonStyle = {
			'marginRight': '3em'
		};
		return (
			<div>
				<RC.Form onSubmit={this.submitForm.bind(this)} ref="form" style={formStyle}>
					<RC.Div>
						<h2>
							Editing
						</h2>
						<br />
						<h2>
							Question:
						</h2>
						<br />
						{this.renderQuestionInput()}
			    </RC.Div>
			    <br />
			    <RC.Div>
				    <RC.Button theme="inline" bgColor="brand1" style={buttonStyle} onClick={this.handleSave.bind(this)}>Save</RC.Button>
				    <RC.Button theme="inline" type="reset" onClick={this.handleCancel.bind(this)}>Cancel</RC.Button>
				  </RC.Div>
		    </RC.Form>
			</div>
		);
	}
};
