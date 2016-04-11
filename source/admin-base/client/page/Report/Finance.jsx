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


KUI.Report_Finance = class extends KUI.Page{
	constructor(p){
		super(p);

		this.state = {
			loadingResult : false,
			result : [],

			currentDate : null,
			dateResult : []
		};
	}

	getMeteorData(){
		return {
			ready : true
		};
	}

	runOnceAfterDataReady(){


	}

	render(){

		$(window).scrollTop(0);

		let sy = {
			c : {
				display : this.state.currentDate?'none':'block'
			},
			d : {
				display : this.state.currentDate?'block':'none'
			}
		};

		return (
			<RC.Div>
				<RC.Div style={sy.c}>
					<h3>Finance Report</h3>
					<hr/>
					<Filter ref="filter" />
					<RC.Div style={{textAlign:'right'}}>
						<KUI.YesButton onClick={this.search.bind(this)} label="Show Result"></KUI.YesButton>
						{this.showExportPeriodButton()}
						
					</RC.Div>
					<hr/>
					{this.renderResultTable()}
				</RC.Div>
				<RC.Div style={sy.d}>
					<h3>{this.state.currentDate} Detail</h3>
					<hr/>
					{this.renderDateTable()}
					<RC.Div style={{textAlign:'right'}}>
						<KUI.NoButton onClick={this.backToMain.bind(this)} label="Back"></KUI.NoButton>
						{this.showExportDayButton()}
					</RC.Div>
				</RC.Div>

			</RC.Div>
		);
	}

	backToMain(){
		this.setState({
			currentDate : null,
			dateResult : []
		});
	}

	

	search(){
		let data = this.refs.filter.getValue(),
			startDate = data.startDate,
			endDate = data.endDate;
		if(!startDate || !endDate){
			util.toast.showError('please select date');
			return false;
		}
		if(moment(startDate).isAfter(moment(endDate), 'day')){
			util.toast.showError('start date is can not after than end date');
			return false;
		}

		this.setState({
			loadingResult : true
		});
		KG.DataHelper.callMeteorMethod('getFinanceReport', [data], {
			context : this,
			success : function(rs){
				console.log(rs);
				this.setState({
					loadingResult : false,
					result : rs
				});
			}
		});
	}

	exportPeriod(){
		let list = _.map(this.state.result, (item)=>{
				item['Date'] = moment(item.date).format(util.const.dateFormat)
				delete item.date
				item['E-Check'] = item.echeck
				delete item.echeck
				item['Cash'] = item.cash
				delete item.cash
				item['Check'] = item.check
				delete item.check
				item['Total'] = item.total
				delete item.total
				delete item['credit card']
				delete item.detail
				return item;
			})

		let csv = Papa.unparse(list)
		var blob = new Blob([csv], {type: "text/plain;charset=utf-8"});
		saveAs(blob, "FinancialReport.csv");
	}

	exportDay(){
		let list = _.map(this.state.dateResult, (item)=>{
				item['Student'] = item.student.name
				item['Class'] = item.class.nickName
				item['Type'] = item.type
				item['Payment'] = item.order.paymentType
				item['Amount'] = item.order.paymentTotal
				delete item.student
				delete item.class
				delete item.type
				delete item.order
				delete item._id
				delete item.studentID
				delete item.accountID
				delete item.programID
				delete item.classID
				delete item.status
				delete item.createTime
				delete item.updateTime
				delete item.orderID
				return item;
			})

		let csv = Papa.unparse(list)
		var blob = new Blob([csv], {type: "text/plain;charset=utf-8"});
		saveAs(blob, "FinancialReport.csv");
	}

	renderResultTable(){
		let self = this;
		if(this.state.loadingResult){
			return util.renderLoading();
		}

		if(this.state.result.length < 1){
			return null;
		}

		const titleArray = [
			{
				title : 'Date',
				reactDom(doc){
					let sy = {
						cursor : 'pointer',
						fontWeight : 'normal'
					};
					return <b style={sy} onClick={self.toCurrentDate.bind(self)}>{moment(doc.date).format(util.const.dateFormat)}</b>;
				}
			},
			{
				title : 'Credit Card ($)',
				key : 'credit card'
			},
			{
				title : 'E-Check ($)',
				key : 'echeck'
			},
			{
				title : 'Cash ($)',
				key : 'cash'
			},
			{
				title : 'Check ($)',
				key : 'check'
			},
			{
				title : 'Total ($)',
				key : 'total'
			}
		];

		let list = _.map(this.state.result, (item)=>{
			//_.each(item, (v, k)=>{
			//	if(_.isNumber(v) && v>0){
			//		item[k] = '$'+v;
			//	}
			//});

			return item;
		});

		return (
			<KUI.Table
				style={{}}
				list={list}
				title={titleArray}
				ref="table"></KUI.Table>
		);
	}

	toCurrentDate(e){
		var date = $(e.target).html();

		this.setState({
			loadingResult : true,
			currentDate : date
		});
		KG.DataHelper.callMeteorMethod('getFinanceDetailByDate', [date], {
			context : this,
			success : function(rs){
				console.log(rs);
				this.setState({
					loadingResult : false,
					dateResult : rs
				});
			}
		});
	}

	renderDateTable(){
		let self = this;
		if(this.state.loadingResult){
			return util.renderLoading();
		}

		let list = this.state.dateResult;
		let titleArray = [
			{
				title : 'Student',
				key : 'student.name'
			},
			{
				title : 'Class',
				key : 'class.nickName'
			},
			{
				title : 'Type',
				key : 'type'
			},
			{
				title : 'Payment',
				key : 'order.paymentType'
			},
			{
				title : 'Amount ($)',
				key : 'order.paymentTotal'
			},
			{
				title : 'Pay From',
				key : 'order.paymentSource'
			},
			{
				title : 'Date',
				reactDom(doc){
					return moment(doc.updateTime).format('MM/DD/YYYY hh:mm:ss');
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

	showExportPeriodButton(){
		if(this.state.result.length > 0) {
			return (<KUI.YesButton onClick={this.exportPeriod.bind(this)} style={{marginLeft : '15px'}} label="Export Report" ></KUI.YesButton>);
		}
	}
	showExportDayButton(){
		if(this.state.dateResult.length > 0) {
			return (<KUI.NoButton onClick={this.exportDay.bind(this)} style={{marginLeft : '15px'}} label="Export Report" ></KUI.NoButton>);
		}
	}
};