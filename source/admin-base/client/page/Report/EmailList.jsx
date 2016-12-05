KUI.EmailList_Report = class extends KUI.Page{

    constructor(p){
        super(p)

        this.state = {
            list : [],
            total : 0
        }

        this.sessionID = FlowRouter.getParam('sessionID')
    }

    getMeteorData(){
        return {ready :true}
    }

    getStateData(){
		let self = this;


		self.setState({
			list : 'loading'
		});
		KG.DataHelper.callMeteorMethod('getEmailListBySessionRegistration', [this.sessionID], {
			success : function(list){
                console.log(list)
				self.setState({
					list : list,
					total : list.length
				});
			}
		});
	}

    render(){
        if(this.state.list === 'loading'){
            return util.renderLoading()
        }

        return (
			<RC.Div>
				<h3>{`Email List`}</h3>
				<hr/>
                <div style={{textAlign:'right',marginBottom:'20px'}}>
                    <KUI.YesButton onClick={this.exportToExcel.bind(this)} label="Export Report" ></KUI.YesButton>
                </div>
				{this.renderTable()}
			</RC.Div>
		);
    }

    renderTable(){
        let titleArray = [
            {
                title : 'ID',
                reactDom(doc){
                    return doc.customer[0]._id
                }
            },
			{
				title : 'Name',
                reactDom(doc){
                    return doc.customer[0].name
                }
			},
            {
                title : 'Student Name',
                reactDom(doc){
                    return doc.student[0].name
                }
            },
			{
                title : 'Email',
                reactDom(doc){
                    return doc.customer[0].email
                }
            },
            {
                title : 'Phone',
                reactDom(doc){
                    return doc.customer[0].phone
                }
            }
		];

		return (
			<KUI.Table
				style={{}}
				list={this.state.list}
				title={titleArray}
				total={this.state.total}
				ref="table">
			</KUI.Table>
		);
    }

    runOnceAfterDataReady(){
        this.getStateData()
    }

    exportToExcel(){
		let list = []
        _.each(this.state.list, (item)=>{
            let res = {
                ID : item.customer[0]._id,
                Name : item.customer[0].name,
                StudentName : item.student[0].name,
                Email : item.customer[0].email,
                Phone : item.customer[0].phone
            }
            list.push(res)

        })
		let csv = Papa.unparse(list)
		var blob = new Blob([csv], {type: "text/plain;charset=utf-8"});
		saveAs(blob, "EmailList.csv");
	}
}
