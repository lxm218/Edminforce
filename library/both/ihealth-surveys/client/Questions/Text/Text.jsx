IH.Survey.Text = class extends React.Component {
	constructor(props){
		super(props);
	}

	handleAdd(e) {
		e.preventDefault();
		let formData = this.refs.form.getFormData();
		IH.Survey.addTextQuestion(formData, this.props, true);
	}

	handleCancel(e) {
		this.props.setSurveyState('');
		if(!this.props.editMode) {
			let previousObj = IH.Survey.history.pop();
			this.props.setCurrentQuestionId(previousObj._id);
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
				<RC.Form onSubmit={this.submitForm} ref="form" style={formStyle}>
					<RC.Div>
						<h2>
							{this.props.title}
						</h2>
						<br />
						<h2>
							Question:
						</h2>
						<br />
						<RC.Input name="question" />
			    </RC.Div>
			    <br />
			    <RC.Div>
				    <RC.Button theme="inline" bgColor="brand1" style={buttonStyle} onClick={this.handleAdd.bind(this)}>Add</RC.Button>
				    <RC.Button theme="inline" type="reset" onClick={this.handleCancel.bind(this)}>Cancel</RC.Button>
				  </RC.Div>
		    </RC.Form>
			</div>
		);
	}
};
