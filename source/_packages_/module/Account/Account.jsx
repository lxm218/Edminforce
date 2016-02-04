
let Base = KG.getClass('Base');

KG.define('Account', class extends Base{
    defineDBSchema(){
        return Schema.Account;
    }

    defineDB(){

        Meteor.users.attachSchema(new SimpleSchema(this._schema));

        return Meteor.users;
    }

    publishMeteorData(){
        //Meteor.publish('userData', function(){
        //    return Meteor.users.find();
        //});
    }

    initEnd(){

    }

    addTestData(){
        //this._db.remove({});
        if(this._db.find().count() > 0){
            return;
        }

        let data = [
            {
                username : 'jacky@calphin.com',
                email : 'jacky@calphin.com',
                password : 'calphin'
            },
            {
                username : 'liyangwood@gmail.com',
                email : 'liyangwood@gmail.com',
                password : 'aaaaaa'
            }
        ];

        _.each(data, (item)=>{
            Accounts.createUser(item);
        });

    }

    checkIsLogin(){
        return !!Meteor.user() ? Meteor.user() : false;
    }

    login(opts){
        opts = _.extend({
            username : null,
            password : null,
            success : function(){},
            error : function(e){
                alert(e.reason);
            }
        }, opts);

        Meteor.loginWithPassword({
            username : opts.username
        }, opts.password, function(err){
            if(err){
                opts.error(err);
                return false;
            }

            if(Meteor.user()){
                opts.success(Meteor.user());
            }


        });
    }

});