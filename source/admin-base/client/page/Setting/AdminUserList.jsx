
KUI.Setting_AdminUserList = class extends KUI.Page{
	constructor(p){
		super(p);

		this.m = KG.DataHelper.getDepModule();
	}

	getMeteorData(){
		let x = Meteor.subscribe('EF-AdminUser', {});

		return {
			ready : x.ready(),
			list : this.m.AdminUser.getAll({}, {
				sort : {createTime:-1}
			})
		}
	}

	render(){
		if(!this.data.ready){
			return util.renderLoading();
		}

		let cu = this.m.AdminUser.getAll({_id : Meteor.user()._id})[0];
		console.log(cu);
		if(cu.role !== 'admin'){
			return (
				<RC.Div><h3>Sorry, This page is only for Role admin</h3></RC.Div>
			);
		}

		let list = this.data.list;

		return (
			<RC.Div>
				<h3>Teacher List</h3>
				{this.renderListTable(list)}
			</RC.Div>
		);
	}

	renderListTable(list){
		let self = this;
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
			},
			{
				title : 'Status',
				key : 'status'
			},
			{
				title : 'Action',
				style : {
					textAlign : 'center'
				},
				reactDom(doc){
					const sy = {
						cursor : 'pointer',
						marginLeft : '12px',
						position : 'relative',
						top : '2px'
					};
					const ml = {
						marginLeft : '10px',
						cursor : 'pointer'
					};
					const ml1 = {
						position : 'relative',
						top : '1px',
						cursor : 'pointer'
					};

					var del = function(){
						swal({
							title : 'Delete '+doc.nickName+'?',
							text : '',
							type : 'warning',
							showCancelButton: true,
							confirmButtonColor: "#1ab394",
							confirmButtonText: "Confirm",
							cancelButtonText: "Cancel",
							closeOnConfirm: false,
							closeOnCancel: true
						}, function(flag){
							if(flag){

								KG.get('EF-AdminUser').getDB().remove({_id : doc._id});
								swal('Delete Success', '', 'success');
							}
						});
					};


					return (
						<RC.Div style={{textAlign:'center'}}>
							<RC.URL href={`/setting/account/edit/${doc._id}`}><KUI.Icon icon="edit" font="18px" color="#1ab394" style={sy}></KUI.Icon></RC.URL>
							<KUI.Icon onClick={del} icon="trash-o" font="18px" color="#cdcdcd" style={ml}></KUI.Icon>
						</RC.Div>

					);
				}
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