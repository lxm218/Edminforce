
KUI.PageTable = class extends RC.CSS{
	static propTypes : {
		title : React.PropTypes.array,
		list : React.PropTypes.object,
		total : React.ProTypes.number,
		page : React.ProTypes.number,
		pagesize : React.ProTypes.number

		}


	constructor(prop){
		super(prop);


		this.state = {
			list : this.props.list
		};
	}

	componentWillUpdate(np, ns){
		super.componentWillUpdate(np, ns);

		if(np.list){
			this.setState({
				list : np.list
			});
		}
	}



	render(){

		let sy = _.extend({
			marginBottom:0
		}, this.props.style||{});

		const by = {
			div : {
				textAlign : 'left',
				marginBottom:'15px'
			},
			div1 : {
				textAlign : 'right',
				marginTop : '8px',
				display : this.props.total>1?'block':'none'
			}
		};

		return (
			<RC.Div style={by.div}>
				<RB.Table style={sy} striped bordered condensed hover>
					{this.renderThead()}
					{
						this.renderTBody()
					}
				</RB.Table>

				<div style={by.div1}><KUI.Pagination
					total={this.props.total}
					page={this.props.page}
					onSelectPage={this.props.onSelectPage}
					ref="page" /></div>
			</RC.Div>

		);
	}

	renderThead(){

		return (
			<thead><tr>
				{
					_.map(this.props.title, (item, index)=>{
						return <th key={index} style={item.style}>{item.title}</th>;
					})
				}
			</tr></thead>
		);
	}

	renderTBody(){
		var self = this;
		let eachTD = (item, index)=>{
			return (
				<tr key={index}>
					{
						_.map(this.props.title, (one, i)=>{

							// if one.reactDom exist
							if(one.reactDom){
								if(_.isFunction(one.reactDom)){
									return <td key={i}>{one.reactDom(item, index)}</td>;
								}
								else{
									return <td key={i}>{one.reactDom}</td>;
								}
							}


							let key = one.key.split('.');
							let rs = item, n=0;
							do{
								rs = rs[key[n]];
								n++;
							}while(key[n]);

							return (
								<td key={i}>{rs}</td>
							);
						})
					}
				</tr>
			);


		};

		return (
			<tbody>
			{
				_.map(this.state.list, (item, index)=>{
					return eachTD(item, index);
				})
			}

			</tbody>
		);
	}
};