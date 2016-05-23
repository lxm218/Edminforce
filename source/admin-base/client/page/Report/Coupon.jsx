KUI.Report_Coupon = class extends KUI.Page{
	constructor(p){
		super(p);

		this.m = KG.DataHelper.getDepModule();

		this.state = {
			list : [],
			total : 0,

			page : 1,

			refresh : null
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

		self.setState({
			list : 'loading'
		});

		KG.DataHelper.callMeteorMethod('getCouponReport', [{}, {
			sort : {
				createTime : -1
			},
			pageNum : this.state.page,
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

	render(){
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
				page={this.state.page}
				pagesize={10}
				ref="table1">
			</KUI.PageTable>
		);
	}

	selectPage(page){
		this.setState({
			page : page

			//refresh : Meteor.uuid()
		});

		this.getStateData();
	}
};