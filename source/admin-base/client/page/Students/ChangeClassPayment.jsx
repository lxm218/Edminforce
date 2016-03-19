
KUI.Student_ChangeClass_Payment = class extends KUI.Page{

	constructor(p){
		super(p);

		this.payType = null;
	}

	getMeteorData(){
		let csid = FlowRouter.getParam('classstudentID');
		this.module = KG.DataHelper.getDepModule();

		let x = Meteor.subscribe('EF-ClassStudent', {
			query : {_id : csid}
		});
		if(!x.ready()){
			return {ready : false};
		}

		let cs = this.module.ClassStudent.getAll()[0];

		console.log(cs);
		let orderID = cs.orderID;
		let y = Meteor.subscribe('EF-Order', {
			query : {_id : orderID}
		});
		if(!y.ready()){
			return {ready : false};
		}
		let order = this.module.Order.getDB().findOne();
		console.log(order);


		return {
			ready : y.ready(),
			cs : cs,
			order : order
		};
	}

	render(){
		if(!this.data.ready){
			return util.renderLoading();
		}

		let h,title;
		this.payType = this.data.order.paymentType;
		if(this.data.order.paymentType === 'credit card'){
			h = <KUI.Comp.CreditCardForm ref="form" />;
			title = 'Credit Card Pay';
		}
		else if(this.data.order.paymentType === 'echeck'){
			h = <KUI.Comp.ECheckForm ref="form" />;
			title = 'E-Check Pay';
		}
		else{
			return <RC.Div><h3>Wrong Page</h3></RC.Div>;
		}

		return (
			<RC.Div>
				<h3>{title}</h3>
				<p>Total : ${this.data.order.paymentTotal}</p>
				<hr/>
				{h}
				<RC.Div style={{textAlign:'right'}}>
					<KUI.YesButton ref="btn" onClick={this.pay.bind(this)} label="Pay Now"></KUI.YesButton>
				</RC.Div>
			</RC.Div>
		);
	}

	pay(){
		let order = this.data.order,
			cs = this.data.cs;

		let data = this.refs.form.getValue({
			orderID : order._id,
			accountID : cs.accountID || order.accountID,
			amount : order.paymentTotal
		});
		let fnName = 'postPaymentByCreditCard';
		if(this.payType === 'echeck'){
			fnName = 'postPaymentByECheck';
		}

		this.refs.btn.loading(true);

		util.toast.alert('Pay Success');

		//update order db
		let nd = {
			status : 'success'
		};
		KG.get('EF-Order').updateById(nd, order._id);
		this.module.ClassStudent.updateStatus('checkouted', cs._id);

		_.delay(function(){
			util.goPath('/student/'+cs.studentID);
		}, 100);

		return false;


		Meteor.call(fnName, data, (error, rs)=>{
			this.refs.btn.loading(false);
			if(error){
				util.toast.showError(error.reason);
				return;
			}
			util.toast.alert('Pay Success');

			//update order db
			let nd = {
				status : 'success'
			};
			KG.get('EF-Order').updateById(nd, order._id);
			this.module.ClassStudent.updateStatus('checkouted', cs._id);

			_.delay(function(){
				util.goPath('/student/'+cs.studentID);
			}, 100);
		});
	}
};