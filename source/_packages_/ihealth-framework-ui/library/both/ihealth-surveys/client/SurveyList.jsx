IH.Survey.SurveyList = React.createClass({
	mixins: [ReactMeteorData],

  getMeteorData() {
    let surveySort = {sort: {date_modified: -1}};
    let surveysSubs = Meteor.subscribe('surveys');
    var userNamesSubs, users;

    let surveysQuery = {};
    if(IH.Survey.isSurveyCreator()) {
      surveysQuery = {survey_creator_id: Meteor.userId()};
    }
    let surveys = Surveys.find(surveysQuery, surveySort).fetch();
    if(surveys) {
	    let user_ids = surveys.map((survey, index) => {
	    	return survey.survey_creator_id;
	    });
	    userNamesSubs = Meteor.subscribe('userNames', user_ids);
	    users = Meteor.users.find().fetch();
	  }
    return {
      surveys: surveys,
      isReady: surveysSubs.ready() && (userNamesSubs && userNamesSubs.ready()),
      users: users
    }
  },

  renderSurveys() {
  	let users = this.data.users;
		let surveys = this.data.surveys.map((survey, index) => {
			return <IH.Survey.SurveyTitle survey={survey} users={users} key={index} />;
		});
		return surveys;
  },

	render() {
		return (
			<div>
				{
					this.data.isReady ?
						<div>
							{this.renderSurveys()}
						</div>
					: ''
				}
			</div>
		)

	}
});
