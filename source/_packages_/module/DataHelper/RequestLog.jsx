let Base = KG.getClass('Base');

KG.define('EF-Request', class extends Base{
	defineDBSchema(){
		return {
			operatorID : KG.schema.default(),
			operatorName : KG.schema.default(),
			type : KG.schema.default({
				allowedValues : ['login', 'logout', 'insert AdminUser', 'edit AdminUser', 'delete AdminUser',
					'insert Customer', 'edit Customer', 'delete Customer',
					'insert Student', 'edit Student', 'delete Student',
					'insert Class', 'edit Class', 'delete Class',
					'insert Program', 'edit Program', 'delete Program',
					'insert Session', 'edit Session', 'delete Session',
					'register class', 'change class', 'cancel class', 'trial class', 'makeup class',
					'pay order'
				]
			}),
			client : KG.schema.default({
				allowedValues:['admin', 'mobile']
			}),
			detail : {
				type : Object,
				optional : true,
				blackbox : true,
				defaultValue : {}
			},
			createTime : KG.schema.createTime(),
			updateTime : KG.schema.updateTime()
		};
	}

	addByType(type, param){
		let data = {
			operatorID : param.operatorID || Meteor.user()._id,
			operatorName : param.operatorName || Meteor.user().username
		};

		data.type = type;
		data.client = param.client || 'admin';
		switch(type){
			case 'login':
				data.detail = {};
				break;
			case 'logout':
				data.detail = {};
				break;
			case 'insert Customer':
			case 'edit Customer':
				data.detail = {
					id : param.id,
					data : param.data
				};
				break;

			case 'register class':
				data.detail = {
					id : param.id,
					data : param.data
				};
				break;

			default :
				throw new Meteor.Error('error', '[add log] '+type+' type is not valid');
		}

		this._db.insert(data);
	}
});

Meteor.startup(function(){
	KG.RequestLog = KG.create('EF-Request');
});