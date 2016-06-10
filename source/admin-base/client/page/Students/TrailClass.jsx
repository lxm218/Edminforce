let MSG = 'EF-Student-TrailClass-msg';

let FilterBox = class extends KUI.Page{

	getDepModule(){
		return {
			Student : KG.get('EF-Student'),
			Class : KG.get('EF-Class'),
			Program : KG.get('EF-Program')
		};
	}
	getMeteorData(){
		this.module = this.getDepModule();

		let x = Meteor.subscribe('EF-Program');
		return {
			ready : x.ready(),
			programList : this.module.Program.getDB().find().fetch()
		};
	}

	render(){
		if(!this.data.ready){
			return util.renderLoading();
		}
		let p = {
			program : {
				labelClassName : 'col-xs-3',
				wrapperClassName : 'col-xs-4',
				ref : 'program',
				label : 'Select Program'
			},
			date : {
				labelClassName : 'col-xs-3',
				wrapperClassName : 'col-xs-4',
				ref : 'date',
				label : 'Select Date'
			}
		};

		return (
			<form className="form-horizontal">
				<RB.Row>
					<RB.Col md={12}>
						<RB.Input onChange={this.search.bind(this)} type="select" {... p.program}>
							{
								_.map(this.data.programList, (item, index)=>{
									return <option key={index} value={item._id}>{item.name}</option>;
								})
							}
						</RB.Input>
						<RB.Input type="text" {... p.date} />

					</RB.Col>
				</RB.Row>
			</form>
		);
	}
	search(){
		let {program, date} = this.getRefs();
		let query = {
			programID : program.getValue(),
			date : $(date.getInputDOMNode()).datepicker('getDate')
		};
console.log(query)
		util.message.publish(MSG, {
			query : query
		});

	}
	getRefs(){
		return {
			program : this.refs.program,
			date : this.refs.date
		};
	}
	runOnceAfterDataReady(){
		let {date} = this.getRefs();
		$(date.getInputDOMNode()).datepicker({});
		$(date.getInputDOMNode()).bind('hide', this.search.bind(this));
	}
};

let ResultTable = class extends KUI.Page{
	constructor(p){
		super(p);

		this.state = {
			query : {}
		};
	}
	getDepModule(){
		return {
			Student : KG.get('EF-Student'),
			Class : KG.get('EF-Class'),
			Program : KG.get('EF-Program')
		};
	}
	getMeteorData(){
		this.module = this.getDepModule();

		let query = _.clone(this.state.query);

		let date = query.date || '';
		delete query.date;
console.log(date, query);
		let x2 = this.module.Class.getClassByDateAndQuery(date, query);
		console.log(x2);
		return {
			ready : x2.ready(),
			classList : x2.data
		};
	}

	render(){
		if(!this.data.ready){
			return util.renderLoading();
		}
		console.log(this.data.classList);

		let self = this;
		let titleArray = [
			{
				title : 'Name',
				key : 'nickName'
			},
			{
				title : 'Trial Number',
				//key : 'trialStudent',
				reactDom(doc){
					let c = doc.trial['d'+moment(self.state.query.date).format('YYYYMMDD')];
					if(!c) c = 0;
					return c+' / '+doc.trialStudent;
				}
			},
			{
				title : 'Teacher',
				key : 'teacher'
			},
			{
				title : 'Time',
				key : 'schedule.time'
			},
			{
				title : 'action',
				style : {
					textAlign : 'center'
				},
				reactDom(doc, index){
					return <RC.Div style={{textAlign:'center'}}><input value={index} type="radio" name="trail_table" /></RC.Div>;
				}
			}
		];

		if(this.props.type === 'makeup'){
			titleArray[1] = {
				title : 'Makeup Number',
				reactDom : function(doc){
					let c = doc.makeup['d'+moment(self.state.query.date).format('YYYYMMDD')];
					if(!c) c = 0;
					return c+' / '+doc.makeupStudent;
				}
			};
		}

		return (
			<KUI.Table
				style={{}}
				list={this.data.classList}
				title={titleArray}
				ref="table"></KUI.Table>
		);
	}

	getSelectValue(){
		let rd = util.getReactJQueryObject(this.refs.table).find('input[type="radio"]');
		let i = null;
		rd.each(function(){
			if($(this).prop('checked')){
				i = $(this).val();
				return false;
			}
		});

		if(i){
			return {
				classID : this.data.classList[i]._id,
				date : this.state.query.date,
				classData : this.data.classList[i]
			};
		}

		return null;

	}
};


