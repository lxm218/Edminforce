IH.Survey.RegistrationSurveyCreator = class extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    addCreatorRole = (result) => {
      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'profile.role': 'survey_creator'
        }
      });
      FlowRouter.go('/');
    }
    return (
      <IH.RC.User fullHeight={true} action="register" disableSwitch={true} theme="overlay-dark" bgColor="white" registerCallback={addCreatorRole}>
        <img src="/assets/logo.png" />
      </IH.RC.User>
    )
  }
};
