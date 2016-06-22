KUI.Setting_EditPermission = class extends KUI.Page{
	constructor(p){
		super(p);

		this.m = KG.DataHelper.getDepModule();

		this.state = {
			permissionObject : null
		};

		this.role = 'teacher';

		this.param = {};
	}

	getMeteorData(){

		return {
			ready : true
		};
	}


	render(){
		if(util.user.get().role !== 'admin'){
			return <h3>Sorry, only school administrator can view this page.</h3>;
		}

		return (
			<RC.Div>
				<h3>Edit Permission - [{this.role}]</h3>
				<hr/>
				{this.renderPermissionObject()}
				<RC.Div style={{textAlign:'right'}}>
					<KUI.YesButton ref="saveBtn" onClick={this.save.bind(this)} label="Save"></KUI.YesButton>
				</RC.Div>
			</RC.Div>
		);
	}

	getEachElement(type, item, index){
		let self = this;
		let pmStr = type+'Permission';
		let change = function(e){
			let f = $(e.target).prop('checked');
			self.param[pmStr][item[0]] = f;
		};
		let ref = item[0]+type;
		if(item[1]){
			_.delay(()=>{
				$(self.refs[ref].getInputDOMNode()).prop('checked', true);
			}, 0);
		}
		return <RB.Col key={index} sm={3}><RB.Input ref={ref} type="checkbox" onChange={change} label={`${type} ${item[0]}`} /></RB.Col>;
	}

	renderPermissionObject(){
		if(!this.state.permissionObject) return null;
		if('loading' === this.state.permissionObject){
			return util.renderLoading();
		}

		let self = this;
		let map = this.state.permissionObject;
		this.param = _.clone(map);
		let h1 = (
			<RB.Row>
				{
					_.map(_.pairs(map.viewPermission), (item, index)=> {
						return self.getEachElement('view', item, index);
					})
				}
			</RB.Row>);

		let h2 = (
			<RB.Row>
				{
					_.map(_.pairs(map.editPermission), (item, index)=>{
						return self.getEachElement('edit', item, index);
					})
				}
			</RB.Row>);

		let h3 = (
			<RB.Row>
				{
					_.map(_.pairs(map.insertPermission), (item, index)=>{
						return self.getEachElement('insert', item, index);
					})
				}
			</RB.Row>);

		let h4 = (
			<RB.Row>
				{
					_.map(_.pairs(map.deletePermission), (item, index)=>{
						return self.getEachElement('delete', item, index);
					})
				}
			</RB.Row>);


		return (
			<div>
				{h1}
				{h2}
				{h3}
				{h4}
			</div>
		);
	}

	getStateData(){
		let self = this;
		self.setState({permissionObject : 'loading'});
		this.m.AdminUser.callMeteorMethod('getAllPermissionList', [this.role], {
			success : function(rs){
				console.log(rs);
				self.setState({
					permissionObject : rs
				});
			},
			error : function(error){
				util.toast.showError(error.reason);
			}
		});
	}

	runOnceAfterDataReady(){
		this.getStateData();
	}

	save(){
		console.log(this.param);

		this.m.AdminUser.callMeteorMethod('updatePermissionByRole', [this.role, this.param], {
			success : function(rs){
				console.log(rs);
				util.toast.alert('update success');
			},
			error : function(error){
				util.toast.showError(error.reason);
			}
		});
	}

};