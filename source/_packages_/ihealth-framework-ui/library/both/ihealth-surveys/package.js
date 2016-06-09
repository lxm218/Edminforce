Package.describe({
  name: 'ihealth:surveys',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: null
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.imply([
    "ihealth:utils",
  ], ["client","server"])
  api.use([
    "react",
    "ihealth:utils",
    "ihealth:framework-engine",
  ], ["client","server"])

  api.use(['ecmascript'], 'client');
  api.addFiles('lib/survey.jsx', ['client', 'server'])
  api.addFiles(['server/publications.js', 'server/methods.js'], 'server');
  api.addFiles([
    'client/helpers/uiIcon.jsx',
    'client/Notifications/SurveyCreatorSuccess.jsx', 'client/Notifications/SurveyTakerSuccess.jsx',
    'client/Questions/Choice/Buttons/ChoiceAddButton.jsx', 'client/Questions/Choice/Buttons/ChoiceSaveButton.jsx',
    'client/Questions/Choice/Options/Option.jsx', 'client/Questions/Choice/Options/OptionList.jsx', 'client/Questions/Choice/Options/OptionRedirect.jsx', 'client/Questions/Choice/Options/OptionRedirectButton.jsx',
    'client/Questions/Choice/Choice.jsx', 'client/Questions/Choice/MultipleChoice.jsx', 'client/Questions/Choice/MultipleChoiceEdit.jsx', 'client/Questions/Choice/SingleChoice.jsx', 'client/Questions/Choice/SingleChoiceEdit.jsx',
    'client/Questions/Text/CommentBox.jsx', 'client/Questions/Text/CommentBoxEdit.jsx', 'client/Questions/Text/SingleText.jsx', 'client/Questions/Text/SingleTextEdit.jsx', 'client/Questions/Text/Text.jsx', 'client/Questions/Text/TextEdit.jsx',
    'client/ResponseView/ResponseView.jsx',
    'client/Summary/QuestionSummary.jsx', 'client/Summary/QuestionSummaryList.jsx', 'client/Summary/ResponseSummary.jsx', 'client/Summary/Summary.jsx', 'client/Summary/SurveySummary.jsx',
    'client/SurveyPreview/QuestionPreview.jsx', 'client/SurveyPreview/SurveyPreview.jsx', 'client/SurveyPreview/SurveyPreviewBody.jsx',
    'client/SurveyTitle/SurveyTitle.jsx', 'client/SurveyTitle/SurveyTitleEdit.jsx',
    'client/SurveyView/PrevNextButton.jsx', 'client/SurveyView/QuestionView.jsx', 'client/SurveyView/SurveyView.jsx', 'client/SurveyView/SurveyViewBody.jsx',
    'client/RegistrationSurveyCreator.jsx', 'client/responseList.jsx', 'client/SurveyEdit.jsx', 'client/SurveyList.jsx', 'client/TypeList.jsx'
    ], 'client');

});
