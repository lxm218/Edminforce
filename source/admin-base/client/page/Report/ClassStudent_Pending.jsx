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
				wrapperClassName : 'col-xs-6',
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

KUI.Report_ClassStudent_Pending = class extends KUI.Page{

	constructor(p){
		super(p);

		this.m = KG.DataHelper.getDepModule();

		this.state = {
			list : null,
			query : {}
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
			status : 'pending'
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
				<h3>Pending Registration Report</h3>
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
			},

			{
				title : 'Status',
				key : 'status'
			},
			{
				title : 'Book Date',
				reactDom(doc){
					return moment(doc.createTime).format(util.const.dateFormat);
				}
			},
			{
				title : 'Action',
				style : {
					textAlign : 'center',
					width : '178px'
				},
				reactDom(doc){
					let sy = {
						lineHeight : '24px',
						height : '24px',
						fontSize : '12px',
						padding : '0 12px',
						marginRight: '10px'
					};

					let del = function(){
						swal({
							title : 'Delete this registration?',
							type : 'warning',
							showCancelButton: true,
							confirmButtonColor: "#1ab394",
							confirmButtonText: "Yes",
							cancelButtonText: "No",
							closeOnConfirm: true,
							closeOnCancel: true
						}, function(f){
							if(f){
								self.removeById(doc._id);
							}
						});
					};

					let goToPay = function(){
						if(doc.type === 'register'){
							util.goPath(`/registration/payment/${doc._id}`);
						}
						else if(doc.type === 'makeup'){
							util.goPath('/payment/makeup?classstudentID='+doc._id);
						}
					};


					return (
						<RC.Div style={{textAlign:'center'}}>
							<KUI.NoButton style={sy} onClick={goToPay}
							              label="pay now"></KUI.NoButton>
							<KUI.NoButton style={sy} onClick={del}
							              label="Cancel"></KUI.NoButton>
						</RC.Div>
					);
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

	removeById(id){
		let list = this.state.list;
		this.m.ClassStudent.callMeteorMethod('removeById', [id], {
			context : this,
			success : function(){
				let n = _.findIndex(list, {_id:id});
				console.log(list.length);

				list.splice(n, 1);
				console.log(list.length);
				this.setState({
					list : list,

					refresh : Meteor.uuid()
				});
			}
		});
	}

};
