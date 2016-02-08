IH.Survey.ChoiceSaveButton = class extends React.Component {
	constructor(props) {
		super(props);
	}

	handleEdit(e) {
		e.preventDefault();
		IH.Survey.addSaveChoiceQuestion(this.props, true);
	}

	render() {
		return (
			<RC.Div>
		    <RC.Button theme="inline" bgColor="brand1" style={this.props.buttonStyle} onClick={this.handleEdit.bind(this)}>Save</RC.Button>
		    <RC.Button theme="inline" type="reset" onClick={this.props.handleCancel.bind(this)}>Cancel</RC.Button>
		  </RC.Div>
		);
	}
};
