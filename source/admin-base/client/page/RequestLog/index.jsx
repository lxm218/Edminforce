let Filter = class extends RC.CSS{
	render(){
		let p = {

		};

		const sy = {
			td : {
				textAlign : 'left'
			}
		};

		return (
			<form className="form-horizontal">
				<RB.Row>
					<RB.Col md={12}>
						<div ref="date" className="form-group">
							<label className="control-label col-xs-2">
								<span>Select Date</span>
							</label>
							<div className="col-xs-10">
								<div className="input-daterange input-group" >
									<input style={sy.td} type="text" className="input-sm form-control" name="start" />
									<span className="input-group-addon">to</span>
									<input style={sy.td} type="text" className="input-sm form-control" name="end" />
								</div>
							</div>

						</div>

					</RB.Col>
				</RB.Row>
			</form>
		);
	}

	getRefs(){
		let sd2 = this.refs.date;
		return {
			start : $(sd2).find('input').eq(0),
			end : $(sd2).find('input').eq(1),
			date : sd2
		};
	}

	componentDidMount(){
		super.componentDidMount();

		let {date} = this.getRefs();
		$(date).find('.input-daterange').datepicker({});
	}

	getValue(){
		let {start, end} = this.getRefs();

		return {
			startDate : start.val(),
			endDate : end.val()
		}
	}
};


let RSTable = class extends KUI.Page{

	constructor(p){
		super(p);

		this.state = {
			page : 1,

			detail : null,

			query : {}
		};
	}

	getMeteorData(){

		let x = util.data.subscribe(KG.RequestLog, {
			query : this.state.query,
			sort : {createTime : -1},
			pageSize : 10,
			pageNum : this.state.page
		});

		return {
			ready : x.ready(),
			data : KG.RequestLog.getDB().find(this.state.query, {sort:{createTime : -1}}).fetch(),
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
				<p>Result : {this.data.count} matches</p>
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
		if(d.toClass){
			list.push({item : 'New Class Name', value : d.toClass.nickName});
		}

		if(d.credit){
			list.push({item : 'Credit', value : d.credit});
		}

		if(d.reward){
			list.push({item : 'Credit', value : d.reward});
		}

		if(d.note){
			list.push({item : 'Note', value : d.note});
		}

		if(!_.isUndefined(d.amount)){
			list.push({item : 'Amount', value : d.amount});
		}
		if(d.paymentType){
			list.push({item : 'PaymentType', value : d.paymentType});
		}

		if(d.date){
			list.push({item : 'Date', value : d.date});
		}

		if(d.payment){
			list.push({item : 'Payment', value : d.payment});
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

KUI.RequestLog_Index = class extends RC.CSS{
	render(){
		if(!util.user.checkPermission('log', 'view')){
			return util.renderNoViewPermission();
		}

		return (
			<RC.Div>
				<h3>Request Log</h3>
				<hr/>
				<Filter ref="filter"></Filter>
				<RC.Div style={{textAlign:'right'}}>
					<KUI.YesButton onClick={this.search.bind(this)} label="Search"></KUI.YesButton>

				</RC.Div>
				<hr/>
				<RSTable ref="table"></RSTable>
			</RC.Div>
		);
	}

	search(){
		var rs = this.refs.filter.getValue();
		let D = 'MM/DD/YYYY';
		let query = {
			createTime : {}
		};

		let f = false;
		if(rs.startDate){
			query.createTime['$gte'] = moment(rs.startDate, D).toDate();
			f = true;
		}
		if(rs.endDate){
			query.createTime['$lte'] = moment(rs.endDate, D).toDate();
			f = true;
		}

		if(!f) query = {};

		this.refs.table.setState({
			page : 1,
			query : query
		});
	}
}
