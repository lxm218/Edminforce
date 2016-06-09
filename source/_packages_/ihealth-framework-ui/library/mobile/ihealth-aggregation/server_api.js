
class AS {
  constructor(options){
    const defaults = {
      server: "http://localhost:5002",
      appId: "DevApp"
    };

    _.defaults(options, defaults);
    Object.assign(this, options);
  }

  _connect() {
    this.connection = DDP.connect(this.server);
  }

  uploadMeasurementData(data) {
    check(data, Object);

    this.connection.call('aggregateMeasureData', this.appId, data, function(err, res) {
      if (err)
        console.log(`[uploadMeasurementData] error: ${err.error}`);
      else
        console.log(`[uploadMeasurementData] res: ${JSON.stringify(res)}`)
    });

    return true
  }

  subscribeSingleUser() {
    let self = this;

    function onStop (error) {
      console.log(`[subscribeSingleUser] stopped. ${error ? error.error : null}`)
    }

    function onReady () {
      let remoteCollection = new Mongo.Collection('aggregated_data', self.connection);
      let cursor = remoteCollection.find();

      class Action {
        constructor(doc) {
          this.type = "SingleUserAggrReceived";
          this.payload = doc;
        }
      }

      let handle = cursor.observe({
        added: function(doc) {
          let action = new Action(doc);
          IH.Dispatcher.App.dispatch(action);
          //return console.log("added: ", JSON.stringify(doc));
        },
        changed: function(newDoc, oldDoc) {
          let action = new Action(newDoc);
          IH.Dispatcher.App.dispatch(action);
          //return console.log("changed: ", JSON.stringify(newDoc));
        },
        removed: function(doc) {
          //return console.log("removed: ", JSON.stringify(doc));
        }
      });
    }

    self.connection.subscribe('SingleUserAggregates', self.appId, {onStop: onStop, onReady: onReady});
  }

  _registerDeviceDispatcher() {
    // By default is private, but allows developer to customize

    this.DeviceDispatcherHandle = IH.Dispatcher.Devices.register((action)=> {
      switch (action.type) {

        case "NewMeasurementDataReceived":
          console.log("Dispatcher MeasurementDataReceived Triggered");

          //if (action.payload)
          //  this.uploadMeasurementData(action.payload);
          //else {
          //  throw new Meteor.Error("No_measurement_data");
          //}
          break;

      }
    })
  }

  _registerAppDispatcher() {
    // By default is private, but allows developer to customize

    this.AppDispatcherHandle = IH.Dispatcher.App.register((action)=> {
      switch (action.type) {

        case "SingleUserAggrReceived":
        // Save the doc in App DB
          console.log("Dispatcher SingleUserAggrReceived Triggered");
      }
    })
  }

  _unRegisterDevicesDispatcher() {
    IH.Dispatcher.Devices.unregister(this.DeviceDispatcherHandle);
  }

  _unRegisterAppDispatcher() {
    IH.Dispatcher.App.unregister(this.AppDispatcherHandle);
  }
}

/**
 * Initialize configs
 */
const server = Meteor.settings && Meteor.settings.AggregationServerAddress;
const appId = Meteor.settings && Meteor.settings.appId;

IH.AS = new AS({
  server: server,
  appId: appId
});


/**
 * Auto-connect aggregation server
 */
Meteor.startup(function(){

  //console.log(`AS config: server ${IH.AS.server}, appId ${IH.AS.appId}`);

  IH.AS._connect();

  IH.AS._registerDeviceDispatcher();
  IH.AS._registerAppDispatcher();

  IH.AS.subscribeSingleUser();

});