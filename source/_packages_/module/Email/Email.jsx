
let Base = KG.getClass('Base');
KG.define('EF-Email', class extends Base{

    _initDB(){}

    initVar(){
        if(Meteor.isServer){
            this.config = {
                apiKey: 'key-7c3f0e76ebeead059ae2869f33bf927e',
                domain: 'classforth.com'
            };

            this.mailgun = new Mailgun(this.config);
        }

    }

    defineMeteorMethod(){
        let self = this;
        return {
            sendEmail(data){

                let from = 'contact@classforth.com',
                    domain = KG.util.email.getDomain(from);

                data = _.extend({
                    to : 'liyangwood@sohu.com',
                    from : `${domain}<${from}>`,
                    html : '',
                    text: '',
                    subject: 'Test Subject'
                }, data || {});

                return self.mailgun.send(data);
            }
        };
    }

    defineClientMethod(){
        return {
            send(data, callback){
                this.callMeteorMethod('sendEmail', [data], {
                    context : this,
                    success : function(rs){
                        if(rs.error){
                            callback(false, rs.error);
                        }
                        else{
                            callback(true, rs.response);
                        }
                    },
                    error : function(err){
                        callback(false, err);
                    }
                });
            }
        };
    }

    test(){
        if(Meteor.isClient) return;
        let data = {
            'to': 'liyang@chinagate.com',
            'from': 'no-reply@test.com',
            'html': '<html><head></head><body>This is a test</body></html>',
            'text': 'This is a test',
            'subject': 'Test Subject'
        };

        let rs = this.mailgun.send(data);
        console.log(rs);
    }

});

Meteor.startup(function(){
    KG.create('EF-Email');
    KG.create('EF-EmailTemplate');
});