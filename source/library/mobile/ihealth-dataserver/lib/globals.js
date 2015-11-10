

DataServerURL = (Meteor.settings && Meteor.settings.DataServerURL) || "http://localhost:3000";

/**
 * Should have one doc only
 *
 * @type {Mongo.Collection}
 */
AppInfo = new Mongo.Collection("ds_appInfo");


/**
 * DataServer namespace
 *
 * @type {{}}
 */
DataServer = {};

internal = {};


/**
 * DataTypes
 *
 * @type {{}}
 */
DataTypes = {};

//UserInfo
DataTypes.UserInfo = {};
DataTypes.UserInfo.remoteCollectionName = "user_info";

//activity
DataTypes.Activity = {};
DataTypes.Activity.remoteCollectionName = "user_activity";

//BG
DataTypes.BG = {};
DataTypes.BG.remoteCollectionName = "user_bloodGlucose";

//SpO2
DataTypes.SpO2 = {};
DataTypes.SpO2.remoteCollectionName = "user_spo2";

//BP
DataTypes.BP = {};
DataTypes.BP.remoteCollectionName = "user_bloodPressure";

//weight
DataTypes.Weight = {};
DataTypes.Weight.remoteCollectionName = "user_weight";

//sleep
DataTypes.Sleep = {};
DataTypes.Sleep.remoteCollectionName = "user_sleep";

//food
DataTypes.Food = {};
DataTypes.Food.remoteCollectionName = "user_food";

//sport
DataTypes.Sport = {};
DataTypes.Sport.remoteCollectionName = "user_sport";