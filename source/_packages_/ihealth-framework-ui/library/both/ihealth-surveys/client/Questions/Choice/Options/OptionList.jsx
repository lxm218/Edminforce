IH.Survey.OptionList = class extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if(!this.props.options) {
			let emptyOptions = _.range(3).map(() => {
				return {
					value: '',
					_id: Meteor.uuid()
				}
			});
			this.props.setOptions(emptyOptions);
		}
		else {
			this.props.setOptions(this.props.currentQuestionObj.options);
		}
	}

	render() {
		let options = this.props.options;
		if(this.props.editMode) {
			options = this.props.currentQuestionObj && this.props.currentQuestionObj.options;
		}
		let props = this.props;
		if(options) {
			options = options.map((option, index) => {
				let optionProps = {
					option: option,
					index: index
				}
				_.extend(optionProps, props);
			  return <IH.Survey.Option key={index} {...optionProps} />
			});
			return (
				<div>
					{options}
				</div>
			);
		}
		else {
			return <div></div>
		}
	}
};
