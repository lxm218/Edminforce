
IH.Schema.Reviews = new SimpleSchema({
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date
        };
      } else {
        return this.unset();
      }
    }
  },
  updateAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  },
  doctor: {
    type: String
  },
  doctorId: {
    type: String
  },
  reviewer: {
    type: String,
    optional: true
  },
  reviewerId: {
    type: String,
    optional: true,
    unique: true
  },
  rating: {
    type: Number
  },
  testimony: {
    type: String,
    optional: true
  }
});

Reviews = new Mongo.Collection("reviews");
Reviews.attachSchema(IH.Schema.Reviews);

Reviews.allow({
  insert: function() {},
  update: function(doc) {
    return Meteor.userId() && Meteor.userId() === doc.reviewerId;
  },
  remove: function(doc) {}
})
