Surveys = new Mongo.Collection('surveys');
Questions = new Mongo.Collection('questions');
Responses = new Mongo.Collection('responses');

IH.Survey = {
	addSurveyQuestion(props, questionObj, setQuestionId){
		console.log('Survey.addSurveyQuestion');
		let confirmed = true;
		if(IH.Survey.findQuestionObjByQuestion(props.surveyQuestions, questionObj.question)) {
			confirmed = confirm('The question name already exists for another question in this survey. Are you sure you still want to add this question?')
		}
		if(confirmed) {
			props.setSurveyState('');
			let newQuestionId = Meteor.uuid();
			let survey_id = props.survey_id;
			let currentQuestionId = props.currentQuestionId;
			//have to get the currentQuestionObj from currentQuestionId since it's set to null when a question type is selected in TypeList
			let currentQuestionObj = IH.Survey.findQuestionObjById(props.surveyQuestions, currentQuestionId);
			let questionObjProps = {
				_id: newQuestionId,
				survey_id: survey_id,
				survey_creator_id: Meteor.userId(),
				back: props.back,
				backOption: props.backOption,
				next: Meteor.uuid(),
				previous: currentQuestionId === newQuestionId ? '' : currentQuestionId
			}
			//if the new question is on the same branch as the current question
			if(currentQuestionObj && (currentQuestionId !== props.back)) {
				questionObjProps.next = currentQuestionObj.next;
				questionObjProps.previous = currentQuestionId;
			}
			_.extend(questionObj, questionObjProps);
			Questions.insert(questionObj);
			IH.Survey.updateOtherQuestions(props, questionObj, newQuestionId, currentQuestionObj);
			if(setQuestionId) {
				props.setCurrentQuestionId(newQuestionId);
			}
		}
	},

	updateOtherQuestions(props, questionObj, newQuestionId, currentQuestionObj) {
		//update the current Question and the next question if not on new level
		Questions.update({_id: props.currentQuestionId}, { $set: {next: newQuestionId} });
		if(currentQuestionObj && (currentQuestionObj.next !== newQuestionId)) {
			Questions.update({_id: currentQuestionObj.next}, { $set: {previous: newQuestionId} });
		}
		IH.Survey.updateBackQuestion(questionObj);
		IH.Survey.updateSurvey(props.survey_id);
	},

	updateSurvey(survey_id) {
		console.log('Survey.updateSurvey');
		survey_id = survey_id;
		let user_id = Meteor.userId();
		Meteor.subscribe('survey', survey_id,() => {
			if(!Surveys.findOne({_id: survey_id})) {
				IH.Survey.addSurvey(survey_id, user_id);
			}
			else {
				IH.Survey.setSurveyModifiedDate(survey_id);
			}
		});
	},

	updateBackQuestion(questionObj) {
		console.log('updateBackQuestion');
		//if the quesiton has a non-empty back value and has no previous, update the back question to have a redirect on the corresponding option
		if(questionObj.back && questionObj.back.length > 0 && (!questionObj.previous || questionObj.previous === '')) {
			Meteor.subscribe('question', questionObj.back, () => {
				let backQuestionObj = Questions.findOne({_id: questionObj.back});
				if(backQuestionObj) {
					let backQuestionObjOptions = backQuestionObj.options;
					let update = () => {
						Questions.update({_id: questionObj.back}, {$set: {options: backQuestionObjOptions} })
					}
					backQuestionObjOptions = _.map(backQuestionObjOptions, (backQuestionObjOption, index) => {
						if(backQuestionObjOption._id === questionObj.backOption) {
							backQuestionObjOption.redirect = questionObj._id;
						}
						return backQuestionObjOption;
					});
					update();
				}
			});
		}
	},

	removeQuestion(props) {
		let questionObj = props.currentQuestionObj;
		Questions.remove({_id: questionObj._id});
		if(questionObj.next) {
			Questions.update({_id: questionObj.previous}, { $set: {next: questionObj.next} });
		}
		else {
			Questions.update({_id: questionObj.next}, { $set: {previous: questionObj.previous} });
		}
		//remove all the redirect to this question
		IH.Survey.removeAllRedirectTo(props.surveyQuestions, questionObj._id);
		//go to the previous or next question
		let previousObj = IH.Survey.history.pop();
		let next = IH.Survey.getNext(props, questionObj);
		if(previousObj) {
			props.setCurrentQuestionId(previousObj._id);
		}
		else if(next) {
			IH.Survey.handleNext(props, questionObj);
			IH.Survey.history.pop();
		}
		else {
			props.setCurrentQuestionId(null);
		}
	},

	removeAllRedirectTo(questionObjList, question_id) {
		console.log('Survey.removeAllRedirectTo');
		_.each(questionObjList, (questionObj) => {
			if(questionObj.options) {
				_.each(questionObj.options, (option, index) => {
					if(option.redirect && option.redirect === question_id) {
						option.redirect = false;
						let setObj = {};
						setObj['options.' + index] = option;
						Questions.update({
							_id: questionObj._id
						}, {
							$set: setObj
						});
					}
				});
			}
		});
	},

	removeAllRedirectFrom(questionObjList, question_id, option_id) {
		console.log('Survey.removeAllRedirectFrom');
		//remove all the questions with back value equal to the current question, and with backOption value equal to the option id
		questionIdList = questionObjList.filter((questionObj) => {
			if(option_id) {
				return questionObj.back === question_id && questionObj.backOption === option_id;
			}
			else {
				return questionObj.back === question_id;
			}
		}).forEach((questionObj) => {
			Questions.remove({ _id: questionObj._id});
		});
	},

	saveChoiceQuestion(props, setQuestionId) {
		console.log('Survey.saveChoiceQuestion');
		let questionObj = props.currentQuestionObj;
		let confirmed = true;
		if(IH.Survey.findQuestionObjByQuestion(props.surveyQuestions, questionObj.question) && !IH.Survey.findQuestionObjById(props.surveyQuestions, questionObj._id)) {
			confirmed = confirm('The question name already exists for another question in this survey. Are you sure you still want to edit this question?')
		}
		if(confirmed) {
			let options = questionObj.options.filter((option) => {
				return option.value;
			});
			props.setSurveyState('');
			Questions.update({_id: questionObj._id}, { $set: {options: options, question: questionObj.question} });
			IH.Survey.updateSurvey(props.survey_id);
			if(setQuestionId) {
				props.setCurrentQuestionId(questionObj._id);
			}
		}
	},

	addSaveChoiceQuestion(props, setQuestionId) {
		console.log('Survey.addSaveChoiceQuestion');
		let question_id = props.currentQuestionObj && props.currentQuestionObj._id;
		let questionObjList = props.surveyQuestions.filter((questionObj) => {
			return questionObj._id === question_id;
		});
		if(questionObjList && questionObjList.length > 0) {
			IH.Survey.saveChoiceQuestion(props, setQuestionId);
		}
		else {
			IH.Survey.addChoiceQuestion(props, setQuestionId);
		}
	},

	addChoiceQuestion(props, setQuestionId) {
		console.log('Survey.addChoiceQuestion');
		let currentQuestionObj = props.currentQuestionObj;
		currentQuestionObj.type = props.type;
		currentQuestionObj.options = currentQuestionObj.options.filter((option) => {
			return option.value;
		});
		IH.Survey.addSurveyQuestion(props, currentQuestionObj, setQuestionId);
	},

	addTextQuestion(formData, props, setQuestionId) {
		if(formData.question.length > 0) {
			let questionObj = {
				type: props.type,
				question: formData.question
			}
			IH.Survey.addSurveyQuestion(props, questionObj, setQuestionId);
		}
	},

	addSurvey(survey_id, user_id) {
		console.log('Survey.addSurvey');
		if(!Surveys.findOne({_id: survey_id})) {
			var survey = {
				_id: survey_id,
				survey_creator_id: user_id,
				date_created: new Date(),
				date_modified: new Date()
			};
		  Surveys.insert(survey);
		}
	},

	setSurveyModifiedDate(survey_id) {
		Surveys.update({
			_id: survey_id
		}, {
			$set: {
				date_modified: new Date()
			}
		})
	},

	editSurveyQuestion(props, survey_id, question_id, questionObj) {
		console.log('Survey.editSurveyQuestion');
		let confirmed = true;
		if(IH.Survey.findQuestionObjByQuestion(props.surveyQuestions, questionObj.question)) {
			confirmed = confirm('The question name already exists for another question in this survey. Are you sure you still want to edit this question?')
		}
		if(confirmed) {
			props.setSurveyState('');
			Questions.update({_id: question_id}, {$set: questionObj});
			IH.Survey.setSurveyModifiedDate(survey_id);
		}
	},

	addResponse(survey_id, survey_creator_id, survey_taker_id, answersHash, cb) {
		let date_created = new Date();
		let response = {
			survey_id: survey_id,
			survey_taker_id: survey_taker_id,
			survey_creator_id: survey_creator_id,
			answersHash: answersHash,
			date_created: date_created
		};
		if(!Responses.findOne({survey_id: survey_id, survey_taker_id: survey_taker_id})) {
			Responses.insert(response, (err, result) => {
				cb(err, result);
			});
		}
	},

	renderResponseTitle(response, users) {
		users = users.filter((user, index) => {
			return user._id === response.survey_taker_id;
		});
		let username = users && users[0] && users[0].username;
		if(username) {
			return response.date_created + '   by ' + username;
		}
		else {
			return response.date_created + '   by ' + response.survey_taker_id;
		}
	},

	isMobile() {
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			return true;
		}
		else {
			return false;
		}
	},

	isCordova() {
		return !!window.cordova;
	},

	centerStyle() {
		return {
			'justifyContent': 'center',
	    'display': 'flex'
		}
	},

	isSurveyCreator(user_id) {
		return Meteor.user() && Meteor.user().profile && Meteor.user().profile.role === 'survey_creator';
	},

	smallerScreen() {
		return !window.matchMedia('(min-width: 800px)').matches;
	},

	sameLevel(question_id, props) {
		//see if the question is on the same level as the current one
		Meteor.subscribe('question', question_id);
		let questionObj = Questions.findOne({_id: question_id});
		if(questionObj) {
			return (questionObj.back === props.back) && (questionObj.backOption === props.backOption);
		}
	},

	getEditState(type) {
		let surveyState = 'edit' + type[0].toUpperCase() + type.substr(1);
		return surveyState;
	},

	setCurrentQuestionObj(props, question_id) {
		if(question_id)	{
			Meteor.subscribe('question', question_id, () => {
			  let questionObj = Questions.findOne({_id: question_id});
			  if(questionObj) {
			    props.setCurrentQuestionObj(questionObj);
			  }
			  else {
			  	props.setCurrentQuestionObj(null);
			  }
			})
		}
		else {
			let questionQuery = {
				survey_id: props.survey_id,
				previous: '',
				back: props.back,
				backOption: props.backOption
			}
			Meteor.subscribe('questionByQuery', questionQuery, (err, result) => {
				let questionObj = Questions.findOne(questionQuery);
				props.setCurrentQuestionObj(questionObj);
			})
		}
	},

	findQuestionObjById(questionObjList, _id) {
		questionObjList = questionObjList.filter((questionObj) => {
			return questionObj._id === _id;
		});
		if(questionObjList && questionObjList.length > 0) {
			return questionObjList[0];
		}
	},


	findQuestionObjByQuestion(questionObjList, question) {
		questionObjList = questionObjList.filter((questionObj) => {
			return questionObj.question === question;
		});
		if(questionObjList && questionObjList.length > 0) {
			return questionObjList[0];
		}
	},

	getQuestionObj(_id, cb) {
		Meteor.subscribe('question', _id, (err, result) => {
			let questionObj = Questions.findOne({_id: _id});
			if(questionObj) {
				cb(questionObj);
			}
		})
	},

	allowedRedirectList(questionObjList, currentQuestionObj) {
		let notAllowedList = [];
		let tempQuestionObj = currentQuestionObj;
		while(tempQuestionObj.previous || tempQuestionObj.back) {
			let previous = tempQuestionObj.previous;
			let back = tempQuestionObj.back;
			if(previous) {
				notAllowedList.push(previous);
				tempQuestionObj = IH.Survey.findQuestionObjById(questionObjList, previous)
			}
			else {
				notAllowedList.push(back);
				tempQuestionObj = IH.Survey.findQuestionObjById(questionObjList, back)
			}
		}
		let redirectList = questionObjList.filter((questionObj) => {
			return (questionObj._id !== currentQuestionObj._id) && (notAllowedList.indexOf(questionObj._id) === -1);
		})
		return redirectList;
	},

	isDifferentBranch(questionObj1, questionObj2) {
		let differentBack = (questionObj1.back !== questionObj2.back);
		let differentBackOption = (questionObj1.backOption !== questionObj2.backOption);
		return differentBack || differentBackOption;
	},

	getNext(props, questionObj) {
		questionObj = questionObj || props.currentQuestionObj;
		let next = questionObj.next;
		//change the behavior if it’s a multiple choice or single choice question, and there is a redirect associated with the selection option
		if(questionObj.type === 'singleChoice') {
			let selectionValue = props.answersHash[questionObj._id];
		  let option = questionObj.options.filter((option) => {
				return option.value === selectionValue;
			})[0];
			if(option && option.redirect) {
				next = option.redirect;
			}
		}
		else if(questionObj.type === 'multipleChoice') {
			let selectionValueHash = props.answersHash[questionObj._id];
			let selectionIndexList = _.map(selectionValueHash, (value, index) => {
				if(value) {
					return index;
				}
			});
			selectionIndexList = _.without(selectionIndexList, undefined);
			if(selectionIndexList && selectionIndexList.length > 0) {
				//use the first redirect if there are more than one
				let selectionIndex = selectionIndexList[0];
				let option = questionObj.options[selectionIndex];
				if(option && option.redirect) {
					next = option.redirect;
				}
			}
		}
		if(props.allQuestionIds.indexOf(next) !== -1) {
			return next;
		}
		else {
			return false;
		}
	},

	handleNext(props, questionObj) {
		let next = IH.Survey.getNext(props, questionObj);
		if(next) {
			props.setCurrentQuestionId(next);
			let historyObj = {
				_id: questionObj._id,
				back: questionObj.back
			}
			IH.Survey.history.push(historyObj);
		}
	},

	history: []
};


Surveys.allow({
  insert: (userId, doc) => {
    return true;
  },
  update: (userId, doc) => {
  	return userId === doc.survey_creator_id;
  },
  remove: (userId, doc) => {
    return userId === doc.survey_creator_id;
  }
})

Questions.allow({
  insert: (userId, doc) => {
    return true;
  },
  update: (userId, doc) => {
  	return userId === doc.survey_creator_id;
  },
  remove: (userId, doc) => {
    return userId === doc.survey_creator_id;
  }
})

Responses.allow({
  insert: (userId, doc) => {
    return true;
  },
  remove: (userId, doc) => {
    return userId === doc.survey_creator_id;
  }
})
