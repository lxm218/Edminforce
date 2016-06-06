// multi register page
let sy = {
	ml : {
		marginLeft : '20px'
	},
	rd : {
		textAlign : 'right'
	},
	col : {
		position : 'relative',
		top : '5px',
		fontSize : '16px'
	}
};
let StudentFilter = class extends RC.CSS{
	constructor(p){
		super(p);

		this.m = KG.DataHelper.getDepModule();

		this.state = {
			loading : false,

			student : null,

			searchResult : null
		};

		this.showSelectButton = true;
		this.page = 1;
	}

	componentDidMount(){
		super.componentDidMount();

		let self = this;
		if(this.props.studentID){
			this.showSelectButton = false;
			this.setState({
				loading : true
			});

			this.m.Student.callMeteorMethod('getStudentListByQuery', [{_id:this.props.studentID}, {}], {
				success : function(rs){
					if(rs.count>0){
						self.setState({
							loading : false,
							student : rs.list[0]
						});
					}
					else{
						swal({
							type : 'warning',
							title : 'student ID is not valid, Please check!'
						});
					}
				}
			});
		}
	}

	render(){
		if(this.state.loading){
			return util.renderLoading();
		}

		let p = {
			student : {
				labelClassName : 'col-xs-2',
				wrapperClassName : 'wrapper',
				ref : 'student',
				label : 'Student'
			}
		};

		let so = this.state.student;
		return (
			<form className="form-horizontal">
				<RB.Row>
					<RB.Col md={12} mdOffset={0}>

						<RB.Input {... p.student}>
							<RB.Row>
								{so?<RB.Col style={sy.col} xs={4}>{so.name}</RB.Col>:''}
								<RB.Col xs={2}>
									{this.showSelectButton?<KUI.YesButton onClick={this.openModal.bind(this)} label="Select"></KUI.YesButton>:null}
								</RB.Col>
							</RB.Row>
						</RB.Input>

					</RB.Col>
				</RB.Row>

				{this.renderSelectModal()}
			</form>
		);
	}

	openModal(){
		this.refs.modal.show();
	}

	renderSelectModal(){
		let self = this;
		let param = {
			title : `Search Student`,
			YesFn : function(){
				let jq = $(ReactDOM.findDOMNode(this.refs.ss));
				let inp = jq.find('input[type="radio"]');

				let rs;
				inp.each(function(){
					if($(this).prop('checked')){

						rs = $(this).val();
						return false;
					}
				});

				rs = _.find(this.state.searchResult.list, {_id : rs});
				if(!rs){
					swal({
						type : 'warning',
						title : 'Please select a student.'
					});

					return false;
				}
				console.log(rs);
				this.setState({
					student : rs
				});
				this.refs.modal.hide();
			},
			YesText : 'Confirm',
			renderBody : function(){
				return (
					<RC.Div>

						{this.renderDetailBody()}
					</RC.Div>
				);
			}
		};

		return util.dialog.render.call(this, 'modal', param);
	}

	renderDetailBody(){
		return (
			<form className="form-horizontal">
				<RB.Row>
					<RB.Col xsOffset={2} xs={6}>
						<RB.Input ref="search_input" placeholder="Input student name" type="text" />
					</RB.Col>
					<RB.Col xs={2}>
						<KUI.YesButton onClick={this.searchStudentByKeyword.bind(this)} label="Search"></KUI.YesButton>
					</RB.Col>
				</RB.Row>

				{this.renderStundentTable()}
			</form>
		);
	}

	getStateData(){
		let self = this;
		let ip = this.refs.search_input.getValue();
		let query = {};
		if(ip){
			query = {
				name : {
					type : 'RegExp',
					value : ip
				}
			};
		}

		this.setState({
			searchResult : 'loading'
		});
		this.m.Student.callMeteorMethod('getStudentListByQuery', [query, {
			pageNum : self.page,
			sort : {
				createTime : -1
			}
		}], {
			success : function(rs){
				console.log(rs);
				self.setState({
					searchResult : rs
				});
			}
		});
	}

	searchStudentByKeyword(){
		this.page = 1;
		this.getStateData();
	}

	renderStundentTable(){
		if(this.state.searchResult === 'loading'){
			return util.renderLoading();
		}
		else if(!this.state.searchResult){
			return null;
		}


		let self = this;

		const titleArray = [
			{
				title : '',
				reactDom(item){

					return <RC.Div style={{textAlign:'center'}}><label>
						<input type="radio" value={item._id} name="select_student" />
					</label></RC.Div>;
				}
			},
			{
				title : 'Student',
				key : 'name',
				style : {}
			},
			{
				title : 'Email',
				key : 'customer.email'
			},
			{
				title : 'Gender',
				key : 'profile.gender',
				style : {
				}
			},
			{
				title : 'Age',
				key : 'age'
			}
		];

		let sl = this.state.searchResult;
		return (
			<KUI.PageTable
				total={sl.count}
				page={this.page}
				pagesize={10}
				onSelectPage={this.changePageNum.bind(this)}
				style={{}}
				list={sl.list}
				title={titleArray}
				ref="ss"></KUI.PageTable>
		);
	}

	changePageNum(page){
		this.page = page;
		this.getStateData();
	}

	getValue(){
		return this.state.student;
	}

};

