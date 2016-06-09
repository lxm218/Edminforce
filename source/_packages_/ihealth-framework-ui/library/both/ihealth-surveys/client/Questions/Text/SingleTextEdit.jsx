IH.Survey.SingleTextEdit = class extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		let singleTextEditProps = {
			type: 'singleText'
		}
		_.extend(singleTextEditProps, this.props);
		return <IH.Survey.TextEdit {...singleTextEditProps} />
	}
};
