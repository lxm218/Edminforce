IH.Survey.PrevNextButton = class extends React.Component {
	constructor(props) {
		super(props);
	}
	handlePrev() {
		let questionObj = this.props.currentQuestionObj;
		let previousObj = IH.Survey.history.pop();
		this.props.setCurrentQuestionId(previousObj._id);
	}

	handleNext() {
		let props = this.props;
		let questionObj = props.currentQuestionObj;
		IH.Survey.handleNext(props, questionObj)
	}

	handleDone() {
		let props = this.props;
		let questionObj = props.currentQuestionObj;
		IH.Survey.addResponse(props.survey_id, questionObj.survey_creator_id, Meteor.userId(), props.answersHash, (err, result) => {
			if(!err) {
				FlowRouter.go('/surveys/' + props.survey_id + '/success');
			}
		});
	}

	handleFinishCreatingSurvey() {
		let url = '/surveys/' + this.props.survey_id + '/created';
		FlowRouter.go(url);
	}

	renderPrevButton() {
		let style = {
      'marginRight': '2em',
      'transform': 'translate(-8em,-2em)',
      'position': 'absolute'
		}
		if((IH.Survey.history.length > 0) && (!this.props.newQuestionMode || (IH.Survey.history[IH.Survey.history.length - 1].back === this.props.back))) {
			return <RC.Button theme="inline" bgColor="brand3" style={style} onClick={this.handlePrev.bind(this)}>Previous</RC.Button>
		}
	}

	renderNextButton() {
		let currentQuestionObj = this.props.currentQuestionObj;
		let next = currentQuestionObj.next;
		let hasNext = next && (this.props.allQuestionIds.indexOf(next) !== -1);
		let hasRedirect = false
		_.each(currentQuestionObj.options, (option) => {
			if(option.redirect) {
				hasRedirect = true;
			}
		})
		if(hasNext || hasRedirect) {
			return <RC.Button theme="inline" bgColor="brand2" style={this.getNextButtonStyle()} onClick={this.handleNext.bind(this)}>&nbsp;&nbsp;Next&nbsp;&nbsp;&nbsp;</RC.Button>
		}
		else if(!this.props.previewMode) {
			return <RC.Button theme="inline" bgColor="brand1" style={this.getNextButtonStyle()} onClick={this.handleDone.bind(this)}>&nbsp;&nbsp;Done&nbsp;&nbsp;&nbsp;</RC.Button>
		}
	}

	renderFinishButton() {
		if(this.props.previewMode) {
			let style = {
				'transform': 'translate(-4em, 3em)',
				'position': 'absolute',
				'marginBottom': '4em'
			}
			return <RC.Button theme="inline" bgColor="brand1" style={style} onClick={this.handleFinishCreatingSurvey.bind(this)}>Finish</RC.Button>
		}
	}

	getNextButtonStyle() {
		return {
      'marginRight': '2em',
      'transform': 'translate(-1em,-2em)',
      'position': 'absolute'
    }
	}

	render() {
		if(this.props.currentQuestionObj) {
	    return (
	      <RC.Div style={IH.Survey.centerStyle()}>
	      	{this.renderPrevButton()}
	        {this.renderNextButton()}
	        {this.renderFinishButton()}
	      </RC.Div>
	    );
	  }
	  else {
	  	return <div></div>
	  }
	}
}
