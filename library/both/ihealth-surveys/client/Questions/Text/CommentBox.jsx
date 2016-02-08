IH.Survey.CommentBox = class extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
		let commentBoxProps = {
			type: 'commentBox',
			title: 'Add a Comment Box Question'
		}
		_.extend(commentBoxProps, this.props);
		return <IH.Survey.Text {...commentBoxProps} />
	}
};
