IH.Survey.OptionRedirect = class extends React.Component {
	constructor(props) {
		super(props);
	}

	addRedirect(e) {
    let selectedIndex = e.target.selectedIndex - 1;
		let option = this.props.option;
		let redirectValue = e.target.value;
		let questionObj = this.props.redirectList[selectedIndex];
		this.props.setRedirectObj(questionObj);
		if(IH.Survey.isDifferentBranch(questionObj, this.props.currentQuestionObj)) {
			this.props.setIsNewBranch(true);
		}
		option.redirect = questionObj._id;
		let currentQuestionObj = this.props.currentQuestionObj;
		currentQuestionObj.options[this.props.index] = option;
		this.props.setCurrentQuestionObj(currentQuestionObj);
		this.props.setRedirectObj(questionObj);
	}

	renderNewBranch() {
		if(this.props.option && this.props.redirectObj) {
			let option = this.props.option;
			let redirectValue = this.props.redirectObj.question;
			let style = {
				'padding': '0.5em',
	    	'marginTop': '0.5em'
			}
			if(redirectValue && this.props.isNewBranch) {
				return (
					<div>
						Redirect:
						<RC.Item style={style} onClick={this.handleNewBranch.bind(this)}>
							{redirectValue}
						</RC.Item>
					</div>
				)
			}
		}
	}

	renderRedirectList() {
		let redirectList = _.map(this.props.redirectList, (redirectObj) => {return redirectObj.question});
		redirectList.unshift('');
		let redirectValue = this.props.redirectObj && this.props.redirectObj.question;
		if(redirectValue && !this.props.isNewBranch) {
			return <RC.Select options={redirectList} value={redirectValue} label="Redirect To" onChange={this.addRedirect.bind(this)} />
		}
	}

	handleNewBranch() {
		let redirect = this.props.option.redirect;
		let back = this.props.currentQuestionObj._id;
		let backOption = this.props.option._id;
		//set the currentQuestionObj to be null at first to make the page transition less snappy
		this.props.setCurrentQuestionObj(null);
		this.props.setSurveyState('');
		this.props.setBack(back);
		this.props.setBackOption(backOption);
		this.props.setCurrentQuestionId(redirect);
		this.props.setNewQuestionMode(true);
	}

	render() {
		let redirectStyle = {
			'transform': 'translate(0,-1.2em)'
		}
		return (
			<div style={redirectStyle}>
				{this.renderNewBranch()}
				{this.renderRedirectList()}
			</div>
		)
	}
}
