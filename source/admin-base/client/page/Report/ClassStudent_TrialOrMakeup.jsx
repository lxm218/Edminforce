
const sy = {
	td : {
		textAlign : 'left'
	},
	ml : {
		marginLeft : '20px'
	},
	rd : {
		textAlign : 'right'
	}
};
let Filter = class extends RC.CSS{
	render(){
		let p = {
			sname : {
				labelClassName : 'col-xs-2',
				wrapperClassName : 'col-xs-8',
				ref : 'sname',
				label : 'Search Student'
			}
		};


		return (
			<form className="form-horizontal">
				<RB.Row>
					<RB.Col md={12} mdOffset={0}>
						<RB.Input type="text" {... p.sname} />

					</RB.Col>
				</RB.Row>
			</form>
		);
	}

	getValue(){
		return this.refs.sname.getValue();
	}
};

KUI.Report_ClassStudent_TrialOrMakeup = class extends KUI.Page{
	constructor(p){
		super(p);

		this.m = KG.DataHelper.getDepModule();

		this.state = {
			list : null
		};

		this.page = 1;
	}
	getMeteorData(){

		return {
			ready : true
		};
	}

	runOnceAfterDataReady(){
		this.getStateData();
	}
	getStateData(){
		let self = this;
		console.log(this.page);
		self.setState({list : 'loading'});
		let s = this.refs.filter.getValue() || '';
		let query = {
			status : 'checkouted',
			type : {$in : ['trial', 'makeup']}
		};
		if(s){
			query.student = {
				type : 'RegExp',
				value : s
			}
		}
		this.m.ClassStudent.callMeteorMethod('getAllByQuery', [query, {
			sort : {updateTime : -1},
			pageNum : this.page,
			pageSize : 10
		}], {
			success : function(list){
				self.setState({
					list : list
				});
			}
		});
	}

	render(){

		return (
			<RC.Div>
				<h3>Trial/Makeup class report</h3>
				<hr/>
				<Filter ref="filter" />
				<RC.Div style={sy.rd}>
					<KUI.YesButton style={sy.ml} onClick={this.search.bind(this)} label="Search"></KUI.YesButton>
				</RC.Div>
				<hr/>
				{this.renderTable()}
			</RC.Div>
		);
	}

	search(){
		this.page = 1;
		this.getStateData();
	}
	renderTable(){
		if(!this.state.list) return null;
		if('loading' === this.state.list) return util.renderLoading();

		let self = this;
		let titleArray = [
			{
				title : 'Class',
				reactDom(doc){
					return doc.class[0].nickName;
				}
			},
			{
				title : 'Student',
				reactDom(doc){
					return doc.student[0].name;
				}
			},
			{
				title : 'Teacher',
				reactDom(doc){
					return doc.class[0].teacher;
				}
			},
			{
				title : 'Type',
				key : 'type'
			},
			{
				title : 'Lesson Date',
				reactDom(doc){
					if(doc.lessonDate){
						return moment(doc.lessonDate).format(KG.const.dateFormat);
					}
					return '';
				}
			}
		];

		let list = this.state.list;
		console.log(list);
		return (
			<RC.Div>
				<p>result : {list.count} matches</p>
				<KUI.PageTable
					style={{}}
					list={list.list}
					total={list.count}
					pagesize={10}
					onSelectPage={this.selectPage.bind(this)}
					page={this.page}
					title={titleArray}
					ref="table1">
				</KUI.PageTable>
			</RC.Div>

		);
	}

	selectPage(page){
		this.page = page;
		this.getStateData();
	}

};