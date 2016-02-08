Meteor.methods({
	'removeSurvey': function(survey_id) {
		//remove the survey, and the associated questions and responses as well
		Surveys.remove({_id: survey_id});
		Questions.remove({survey_id: survey_id});
		Responses.remove({survey_id: survey_id});
	}
});
