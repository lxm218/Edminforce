
  Template.po.events({
    
    'click .startmeasure' : function () {
      console.log('startmeasure!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      console.log("mac:" + mac);
      PoManagerCordova.startMeasure(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);
    },

    'click .getOfflineData' : function () {
      console.log('getOfflineData!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      } 
      PoManagerCordova.getOfflineData(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);

    },
    
    'click .getBattery' : function () {
      console.log('getBattery!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      } 
      PoManagerCordova.getBattery(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);

    },

    'click .disConnectDevice' : function () {
      console.log('disConnectDevice!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      PoManagerCordova.disConnectDevice(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);

    },

    'click .setDisconnectCallback' : function () {
      console.log('setDisconnectCallback!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      PoManagerCordova.setDisconnectCallback(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);

    }
    
  });

