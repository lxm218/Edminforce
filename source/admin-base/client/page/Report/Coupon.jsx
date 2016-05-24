let Filter = class extends KUI.Page{
	getMeteorData(){
		this.m = KG.DataHelper.getDepModule();
		let x = Meteor.subscribe('EF-Coupon');

		return {
			ready : x.ready(),
			couponList : this.m.Coupon.getDB().find().fetch()
		};
	}

	render(){
		let p = {
			source : {
				labelClassName : 'col-xs-2',
				wrapperClassName : 'col-xs-4',
				ref : 'source',
				label : 'Source'
			},
			coupon : {
				labelClassName : 'col-xs-2',
				wrapperClassName : 'col-xs-4',
				ref : 'coupon',
				label : 'Coupon'
			}
		};

		const sy = {
			td : {
				textAlign : 'left'
			}
		};

		let option = {
			source : ['admin', 'mobile'],
			coupon : this.data.couponList
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

						<RB.Input type="select" {... p.source}>
							<option key={-1} value="all">All</option>
							{
								_.map(option.source, (item, index)=>{
									return <option key={index} value={item}>{item}</option>;
								})
							}
						</RB.Input>

						<RB.Input type="select" {... p.coupon}>
							<option key={-1} value="all">All</option>
							{
								_.map(option.coupon, (item, index)=>{
									return <option key={index} value={item._id}>{item._id}</option>;
								})
							}
						</RB.Input>

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
			date : sd2,

			source : this.refs.source,
			coupon : this.refs.coupon
		};
	}

	componentDidMount(){
		super.componentDidMount();

		let {date} = this.getRefs();
		$(date).find('.input-daterange').datepicker({});
	}

	getValue(){
		let {start, end, source, coupon} = this.getRefs();

		let rs = {
			startDate : start.val(),
			endDate : end.val(),

			source : source.getValue(),
			coupon : coupon.getValue()
		};

		if(rs.source === 'all'){
			delete rs.source;
		}
		if(rs.coupon === 'all'){
			delete rs.coupon;
		}

		if(rs.startDate){
			rs.startDate = moment(rs.startDate, 'MM/DD/YYYY').toDate();
		}
		if(rs.endDate){
			rs.endDate = moment(rs.endDate+' 23:59:59', 'MM/DD/YYYY hh:mm:ss').toDate();
		}

		return rs;
	}
};


KUI.Report_Coupon = class extends KUI.Page{
	constructor(p){
		super(p);

		this.m = KG.DataHelper.getDepModule();

		this.state = {
			list : [],
			total : 0,


			refresh : null
		};

		this.const = {
			page : 1
		};
	}

	getMeteorData(){

		return {
			ready : true,
			data : []
		};
	}

	getStateData(){
		let self = this;

		let data = this.refs.filter.getValue();
		console.log(data);

		self.setState({
			list : 'loading'
		});

		KG.DataHelper.callMeteorMethod('getCouponReport', [data, {
			sort : {
				createTime : -1
			},
			pageNum : this.const.page,
			pageSize : 10
		}], {
			success : function(json){
				self.setState({
					list : json.list,
					total : json.total
				});
			}
		});
	}

	componentDidMount(){
		console.log('--- once ---');
		this.getStateData();
	}

	search(){
		this.const.page = 1;
		this.getStateData();
	}

	render(){

		return (
			<RC.Div>
				<Filter ref="filter"></Filter>
				<RC.Div style={{textAlign:'right'}}>
					<KUI.YesButton onClick={this.search.bind(this)} label="Search"></KUI.YesButton>
				</RC.Div>
				<hr/>
				<p>Coupon Report</p>
				{this.renderTable()}
			</RC.Div>
		);
	}

	renderTable(){
		let self = this;
		if(this.state.list === 'loading'){
			return util.renderLoading();
		}

		console.log(this.state.list);
		let titleArray = [
			//{
			//	title : 'Customer',
			//	reactDom(doc){
			//		if(doc.customer){
			//			return doc.customer.name;
			//		}
			//
			//		return '';
			//	}
			//},
			{
				title : 'Student',
				reactDom(doc){
					if(doc.student){
						return doc.student.name;
					}

					return '';
				}
			},
			{
				title : 'Type',
				key : 'type'
			},
			{
				title : 'Coupon Code',
				key : 'coupon._id'
			},
			{
				title : 'Payment amount',
				key : 'paymentTotal'
			},
			{
				title : 'Discount',
				key : 'discount'
			},
			{
				title : 'From',
				key : 'paymentSource'
			},
			{
				title : 'Date',
				reactDom(doc){
					return moment(doc.updateTime).format('MM/DD/YYYY hh:mm:ss');
				}
			}
		];

		return (
			<KUI.PageTable
				style={{}}
				list={this.state.list}
				title={titleArray}
				total={this.state.total}
				onSelectPage={this.selectPage.bind(this)}
				page={this.const.page}
				pagesize={10}
				ref="table1">
			</KUI.PageTable>
		);
	}

	selectPage(page){

		this.const.page = page;
		this.getStateData();
	}
};