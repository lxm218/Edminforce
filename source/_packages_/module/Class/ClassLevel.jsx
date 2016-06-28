let Base = KG.getClass('Base');
KG.define('EF-ClassLevel', class extends Base{
	defineDBSchema(){
		return Schema.ClassLevel;
	}


	defineMeteorMethod(){
		let self = this;

		return {
			getAllByQuery : function(query={}, option={}){
				return self._db.find(query, {
					sort : option.sort || {
						createTime : -1
					}
				}).fetch();
			},

			removeById : function(id){
				let m = KG.DataHelper.getDepModule();
				let x = m.Class.getDB().find({
					levels : {$in : [id]}
				}).count();

				if(x.length > 0) return false;

				self._db.remove({_id : id});
				return true;
			}
		};
	}
});