
KUI.RequestLog_Index = class extends KUI.Page{

	getMeteorData(){
		let x = Meteor.subscribe('EF-Request', {
			sort : {createTime : -1},
			pageSize : 50
		});

		return {
			ready : x.ready(),
			data : KG.RequestLog.getDB().find({}).fetch()
		}
	}

	render(){
		if(!this.data.ready){
			return util.renderLoading();
		}

		let titleArray = [
			{
				title : ' ',
				reactDom(doc){
					return moment(doc.createTime).format('MM/DD/YYYY hh:mm:ss');
				}
			},
			{
				title : 'Username',
				key : 'operatorName'
			},
			{
				title : 'Type',
				key : 'type'
			},
			{
				title : 'From',
				key : 'client'
			},
			{
				title : 'Action',
				style : {
					textAlign : 'center'
				},
				reactDom(doc){

					let show = function(){
						//TODO
						alert('comming soon');
					};

					return (
						<RC.Div style={{textAlign:'center'}}>
							<KUI.Icon onClick={show} icon="fa fa-eye" font="18px" color="#1ab394" style={{}}></KUI.Icon>
						</RC.Div>
					);
				}
			}
		];

		let list = this.data.data;
		return (
			<RC.Div>
				<h3>Request Log</h3>
				<KUI.Table
					style={{}}
					list={list}
					title={titleArray}
					ref="table"></KUI.Table>
			</RC.Div>

		);
	}
};