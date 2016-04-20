
KUI.Session_CopySessionClass = class extends KUI.Page{

	constructor(p){
		super(p);

		this.m = KG.DataHelper.getDepModule();
	}

	getMeteorData(){
		let id = FlowRouter.getParam('sessionID');

		let x1 = Meteor.subscribe('EF-Session', {
			query : {
				_id : {'$nin':[id]}
			}
		});
		//let x2 = Meteor.subscribe('EF-Class', {
		//	query : {
		//		sessionID : id
		//	}
		//});

		return {
			ready : x1.ready(),
			id : id
		};
	}

	render(){
		if(!this.data.ready){
			return util.renderLoading();
		}

		return (
			<RC.Div>
				<h3>Copy Class</h3>
				<hr/>

				{this.renderFilterBox()}
			</RC.Div>
		);
	}

	renderFilterBox(){
		let p = {
			session : {
				labelClassName : 'col-xs-2',
				wrapperClassName : 'col-xs-10',
				ref : 'session',
				label : 'From Session'
			}
		};

		let option = {
			session : this.m.Session.getDB().find().fetch()
		};
		return (
			<form className="form-horizontal">
				<RB.Row>
					<RB.Col xs={6}>
						<RB.Input type="select" {... p.session}>
							{
								_.map(option.session, (item, index)=>{
									return <option key={index} value={item._id}>{item.name}</option>;
								})
							}
						</RB.Input>
					</RB.Col>
				</RB.Row>
				<RC.Div style={{textAlign:'right'}}>
					<KUI.YesButton ref="btn" onClick={this.submit.bind(this)} label="Copy Class"></KUI.YesButton>
				</RC.Div>
			</form>
		);
	}

	submit(){
		let self = this;
		let sid = this.refs.session.getValue();
		this.refs.btn.loading(true);
		this.m.Session.callMeteorMethod('copyClassFromSession', [sid, this.data.id], {
			context : this,
			success : function(rs){
				KG.result.handle(rs, {
					success : function(){
						self.refs.btn.loading();
						util.toast.alert('Copy class success');
					},
					error : function(e){
						self.refs.btn.loading();
						util.toast.showError(e.reason);
					}
				});
			}
		});
	}
};