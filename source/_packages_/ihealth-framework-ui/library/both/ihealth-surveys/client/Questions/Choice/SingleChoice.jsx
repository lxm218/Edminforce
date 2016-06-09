IH.Survey.SingleChoice = class extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let singleChoiceProps = {
			type: 'singleChoice',
			title: 'Add a Single Choice Question'
		}
		_.extend(singleChoiceProps, this.props);
		return <IH.Survey.Choice {...singleChoiceProps} />
	}
};
