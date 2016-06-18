

KUI.Payment_PayMakeup = class extends KUI.Page{
	constructor(p){
		super(p);

		this.m = KG.DataHelper.getDepModule();

		this.state = {
			cs : null
		};

		this.C = {
			fee : 0,
			totalFee : 0,

			coupon : null
		};
	}
	getMeteorData(){
		let csID = FlowRouter.getQueryParam('classstudentID');

		return {
			csID : csID,
			ready : true
		}
	}

	getCSObject(){
		let self = this;
		this.m.ClassStudent.callMeteorMethod('getAllByQuery', [{_id : this.data.csID}, {}], {
			success : function(rs){
				let cs = rs.list[0];
				console.log(cs);
				self.C.fee = cs.fee || cs.class[0].makeupClassFee;
				self.C.totalFee = self.C.fee;
				self.setState({
					cs : cs
				});
			}
		});
	}

	runOnceAfterDataReady(){
		this.getCSObject();
	}

	render(){

		return (
			<RC.Div>
				<h3>Pay Makeup Class</h3>
				<hr/>
				{this.renderInfo()}

			</RC.Div>
		);
	}

	renderPaymentBox(){
		let tuition = this.C.fee;

		let h = '';
		if (tuition > 0) {
			h = (
				<RC.Div>
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
					<KUI.Comp.SelectPaymentWay ref="payway" />

				</RC.Div>
			);
		}


		return (
			<div>
			{h}
			<RC.Div style={{textAlign:'right'}}>
				<KUI.YesButton onClick={this.payNow.bind(this)} label="Pay Now"></KUI.YesButton>
			</RC.Div>
		</div>);
	}

	payNow(){
		let self = this;
		let cs = self.state.cs;
		let orderData = {
			accountID : cs.student[0].accountID,
			studentID : cs.studentID,
			details : [self.data.csID],
			type : 'makeup class',
			status : 'waiting',
			amount : self.C.fee
		};

		let way = 'cash';
		if(this.refs.payway.getValue()){
			way = this.refs.payway.getValue();
		}
		orderData.paymentType = way;

		let total = orderData.amount;
		let cash = false;

		if(this.C.coupon){
			orderData.couponID = this.C.coupon;
			orderData.discount = this.C.totalFee - total;
		}

		if(this.C.fee === 0){
			//fee=0 set payment success
			orderData.status = 'success';
			orderData.paymentTotal = orderData.amount;

		}
		else{
			if(way === 'credit card'){
				orderData.poundage = App.config.poundage.credit;
				total = parseFloat(total)+(parseFloat(orderData.poundage||0));
			}
			else if(way === 'echeck'){
				orderData.poundage = App.config.poundage.echeck;
				total = parseFloat(total)*(1+(parseFloat(orderData.poundage||0)));
			}
			else if(way === 'pay later'){
				util.goPath('/student/'+orderData.studentID);

				return false;
			}
			else{
				orderData.status = 'success';
				orderData.poundage = 0;
				cash = true;
			}

			orderData.poundage = orderData.poundage.toString();
			orderData.paymentTotal = total;
		}


		let cid = self.data.csID;
		console.log(orderData);
		let orderRs = KG.get('EF-Order').insert(orderData);
		KG.result.handle(orderRs, {
			success : function(id){


				if(self.C.coupon){
					self.m.Coupon.useOnce(self.C.coupon, orderData.accountID);
				}

				self.m.ClassStudent.callMeteorMethod('updateClassFeeByOrderID', [id, cid], {});

				if(self.C.fee === 0 || cash){

					self.m.ClassStudent.updateStatus('checkouted', cid);
					self.module.Email.callMeteorMethod('sendMakeupClassConfirmEmail', [{orderID : id}]);
					self.m.Class.callMeteorMethod('syncClassTrialOrMakeupNumber', [cid], {
						success : function(json){
							util.goPath('/student/'+orderData.studentID);
						}
					});

				}
				else{
					Session.set('KG-Class-Makeup-Fn', 'makeup');
					if(way === 'credit card'){
						util.goPath('/payment/creditcard/'+id);
					}
					else if(way === 'echeck'){
						util.goPath('/payment/echeck/'+id);
					}

				}
			}
		});

		//add log
		KG.RequestLog.addByType('makeup class', {
			id : cid,
			data : {
				accountID : cs.student[0].accountID,
				studentID : cs.student[0]._id,
				classID : cs.classID,
				amount : this.C.fee,
				paymentType : way
			}
		});
	}

	applyCouponCode(){
		let self = this;
		let m = this.m;

		let code = util.getReactJQueryObject(this.refs.cpcode).val();
		if(!code){
			util.toast.showError('Please enter coupon code');
			return;
		}


		let cs = this.state.cs;
		//check coupon code
		let param = {
			accountID : cs.accountID,
			couponCode : code,
			overRequire : this.C.totalFee,
			programID : cs.class[0].programID,
			weekdayRequire : cs.class[0].schedule.day
		};
		console.log(param);
		m.Coupon.callMeteorMethod('checkCouponCodeValidByCustomerID', [param], {
			success : function(rs){
				KG.result.handle(rs, {
					success : function(d){
						console.log(d);
						let fee = m.Coupon.calculateDiscountResult(d.discount, self.C.totalFee);

						util.getReactJQueryObject(self.refs.fee).html('Makeup Fee : $'+fee);
						self.C.fee = fee;
						self.C.coupon = code;

						self.checkPaymentWayShowOrHide();
					},
					error : function(err){
						util.toast.showError(err.reason);
					}
				});
			}
		});
	}

	checkPaymentWayShowOrHide(){
		let jq = util.getReactJQueryObject(this.refs.payway);
		if(this.C.fee > 0){
			jq.show();
		}
		else{
			jq.hide();
		}
	}

	renderInfo(){
		if(!this.state.cs) return null;
		if('loading'===this.state.cs) return util.renderLoading();

		let cs = this.state.cs;
		let h = null;
		if(cs.type !== 'makeup'){
			return <h6>type is not makeup, please check</h6>;
		}
		else if(cs.status === 'checkouted'){
			h = <h6>This makeup is pay success</h6>;
		}

		return (
			<div>
				<p>Student Name : {cs.student[0].name}</p>
				<p>Class Name : {cs.class[0].nickName}</p>
				<p>Date : {moment(cs.lessonDate).format(KG.const.dateFormat)}</p>
				<p ref="fee">Makeup Fee : ${this.C.fee}</p>

				<hr/>
				{h?h:this.renderPaymentBox()}
			</div>
		);
	}
};