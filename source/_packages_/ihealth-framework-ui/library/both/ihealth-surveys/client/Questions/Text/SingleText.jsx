IH.Survey.SingleText = class extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
		let singleTextProps = {
			type: 'singleText',
			title: 'Add a Single Text Question'
		}
		_.extend(singleTextProps, this.props);
		return <IH.Survey.Text {...singleTextProps} />
	}
};
