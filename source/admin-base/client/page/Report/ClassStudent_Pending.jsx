KUI.Report_ClassStudent_Pending = class extends KUI.Page{

	constructor(p){
		super(p);

		this.m = KG.DataHelper.getDepModule();

		this.state = {
			list : [],

			refresh : null
		};
	}

	getMeteorData(){

		return {
			ready : true,
			data : []
		};
	}

	runOnceAfterDataReady(){
		console.log('--- once ---');
		let self = this;
		this.m.ClassStudent.callMeteorMethod('getAllByQuery', [{status : 'pending'}, {
			sort : {updateTime : -1}
		}], {
			success : function(list){
				self.setState({
					list : list
				});
			}
		});
	}

	render(){
		let self = this;
		let titleArray = [
			{
				title : 'Class',
				key : 'class.nickName'
			},
			{
				title : 'Student',
				key : 'student.name'
			},
			{
				title : 'Teacher',
				key : 'class.teacher'
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


					return (
						<RC.Div style={{textAlign:'center'}}>
							<KUI.NoButton style={sy} href={`/registration/payment/${doc._id}`}
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
			<KUI.Table
				style={{}}
				list={list}
				title={titleArray}
				ref="table1"></KUI.Table>
		);
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