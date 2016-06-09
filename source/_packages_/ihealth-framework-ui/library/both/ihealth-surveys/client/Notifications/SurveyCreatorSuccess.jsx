IH.Survey.SurveyCreatorSuccess = class extends React.Component {
  render() {
    let style = {
      'textAlign': 'center'
    }
    let url = '/summary/' + this.props.survey_id;
    return (
      <RC.Div style={style}>
        <RC.Item>
          You have succesfully created the survey!
        </RC.Item>
        <a href={url}>
          <RC.Item>
            View the Survey
          </RC.Item>
        </a>
        <a href="/surveyList">
          <RC.Item>
            Go to the surveys list
          </RC.Item>
        </a>
      </RC.Div>
    );
  }
};
