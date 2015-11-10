  Template.bp.events({
    
    'click .startmeasure' : function () {
      console.log('startmeasure!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      console.log("mac:" + mac);
      BpManagerCordova.startMeasure(success, failure, "7b0432e634fa417e5d73fd297a12dea8",mac);
    },
    
    'click .stopmeasure' : function () {
      console.log('stopmeasure!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      BpManagerCordova.stopMeasure(success, failure,"7b0432e634fa417e5d73fd297a12dea8",mac);

    },

    'click .enableOffline' : function () {
      console.log('enableOffline!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      BpManagerCordova.enableOffline( success, failure,"7b0432e634fa417e5d73fd297a12dea8",mac);

    },

    'click .disenableOffline' : function () {
      console.log('disenableOffline!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      BpManagerCordova.disenableOffline(success, failure,"7b0432e634fa417e5d73fd297a12dea8",mac);

    },

    'click .getOfflineNum' : function () {
      console.log('getOfflineNum!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      BpManagerCordova.getOfflineNum(success, failure, "7b0432e634fa417e5d73fd297a12dea8",mac);

    },

    'click .getOfflineData' : function () {
      console.log('getOfflineData!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      } 
      BpManagerCordova.getOfflineData(success, failure, "7b0432e634fa417e5d73fd297a12dea8",mac);

    },

    'click .getBattery' : function () {
      console.log('getBattery!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      BpManagerCordova.getBattery(success, failure, "7b0432e634fa417e5d73fd297a12dea8",mac);

    },

    'click .isEnableOffline' : function () {
      console.log('isEnableOffline!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      BpManagerCordova.isEnableOffline(success, failure,"7b0432e634fa417e5d73fd297a12dea8",mac);

    },

    'click .disConnectDevice' : function () {
      console.log('disConnectDevice!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      BpManagerCordova.disConnectDevice(success, failure,"7b0432e634fa417e5d73fd297a12dea8",mac);

    },

    'click .setDisconnectCallback' : function () {
      console.log('setDisconnectCallback!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      BpManagerCordova.setDisconnectCallback(success, failure,"7b0432e634fa417e5d73fd297a12dea8",mac);

    },

    'click .confirmAngle' : function () {
      console.log('confirmAngle!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      BpManagerCordova.confirmAngle(success, failure,"7b0432e634fa417e5d73fd297a12dea8",mac);
    },
    
     'click .getIDPS' : function () {
      console.log('getIDPS!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      BpManagerCordova.getIDPS(success, failure,"7b0432e634fa417e5d73fd297a12dea8",mac);
    }

  });

