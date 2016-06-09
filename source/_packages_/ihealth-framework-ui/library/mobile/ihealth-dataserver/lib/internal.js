
internal.getAppAccessToken = function (){
  var appInfo = AppInfo.findOne();
  if (appInfo && appInfo.accessToken) {
    return appInfo.accessToken
  } else {
    throw new Meteor.Error("App_No_AccessToken", "App must be registered at DataServer to use other functions.")
  }
};

internal.saveAppAccessToken = function (accessToken){
  var appInfo = AppInfo.findOne();
  var appId = appInfo ? appInfo._id : null;
  AppInfo.upsert({_id: appId}, {$set: {accessToken: accessToken}})
};

internal.checkAndCleanDataFormat = function (dataObj){
  let cleanedObj;

  // userId polyfill
  let {userId, UID} = dataObj;
  userId = userId || UID;
  cleanedObj = _.extend(_.omit(dataObj, "UID"), {userId: userId});


  // TODO: check with schema

  return cleanedObj
};

internal._hashToMD5 = function () {
  check(arguments, [String]);
  let beforeHash = _.reduce(_.toArray(arguments), (base, each) => {return base.concat(each)}, "");
  console.log(`beforeHash: ${beforeHash}`);
  return CryptoJS.MD5(beforeHash).toString();
};
