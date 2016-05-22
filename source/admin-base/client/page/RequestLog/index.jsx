
KUI.RequestLog_Index = class extends KUI.Page{

	constructor(p){
		super(p);

		this.state = {
			page : 1
		};
	}

	getMeteorData(){

		let x = util.data.subscribe(KG.RequestLog, {
			sort : {createTime : -1},
			pageSize : 10,
			pageNum : this.state.page
		});

		return {
			ready : x.ready(),
			data : KG.RequestLog.getDB().find({}).fetch(),
			count : x.ready()?util.data.getMaxCount(x):0
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
				<KUI.PageTable
					style={{}}
					total={this.data.count}
					pagesize={10}
					page={this.state.page}
					onSelectPage={this.selectPage.bind(this)}
					list={list}
					title={titleArray}
					ref="table"></KUI.PageTable>
			</RC.Div>

		);
	}
	selectPage(page){

		this.setState({
			page : page
		});
	}
};