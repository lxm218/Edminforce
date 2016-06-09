IH.Survey.SurveyTakerSuccess = class extends React.Component {
  render() {
    let style = {
      'textAlign': 'center'
    }
    return (
      <RC.Div style={style}>
        <RC.Item>
          You have succesfully completed the survey!
        </RC.Item>
        <a href="/surveyList">
          <RC.Item>
            Back to the surveys list
          </RC.Item>
        </a>
      </RC.Div>
    );
  }
};
