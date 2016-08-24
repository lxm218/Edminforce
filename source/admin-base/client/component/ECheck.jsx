KUI.Comp_ECheck = class extends KUI.Page{
	constructor(p){
		super(p);
		this.total = this.props.total;
	}


	getMeteorData() {
		return {
			data : this.props.data,
			ready : true
		};
	}

	renderForm(){
		let p = {
			routing : {
				labelClassName : 'col-xs-4',
				wrapperClassName : 'col-xs-8',
				label : 'Routing Number',
				ref : 'routing'
			},
			account : {
				labelClassName : 'col-xs-4',
				wrapperClassName : 'col-xs-8',
				ref : 'account',
				label : 'Account Number'
			},
			name : {
				labelClassName : 'col-xs-4',
				wrapperClassName : 'col-xs-8',
				ref : 'name',
				label : 'Name'
			}
		};

		return (
			<form className="form-horizontal">
				<RB.Row>
					<RB.Col md={12} mdOffset={0}>
						<RB.Input type="text" {... p.routing} />
						<RB.Input type="text" {... p.account} />
						<RB.Input type="text" {... p.name} />

					</RB.Col>
				</RB.Row>
			</form>
		);
	}

	render(){

		let poundage = App.config.poundage.echeck;
		let total = this.total*(1+poundage).toFixed(2);
		this.total = total;

		return (
			<RC.Div>
				<KUI.NoButton ref="btn" onClick={this.props.backFn} label="Back"></KUI.NoButton>
				<h3 style={{textAlign:'right'}}>
					E-Check | Total : ${total}
				</h3>
				{poundage>0?
					<p style={{textAlign:'right'}}>Transaction Fee: {poundage*100}%</p>
					:
					null
				}
				<hr/>

				<div style={{textAlign:'right'}}>
					<RB.Image width="288.64px" height = "177.28px" style={{paddingTop: '5px', paddingBottom: '20px'}} src="/assets/payment/sample-check.jpg" />
				</div>

				{this.renderForm()}
				<RC.Div style={{textAlign:'right'}}>
					<KUI.YesButton ref="btn" onClick={this.pay.bind(this)} label="Pay Now"></KUI.YesButton>
				</RC.Div>
				<div style={{textAlign:'right'}}>
					<RB.Image   height="100px" style={{paddingTop: '30px'}} src="/assets/payment/comodo-secure-padlock.png" />
					<RB.Image   height="100px" style={{paddingTop: '30px'}} src="/assets/payment/PositiveSSL_tl_trans.png" />
					<RB.Image   height="100px" style={{paddingTop: '30px'}} src="/assets/payment/authorize-verified.png" />
				</div>
			</RC.Div>
		);
	}

	pay(){
		let self = this;

		let data = this.getFormValue();
		console.log(data);

		this.refs.btn.loading(true);
		Meteor.call('postPaymentByECheck', data, (error, rs)=>{
			this.refs.btn.loading(false);
			if(error){
				util.toast.showError(error.reason);
				return;
			}

			self.props.callback && self.props.callback();

		});
	}

	getFormValue(){
		let data = {
			routingNumber : this.refs.routing.getValue(),
			accountNumber : this.refs.account.getValue(),
			nameOnAccount : this.refs.name.getValue(),
			order : this.data.orderID,
			id : this.data.data.accountID,
			amount : this.total
		};
		return data;
	}
};
