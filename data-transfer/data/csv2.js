Order = new Mongo.Collection('order');
if (Meteor.isClient) {
  Template.upload.onCreated( () => {
    Template.instance().uploading = new ReactiveVar( false );
  });
  Template.upload.helpers({
    uploading() {
      return Template.instance().uploading.get();
    }
  });
  Template.upload.events({
    'change [name="upload_CSV"]' (event, template ) {
      Papa.parse(event.target.files[0], {
        header: true,
        complete(results, file) {
          Meteor.call('parseUpload', results.data, (error, response) => {
            if (error) {
              Bert.alert(error.reason, 'warning');
            } else {
              template.uploading.set(false);
              Bert.alert('Upload complete!', 'success', 'growl-top-right' );
            }
          });
        }
      });
    }
  });
}
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  Meteor.methods({
    parseUpload(data){
      //check(data, Array);
      for ( let i = 0; i < data.length; i++) {
        let item = data[i], 
            exists = Order.findOne({orderId: item.order_no});
        if ( (item.order_no === undefined) || !exists ) {
          orderId = Order.insert(item);
          console.log(orderId);
        } else {
          console.warn( 'Rejected. This item already exists.');
          console.log(exists.Age + "," + item.order_no);
        }
      }
    }
  });
}