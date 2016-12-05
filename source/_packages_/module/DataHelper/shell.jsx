

Meteor.methods({
	'DataHelper:SyncClassTeacherID' : function() {
		let m = KG.DataHelper.getDepModule();
		let classList = m.Class.getDB().find().fetch();

		_.each(classList, (item)=>{
			if(item.teacher && !item.teacherID){
				let tmp = m.AdminUser.getDB().findOne({nickName : item.teacher});
				if(tmp){
					console.log(tmp._id, tmp.nickName);
					m.Class.getDB().update({_id : item._id}, {
						$set : {
							teacherID : tmp._id,
							teacher : tmp.nickName
						}
					});
				}
			}
			else if(item.teacherID){
				let tmp = m.AdminUser.getDB().findOne({_id : item.teacherID});
				if(tmp){
					m.Class.getDB().update({_id : item._id}, {
						$set : {
							teacher : tmp.nickName
						}
					});
				}
			}
		});

		return true;
	},

	'DataShell:GetGithubIssue636Result' : function(){
		let m = KG.DataHelper.getDepModule();
		let date = moment('05/21/2016', KG.const.dateFormat);
		let rs = {};

		let md = m.Order.getDB().find({
			type : 'register class',
			status : 'success',
			paymentSource : 'mobile',
			updateTime : {
				'$gte' : date.clone().toDate()
			}
		});
		rs.mobileCount = md.count();
		rs.mobile = {
			'credit card' : 0,
			'echeck' : 0,
			'cash' : 0,
			'check' : 0
		};
		_.each(md.fetch(), (item)=>{
			if(!_.isUndefined(rs.mobile[item.paymentType]))
				rs.mobile[item.paymentType] += item.amount;
		});

		let ad = m.Order.getDB().find({
			type : 'register class',
			status : 'success',
			paymentSource : 'admin',
			updateTime : {
				'$gte' : date.clone().toDate()
			}
		});
		rs.adminCount = ad.count();
		rs.admin = {
			'credit card' : 0,
			'echeck' : 0,
			'cash' : 0,
			'check' : 0
		};
		_.each(ad.fetch(), (item)=>{
			if(!_.isUndefined(rs.admin[item.paymentType]))
				rs.admin[item.paymentType] += item.amount;
		});

		return rs;
	},

	'DataShell:SyncNumberOfRegister' : function(){
		let m = KG.DataHelper.getDepModule();

		const cl = m.Class.getDB().find().fetch();
		_.each(cl, (item)=>{
			m.Class.callMeteorMethod('syncNumberOfRegister', [item._id]);
		});
	}
});