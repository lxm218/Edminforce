IH.Survey.MultipleChoice = class extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let multipleChoiceProps = {
			type: 'multipleChoice',
			title: 'Add a Multiple Choice Question'
		}
		_.extend(multipleChoiceProps, this.props);
		return <IH.Survey.Choice {...multipleChoiceProps} />
	}
};
