IH.Survey.SurveyViewBody = class extends React.Component {
  constructor(props) {
    super(props);
  }
  renderButtons() {
    return <IH.Survey.PrevNextButton {...this.props} />
  }

  renderTitle() {
    if(this.props.title) {
      return this.props.title;
    }
    else {
      return 'This is a preview of your survey';
    }
  }

  renderQuestionObj() {
    let currentQuestionObj = this.props.currentQuestionObj;
    if(currentQuestionObj) {
      let props = {
        questionObj: currentQuestionObj,
      };
      _.extend(props, this.props);
      return <IH.Survey.QuestionView {...props} />
    }
  }

  render() {
    return (
      <div style={this.props.viewStyle}>
        <h2>
          {this.renderTitle()}
        </h2>
        <br />
        {this.renderQuestionObj()}
        <br /><br />
        {this.renderButtons()}
        <br /><br />
      </div>
    );
  }
};
