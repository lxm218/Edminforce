IH.Survey.ResponseView = React.createClass({
	mixins: [ReactMeteorData],

  getMeteorData() {
    let responseSubs = Meteor.subscribe('response', this.props.response_id);
    let response = Responses.findOne();
    var questionsSub, questions;
    if(response) {
	    questionsSub = Meteor.subscribe('questions', response.survey_id);
	    questions = Questions.find().fetch();
	  }
    return {
      response: response,
      questions: questions,
      isReady: responseSubs.ready() && (questionsSub && questionsSub.ready())
    }
  },

  renderAnswerMultipleChoice(questionObj, optionsHash) {
  	let options = questionObj.options.filter((option, index) => {
  		return optionsHash[index];
  	}).map((option, index) => {
  		return option.value;
  	}).join(', ');
  	return options;
  },

  renderAnswer(questionObj, index) {
  	let answersHash = this.data.response.answersHash;
	  let answer = answersHash[questionObj._id];
	  return (
	  	<div key={index}>
		  	<RC.Item theme="divider">
		  		{'Q' + ': ' + questionObj.question}
		  	</RC.Item>
		  	<RC.Item>
		  		{
		  			(questionObj.type === 'singleText') || (questionObj.type === 'commentBox') || (questionObj.type === 'singleChoice') ?
		  				answer
		  			: questionObj.type === 'multipleChoice' && answer ?
		  				this.renderAnswerMultipleChoice(questionObj, answer)
		  			: ''
		  		}
		  	</RC.Item>
		  </div>
	  )
  },

  renderRemoveButton() {
  	let style = {
  		'transform': 'translate(0,5vh)'
  	}
  	return (
  		<button style={style} onClick={this.handleRemove.bind(this)}>
  			Remove
  		</button>
  	)
  },

  handleRemove() {
  	let confirmed = confirm("Are you sure you want to remove this response?");
		if(confirmed) {
			let url = '/responseList/' + this.data.response.survey_id;
			Responses.remove({_id: this.props.response_id});
			FlowRouter.go(url);
		}
  },

  renderQuestions() {
  	let style = {
			'width': '40vw',
    	'marginTop': '3em'
		}
  	let renderAnswer = this.renderAnswer;
		if(this.data.isReady) {
			let questions = this.data.questions;
			questions = questions.map((questionObj, index) => {
				return renderAnswer(questionObj, index);
      });
      return (
      	<div style={style}>
		    	{questions}
		    </div>
      )
		}
  },

	render() {
		let style = IH.Survey.centerStyle();

    return (
    	<div>
	    	<div style={style}>
	    		{this.renderQuestions()}
		    </div>
		    <div style={style}>
		    	{this.renderRemoveButton()}
		    </div>
		  </div>
	  )
	}
});
