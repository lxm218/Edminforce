 
Template.discoverydevice.events({
    'click .discoveryam': function () {
      console.log('discovery am'); 
      var success = function(message){
        console.log(message);
        addScanDevice(message)

      }

      var failure = function(message){
        console.log(message);

      }

      AmManagerCordova.startDiscovery(success, failure, "7b0432e634fa417e5d73fd297a12dea8");
    },

    'click .discoverybg': function () {
      console.log('discovery bg');
      var success = function(message){
        console.log(message);
        addScanDevice(message)
      }

      var failure = function(message){
        console.log(message);        
      }

      BgManagerCordova.startDiscovery(success, failure, "7b0432e634fa417e5d73fd297a12dea8");   
    },

    'click .discoverybp': function () {
      console.log('discovery bp'); 
      var success = function(message){
        console.log(message); 
        addScanDevice(message)       
      }

      var failure = function(message){
        console.log(message);        
      }
      
      BpManagerCordova.startDiscovery(success, failure, "7b0432e634fa417e5d73fd297a12dea8");  
    },

    'click .discoveryhs': function () {
      console.log('discovery hs');
      var success = function(message){
        console.log(message);
        addScanDevice(message)
      }

      var failure = function(message){
        console.log(message);
      }

      HsManagerCordova.startDiscovery(success, failure, "7b0432e634fa417e5d73fd297a12dea8");  
    },

    'click .discoverypo': function () {
      console.log('discovery po');
      var success = function(message){
        console.log(message);
        addScanDevice(message)
      }

      var failure = function(message){
        console.log(message);
      }
      PoManagerCordova.startDiscovery(success, failure, "7b0432e634fa417e5d73fd297a12dea8");  
    }

  });

 function addScanDevice(message){
  var obj = JSON.parse(message);
  if (obj.msg == "discovery doing"){
    var rootlist = document.getElementById("discoverylist");
    subList = document.createElement("li");
    subList.addEventListener("click", function(){ 
      mac = obj.address;
      var success = function(message){
        console.log(message);
        addConnectedDevice(message);
      }

      var failure = function(message){
        console.log(message);
      }
      var name = obj.name;
      if(name == "AM3S"){
        AmManagerCordova.connectDevice(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);
      }else if(name == "BG5"){
        BgManagerCordova.connectDevice(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);
      }else if(name == "BP3L"){
		BpManagerCordova.connectDevice(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);
      }else if(name == "BP5"){
        BpManagerCordova.connectDevice(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);
      }else if(name == "HS4S"){
        HsManagerCordova.connectDevice(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);
      }else if(name == "PO3"){
        PoManagerCordova.connectDevice(success, failure, "7b0432e634fa417e5d73fd297a12dea8", mac);
      }   
      });
    subTextList = document.createTextNode(obj.name + " - " + obj.address);
    subList.appendChild(subTextList);
    rootlist.appendChild(subList);
  } 
}

function addConnectedDevice(message){
  var objconnected = JSON.parse(message);
  if (objconnected.msg == "connected"){
    var rootConnectedlist = document.getElementById("connectedlist");
    subConnectedlist = document.createElement("li");
    subConnectedlist.addEventListener("click", function(){ 
      mac = objconnected.address; 
      var name = objconnected.name;
      if(name == "AM3S"){
        Router.go('am');
      }else if(name == "BG5"){
        Router.go('bg');
      }else if(name == "BP5"){
        Router.go('bp');
      }else if(name == "BP3L"){
      	Router.go('bp');
      }else if(name == "HS4S"){
        Router.go('hs');
      }else if(name == "PO3"){
        Router.go('po');
      }   
      
    }); 
    subConnectedTextList = document.createTextNode(objconnected.name + " - " + objconnected.address);
    subConnectedlist.appendChild(subConnectedTextList);
    rootConnectedlist.appendChild(subConnectedlist);
  }
}