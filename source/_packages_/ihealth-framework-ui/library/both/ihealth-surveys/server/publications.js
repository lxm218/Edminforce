Meteor.publish('surveys', function() {
	return Surveys.find();
});

Meteor.publish('surveysByUser', function(user_id) {
	return Surveys.find({survey_creator_id: user_id});
});

Meteor.publish('survey', function(_id) {
	return Surveys.find({_id: _id});
});

Meteor.publish('questions', function(survey_id) {
	return Questions.find({survey_id: survey_id});
});

Meteor.publish('question', function(_id) {
	return Questions.find({_id: _id});
});

Meteor.publish('questionByQuery', function(query) {
	return Questions.find(query);
});

Meteor.publish('questionsCount', function(survey_id) {
  Counts.publish(this, 'questionsCount', Questions.find({survey_id: survey_id}));
});

Meteor.publish('responses', function(survey_id) {
	return Responses.find({survey_id: survey_id});
});

Meteor.publish('responsesByUser', function(user_id) {
	return Responses.find({survey_taker_id: user_id});
});

Meteor.publish('response', function(_id) {
	return Responses.find({_id: _id});
});

Meteor.publish('responsesCount', function(survey_id) {
  Counts.publish(this, 'responsesCount', Responses.find({survey_id: survey_id}));
});

Meteor.publish('userNames', function(user_ids) {
	return Meteor.users.find({_id: {$in: user_ids}}, {fields: {'username': 1}});
});
