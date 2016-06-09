
/**
 * Form Object (To be continued...)
 */



FORM_PAT = {

  //name: Match.OneOf("SignUp", "SignIn", "ChangePwd", "ResetPwd", "ForgotPwd"), // unique?
  schema: Match.Optional(SimpleSchema),

  // Appearance
  title: Match.Optional(String),
  message: Match.Options(String),   // message to display
  fields: Match.Optional([String]),   // input fields to check with schema
  //links: Match.Optional(Object),      // terms, privacy, etc, links
  //options: Match.Optional(Object),    // stayLoggedIn?
  buttons: Match.Optional(Object),    // "submit", "reset",

  // Status
  status: Match.OneOf(null, "valid", "success", "invalid", "error"),
  isValid: Match.Optional(Boolean),
  disabled: Match.Optional(Boolean),

  refs: Match.Optional(String),
  onSubmit: Match.Optional(Function),
  onSuccess: Match.Optional(Function),   // After submit returns success
  onError: Match.Optional(Function)

};




Form = function(params) {
  check(params, FORM_PAT);

  if (!params.schema) {
    params.schema = IH.Schema[this.name];
  }
  _.defaults(this, params);

  this.message = new ReactiveVar(null);
  this.status = new ReactiveVar(null);   // null, validated,


  this.isValid = new ReactiveVar(false);
  this.disabled = new ReactiveVar(true);
};

//Form.prototype.disable = function () {
//  return this.disabled.set(true);
//};
//
//Form.prototype.enable = function () {
//  return this.disabled.set(false);
//};

Form.prototype.clearMessage = function (){
  return this.message.set(null);
};

Form.prototype.setMessage = function (message:string){
  return this.message.set(message);
};

Form.prototype.clearStatus = function (){
  return this.status.set(null);
};

Form.prototype.setStatus = function (status:string){
  return this.status.set(status);
};

let _validateOneField = function (formDoc, key:string) {
  let self = this;
  if (!_isString(key) || !_.has(formDoc, key)) {
    self.setStatus("error");
    return false
  }

  let context = this.schema.namedContext(this.name);
  let field = _.pick(formDoc, key);
  let isValid = context.validateOne(field, key, {
    extendedCustomContext: {
      // Trigger the validation function only for forms
      // See schema.js
      isFormValidation: true
    }
  });

  if (isValid) {
    self.clearMessage();
    self.clearStatus();
  } else {
    let errMsg = context.keyErrorMessage(key);
    self.setMessage(errMsg);
    self.setStatus("error");
  }
  return isValid
};

// Throttle continuous validation to 1/200ms
Form.prototype.validateOneField = _.throttle(_validateOneField, 200);