KUI.Student_TrailClass = class extends KUI.Page{
	getDepModule(){
		return {
			Student : KG.get('EF-Student'),
			Class : KG.get('EF-Class'),
			Program : KG.get('EF-Program'),
			ClassStudent : KG.get('EF-ClassStudent')
		};
	}

	getMeteorData(){
		this.module = this.getDepModule();
		let studentID = FlowRouter.getParam('studentID'),
			x = Meteor.subscribe('EF-Student', {
				query : {_id : studentID}
			}),
			x1 = Meteor.subscribe('EF-ClassStudent', {
				query : {studentID : studentID}
			});
		return {
			ready : x.ready(),
			student : this.module.Student.getAll()[0]
		};
	}


	render(){
		if(!this.data.ready){
			return util.renderLoading();
		}

		return (
			<RC.Div>
				<h3>Trial Class for {this.data.student.name}</h3>
				<hr/>
				<FilterBox ref="filter" />
				<hr/>
				<ResultTable ref="result" />
				<RC.Div style={{textAlign:'right'}}>
					<KUI.YesButton onClick={this.trial.bind(this)} label="Trial Class"></KUI.YesButton>
				</RC.Div>
			</RC.Div>
		);
	}

	runOnceAfterDataReady(){
		util.message.register(MSG, (param)=>{
			console.log(param);
			this.refs.result.setState({
				query : param.query
			});
		});
	}

	trial(){
		let self = this;
		let m = this.getDepModule();
		let data = this.refs.result.getSelectValue();

		if(!data){
			util.toast.showError('You must select a class to trial');
			return false;
		}

		data.studentID = this.data.student._id;

		m.Class.callMeteorMethod('checkStudentCanBeTrailClass', [data], {
			context : this,
			success : function(json){
				console.log(json);
				KG.result.handle(json, {
					success : function(){
						self.insertTailData(data);
					},
					error : function(e){
						util.toast.showError(e.reason);
					}
				});
			}
		});
	}

	insertTailData(json){
		let self = this;
		let data = {
			classID : json.classID,
			studentID : json.studentID,
			lessonDate : json.date,
			type : 'trial',
			status : 'checkouted'
		};

		console.log(data);
		let rs = this.module.ClassStudent.insert(data);
		console.log(rs);
		KG.result.handle(rs, {
			success : function(cid){
				//TODO how to pay?
				console.log(cid);

				self.module.Class.callMeteorMethod('syncClassTrialOrMakeupNumber', [cid], {
					success : function(json){
console.log(json);
						util.toast.alert('Trial Class Success');
						util.goPath('/student/'+data.studentID);
					}
				});


			},
			error : function(e, error){
				console.log(e);
				util.toast.showError(error.statusText);
			}
		});
	}

};

let FilterBox1 = class extends KUI.Page{

	getMeteorData(){
		this.module = KG.DataHelper.getDepModule();

		return {
			ready : true,
			data : []
		};
	}

	render(){

		let p = {
			date : {
				labelClassName : 'col-xs-3',
				wrapperClassName : 'col-xs-4',
				ref : 'date',
				label : 'Select Date'
			}
		};

		return (
			<form className="form-horizontal">
				<RB.Row>
					<RB.Col md={12}>

						<RB.Input type="text" {... p.date} />

					</RB.Col>
				</RB.Row>
			</form>
		);
	}
	search(){
		let {date} = this.getRefs();
		let query = {
			date : $(date.getInputDOMNode()).datepicker('getDate')
		};
		console.log(query)
		util.message.publish(MSG, {
			query : query
		});

	}
	getRefs(){
		return {
			date : this.refs.date
		};
	}
	runOnceAfterDataReady(){
		let {date} = this.getRefs();
		$(date.getInputDOMNode()).datepicker({});
		$(date.getInputDOMNode()).bind('hide', this.search.bind(this));
	}
};


