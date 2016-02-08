IH.Survey.SingleChoiceEdit = class extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let singleChoiceEditProps = {
			type: 'singleChoice',
			editMode: true
		}
		_.extend(singleChoiceEditProps, this.props);
		return <IH.Survey.Choice {...singleChoiceEditProps} />
	}
};