let ClassFilter = class extends KUI.Page{
	constructor(p){
		super(p);

		this.m = KG.DataHelper.getDepModule();

		this.state = {
			loading : false,

			class : null,

			searchResult : null
		};

		this.showSelectButton = true;
		this.page = 1;
	}

	getMeteorData(){
		if(this.props.classID){
			return {
				ready : true,
				programList : [],
				sessionList : [],
				teacherList : []
			};
		}

		let x2 = Meteor.subscribe('EF-Program', {});
		let x3 = Meteor.subscribe('EF-Session', {
			query : {
				registrationStatus : 'Yes'
			}
		});
		let x4 = Meteor.subscribe('EF-AdminUser', {
			query : {
				role : 'teacher'
			}
		});
		if(!x2.ready() || !x3.ready() || !x4.ready()) return {ready : false};

		let programList = this.m.Program.getDB().find({}, {sort:{
			createTime : -1
		}}).fetch(),
			sessionList = this.m.Session.getDB().find({}, {sort : {
				updateTime : -1
			}}).fetch(),
			teacherList = this.m.AdminUser.getAll({});

		return {
			ready : true,
			programList,
			sessionList,
			teacherList
		};
	}

	componentDidMount(){
		super.componentDidMount();

		let self = this;
		if(this.props.classID){
			this.showSelectButton = false;
			this.setState({
				loading : true
			});

			this.m.Class.callMeteorMethod('getAllByQuery', [{_id:this.props.classID}, {}], {
				success : function(rs){
					if(rs.count>0){
						self.setState({
							loading : false,
							class : rs.list[0]
						});
					}
					else{
						swal({
							type : 'warning',
							title : 'class ID is not valid, Please check!'
						});
					}
				}
			});
		}
	}


	render(){
		if(this.state.loading || !this.data.ready){
			return util.renderLoading();
		}

		let p = {
			lesson : {
				labelClassName : 'col-xs-2',
				wrapperClassName : 'wrapper',
				ref : 'Class',
				label : 'lesson'
			}
		};

		let so = this.state.class;
		return (
			<form className="form-horizontal">
				<RB.Row>
					<RB.Col md={12} mdOffset={0}>

						<RB.Input {... p.lesson}>
							<RB.Row>
								{so?<RB.Col style={sy.col} xs={4}>{so.nickName}</RB.Col>:''}
								<RB.Col xs={2}>
									{this.showSelectButton?<KUI.YesButton onClick={this.openModal.bind(this)} label="Select"></KUI.YesButton>:null}
								</RB.Col>
							</RB.Row>
						</RB.Input>

					</RB.Col>
				</RB.Row>

				{this.renderSelectModal()}
			</form>
		);
	}
	openModal(){
		this.refs.modal.show();
	}
	renderSelectModal(){
		let self = this;
		let param = {
			title : `Search Class`,
			YesFn : function(){
				let jq = $(ReactDOM.findDOMNode(this.refs.ss));
				let inp = jq.find('input[type="radio"]');

				let rs;
				inp.each(function(){
					if($(this).prop('checked')){

						rs = $(this).val();
						return false;
					}
				});

				rs = _.find(this.state.searchResult.list, {_id : rs});
				if(!rs){
					swal({
						type : 'warning',
						title : 'Please select a student.'
					});

					return false;
				}
				console.log(rs);
				this.setState({
					class : rs
				});
				this.refs.modal.hide();
			},
			YesText : 'Confirm',
			renderBody : function(){
				return (
					<RC.Div>

						{this.renderDetailBody()}
					</RC.Div>
				);
			}
		};

		return util.dialog.render.call(this, 'modal', param);
	}
	renderDetailBody(){
		return (
			<RC.Div>
				{this.getSearchFilterBox()}
				<RC.Div style={sy.rd}>
					<KUI.YesButton onClick={this.searchClass.bind(this)} label="Search"></KUI.YesButton>
				</RC.Div>
				<hr/>
				{this.renderSearchResultTable()}
			</RC.Div>
		);
	}
	searchClass(){
		this.page = 1;
		this.getClassList();
	}
	getClassList(){
		let self = this;

		let program = this.refs.program,
			session = this.refs.session,
			teacher = this.refs.teacher,
			day = this.refs.day;
		let query = {
			programID : program.getValue(),
			sessionID : session.getValue(),
			'schedule.day' : day.getValue()
		};
		if(query.programID === 'all'){
			delete query.programID;
		}
		if(query.sessionID === 'all'){
			delete query.sessionID;
		}
		if(query['schedule.day'] === 'all'){
			delete query['schedule.day'];
		}

		if(teacher.getValue() && teacher.getValue()!=='all'){
			query.teacher = teacher.getValue();
		}

		self.setState({
			searchResult : 'loading'
		});
		this.m.Class.callMeteorMethod('getAllByQuery', [query, {
			pageNum : self.page
		}], {
			success : function(rs){
				console.log(rs);
				self.setState({
					searchResult : rs
				});
			}
		});

	}
	getSearchFilterBox(){
		let p = {
			program : {
				labelClassName : 'col-xs-4',
				wrapperClassName : 'col-xs-8',
				ref : 'program',
				label : 'Program'
			},
			session : {
				labelClassName : 'col-xs-4',
				wrapperClassName : 'col-xs-8',
				ref : 'session',
				label : 'Session'
			},
			teacher : {
				labelClassName : 'col-xs-4',
				wrapperClassName : 'col-xs-8',
				ref : 'teacher',
				label : 'Teacher'
			},
			day : {
				labelClassName : 'col-xs-4',
				wrapperClassName : 'col-xs-8',
				ref : 'day',
				label : 'Day Of Class'
			}
		};

		let option = {
			program : this.data.programList,
			session : this.data.sessionList,
			day : KG.get('EF-Class').getDBSchema().schema('schedule.day').allowedValues,
			teacher : this.data.teacherList
		};


		return (
			<RB.Row>
				<form className="form-horizontal">
					<RB.Col md={6} mdOffset={0}>
						<RB.Input type="select" {... p.program}>
							<option key={-1} value="all">All</option>
							{
								_.map(option.program, (item, index)=>{
									return <option key={index} value={item._id}>{item.name}</option>;
								})
							}
						</RB.Input>
						<RB.Input type="select" {... p.teacher}>
							<option key={-1} value="all">All</option>
							{
								_.map(option.teacher, (item, index)=>{
									return <option key={index} value={item.nickName}>{item.nickName}</option>;
								})
							}
						</RB.Input>


					</RB.Col>

					<RB.Col md={6} mdOffset={0}>
						<RB.Input type="select" {... p.session}>
							<option key={-1} value="all">All</option>
							{
								_.map(option.session, (item, index)=>{
									return <option key={index} value={item._id}>{item.name}</option>;
								})
							}
						</RB.Input>

						<RB.Input type="select" {... p.day}>
							<option key={-1} value="all">All</option>
							{
								_.map(option.day, (item, index)=>{
									return <option key={index} value={item}>{item}</option>;
								})
							}
						</RB.Input>

					</RB.Col>
				</form>
			</RB.Row>
		);
	}

	renderSearchResultTable(){
		if(!this.state.searchResult) return null;
		if('loading' === this.state.searchResult){
			return util.renderLoading();
		}

		let self = this;

		let cl = this.state.searchResult;
		let titleArray = [
			{
				title : '',
				reactDom(item){

					return <RC.Div style={{textAlign:'center'}}><label>
						<input type="radio" value={item._id} name="select_student" />
					</label></RC.Div>;
				}
			},
			{
				title : 'Class',
				key : 'nickName'
			},
			{
				title : 'Registrations',
				//key : 'numberOfClass'
				reactDom(doc){
					return `${doc.numberOfRegistered||0}/${doc.maxStudent}`;
				}
			},
			{
				title : 'Teacher',
				key : 'teacher'
			},
			{
				title : 'Schedule',
				reactDom(doc){
					let d = doc.schedule;
					return `${d.day} ${d.time}`;
				}
			},
			{
				title : 'Tuition($)',
				key : 'tuition.money'
			}
		];

		return (
			<KUI.PageTable
				style={{}}
				total={cl.count}
				page={this.page}
				pagesize={10}
				onSelectPage={this.changePage.bind(this)}
				list={cl.list}
				title={titleArray}
				ref="ss">
			</KUI.PageTable>
		);
	}
	changePage(page){
		this.page = page;
		this.getClassList();
	}

	getValue(){
		return this.state.class;
	}
};

KUI.Registration_Page = class extends KUI.Page{
	constructor(p){
		super(p);

		this.m = KG.DataHelper.getDepModule();
	}

	getMeteorData(){
		let studentID = FlowRouter.getQueryParam('studentID'),
			classID = FlowRouter.getQueryParam('classID');

		return {
			studentID : studentID,
			classID : classID
		};
	}

	render(){

		return (
			<RC.Div>
				<h3>Register Class</h3>
				<hr/>
				<StudentFilter ref="sf" studentID={this.data.studentID} />
				<ClassFilter ref="cf" classID={this.data.classID} />

				<RC.Div style={sy.rd}>
					<KUI.YesButton onClick={this.submit.bind(this)} style={sy.ml} label="Register"></KUI.YesButton>
				</RC.Div>
			</RC.Div>
		);
	}


	submit(){
		let s = this.refs.sf.getValue(),
			c = this.refs.cf.getValue();

		if(!s){
			util.toast.showError('Please select a student');
			return false;
		}
		if(!c){
			util.toast.showError('Please select a class');
			return false;
		}


	}
};