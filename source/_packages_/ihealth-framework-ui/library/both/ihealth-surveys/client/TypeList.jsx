IH.Survey.TypeList = React.createClass({

	handleClick(type) {
		if(type === 'Single Textfield') {
			this.props.setSurveyState('addSingleText');
		}
		else if(type === 'Comment Box') {
			this.props.setSurveyState('addCommentBox');
		}
		else if(type === 'Single Choice') {
			this.props.setSurveyState('addSingleChoice');
		}
		else if(type === 'Multiple Choice') {
			this.props.setSurveyState('addMultipleChoice');
		}
		//make sure the currentQuestionId is set so that Survey.addSurveyQuestion can retrieve the questionObj
		//set the currentQuestionObj to be null so that a new question can be added to it
		let currentQuestionObj = this.props.currentQuestionObj;
		let question_id = currentQuestionObj && currentQuestionObj._id;
		this.props.setCurrentQuestionId(question_id, true);
		if(currentQuestionObj) {
			let historyObj = {
				_id: currentQuestionObj._id,
				back: currentQuestionObj.back
			}
			IH.Survey.history.push(historyObj);
		}
		this.props.setCurrentQuestionObj(null);
	},

	render() {
		const handleClick = this.handleClick;
		let list = ['Single Textfield', 'Comment Box', 'Single Choice', 'Multiple Choice'];
		list = list.map((item, index) => {
			return (
				<RC.Item key={index} onClick={handleClick.bind(null, item)}>
					{item}
				</RC.Item>
			)
		});

		const QuestionTypeListStyle = {
			'width': '27vw',
			'textAlign': 'center',
			'display': 'inline-block',
			'margin': '1.2em 2em'
		};

		return (
			<div style={QuestionTypeListStyle}>
				<RC.List theme="inset">
					<RC.Item theme="body">
			     <h3>Question Types</h3>
			     <p>Select a question type to add a question</p>
			    </RC.Item>
			    <RC.Item theme="divider">Common Question Types</RC.Item>
					{list}
				</RC.List>
			</div>

		);
	}
});
