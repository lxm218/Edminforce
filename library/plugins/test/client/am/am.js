
  Template.am.events({

    'click .resetDevice' : function () {
      console.log('resetDevice!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      console.log("mac:" + mac);
      AmManagerCordova.resetDevice(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);
    },

    'click .getUserId' : function () {
      console.log('getUserId!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      } 
      AmManagerCordova.getUserId(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);

    },
    
    'click .setUserId' : function () {
      console.log('setUserId!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      } 
      AmManagerCordova.setUserId(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac, 123456);

    },

    'click .setUserMessage' : function () {
      console.log('setUserMessage!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      } 
      AmManagerCordova.setUserMessage(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac, 29, 69, 176, 1, 1, 1, 10000, 12);

    },
    
    'click .getUserMessage' : function () {
      console.log('getUserMessage!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      } 
      AmManagerCordova.getUserMessage(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);

    },
    
    'click .getClocktotal' : function () {
      console.log('getClocktotal!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      } 
      AmManagerCordova.getClocktotal(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);

    },
    
    'click .getClockDetail' : function () {
      console.log('getClockDetail!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      } 
      AmManagerCordova.getClockDetail(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);

    },
    
    'click .setClock' : function () {
      console.log('setClock!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      } 
      
      var weeks = new Uint8Array([0, 1, 1, 1, 1, 1, 0]);
      AmManagerCordova.setClock(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac, 1, 7, 10, true, weeks, true);

    },
    
    'click .deleteClock' : function () {
      console.log('deleteClock!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      } 
      AmManagerCordova.deleteClock(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);

    },
    
    'click .getRemind' : function () {
      console.log('getRemind!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      } 
      AmManagerCordova.getRemind(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);

    },
    
    'click .setRemind' : function () {
      console.log('setRemind!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      } 
      AmManagerCordova.setRemind(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac, 10, true);
    },
    
    'click .getActivityMessage' : function () {
      console.log('getActivityMessage!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      } 
      AmManagerCordova.getActivityMessage(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);

    },
    
    'click .getSleepMessage' : function () {
      console.log('getSleepMessage!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      } 
      AmManagerCordova.getSleepMessage(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);

    },

    'click .getStageMessage' : function () {
      console.log('getStageMessage!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      } 
      AmManagerCordova.getStageMessage(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);

    },
    
    'click .getBattery' : function () {
      console.log('getBattery!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      } 
      AmManagerCordova.getBattery(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);

    },
    
    'click .getRealTimeMessage' : function () {
      console.log('getRealTimeMessage!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      } 
      AmManagerCordova.getRealTimeMessage(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);

    },
  
    'click .getHourType' : function () {
      console.log('getHourType!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      } 
      AmManagerCordova.getHourType(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);

    },
    
    'click .setHourType' : function () {
      console.log('setHourType!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      } 
      AmManagerCordova.setHourType(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac, 12);

    },
   
    'click .setRandom' : function () {
      console.log('setRandom!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      } 
      AmManagerCordova.setRandom(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);

    },

    'click .disConnectDevice' : function () {
      console.log('disConnectDevice!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      AmManagerCordova.disConnectDevice(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);

    },

    'click .setDisconnectCallback' : function () {
      console.log('setDisconnectCallback!');
      var success = function(message){
        console.log(message);
      }

      var failure = function(message){
        console.log(message);
      }
      AmManagerCordova.setDisconnectCallback(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);

    }
    
  });

