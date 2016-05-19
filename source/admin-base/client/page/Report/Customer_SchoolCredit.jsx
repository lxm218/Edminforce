
KUI.Report_Customer_SchoolCredit = class extends KUI.Page{
	constructor(p){
		super(p);

		this.state = {
			page : 1
		};

		this.m = KG.DataHelper.getDepModule();
	}

	getMeteorData(){

		let x = util.data.subscribe(this.m.Customer, {
			query : {},
			pageSize : 10,
			pageNum : this.state.page,
			sort : {
				schoolCredit : -1
			}
		});

		let list = this.m.Customer.getAll({});

		return{
			ready : x.ready(),
			max : util.data.getMaxCount(x),
			data : list
		};
	}

	render(){
		if(!this.data.ready){
			return util.renderLoading();
		}

		return (
			<RC.Div>
				<h3>School Credit Report</h3>
				<hr/>
				{this.renderListTable()}
			</RC.Div>
		);
	}

	selectPage(page){
		this.setState({
			page : page
		});
	}

	renderListTable(){
		const titleArray = [
			{
				title : 'Customer Name',
				key : 'name'
			},
			{
				title : 'Email',
				key : 'email'
			},
			{
				title : 'Phone',
				key : 'phone'
			},
			{
				title : 'School Credit',
				key : 'schoolCredit'
			}

		];

		let list = this.data.data,
			total = Math.ceil(this.data.max/util.const.PageSize);

		return <KUI.PageTable
			style={{}}
			list={list}
			total={total}
			onSelectPage={this.selectPage.bind(this)}
			page={this.state.page}
			title={titleArray}
			ref="table"></KUI.PageTable>;
	}
};