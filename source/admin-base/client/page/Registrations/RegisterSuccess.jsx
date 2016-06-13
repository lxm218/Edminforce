let sy = {
	mb : {
		marginBottom : '20px'
	},
	ml : {
		marginLeft : '20px'
	},
	rd : {
		textAlign : 'right'
	}
};

KUI.Registration_SuccessPage = class extends KUI.Page{
	constructor(p){
		super(p);

		this.state = {
			orderDetail : null
		};

		this.m = KG.DataHelper.getDepModule();
	}
	getMeteorData(){
		this.orderID = FlowRouter.getQueryParam('orderID');

		return {
			ready : true
		};
	}

	getOrderDetail(){
		let self = this;

		self.setState({
			orderDetail : 'loading'
		});
		this.m.Order.callMeteorMethod('getAllByQuery', [{_id : this.orderID}], {
			success : function(list){
				console.log(list);
				if(list[0]){
					self.setState({
						orderDetail : list[0]
					});
				}
				else{
					swal({
						type : 'error',
						title : 'orderID is not valid'
					});
				}
			}
		});
	}

	runOnceAfterDataReady(){
		this.getOrderDetail();
	}

	render(){

		return (
			<RC.Div>
				<h2 style={sy.mb}>Registration is successful for:</h2>
				<hr/>

				{this.renderOrderDetail()}
				<RC.Div style={sy.rd}>
					{/* <KUI.YesButton ref="sendEmailBtn" onClick={this.sendEmail.bind(this)} label="Email Receipt and Schedule"></KUI.YesButton> */}
					<KUI.YesButton onClick={this.printPage.bind(this)} style={sy.ml} label="Print out Receipt and Schedule"></KUI.YesButton>
				</RC.Div>
			</RC.Div>
		);

	}

	renderOrderDetail(){
		let order = this.state.orderDetail;
		if(!order){
			return null;
		}
		if('loading' === order){
			return util.renderLoading();
		}

		console.log(order);
		if(order.status !== 'success'){
			swal({
				type : 'error',
				title : 'Data error'
			});

			return;
		}

		let titleArray = [
			{
				title : 'Student',
				reactDom(doc){
					return doc.student[0].name;
				}
			},
			{
				title : 'Class',
				reactDom(doc){
					return doc.class[0].nickName;
				}
			},
			{
				title : 'Teacher',
				reactDom(doc){
					return doc.class[0].teacher;
				}
			}
		];

		return (
			<RC.Div>
				<p>Account Name : {order.customer.name}</p>
				<p>Total Amount : ${order.paymentTotal}</p>
				<KUI.Table
					style={{}}
					list={order.details}
					title={titleArray}
					ref="table">
				</KUI.Table>
			</RC.Div>
		);
	}

	sendEmail(){
		//TODO

	}

	printPage(){
		window.print();
	}
};