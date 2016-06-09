IH.Survey.QuestionSummary = React.createClass({
	countOptionVotes(option, questionObj, index) {
  	if(questionObj.type === 'singleChoice') {
	  	let countHash = _.countBy(this.props.responseList, (response) => {
	  		let option_value = response.answersHash[questionObj._id];
	  		return option_value === option.value;
	  	});
	  	let count = countHash[true] || 0;
	  	return count;
	  }
	  else {
	  	let countHash = _.countBy(this.props.responseList, (response) => {
	  		let optionHash = response.answersHash[questionObj._id];
	  		return optionHash && optionHash[index]
	  	});
	  	let count = countHash[true] || 0;
	  	return count;
	  }
  },

  renderOptions(questionObj) {
  	let countOptionVotes = this.countOptionVotes;
  	let options = _.map(questionObj.options, (option, index) => {
  		let count = countOptionVotes(option, questionObj, index);
			return (
				<RC.Item key={questionObj._id + '-' + index} >
					{option.value + ': ' + count}
				</RC.Item>
			)
		});
		return (
			<div key={questionObj._id}>
				{options}
			</div>
		)
  },

  renderAnswersChoice(questionObj, index) {
	  return (
	  	<div key={index}>
		  	<RC.Item theme="divider">
		  		{'Q: ' + questionObj.question}
		  	</RC.Item>
		  	{this.renderOptions(questionObj)}
		  </div>
	  )
  },

  renderAnswersText(questionObj, index) {
	  let lastIndex = this.props.responseList.length - 1;
	  let answers = this.props.responseList.map((response, index) => {
	  	let answersHash = response.answersHash;
	  	let answer = answersHash[questionObj._id];
	  	if(index !== lastIndex) {
		  	answer += ', ';
		  }
	  	return answer;
	  });

	  return (
	  	<div key={index}>
		  	<RC.Item theme="divider">
		  		{'Q: ' + questionObj.question}
		  	</RC.Item>
		  	<RC.Item>
		  		{answers}
		  	</RC.Item>
		  </div>
	  )
  },

  renderAnswers(questionObj, index) {
  	if((questionObj.type === 'singleText') || (questionObj.type === 'commentBox')) {
			return this.renderAnswersText(questionObj, index);
		}
		else {
			return this.renderAnswersChoice(questionObj, index);
		}
  },

  render() {
  	return this.renderAnswers(this.props.questionObj, this.props.index);
  }
});
