

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
	}
});