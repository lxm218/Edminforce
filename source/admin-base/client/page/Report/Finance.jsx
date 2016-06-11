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
			dateResult : [],

			detailReport : null
		};

		this.orderData = {};
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

				{this.renderDetailDialog()}
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
						fontWeight : 'normal',
						textDecoration : 'underline'
					};
					return <b style={sy} onClick={self.toCurrentDate.bind(self)}>{doc.date}</b>;
				}
			},
			{
				title : 'Credit Card ($)',
				reactDom(doc){
					return `${doc['credit card'][0]}/${doc['credit card'][1]}`;
				}
			},
			{
				title : 'E-Check ($)',
				reactDom(doc){
					return `${doc['echeck'][0]}/${doc['echeck'][1]}`;
				}
			},
			{
				title : 'Cash ($)',
				reactDom(doc){
					return `${doc['cash'][0]}/${doc['cash'][1]}`;
				}
			},
			{
				title : 'Check ($)',
				reactDom(doc){
					return `${doc['check'][0]}/${doc['check'][1]}`;
				}
			},
			{
				title : 'School Credit ($)',
				reactDom(doc){
					return `${doc['school credit'][0]}/${doc['school credit'][1]}`;
				}
			},
			{
				title : 'Total ($)',
				reactDom(doc){
					return `${doc['total'][0]}/${doc['total'][1]}`;
				}
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
			<RC.Div>
				<p style={{color:'#1ab394'}}>Note: actual payment / total charge</p>
				<KUI.Table
					style={{}}
					list={list}
					title={titleArray}
					ref="table"></KUI.Table>
			</RC.Div>
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
				title : 'Date',
				//key : 'dateline',
				reactDom(doc){
					let sy = {
						cursor : 'pointer',
						fontWeight : 'normal',
						textDecoration : 'underline'
					};

					let showDetailModal = function(){
						self.setState({
							detailReport : 'loading'
						});

						KG.DataHelper.callMeteorMethod('getFinanceDetailByOrderID', [doc._id, doc.dateline], {
							success : function(rs){
								console.log(rs);
								self.orderData = rs.order;
								self.setState({
									detailReport : rs.list
								});
							}
						});

						self.refs.modal.show();
					};

					return <b style={sy} onClick={showDetailModal.bind(self)}>{doc.dateline}</b>;
				}
			},
			{
				title : 'Family',
				key : 'customer.name'
			},
			{
				title : 'Type',
				key : 'type'
			},
			{
				title : 'Payment',
				key : 'paymentType'
			},
			{
				title : 'Total Amount($)',
				key : 'totalAmount'
			},
			{
				title : 'Registration Fee ($)',
				key : 'registrationFee'
			},
			{
				title : 'School Credit ($)',
				key : 'schoolCredit'
			},
			{
				title : 'Coupon Discount($)',
				reactDom : function(doc){
					return doc.discount;
				}
			},
			{
				title : 'Coupon code',
				reactDom : function(doc){
					return doc.couponID || doc.customerCouponID || '';
				}
			},
			{
				title : 'Actual Payment($)',
				key : 'actualPayment'
			},

			{
				title : 'Pay From',
				key : 'paymentSource'
			},

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


	renderDetailDialog(){
		let param = {
			title : `Finance Report Detail Infomation`,
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
		if(!this.state.detailReport){
			return null;
		}
		else if('loading' === this.state.detailReport){
			return util.renderLoading();
		}

		let titleArray = [
			{
				title : 'Date',
				key : 'dateline'
			},
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
				reactDom(doc){
					let rs = doc.order.type;
					if(rs === 'mixed'){
						rs = doc.type;
					}
					return rs;
				}
			},
			{
				title : 'Amount($)',
				reactDom(doc){
					let rs = 0;
					if(_.contains(['register class', 'makeup class'], doc.order.type)){
						rs = doc.fee - Math.abs(doc.discounted);
					}
					else{
						rs = doc.order.amount;
					}

					if(rs < 0) rs = 0;
					return rs;
				}
			}
		];

		return (
			<RC.Div>
				<KUI.Table
					style={{}}
					list={this.state.detailReport}
					title={titleArray}
					ref="table"></KUI.Table>

				{
					this.orderData.registrationFee
						?
						(<p>Registration Fee : {this.orderData.registrationFee}</p>)
						:
						null
				}
			</RC.Div>

		);
	}
};