KUI.Student_MakeupClass = class extends KUI.Page{
	constructor(p){
		super(p);
		this.state = {
			fee : 0
		};

		this.fee = 0;
		this.coupon = null;

		this.m = KG.DataHelper.getDepModule();
	}

	getMeteorData(){
		this.module = this.m;
		let studentID = FlowRouter.getParam('studentID'),
			classID = FlowRouter.getParam('classID'),
			x = Meteor.subscribe('EF-Student', {
				query : {_id : studentID}
			}),
			x1 = Meteor.subscribe('EF-ClassStudent', {
				query : {studentID : studentID}
			});

		let x2 = Meteor.subscribe('EF-Class', {
			query : {
				_id : classID
			}
		});


		return {
			ready : x.ready() && x2.ready(),
			student : this.module.Student.getAll()[0],
			class : this.module.Class.getDB().findOne()
		};
	}


	render(){
		if(!this.data.ready){
			return util.renderLoading();
		}

		return (
			<RC.Div>
				<h3>Makeup Class for {this.data.student.name}</h3>
				<hr/>
				<FilterBox1 ref="filter" />
				<hr/>
				<ResultTable type="makeup" ref="result" />
				<RC.Div style={{textAlign:'right'}}>
					<KUI.YesButton onClick={this.makeup.bind(this)} label="Makeup Class"></KUI.YesButton>
				</RC.Div>
				{this.renderPaymentBox()}
			</RC.Div>
		);
	}

	runOnceAfterDataReady(){
		util.message.register(MSG, (param)=>{
			param.query.programID = this.data.class.programID;
			param.query.sessionID = this.data.class.sessionID;
			param.query._id = {
				'$nin' : [this.data.class._id]
			};

			console.log(param);
			this.refs.result.setState({
				query : param.query
			});
		});
	}

	makeup(){
		let self = this;
		let m = this.module;
		let data = this.refs.result.getSelectValue();

		if(!data){
			util.toast.showError('You must select a class to makeup');
			return false;
		}

		data.studentID = this.data.student._id;

		//self.insertTailData(data);

		m.Class.callMeteorMethod('checkStudentCanBeMakeupClass', [data], {
			context : this,
			success : function(json){
				KG.result.handle(json, {
					success : function(){
						self.insertTailData(data);
					},
					error : function(e){
						util.toast.showError(e.reason);
					}
				});
			}
		});
	}

	insertTailData(json){
		let fee = this.data.class.makeupClassFee;

		let data = {
			classID : json.classID,
			studentID : json.studentID,
			lessonDate : json.date,
			type : 'makeup',
			status : 'pending'
		};

		if(false && fee === 0){
			data.status = 'checkouted';
			console.log(data);
			let rs = this.module.ClassStudent.insert(data);
			console.log(rs);
			KG.result.handle(rs, {
				success : function(cid){
					//TODO how to pay?
					console.log(cid);
					util.toast.alert('Makeup Class Success');
					util.goPath('/student/'+data.studentID);
				},
				error : function(e, error){
					console.log(e);
					util.toast.showError(error.statusText);
				}
			});
		}
		else{
			this.setState({
				fee : fee
			});

			this.fee = fee;
		}

	}

	getSubmitData(){

		let json = this.refs.result.getSelectValue();


		return {
			classID : json.classID,
			date : json.date,
			studentID : this.data.student._id
		};

	}

	submitMakeupClass(){
		let data = this.getSubmitData();
		if(!data){
			util.toast.showError('please select a class');
			return false;
		}

		data.type = 'makeup';
		data.status = 'pending';
		data.lessonDate = data.date;
		delete data.date;

		let rs = this.module.ClassStudent.insert(data);
		console.log(rs);
		let self = this;
		KG.result.handle(rs, {
			success : function(cid){
				//TODO how to pay?
				console.log(cid);
				//util.toast.alert('Makeup Class Success');
				//util.goPath('/student/'+data.studentID);
				self.insertOrderData(cid);
			},
			error : function(e, error){
				console.log(e);
				util.toast.showError(error.statusText);
			}
		});



	}
	insertOrderData(cid){
		let self = this;
		let orderData = {
			accountID : this.data.student.accountID,
			studentID : this.data.student._id,
			details : [cid],
			paymentType : this.refs.payway.getValue(),
			type : 'makeup class',
			status : 'waiting',
			amount : this.fee
		};

		let way = this.refs.payway.getValue();
		let total = this.fee;
		let cash = false;

		if(this.coupon){
			orderData.couponID = this.coupon;
			orderData.discount = this.state.fee - this.fee;
		}

		if(this.fee === 0){
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
			else{
				orderData.status = 'success';
				orderData.poundage = 0;
				cash = true;
			}
			total = total.toFixed(2);
			orderData.poundage = orderData.poundage.toString();
			orderData.paymentTotal = total;
		}


console.log(orderData);
		let orderRs = KG.get('EF-Order').insert(orderData);
		KG.result.handle(orderRs, {
			success : function(id){


				if(self.coupon){
					self.module.Coupon.useOnce(self.coupon, self.data.student.accountID);
				}
				self.m.ClassStudent.callMeteorMethod('updateClassFeeByOrderID', [id, cid], {});

				if(self.fee === 0 || cash){

					self.module.ClassStudent.updateStatus('checkouted', cid);
					self.module.Class.callMeteorMethod('syncClassTrialOrMakeupNumber', [cid], {
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
		let data = this.getSubmitData();
		KG.RequestLog.addByType('makeup class', {
			id : cid,
			data : {
				accountID : this.data.student.accountID,
				studentID : this.data.student._id,
				classID : data.classID,
				date : moment(data.date).format('MM/DD/YYYY'),
				amount : this.fee,
				paymentType : this.refs.payway.getValue()
			}
		});

	}

	applyCouponCode(){
		let self = this;
		let m = this.module;

		let code = util.getReactJQueryObject(this.refs.cpcode).val();
		if(!code){
			util.toast.showError('Please enter coupon code');
			return;
		}

		let json = this.refs.result.getSelectValue();

		//check coupon code
		let param = {
			accountID : this.data.student.accountID,
			couponCode : code,
			overRequire : this.state.fee,
			programID : json.classData.programID,
			weekdayRequire : json.classData.schedule.day
		};
		console.log(param);
		m.Coupon.callMeteorMethod('checkCouponCodeValidByCustomerID', [param], {
			success : function(rs){
				KG.result.handle(rs, {
					success : function(d){
						console.log(d);
						let fee = m.Coupon.calculateDiscountResult(d.discount, self.state.fee);

						util.getReactJQueryObject(self.refs.fee).html('total : $'+fee);
						self.fee = fee;
						self.coupon = code;
					},
					error : function(err){
						util.toast.showError(err.reason);
					}
				});
			}
		});
	}

	renderPaymentBox(){
		let tuition = this.state.fee;
		let h = '';
		if (tuition > 0) {
			h = (
				<RC.Div>
					<KUI.Comp.SelectPaymentWay ref="payway" />
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
					<RC.Div style={{textAlign:'right'}}>
						<KUI.YesButton onClick={this.payNow.bind(this)} label="Pay Now"></KUI.YesButton>
					</RC.Div>
				</RC.Div>
			);
		}
		else{
			return null;
		}

		return (
			<RC.Div>
				<hr/>
				<p ref="fee">Total : ${this.state.fee}</p>
				{h}
			</RC.Div>
		);
	}

	payNow(){
		//TODO pay
		this.submitMakeupClass();
	}

};

