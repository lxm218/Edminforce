let Base = KG.getClass('Base');

KG.define('EF-StudentComment', class extends Base{
	defineDBSchema(){
		return Schema.StudentComment;
	}


});