IH.Survey.SurveyTitle = class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {title: ''};
	}

	setTitle(title) {
		this.setState({title: title});
	}

	handleClick() {
		const survey = this.props.survey;
		if(Meteor.userId() != survey.survey_creator_id) {
			let viewUrl = "/surveys/" + survey._id;
			FlowRouter.go(viewUrl);
		}
		else if(!this.props.addMode) {
			let url = '/summary/' + survey._id;
			FlowRouter.go(url);
		}
	}

	renderTitle() {
		let survey = this.props.survey;
		let users = this.props.users;
		users = users.filter((user, index) => {
			return user._id === survey.survey_creator_id;
		});
		let username = users && users[0] && users[0].username;
		title = this.state.title || survey.title || 'Untitled Survey';
		var titleInfo;
		if(username) {
			titleInfo = ' by ' + username;
		}
		else {
			titleInfo = ' by ' + survey.survey_creator_id;
		}
		titleInfo += '   ' + moment(survey.date_modified).fromNow();

		let titleStyle = {
			'marginTop': '-0.2em'
		}
		return (
			<div>
				<h3 style={titleStyle}>{title}</h3>
				<div>{titleInfo}</div>
			</div>
		)
	}

	render() {
		let style = {
	    'textAlign': 'center',
	    'padding': '0 0 0.8em 0'
	  }
	  let props = {
	  	title: this.state.title,
	  	setTitle: this.setTitle.bind(this)
	  }
	  _.extend(props, this.props);

		return (
			<RC.Item style={style} onClick={this.handleClick.bind(this)}>
				{this.renderTitle()}
				<IH.Survey.SurveyTitleEdit ref="SurveyTitleEdit" {...props} />
			</RC.Item>
		);
	}
}
