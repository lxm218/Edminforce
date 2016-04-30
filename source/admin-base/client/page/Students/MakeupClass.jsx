//not use
KUI.Student_MakeupClass1 = class extends KUI.Page{
	constructor(p){
		super(p);
		this.state = {
			fee : 0
		};
	}
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
			classID = FlowRouter.getParam('classID'),
			x = Meteor.subscribe('EF-Student', {
				query : {_id : studentID}
			}),
			x1 = Meteor.subscribe('EF-Class', {
				query : {_id : classID}
			});
		let cs = this.module.Class.getAll()[0];
		return {
			ready : x.ready() && x1.ready(),
			student : this.module.Student.getAll()[0],
			class : cs,
			dateList : cs && this.module.Class.getClassLessonDate(cs)
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
				<p>Class Name : {this.data.class.nickName}</p>
				{this.renderResultTable()}
				<RC.Div style={{textAlign:'right'}}>
					<KUI.YesButton onClick={this.makeup.bind(this)} label="Makeup Class"></KUI.YesButton>
				</RC.Div>
				{this.renderPaymentBox()}
			</RC.Div>
		);
	}

	renderResultTable(){
		let list = this.data.dateList;

		let titleArray = [
			{
				title : 'Date',
				reactDom(doc){
					return moment(doc).format(util.const.dateFormat);
				}
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

		return (
			<KUI.Table
				style={{}}
				list={list}
				title={titleArray}
				ref="table"></KUI.Table>
		);
	}

	getSubmitData(){
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
				classID : this.data.class._id,
				date : moment(this.data.dateList[i]).toDate(),
				studentID : this.data.student._id
			};
		}

		return null;
	}

	runOnceAfterDataReady(){

	}

	makeup(){
		let self = this;
		let m = this.getDepModule();
		let data = this.getSubmitData();


console.log(data);
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

		if(fee === 0){
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
		}


	}

	submitMakeupClass(){
		let data = this.getSubmitData();
		data.type = 'makeup';
		data.status = 'checkouted';
		data.lessonDate = data.date;
		delete data.date;

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

	renderPaymentBox(){
		let tuition = this.state.fee;
		let h = '';
		if (tuition > 0) {
			h = (
				<RC.Div>
					<KUI.Comp.SelectPaymentWay type="cash" ref="payway" />
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
				{h}
			</RC.Div>
		);
	}

	payNow(){
		//TODO pay
		this.submitMakeupClass();
	}

};