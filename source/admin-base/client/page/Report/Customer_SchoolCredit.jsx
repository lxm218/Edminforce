
KUI.Report_Customer_SchoolCredit = class extends KUI.Page{
	constructor(p){
		super(p);

		this.state = {
			page : 1,

			customer : {},
			detail : []
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

				{this.renderDetailDialog()}
			</RC.Div>
		);
	}

	selectPage(page){
		this.setState({
			page : page
		});
	}

	renderListTable(){
		let self = this;
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

					let showModal = function(){
						self.setState({
							customer : doc,
							detail : 'loading'
						});

						self.m.Customer.callMeteorMethod('getSchoolCreditDetailById', [doc._id], {
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
							<KUI.Icon onClick={showModal} icon="fa fa-eye" font="18px" color="#1ab394" style={ml1}></KUI.Icon>
						</RC.Div>

					);
				}
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

	renderDetailDialog(){
		let param = {
			title : `School Credit Detail For ${this.state.customer.name}`,
			YesFn : function(){

			},
			renderBody : function(){
				return (
					<RC.Div>

						{this.renderDetailTable()}
					</RC.Div>
				);
			}
		};

		return util.dialog.render.call(this, 'modal', param);
	}

	renderDetailTable(){
		if(this.state.detail === 'loading'){
			return util.renderLoading();
		}

		console.log(this.state.detail);
		const titleArray = [
			{
				title : 'Date',
				reactDom(doc){
					return moment(doc.createTime).format(util.const.dateFormat);
				}
			},
			{
				title : 'Type',
				key : 'type'
			},
			{
				title : 'Detail($)',
				reactDom(doc){
					if(doc.type === 'change school credit'){
						return doc.schoolCredit;
					}
					else if(doc.type === 'register class'){
						return '-'+doc.schoolCredit;
					}
					else if(doc.paymentType === 'school credit'){
						return -1*doc.paymentTotal;
					}

					return doc.schoolCredit;
				}
			}
		];

		return (
			<KUI.Table
				style={{}}
				list={this.state.detail}
				title={titleArray}
				ref="table">
			</KUI.Table>
		);
	}
};