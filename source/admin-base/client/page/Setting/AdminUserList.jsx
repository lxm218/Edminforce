
KUI.Setting_AdminUserList = class extends KUI.Page{
	constructor(p){
		super(p);

		this.m = KG.DataHelper.getDepModule();
	}

	getMeteorData(){
		let x = Meteor.subscribe('EF-AdminUser', {});

		return {
			ready : x.ready()
		}
	}

	render(){
		if(!this.data.ready){
			return util.renderLoading();
		}

		let list = this.m.AdminUser.getAll({}, {
			sort : {createTime:-1}
		});

		return (
			<RC.Div>
				<h3>Teacher List</h3>
				{this.renderListTable(list)}
			</RC.Div>
		);
	}

	renderListTable(list){
		let titleArray = [
			{
				title : 'Name',
				key : 'nickName'
			},
			{
				title : 'Email',
				key : 'email'
			},
			{
				title : 'Role',
				key : 'role'
			}
		];

		return (
			<KUI.Table
				style={{}}
				list={list}
				title={titleArray}
				ref="table"></KUI.Table>
		);
	}
};