IH.Survey.CommentBoxEdit = class extends React.Component {
	constructor(props){
		super(props);
	}
 	render() {
		let commentBoxEditProps = {
			type: 'commentBox'
		}
		_.extend(commentBoxEditProps, this.props);
		return <IH.Survey.TextEdit {...commentBoxEditProps} />
	}
};
