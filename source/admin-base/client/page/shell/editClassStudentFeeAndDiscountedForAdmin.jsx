

KUI.Shell_editClassStudentFeeAndDiscountedForAdmin = class extends KUI.Page{
	constructor(p){
		super(p);

		this.m = KG.DataHelper.getDepModule();

		this.state = {
			list : null
		};
	}

	getMeteorData(){
		return {
			ready : true
		};
	}

	getStateData(){
		let self = this;
		self.setState({list : 'loading'});
		KG.DataHelper.callMeteorMethod('shellForGetClassStudentWrongDataForAdmin', [], {
			success : function(rs){
				console.log(rs);
				self.setState({
					list : rs
				});

			}
		});
	}

	runOnceAfterDataReady(){
		this.getStateData();
	}

	render(){
		if(!this.state.list){
			return null;
		}
		if('loading' === this.state.list){
			return util.renderLoading();
		}

		let self = this;

		let titleArray = [
			{
				title : 'ID',
				key : '_id'
			},
			{
				title : 'Time',
				reactDom(doc){
					return moment(doc.createTime).format(KG.const.dateAllFormat);
				}
			},
			{
				title : 'Order Fee',
				key : 'FEE'
			},
			{
				title : 'Order Actual',
				key : 'ACTUAL'
			},
			{
				title : '',
				reactDom(){
					return '';
				}
			},
			{
				title : 'Amount',
				key : 'amount'
			},
			{
				title : 'coupon dis',
				key : 'discount'
			},
			{
				title : 'school credit',
				key : 'schoolCredit'
			},
			{
				title : 'registrationFee',
				key : 'registrationFee'
			},
			{
				title : '',
				reactDom(){
					return '';
				}
			},
			{
				title : 'CS Fee',
				key : 'cs.fee'
			},
			{
				title : 'CS Acturl',
				key : 'cs.discounted'
			},
			{
				title : 'Action',
				reactDom(doc){

					let action = function(){
						self.m.ClassStudent.getDB().update({_id : doc.cs._id}, {
							'$set' : {
								fee : doc.FEE,
								discounted : doc.ACTUAL
							}
						});

						self.getStateData();
					};

					return <KUI.NoButton onClick={action} label="update"></KUI.NoButton>

				}
			}

		];

		return (
			<KUI.Table
				style={{}}
				list={this.state.list}
				title={titleArray}
				ref="table"></KUI.Table>
		);
	}
};