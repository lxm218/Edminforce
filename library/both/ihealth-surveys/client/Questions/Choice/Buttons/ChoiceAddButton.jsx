IH.Survey.ChoiceAddButton = class extends React.Component {
	constructor(props) {
		super(props);
	}

	handleAdd(e) {
		e.preventDefault();
		IH.Survey.addChoiceQuestion(this.props, true);
	}

	render() {
		return (
			<RC.Div>
		    <RC.Button theme="inline" bgColor="brand1" style={this.props.buttonStyle} onClick={this.handleAdd.bind(this)}>Save</RC.Button>
		    <RC.Button theme="inline" type="reset" onClick={this.props.handleCancel.bind(this)}>Cancel</RC.Button>
		  </RC.Div>
		)
	}
};
