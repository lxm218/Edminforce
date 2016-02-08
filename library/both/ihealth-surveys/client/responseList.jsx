IH.Survey.ResponseList = React.createClass({
	mixins: [ReactMeteorData],

  getMeteorData() {
  	let responseSort = {sort: {'date_created': -1}}
    let responsesSubs = Meteor.subscribe('responses', this.props.survey_id);
    let responses = Responses.find({survey_id: this.props.survey_id}, responseSort).fetch();
    var userNamesSubs, users;
    if(responses) {
	    let user_ids = responses.map((response, index) => {
	    	return response.survey_taker_id;
	    });
	    userNamesSubs = Meteor.subscribe('userNames', user_ids);
	    users = Meteor.users.find().fetch();
	  }
    return {
      responses: responses,
      isReady: responsesSubs.ready() && (userNamesSubs && userNamesSubs.ready()),
      users: users
    }
  },

	render() {
		let buttonStyle = {
			'margin': '1.5em'
		}
		let users = this.data.users;
		let responses = this.data.responses.map((response, index) => {
			let url = '/responses/' + response._id;
			return (
				<div key={index}>
					<a href={url}>
						<RC.Item>
							{IH.Survey.renderResponseTitle(response, users)}
						</RC.Item>
					</a>
				</div>
			)
		});
		return (
			<div>
				{
					this.data.isReady ?
						responses
					: ''
				}
			</div>
		)
	}
});
