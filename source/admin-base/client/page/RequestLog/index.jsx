
KUI.RequestLog_Index = class extends KUI.Page{

	constructor(p){
		super(p);

		this.state = {
			page : 1,

			detail : null
		};
	}

	getMeteorData(){

		let x = util.data.subscribe(KG.RequestLog, {
			sort : {createTime : -1},
			pageSize : 10,
			pageNum : this.state.page
		});

		return {
			ready : x.ready(),
			data : KG.RequestLog.getDB().find({}).fetch(),
			count : x.ready()?util.data.getMaxCount(x):0
		}
	}

	render(){
		if(!this.data.ready){
			return util.renderLoading();
		}

		let self = this;
		let titleArray = [
			{
				title : ' ',
				reactDom(doc){
					return moment(doc.createTime).format('MM/DD/YYYY hh:mm:ss');
				}
			},
			{
				title : 'Username',
				key : 'operatorName'
			},
			{
				title : 'Type',
				key : 'type'
			},
			{
				title : 'From',
				key : 'client'
			},
			{
				title : 'Action',
				style : {
					textAlign : 'center'
				},
				reactDom(doc){

					let sy = {
						cursor : 'pointer'
					};


					let show = function(){
						self.setState({
							detail : 'loading'
						});
						KG.RequestLog.callMeteorMethod('getDetailById', [doc._id], {
							success : function(rs){
								self.setState({
									detail : rs
								});
							}
						});
						self.refs.modal.show();
					};

					return (
						<RC.Div style={{textAlign:'center'}}>
							<KUI.Icon onClick={show} icon="fa fa-eye" font="18px" color="#1ab394" style={sy}></KUI.Icon>
						</RC.Div>
					);
				}
			}
		];

		let list = this.data.data;
		return (
			<RC.Div>
				<h3>Request Log</h3>
				<KUI.PageTable
					style={{}}
					total={this.data.count}
					pagesize={10}
					page={this.state.page}
					onSelectPage={this.selectPage.bind(this)}
					list={list}
					title={titleArray}
					ref="table"></KUI.PageTable>

				{this.renderDetailDialog()}
			</RC.Div>

		);
	}
	selectPage(page){

		this.setState({
			page : page
		});
	}

	renderDetailDialog(){
		let param = {
			title : `Log Detail`,
			YesFn : function(){

			},
			renderBody : function(){
				return (
					<RC.Div>

						{this.renderDetailBody()}
					</RC.Div>
				);
			}
		};

		return util.dialog.render.call(this, 'modal', param);
	}

	renderDetailBody(){
		let data = this.state.detail;

		if(!data || data === 'loading'){
			return util.renderLoading();
		}

		console.log(data);

		let titleArray = [{
			title : 'Item',
			key : 'item'
		}, {
			title : 'Value',
			key : 'value'
		}];

		let list = [
			{item : 'Operator', value : data.operatorName},
			{item : 'Client', value : data.client},
			{item : 'Type', value : data.type}
		];

		let d = data.result;
		if(d.customer){
			list.push({item : 'Customer Name', value : d.customer.name});
		}
		if(d.student){
			list.push({item : 'Student Name', value : d.student.name});
		}
		if(d.class){
			list.push({item : 'Class Name', value : d.class.nickName});
		}

		if(d.credit){
			list.push({item : 'Credit', value : d.credit});
		}

		if(d.note){
			list.push({item : 'Note', value : d.note});
		}


		return (
			<KUI.Table
				style={{}}
				list={list}
				title={titleArray}
				ref="table">
			</KUI.Table>
		);
	}
};