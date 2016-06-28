let _ = lodash;
const sy = {
	tac : {
		textAlign : 'center'
	},
	pd : {
		padding : '20px 15px'
	}
};

//TODO make to a common select component
let SelectStudent = class extends RC.CSS{
	constructor(p){
		super(p);

		this.state = {
			studentID : null
		};
		this.studentList = this.props.studentList;
	}
	render(){

		return (
			<MUI.SelectField fullWidth={true}
			                 hintText="Select Student"
			                 value={this.state.studentID}
			                 onChange={((e, i, v)=>{this.setValue(v)}).bind(this)}>
				{
					_.map(this.studentList, (item, index)=>{
						return <MUI.MenuItem key={index} value={item._id} primaryText={item.name} />
					})
				}
			</MUI.SelectField>
		);
	}
	getValue(){
		return this.state.studentID;
	}
	setValue(v, f=false){
		this.setState({studentID : v});
		!f && this.props.callback(v);
	}
};

EdminForce.Components.MakeupClasses_1 = class extends RC.CSS{
	constructor(p){
		super(p);

		this.state = {
			currentStudentID : null,
			currentClassID : null
		};

		this.titleText = "Please select a student whom you'd like to book a make-up for.";
		this.process(this.props);
	}

	process(p){
		let sl = [];
		let sm = {};
		_.each(this.props.students, (item)=>{
			sl.push(item);
			sm[item._id] = _.filter(item.currentClasses, (one)=>{
				return one.type === 'register';
			});
		});

		this.studentList = sl;
		this.studentMap = sm;
	}


	renderSelectStudent(){
		return (
			<SelectStudent ref="select_student" studentList={this.studentList} callback={this.onSelectStudent.bind(this)} />
		);

	}
	onSelectStudent(v){
		this.titleText = "Please select a current class which you'd like to book a make-up for.";
		this.setState({
			currentStudentID : v,
			currentClassID : null
		});
	}

	componentDidMount(){
		super.componentDidMount();
		if(this.studentList.length === 1){
			//this.setState({currentStudentID : this.studentList[1]._id});
			this.refs.select_student.setValue(this.studentList[0]._id);
		}
	}

	renderSelectClass(){
		let cs = this.studentMap[this.state.currentStudentID];
		console.log(cs);

		if(!this.state.currentStudentID) return null;
		if(!cs || cs.length < 1){
			this.titleText = '';
			return this.renderErrorMessage('You are not eligible for booking a make-up at this moment. ');
		}

		if(!this.state.currentClassID && cs.length === 1){
			this.state.currentClassID = cs[0].class._id;
			this.titleText = '';
		}

		return (
			<MUI.SelectField fullWidth={true}
			                 hintText="Select Class"
			                 menuStyle={{width:'auto'}}
			                 style={{overflow:'hidden'}}
			                 value={this.state.currentClassID}
			                 onChange={this.onSelectClass.bind(this)}>
				{
					_.map(cs, (item, index)=>{
						return <MUI.MenuItem key={index} value={item.class._id} primaryText={item.class.name} />
					})
				}
			</MUI.SelectField>
		);
	}

	onSelectClass(e, i, v){
		this.titleText = '';
		this.setState({
			currentClassID : v
		});
	}

	renderErrorMessage(msg){
		return <RC.Div style={sy.tac} className="padding"><h6>{msg}</h6></RC.Div>;
	}

	render(){
		if(this.studentList.length < 1){
			return this.renderErrorMessage('No Student.');
		}

		return (
			<RC.Div style={sy.pd}>
				<p style={sy.tac}>{this.titleText}</p>
				{this.renderSelectStudent()}
				{this.renderSelectClass()}
				{this.renderClassList()}
			</RC.Div>
		);
	}

	renderClassList(){
		if(!this.state.currentStudentID || !this.state.currentClassID) return null;

		let map = this.studentMap,
			so = _.find(this.studentList, (item)=>{return item._id === this.state.currentStudentID}),
			co = _.find(map[this.state.currentStudentID], (item)=>{return item.classID === this.state.currentClassID});
		let q = {
			studentID : so._id,
			studentName : so.name,
			classID : co.classID
		};

		return (
			<EdminForce.Containers.MakeupClasses
				studentID={q.studentID}
				studentName={q.studentName}
				classID={q.classID}
				title={<p style={sy.tac}>Please select preferred day and class.</p>}
				context={EdminForce.Contexts.Programs}
				actions={EdminForce.Actions.Programs} />
		);

	}
};
