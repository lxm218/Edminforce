let PermissionSchema = {
	role : KG.schema.default(),
	nickName : KG.schema.default({
		optional : true
	}),
	viewPermission : KG.schema.default({
		type : Object,
		optional : true,
		blackbox : true,
		defaultValue : {}
	}),
	editPermission : KG.schema.default({
		type : Object,
		optional : true,
		blackbox : true,
		defaultValue : {}
	}),
	deletePermission : KG.schema.default({
		type : Object,
		optional : true,
		blackbox : true,
		defaultValue : {}
	}),
	insertPermission : KG.schema.default({
		type : Object,
		optional : true,
		blackbox : true,
		defaultValue : {}
	}),
	canBeDelete : KG.schema.default({
		type : Boolean,
		optional : true,
		defaultValue : true
	}),
	createTime : KG.schema.createTime(),
	updateTime : KG.schema.updateTime()
};

let Base = KG.getClass('Base');
KG.define('EF-AdminPermission', class extends Base{
	defineDBSchema(){
		return PermissionSchema;
	}
	addTestData(){
		//add admin role
		this._db.remove({role : 'admin'});

		let f = false;
		this._db.insert({
			role : 'admin',
			nickName : 'Admin',
			canBeDelete : false,

			viewPermission : {
				customer : f,
				student : f
			},
			editPermission : {
				customer : f,
				schoolCredit : f,

				student : f,
				studentComment : f
			},
			insertPermission : {
				studentComment : f
			},
			deletePermission : {
				student : f,
				studentComment : f
			}
		});

		// add teacher role

	}
});