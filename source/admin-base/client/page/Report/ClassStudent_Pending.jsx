KUI.Report_ClassStudent_Pending = class extends KUI.Page{

	constructor(p){
		super(p);

		this.m = KG.DataHelper.getDepModule();

		this.state = {
			list : []
		};
	}

	getMeteorData(){

		return {
			ready : true,
			data : []
		};
	}

	runOnceAfterDataReady(){
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
					textAlign : 'center'
				},
				reactDom(doc){
					let sy = {
						lineHeight : '24px',
						height : '24px',
						fontSize : '12px',
						padding : '0 12px',
						marginRight: '10px'
					};


					return (
						<RC.Div style={{textAlign:'center'}}>
							<KUI.NoButton style={sy} href={`/registration/payment/${doc._id}`}
							              label="pay now"></KUI.NoButton>

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

};