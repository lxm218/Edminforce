
/**
 * Namespace
 */

Aggregation = {};

mapper = {};
reducer = {};
finalizer = {};
employers = {};

/**
 * Collections
 */

// Commented to avoid conflict with the measurement-db-engine package
//MeasurementsColl = new Mongo.Collection("measurements_v2");

GroupAggrColl = new Mongo.Collection("measurements_aggr_group");
GroupAggrColl._ensureIndex({'value.employerId' : 1});
GroupAggrColl._ensureIndex({'value.dataType' : 1});
GroupAggrColl._ensureIndex({'value.Date' : 1});
