
Meteor.startup(function(){
    if(Meteor.isClient){
        //desiable input enter event
        $('body').keydown(function(e){
            let o = $(e.target).closest('input[type="text"]');
            if(e.keyCode===13 && o.length > 0){
                return false;
            }

        })
    }
})
