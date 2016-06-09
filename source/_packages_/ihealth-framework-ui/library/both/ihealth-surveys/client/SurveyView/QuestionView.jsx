IH.Survey.QuestionView = class extends React.Component {
	constructor(props) {
		super(props);
	}
	handleClickSingleChoice(e) {
		Meteor.defer(() => {
			let selectionValue = this.refs.singleChoice.getValue();
			this.props.addToAnswersHash(this.props.questionObj._id, selectionValue);
		}.bind(this));
	}

	renderSingleChoice(questionObj, questionStyle) {
		let options = _.map(questionObj.options, (option) => {
			return {'value': option.value, 'label': option.value}
		});
		let answer = this.props.answersHash && this.props.answersHash[this.props.questionObj._id];
		return (
			<div>
				<RC.RadioGroup key={this.props.questionObj._id + '-' + this.props.index} ref="singleChoice" uiBgColor="green" list={options} value={answer} style={questionStyle} onChange={this.handleClickSingleChoice.bind(this)} />
			</div>
		)
	}

	handleClickMultipleChoice(index, e) {
		Meteor.defer(() => {
			let ref = '' + index;
			let selectionValue = this.refs[ref].getValue();
			let answersHash = this.props.answersHash;
			let optionsHashPrevious = answersHash[this.props.questionObj._id];
			let optionsHash = {};
			let optionsHashNew = {};
			optionsHashNew[index] = selectionValue;
			_.extend(optionsHash, optionsHashPrevious);
			_.extend(optionsHash, optionsHashNew);
			this.props.addToAnswersHash(this.props.questionObj._id, optionsHash);
		}.bind(this));
	}

	renderMultipleChoice(questionObj, questionStyle) {
		let handleClickMultipleChoice = this.handleClickMultipleChoice.bind(this);
		let answer = this.props.answersHash && this.props.answersHash[this.props.questionObj._id];
		let questionIndex = this.props.index;
		let options = _.map(questionObj.options, (option, index) => {
			let checked = answer && answer[index];
			let ref = '' + index;
			return <RC.Checkbox checked={checked} ref={ref} label={option.value} key={questionObj._id + '-' + questionIndex + '-' + index} style={questionStyle} onClick={handleClickMultipleChoice.bind(null, index)} />
		});
		return (
			<RC.Form>
				{options}
			</RC.Form>
		)
	}

	handleChangeSingleText(e) {
		Meteor.defer(() => {
			this.props.addToAnswersHash(this.props.questionObj._id, this.refs.singleText.getValue());
		}.bind(this));
	}

	renderSingleText() {
		let style = {
			'margin': '1em'
		}
		let answer = this.props.answersHash && this.props.answersHash[this.props.questionObj._id];
	  return (
			<div>
		  	<br />
		  	<RC.Input style={style} value={answer} key={this.props.questionObj._id + '-' + this.props.index} ref="singleText" onChange={this.handleChangeSingleText.bind(this)} />
		  </div>
		)
	}

	handleChangeCommentBox(e) {
		Meteor.defer(() => {
			this.props.addToAnswersHash(this.props.questionObj._id, this.refs.commentBox.getValue());
		}.bind(this));
	}

	renderCommentBox() {
		let style = {
			'margin': '1em'
		}
		let answer = this.props.answersHash && this.props.answersHash[this.props.questionObj._id];
		return (
			<div>
				<br />
				<RC.Textarea style={style} key={this.props.questionObj._id + '-' + this.props.index} ref="commentBox" onChange={this.handleChangeCommentBox.bind(this)}>
					{answer}
				</RC.Textarea>
			</div>
		)
	}

	handleEdit() {
		let questionObj = this.props.questionObj;
		let surveyState = IH.Survey.getEditState(questionObj.type);
		this.props.setSurveyState(surveyState);
		//this.props.setQuestionObj(questionObj);
	}

	renderEditButton() {
		if(this.props.previewMode) {
			return <button className="button button-small" onClick={this.handleEdit.bind(this)}>Edit</button>
		}
	}

	handleRemove() {
		let confirmed = confirm("Are you sure you want to remove this question?");
		if(confirmed) {
			IH.Survey.removeQuestion(this.props)
		}
	}

	renderRemoveButton() {
		if(this.props.previewMode) {
			let style = {
				'margin': '2em'
			}
			return <button className="button button-small" onClick={this.handleRemove.bind(this)} style={style}>Delete</button>
		}
	}

	render() {
		let questionObj = this.props.questionObj;
		let index = this.props.index;
		let questionStyle = {
			'textAlign': 'left'
		};

		return (
			<div>
				<RC.Item theme="divider" style={questionStyle} >
					{questionObj.question}
				</RC.Item>
				{
					questionObj.type == 'singleChoice' ?
						this.renderSingleChoice(questionObj, questionStyle)
					: questionObj.type == 'multipleChoice' ?
						this.renderMultipleChoice(questionObj, questionStyle)
					: questionObj.type == 'singleText' ?
						this.renderSingleText()
					: questionObj.type == 'commentBox' ?
						this.renderCommentBox()
					: ''
				}
				<br />
				{this.renderEditButton()}
				{this.renderRemoveButton()}
				<br /><br />
			</div>
	  )
	}
};
