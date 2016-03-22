/**
 * Created  on 3/19/16.
 */

UI.Picker = React.createClass({
	propTypes:{},

	getInitialState: function() {
		return {
			opened:false,	//是否已经打开,
			value:[], 		//['阿','b','c']
		}
	},

	getDefaultProps(){

		return {
			//readonly:true,
			//toolbar:<div>title</div>,
			//cols: [],
			//initValue:[],//初始值

			pickerAreaHeight:300,
			pickerHeaderHeight:36,
			pickerBodyHeight:300-36,
			pickerItemHeight:36,

		}
	},


	componentWillMount(){
		this.colsData = this.props.cols

		this.cols =[]

		this.valueArr=[]
		//this.displayValueArr=[]

		//todo 处理 value 和 display value
		if(this.props.initValue){
			this.setState({
				value:this.props.initValue,
				//displayValue: this.props.initValue.join(' '),
			})

			this.valueArr=this.props.initValue
			//this.displayValueArr=[]
		}

	},

	componentDidMount(){
		var self =this
		function closeOnHTMLClick(e) {
			if (!self.state.opened) return;

			if (self._input ) {
				if (e.target !== self._input ){//???.getDOMNode()
					if($(e.target).parents('.picker-modal').length === 0){
						self.close();
					}
				}
			}
			else {debugger
				if ($(e.target).parents('.picker-modal').length === 0)
					self.close();
			}
		}

		$('html').on('click', closeOnHTMLClick);


	},

	componentWillUnmount(){},
	componentDidUpdate(){},




	setValue(){

	},
	getValue(){

		return this.state.value

	},
	updateValue(){

	},

	//把用户改动 更新到state
	onValueChange(valueArr, displayValueArr){
		var p = this;

		this.setState({
			value:valueArr
		})

	},

	//不同的组件此方法实现不一样  有的有数据依赖有的没有
	onColValueChange( col, value, displayValue){
		var p = this
		this.valueArr[col.order] =value
		//this.displayValueArr[col.order]=displayValue

		//for (var i = 0; i < p.colsData.length; i++) {
		//	if (!p.colsData[i].divider)
		//		if(typeof this.valueArr[i] =='undefined')
		//			return
		//
		//}
		//
		//p.onValueChange( p.valueArr, p.displayValueArr);

		//var newValue = [];
		//var newDisplayValue = [];
		//for (var i = 0; i < p.cols.length; i++) {
		//	if (!p.cols[i].divider) {
		//		newValue.push(p.cols[i].value);
		//		newDisplayValue.push(p.cols[i].displayValue);
		//	}
		//}
		//if (newValue.indexOf(undefined) >= 0) {
		//	return;
		//}
		//p.value = newValue;
		//p.displayValue = newDisplayValue;
		//
		//p.onValueChange(p, p.value, p.displayValue);


	},

	open(){
		this.setState({
			opened:true
		})
	},
	close(){
		this.setState({
			opened:false
		})
	},

	confirm(){
		var p = this
		//for (var i = 0; i < p.colsData.length; i++) {
		//	if (!p.colsData[i].divider)
		//		if(typeof this.valueArr[i] =='undefined'){
		//			this.close()
		//			return
		//		}
		//}
debugger
		p.onValueChange( p.valueArr);

		this.close()
	},
	openOnInput(e){
		this.open()
		e.stopPropagation();
	},

	render() {
		var self = this

		let styles={
			pickerBody:{
				display:"flex",
				justifyContent:"center",
				overflow:"hidden",
				height:this.props.pickerBodyHeight,
				position:"relative",
			},
			hightLight:{
				height: "36px",
				position: "absolute",
				left: 0,
				width: "100%",
				top: "50%",
				marginTop: "-18px",
				pointerEvents: "none",
				borderBottom:"solid 1px grey",
				transformOrigin:"50% 0%"
			}
		}

		let  displayValue = this.state.value.join(' ')

		//reset ref
		//self.cols=[]

		return <div>


			<label>
				选择器
				<input  ref={(c) => this._input = c}
						value ={displayValue}
						type="text"
						readOnly={this.props.readonly}
						onClick={this.openOnInput}/>
			</label>


			{
				this.state.opened &&
				<UI.Portal className="picker-modal">
					 <UI.PickerArea   >

						<UI.PickerHeader
							close = {this.close}
							confirm={this.confirm}
							height={self.props.pickerHeaderHeight} />

						<div style={styles.pickerBody}>
							{
								this.colsData.map(function(colData,index){

									//获取对应的列的值
									let value = self.state.value[index]


									let picker= <UI.PickerCol
										pickerBodyHeight={self.props.pickerBodyHeight}
										pickerItemHeight={self.props.pickerItemHeight}

										key={index}
										order={index}

										value={value}

										onChange={self.onColValueChange}

										colData={colData}
										picker={self}
									/>

									return picker

								})
							}
							<div style={styles.hightLight}></div>

						</div>
						</UI.PickerArea>
				</UI.Portal>
			}



		</div>

	}
})