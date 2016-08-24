
KUI.Registration_PayOrder = class extends KUI.Page{
	constructor(p){
		super(p);

		this.C = {
			type : FlowRouter.getQueryParam('type') || 'monthly',
			id : FlowRouter.getQueryParam('id'),
			backUrl : FlowRouter.getQueryParam('backurl')
		};
	}

	getMeteorData(){
		let x = {
			ready(){
				return false;
			}
		};
		if(this.C.type === 'monthly'){
			x = Meteor.subscribe(util.getModuleName('Payment'), {
				query : {_id : this.C.id}
			});
		}

		return {
			ready : x.ready()
		};
	}

	render(){
		if(!this.data.ready){
			return util.renderLoading();
		}

		let d = this.m.Payment.getDB().findOne({_id : this.C.id});
		console.log(d);

		return (
			<RC.Div>

				<KUI.Comp_PaymentPage ref="pay" title-html={this.renderBilling(d)} data={d} total={d.amount} callback={this.payFinish.bind(this)} />
			</RC.Div>
		);
	}

	renderBilling(d){
		return (
			<div>
				<h3>Payment Page</h3>
				<hr/>
				<p>Total : ${d.amount}</p>
			</div>
		);
	}

	payFinish(flag, way){
		let self = this;
		console.log(flag, way);
		let d = this.m.Payment.getDB().findOne({_id : this.C.id});
		if(flag){
			this.m.Payment.getDB().update({_id : this.C.id}, {
				$set : {
					status : 'success',
					paymentType : way
				}
			}, function(err, nd){
				if(nd){
					util.goPath(self.C.backUrl);
				}
			});
		}


	}

};