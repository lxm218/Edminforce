
## ----------------------- iHealth user reviews schema ----------------------- ##

## single review schema
iHealth.schemas.reviews = new SimpleSchema

  createdAt:
    type: Date
    autoValue: ->
      if @isInsert
        new Date()
      else if @isUpsert
        $setOnInsert: new Date
      else
        @unset()

  updateAt:
    type: Date
    autoValue: ->
      if @isUpdate
        new Date()
    denyInsert: true
    optional: true

  ## Doctor's name
  doctor:
    type: String

  ## Doctor's `_id`
  doctorId:
    type: String

  ## Reviewer's name, can be anonymous
  reviewer:
    type: String
    optional: true

  ## Reviewer's `_id`
  reviewerId:
    type: String
    optional: true
    unique: true

  rating:
    type: Number

  testimony:
    type: String
    optional: true

@Reviews = new Mongo.Collection("reviews")
Reviews.attachSchema(iHealth.schemas.reviews)


## ----------------------- iHealth user reviews permissions ----------------------- ##

Reviews.allow

  insert: ->
    # TODO: "patient" only

  update: (doc) ->
    Meteor.userId() and Meteor.userId() is doc.reviewerId

  remove: (doc) ->
    # TODO: "admin"? and "patient"

