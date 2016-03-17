KUI.Comp = {};

KUI.Comp.SelectPaymentWay = class extends RC.CSS{
	render(){

		return (
			<RC.Div style={{}}>
				<RB.Input onChange={function(){}} ref="s21" name="cgroup" type="radio" label="Credit Card/Debit Card" />
				<RB.Input onChange={function(){}} ref="s24" name="cgroup" type="radio" label="E-Check" />
				<RB.Input onChange={function(){}} ref="s22" name="cgroup" type="radio" label="Cash" />
				<RB.Input onChange={function(){}} ref="s23" name="cgroup" type="radio" label="Check" />

			</RC.Div>
		);
	}

	getRefs(){
		return {
			cc : this.refs.s21,
			ec : this.refs.s24,
			cash : this.refs.s22,
			check : this.refs.s23
		};
	}

	getValue(){
		let {cc, ec, cash, check} = this.getRefs();

		let s21 = $(cc.getInputDOMNode()).prop('checked'),
			s24 = $(ec.getInputDOMNode()).prop('checked'),
			s22 = $(cash.getInputDOMNode()).prop('checked'),
			s23 = $(check.getInputDOMNode()).prop('checked');

		if(s21){
			return 'credit card';
		}
		if(s24){
			return 'echeck';
		}
		if(s22){
			return 'cash';
		}
		if(s23){
			return 'check';
		}

		return null;
	}
};