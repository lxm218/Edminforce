IH.Survey.QuestionPreview = class extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let questionPreviewProps = {};
		_.extend(questionPreviewProps, this.props);
		return <IH.Survey.QuestionView {...questionPreviewProps} />
	}
};
