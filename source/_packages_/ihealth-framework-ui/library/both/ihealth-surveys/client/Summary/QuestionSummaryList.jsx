IH.Survey.QuestionSummaryList = React.createClass({
	mixins: [ReactMeteorData],

  getMeteorData() {
    let responseSubs = Meteor.subscribe('responses', this.props.survey_id);
    let responseList = Responses.find().fetch();
    let questionsSub = Meteor.subscribe('questions', this.props.survey_id);
    let questions = Questions.find().fetch();
    return {
      responseList: responseList,
      questions: questions,
      isReady: responseSubs.ready() && (questionsSub && questionsSub.ready())
    }
  },

	renderQuestions() {
  	let responseList = this.data.responseList;
		if(this.data.isReady) {
			let questions = this.data.questions;
			questions = questions.map((questionObj, index) => {
				let props = {
					questionObj: questionObj,
					index: index,
					responseList: responseList
				}
				return <IH.Survey.QuestionSummary {...props} key={questionObj + '-' + index} />
      });
      return (
      	<div>
		    	{questions}
		    </div>
      )
		}
  },

	render() {
		return (
			<RC.Div>
				{this.renderQuestions()}
			</RC.Div>
		)
	}
});
