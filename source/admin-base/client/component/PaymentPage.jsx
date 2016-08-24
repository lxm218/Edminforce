

KUI.Comp_PaymentPage = class extends KUI.Page{
	constructor(p){
		super(p);

		this.state = {
			loading : false,
			step : 1
		};

		this.C = {
			total : this.props.total,
			callback : this.props.callback,
			data : this.props.data,
			titleHtml : this.props['title-html']
		};
	}

	getMeteorData(){
		return {
			ready : true
		}
	}

	render(){
		if(this.state.loading){
			return util.renderLoading();
		}

		return (
			<RC.Div>
				{this.renderStep1()}
				{this.state.step===2 && this.renderStep2()}
			</RC.Div>
		);
	}

	renderStep1(){
		let sy = {
			display : this.state.step===1?'block':'none'
		};
		return (
			<div style={sy}>
				{this.C.titleHtml}
				<KUI.Comp.SelectPaymentWay ref="payway" />
				<RC.Div style={{textAlign:'right'}}>
					<KUI.YesButton onClick={this.toStep2.bind(this)} label="Next"></KUI.YesButton>
				</RC.Div>
			</div>
		);
	}

	toStep2(){
		let way = this.refs.payway.getValue();
		console.log(way)
		if(way === 'cash' || way === 'check'){
			this.C.callback(true, way);
		}
		else{
			this.setState({step:2});
		}
	}


	renderStep2(){
		let sy = {
			display : this.state.step===2?'block':'none'
		};
		let way = this.refs.payway.getValue();

		return (
			<div style={sy}>
				{way==='credit card' && this.renderCreditCard()}
				{way==='echeck' && this.renderECheck()}
			</div>
		);
	}

	renderCreditCard(){
		let self = this;
		let call = function(){
			self.C.callback(true, 'credit card');
		};

		return <KUI.Comp_CreditCard
			total={this.C.total}
			backFn={()=>{this.setState({step:1})}}
			data={this.C.data} callback={call.bind(this)} />
	}

	renderECheck(){
		let self = this;
		let call = function(){
			self.C.callback(true, 'echeck');
		};
		return <KUI.Comp_ECheck
			total={this.C.total}
			backFn={()=>{this.setState({step:1})}}
			data={this.C.data} callback={call.bind(this)} />
	}
};