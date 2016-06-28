


KUI.ClassLevel_Index = class extends KUI.Page{
	constructor(p){
		super(p);

		this.m = KG.DataHelper.getDepModule();

		this.state = {
			list : null
		};
	}

	getMeteorData(){
		return {
			ready : true
		};
	}

	runOnceAfterDataReady(){
		this.getListData();
	}

	getListData(){
		let self = this;
		this.setState({list : 'loading'});
		this.m.ClassLevel.callMeteorMethod('getAllByQuery', [{}], {
			success : function(list){
				self.setState({list : list});
			}
		});
	}

	render(){
		return (
			<RC.Div>
				<KUI.ProgramTopTab select={3} />

				{this.renderTable()}

				<div style={{textAlign:'right'}}>
					<KUI.YesButton href="/program/classlevel/add" label="Add Class Level"></KUI.YesButton>
				</div>
			</RC.Div>
		);
	}

	renderTable(){
		let list = this.state.list;
		if(!list || 'loading' === list) return util.renderLoading();

		let self = this;
		let titleArray = [
			{
				title : 'Level Name',
				key : 'name'
			},
			{
				title : 'Level Order',
				key : 'order'
			},
			{
				title : 'Action',
				style : {
					textAlign : 'center'
				},
				reactDom(doc){
					let del = function(){
						self.m.ClassLevel.callMeteorMethod('removeById', [doc._id], {
							success : function(flag){
								if(!flag){
									swal('Can\'t be delete.', '', 'error');
									return;
								}

								self.getListData();
							}
						});
					};

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

					return (
						<RC.Div style={{textAlign:'center'}}>

							<RC.URL href={`/program/classlevel/${doc._id}`}><KUI.Icon icon="edit" font="18px" color="#1ab394" style={sy}></KUI.Icon></RC.URL>

							<KUI.Icon onClick={del} icon="trash-o" font="18px" color="#cdcdcd" style={ml}></KUI.Icon>
						</RC.Div>

					);
				}
			}
		];
console.log(list);
		return <KUI.Table
			style={{}}
			list={list}
			title={titleArray}
			ref="table"></KUI.Table>;
	}

};