let sy = {
	rd : {
		textAlign : 'right'
	},
	ml : {
		marginLeft : '30px'
	}
};


KUI.Registration_SummaryPage = class extends KUI.Page{
	constructor(p){
		super(p);

		this.m = KG.DataHelper.getDepModule();

		this.state = {
			summaryList : null,

			step : 1,

			coupon : null,
			useSchoolCredit : false
		};

		this.C = {
			totalFee : 0,
			actualPayment : 0,

			registrationFee : 0,
			schoolCredit : 0,

			couponResult : null,

			ClassStudentObj : {}
		};
	}

	getMeteorData(){
		this.studentID = FlowRouter.getQueryParam('studentID');
		this.classID = FlowRouter.getQueryParam('classID');



		return {
			ready : true
		};
	}

	render(){

		let step = this.state.step;

		return (
			<RC.Div>
				<h3>Register Class</h3>
				<hr/>

				{step===1?this.renderSummaryTable():null}
				{step===1?this.renderButton():null}

				{step===2?this.renderStep2Box():null}

				{step===3?this.renderStep3Box():null}
			</RC.Div>
		);

	}

	runOnceAfterDataReady(){
		this.getStateData();
	}

	getStateData(){
		let self = this;
		this.setState({
			summaryList : 'loading'
		});

		this.m.ClassStudent.callMeteorMethod('getPenddingTypeList', [{
			classID : self.classID,
			studentID : self.studentID
		}], {
			success : function(rs){
				console.log(rs);
				if(rs.flag){
					self.setState({
						summaryList : rs
					});
				}
			}
		});
	}

	renderSummaryTable() {
		if ('loading' === this.state.summaryList) {
			return util.renderLoading();
		}
		if (!this.state.summaryList) {
			return null;
		}

		let self = this;
		let list = this.state.summaryList.list;

		let titleArray = [
			{
				title : 'Student',
				key : 'student.name'
			},
			{
				title : 'Class',
				key : 'class.nickName'
			},
			{
				title : 'Tuition per class ($)',
				//key : 'monthDue',
				reactDom(doc){
					return doc.class.tuition.money;
				}
			},
			{
				title : '',
				reactDom(doc){

					let del = ()=>{
						self.m.ClassStudent.callMeteorMethod('removeById', [doc._id], {
							success : function(){
								self.getStateData();
							}
						});
					};

					return (
						<RC.Div style={{textAlign:'center'}}>
							<KUI.Icon onClick={del} icon="trash-o" font="18px" color="#cdcdcd" style={{}}></KUI.Icon>
						</RC.Div>
					);
				}
			}
		];

		return (
			<KUI.Table
				style={{}}
				list={list}
				title={titleArray}
				ref="ss">
			</KUI.Table>
		);

	}

	renderButton(){
		if('loading' === this.state.summaryList){
			return null;
		}
		if(!this.state.summaryList){
			return null;
		}

		let one = {
			studentID : this.studentID,
			classID : this.classID
		}

		return (
			<RC.Div style={sy.rd}>
				<p>Total Amount : {this.state.summaryList.total}</p>

				<KUI.YesButton href={`/registration/register?studentID=${one.studentID}`} style={sy.ml} label="Register More Class"></KUI.YesButton>
				<KUI.YesButton href={`/registration/register`} style={sy.ml} label="Register More Student"></KUI.YesButton>
				{this.state.summaryList.list.length>0?<KUI.YesButton onClick={this.toStep2.bind(this)} style={sy.ml} label="Check Out"></KUI.YesButton>:null}
			</RC.Div>
		);
	}

	toStep2(){
		let self = this;
		if(this.state.summaryList.total === 0){
			swal({
				type : 'warning',
				title : 'Total Fee is 0, Please check'
			});
			return false;
		}

		this.m.Customer.callMeteorMethod('checkRegistrationFee', [{ClassStudentList : this.state.summaryList.list}], {
			success : function(rf){
				console.log(rf);
				self.C.registrationFee = rf;
				self.setState({
					coupon : false,
					step : 2
				});
			}
		});



	}

	renderStep2Box(){
		let self = this;

		const titleArray = [
			{
				title : 'Item',
				key : 'item'
			},
			{
				title : 'Current Month Due ($)',
				key : 'value'
			}
		];

		let customer = this.state.summaryList.list[0].customer,
			total = this.state.summaryList.total;

		let dl = [
			{
				item : 'Total Tuition',
				value : total
			}
		];

		if(this.C.registrationFee){
			//this.C.registrationFee = this.m.Customer.getRegistrationFee();

			dl.push({
				item : 'Registration Fee',
				value : this.C.registrationFee
			});

			total = total + this.C.registrationFee;
		}
		this.C.totalFee = total;

		// coupon
		if(this.state.coupon){
			dl.push({
				item : 'Coupon',
				value : this.state.coupon.discount + ' off'
			});

			dl.push({
				item : 'Coupon discount',
				value : '-' + this.C.couponResult.discountTotal
			});

			total = this.C.couponResult.total;
		}


		// school credit
		if(total < 0) total = 0;
		if(this.state.useSchoolCredit){
			this.C.schoolCredit = customer.schoolCredit || 0;
			if(this.C.schoolCredit > total){
				this.C.schoolCredit = total;
			}

			dl.push({
				item : 'School Credit',
				value : this.C.schoolCredit
			});
			total = total - this.C.schoolCredit;
		}

		//add total
		dl.push({
			item : 'Total Amount',
			value : total
		});
		this.C.actualPayment = total;

		return (
			<RC.Div>
				<KUI.Table
					style={{}}
					list={dl}
					title={titleArray}
					ref="ss">
				</KUI.Table>

				<RB.Input wrapperClassName="">
					<RB.Row>
						<RB.Col xs={8}>
							<input ref="cpcode" placeholder="Enter Coupon Code" type="text" className="form-control" />
						</RB.Col>
						<RB.Col xs={4}>
							<button type="button" onClick={this.applyCouponCode.bind(this)} className="btn btn-w-m btn-primary">Apply</button>
						</RB.Col>
					</RB.Row>
				</RB.Input>
				<RB.Input onChange={this.checkSchoolCredit.bind(this)} type="checkbox" label={`Apply school credit : $${customer.schoolCredit || 0}`} />

				<RC.Div style={{textAlign:'right'}}>
					<KUI.NoButton onClick={this.toStep1.bind(this)} label="Back"></KUI.NoButton>
					<KUI.YesButton onClick={this.toStep3.bind(this)} style={sy.ml} label="Next"></KUI.YesButton>
				</RC.Div>
			</RC.Div>
		);
	}
	checkSchoolCredit(e){
		let b = $(e.target).prop('checked');
		this.setState({
			useSchoolCredit:b
		});
	}
	applyCouponCode(){
		let self = this;

		let code = util.getReactJQueryObject(this.refs.cpcode).val();
		if(!code){
			util.toast.showError('Please enter coupon code');
			return;
		}

		//check coupon code
		let ll = this.state.summaryList.list;
		let clsList = _.map(ll, (item)=>{
			return item.class._id;
		});
		let param = {
			accountID : ll[0].accountID,
			couponCode : code,
			overRequire : this.C.totalFee,
			classList : clsList,
			amount : _.map(ll, (item)=>{return item.amount})
		};
		console.log(param);

		this.m.Coupon.callMeteorMethod('checkCouponCodeValidByClassList', [param], {
			success : function(rs){
				console.log(rs);

				if(rs.flag){
					self.C.couponResult = rs;
					self.setState({
						coupon : rs.coupon
					});
				}
				else{
					util.toast.showError(rs.error);
				}
			}
		});

	}
	toStep1(){
		this.setState({step:1});
	}
	toStep3(){
		//set class fee list
		this.C.ClassStudentObj = {};
		if(this.state.coupon){
			_.each(this.state.summaryList.list, (item)=>{
				this.C.ClassStudentObj[item._id] = this.C.couponResult[item.classID];
			});

		}
		else{
			_.each(this.state.summaryList.list, (item)=>{
				this.C.ClassStudentObj[item._id] = {
					amount : item.amount,
					fee : item.amount,
					pay : item.amount
				};
			});
		}


		this.setState({step : 3});
	}

	renderStep3Box(){


		return (
			<RC.Div>
				<h4>Your current monthly due is : ${this.C.actualPayment} {this.C.actualPayment>0?', Please select below.':null}</h4>


				{this.C.actualPayment>0?<KUI.Comp.SelectPaymentWay ref="payway"></KUI.Comp.SelectPaymentWay>:null}

				<RC.Div style={{textAlign:'right'}}>
					<KUI.NoButton onClick={this.toStep2.bind(this)} label="Back"></KUI.NoButton>
					<KUI.YesButton onClick={this.submitPayment.bind(this)} style={sy.ml} label="Pay Now"></KUI.YesButton>
				</RC.Div>
			</RC.Div>
		);
	}

	submitPayment(){
		let self = this;
		let way = 'cash';
		if(this.C.actualPayment > 0){
			way = this.refs.payway.getValue();
		}

		let customer = this.state.summaryList.list[0].customer;
		let list = this.state.summaryList.list;

		let orderData = {
			accountID : customer._id,
			monthlyAmount : this.state.summaryList.nextMonthPayment,
			studentID : (_.map(list, (item)=>{return item.studentID})).join(','),
			details : _.map(list, (item)=>{return item._id}),
			recurring : true,
			amount : this.C.actualPayment,
			type : 'register class',
			registrationFee : this.C.registrationFee,
			schoolCredit : this.C.schoolCredit,
			discount : this.state.coupon ? (this.C.totalFee - this.C.couponResult.total) : 0
		};
		if(this.state.coupon){
			let cid = this.state.coupon._id;
			if(this.C.couponResult.coupon.validForNoBooked){
				orderData.customerCouponID = cid;
			}
			else{
				orderData.couponID = cid;
			}
		}

		if(way === 'pay later'){
			orderData.paymentType = 'holding';
			orderData.status = 'waiting';

		}
		else if(way === 'cash' || way === 'check'){
			orderData.paymentType = way;
			orderData.status = 'waiting';
			orderData.poundage = (way==='cash'?App.config.poundage.cash:App.config.poundage.check);
		}
		else{
			orderData.paymentType = way;
			orderData.status = 'waiting';
			orderData.poundage = (way==='echeck'?App.config.poundage.echeck:App.config.poundage.credit);
		}

		let total = orderData.amount*(1+(parseFloat(orderData.poundage||0)));
		if(orderData.poundage){
			orderData.poundage = orderData.poundage.toString();
		}
		orderData.paymentTotal = total;

		console.log(orderData);
		console.log(this.C.ClassStudentObj);

		this.m.Order.callMeteorMethod('insertData', [orderData, this.C.ClassStudentObj], {
			success : function(cid){
				console.log(cid);
				if(way === 'cash' || way === 'check'){
					self.m.Order.callMeteorMethod('paySuccessByOrder', [cid], {
						success : function(oid){
							FlowRouter.go('/registration/register/success?orderID='+oid);
						}
					});
				}
				else if(way === 'pay later'){
					Meteor.setTimeout(function(){
						self.m.Email.callMeteorMethod('sendRegistrationClassConfirmEmail', [{orderID : cid}], {
							success : function(){}
						});
					}, 100);
					FlowRouter.go('/student/'+self.studentID);
				}
				else{
					if(way === 'echeck'){
						FlowRouter.go('/payment/echeck/'+cid+'?type=register');
					}
					else{
						FlowRouter.go('/payment/creditcard/'+cid+'?type=register');
					}
				}
			}
		});

	}
};