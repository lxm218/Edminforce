IH.Survey.MultipleChoiceEdit = class extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let multipleChoiceEditProps = {
			type: 'multipleChoice',
			editMode: true
		}
		_.extend(multipleChoiceEditProps, this.props);
		return <IH.Survey.Choice {...multipleChoiceEditProps} />
	}
};
