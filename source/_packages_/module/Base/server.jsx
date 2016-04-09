KG.SyncedCron.config({
	log : true
});
console.log(KG.SyncedCron.options)

Meteor.startup(function(){
	Meteor.setTimeout(function(){
		if(!KG.SyncedCron.running){
			KG.SyncedCron.start();
		}
	}, 3000);
});
