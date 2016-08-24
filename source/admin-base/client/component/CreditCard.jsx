
let themes = ["overlay-light","overlay-dark"]
RC.MQ = {};

KUI.Comp_CreditCard = class extends KUI.Page{

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


	render(){
		let poundage = App.config.poundage.credit;
		let total = this.total*(1+poundage).toFixed(2);
		this.total = total;

		return (
			<RC.Div>
				<KUI.NoButton ref="btn" onClick={this.props.backFn} label="Back"></KUI.NoButton>
				<h3 style={{textAlign:'right'}}>
					Credit Card | Total : ${total}
				</h3>
				{poundage>0?
					<p style={{textAlign:'right'}}>Transaction Fee: {poundage*100}%</p>
					:
					null
				}
				<hr/>
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
		Meteor.call('postPaymentByCreditCard', data, (error, rs)=>{
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
			creditCardNumber : this.refs.credit.getValue(),
			ccv : this.refs.ccv.getValue(),
			expirationDate : this.refs.expiration.getValue(),
			order : this.data.data.orderID,
			id : this.data.data.accountID,
			cardHolderFirstName : this.refs.first.getValue(),
			cardHolderLastName : this.refs.last.getValue(),
			street : this.refs.street.getValue(),
			city : this.refs.city.getValue(),
			state : this.refs.state.getValue(),
			zip : this.refs.zip.getValue(),
			amount : this.total
		};
		return data;
	}

	renderForm(){

		let p = {
			credit : {
				labelClassName : 'col-xs-4',
				wrapperClassName : 'col-xs-8',
				ref : 'credit',
				label : 'Credit Card Number'
			},
			expiration : {
				labelClassName : 'col-xs-4',
				wrapperClassName : 'col-xs-8',
				ref : 'expiration',
				label : 'Expiration Date (MM/YY)'
			},
			ccv : {
				labelClassName : 'col-xs-4',
				wrapperClassName : 'col-xs-8',
				label : 'CCV',
				ref : 'ccv'
			},
			first : {
				labelClassName : 'col-xs-4',
				wrapperClassName : 'col-xs-8',
				ref : 'first',
				label : 'Card Holder First Name'
			},
			last : {
				labelClassName : 'col-xs-4',
				wrapperClassName : 'col-xs-8',
				ref : 'last',
				label : 'Card Holder Last Name'
			},
			street : {
				labelClassName : 'col-xs-4',
				wrapperClassName : 'col-xs-8',
				ref : 'street',
				label : 'Street Address'
			},
			city : {
				labelClassName : 'col-xs-4',
				wrapperClassName : 'col-xs-8',
				ref : 'city',
				label : 'City'
			},
			state : {
				labelClassName : 'col-xs-4',
				wrapperClassName : 'col-xs-8',
				ref : 'state',
				label : 'State'
			},
			zip : {
				labelClassName : 'col-xs-4',
				wrapperClassName : 'col-xs-8',
				ref : 'zip',
				label : 'Zip Code'
			}
		};

		return (
			<form className="form-horizontal">
				<RB.Row>
					<RB.Col md={12} mdOffset={0}>
						<RB.Input type="text" {... p.credit} />
						<div style={{textAlign:'right'}}>
							<RB.Image  width="64px" height="55px" src="/assets/payment/visa.png" style={{paddingBottom: '15px'}}/>
							<RB.Image  width="64px" height="55px" src="/assets/payment/mastercard.png" style={{paddingBottom: '15px'}}/>
							<RB.Image  width="64px" height="55px" src="/assets/payment/discover.png" style={{paddingBottom: '15px'}}/>
						</div>
						<RB.Input type="text" {... p.expiration} />
						<RB.Input type="text" {... p.ccv} />
						<RB.Input type="text" {... p.first} />
						<RB.Input type="text" {... p.last} />
						<RB.Input type="text" {... p.street} />
						<RB.Input type="text" {... p.city} />
						<RB.Input type="text" {... p.state} />
						<RB.Input type="text" {... p.zip} />
					</RB.Col>
				</RB.Row>
			</form>
		);

	}
};