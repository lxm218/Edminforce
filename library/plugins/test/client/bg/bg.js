
  Template.bg.events({
    
    'click .startmeasure' : function () {
      console.log('startmeasure!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      console.log("mac:" + mac);
      BgManagerCordova.startMeasure(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);
    },

    'click .setUnit' : function () {
      console.log('setUnit!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      BgManagerCordova.setUnit(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac, 1);

    },

    'click .setBottleMessage' : function () {
      console.log('setBottleMessage!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      BgManagerCordova.setBottleMessage(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac, qr, 25, "2015-11-29 00:00:00");

    },

    'click .getBottleMessage' : function () {
      console.log('getBottleMessage!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      BgManagerCordova.getBottleMessage(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);

    },

     'click .setBottleId' : function () {
      console.log('setBottleId!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      BgManagerCordova.setBottleId(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac, 123456);

    },

    'click .getBottleId' : function () {
      console.log('getBottleId!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      BgManagerCordova.getBottleId(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);

    },

    'click .getOfflineData' : function () {
      console.log('getOfflineData!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      } 
      BgManagerCordova.getOfflineData(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);

    },

    'click .getBattery' : function () {
      console.log('getBattery!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      BgManagerCordova.getBattery(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);

    },

    'click .deleteOfflineData' : function () {
      console.log('deleteOfflineData!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      BgManagerCordova.deleteOfflineData(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);

    },

    'click .disConnectDevice' : function () {
      console.log('disConnectDevice!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      BgManagerCordova.disConnectDevice(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);

    },

    'click .setDisconnectCallback' : function () {
      console.log('setDisconnectCallback!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      BgManagerCordova.setDisconnectCallback(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);

    },

    'click .holdLink' : function () {
      console.log('holdLink!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      BgManagerCordova.holdLink(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);
    }
  });

