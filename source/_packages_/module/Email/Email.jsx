
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

                let from = 'help@calcoloracademy.com',
                    domain = KG.util.email.getDomain(from);

                data = _.extend({
                    to : 'liyangwood@sohu.com',
                    from : `${domain}<${from}>`,
                    html : '',
                    text: '',
                    subject: 'Test Subject'
                }, data || {});

                return self.mailgun.send(data);
            },

            sendClassRegistrationCReceiptAndSchedule(opts){
                let accountID = opts.accountID,
                    studentName = opts.student.name,
                    className = opts.class.nickName,
                    teacher = opts.class.teacher;

                let account = KG.get('EF-Customer').getDB().findOne({
                    _id : accountID
                });

                let html = [
                    '<h3>Dear '+account.name+'</h3>',
                    '<h4>Registration is successful for:</h4>',
                    '<p>Student : '+studentName+'</p>',
                    '<p>Class : '+className+'</p>',
                    '<p>Teacher : '+teacher+'</p>'
                ].join('');

                console.log(html);
                return self.callMeteorMethod('sendEmail', [{
                    html : html,
                    to : account.email,
                    subject : 'Registration Class Success.'
                }]);
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