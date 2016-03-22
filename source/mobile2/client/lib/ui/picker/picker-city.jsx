/**
 * Created  on 3/20/16.
 */


var format = function(data) {
	var result = [];
	for(var i=0;i<data.length;i++) {
		var d = data[i];
		if(d.name === "请选择") continue;
		result.push(d.name);
	}
	if(result.length) return result;
	return [""];
};

var sub = function(data) {
	if(!data.sub) return [""];
	return format(data.sub);
};

var getCities = function(d) {
	for(var i=0;i< raw.length;i++) {
		if(raw[i].name === d) return sub(raw[i]);
	}
	return [""];
};

var getDistricts = function(p, c) {
	for(var i=0;i< raw.length;i++) {
		if(raw[i].name === p) {
			for(var j=0;j< raw[i].sub.length;j++) {
				if(raw[i].sub[j].name === c) {
					return sub(raw[i].sub[j]);
				}
			}
		}
	}
	return [""];
};

var raw //= $.smConfig.rawCitiesData;



UI.PickerCity = React.createClass({
	propTypes:{},

	getInitialState: function() {
		return {
			opened:false,		//是否已经打开,
			value:[],


			//选择列表
			provinces:[],
			cities:[],
			districts:[]
		}
	},

	getDefaultProps(){

		return {
			//readonly:true,
			//toolbar: <header class="bar bar-nav">
			//	<button class="button button-link pull-right close-picker">确定</button>
			//	<h1 class="title">请选择称呼</h1>
			//</header>,
			//cols: [
			//	{
			//		textAlign: 'center',
			//		values: ['赵', '钱', '孙', '李', '周', '吴', '郑', '王']
			//		//如果你希望显示文案和实际值不同，可以在这里加一个displayValues: [.....]
			//	},
			//],
			//initValue:[],//初始值


			pickerAreaHeight:300,
			pickerHeaderHeight:36,
			pickerBodyHeight:300-36,
			pickerItemHeight:36,






		}
	},


	componentWillMount(){
		var self = this

		this.cols =[]   //引用子列 todo delete


		//获取初始数据
		raw  = this.citiesData = this.props.citiesData

		var provinces = this.citiesData.map(function(d) {
			return d.name;
		});
		var initCities = sub(raw[0]);
		var initDistricts = [""];


		if(this.props.initValue && this.props.initValue.length){
			this._province = this.props.initValue[0]
			this._city = this.props.initValue[1]
			this._district = this.props.initValue[2] || ''
		}else{
			this._province = provinces[0]
			this._city = initCities[0]
			this._district = initDistricts[0]
		}






		self.setState({
			value:this._collectValue(),

			provinces:provinces,
			cities:initCities,
			districts:initDistricts,


		})

	},
	getValue(){
		return  this.state.value
	},

	_collectValue(){
		return [this._province, this._city, this._district]
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
			else {
				if ($(e.target).parents('.picker-modal').length === 0)
					self.close();
			}
		}

		$('html').on('click', closeOnHTMLClick);


	},




	//不同的组件此方法实现不一样  有的有数据依赖有的没有
	onColValueChange( col, value, displayValue){

		var  self =this

		if(col.order==0){//city
			let province = value
			self._province = province
			let cities = getCities(province)
			self._city = cities[0]

			let districts = getDistricts(self._province, self._city)

			self._district = districts[0]

			self.setState({
				cities:cities,
				districts:districts,
				//value:self._collectValue()

			})


		}else if(col.order==1){

			let city =  value
			self._city = city

			let districts = getDistricts(self._province, self._city)

			self._district = districts[0]

			self.setState({
				districts:districts,

				//value:self._collectValue()

			})

		}else if(col.order==2){

			self._district = value

			//self.setState({
			//	value:self._collectValue()
			//})
		}



		console.log('curent value: ',this.state.value,self._collectValue())

		if(this.props.onValueChange){
			this.props.onValueChange(self._collectValue())
		}

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
		var self = this

		console.log('curent value: ',this.state.value,self._collectValue())


		//self.onValueChange(this.state.value)


		this.onValueConfirm && this.onValueConfirm(self._collectValue())

		self.setState({
			value:self._collectValue()
		})

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


		this.colsData= [
			{

				values: this.state.provinces,
				styles: {
					area:{
						textAlign: 'center',
						width:"5rem"
					}
				},
				name:"province"
			},
			{
				values: this.state.cities,
				styles: {
					area:{
						textAlign: 'center',
						width:"6rem"
					}
				},
				name:"city"
			},
			{
				values: this.state.districts,
				styles: {
					area:{
						textAlign: 'center',
						width:"5rem"
					}
				},
				name:"district"
			}
		]

		let displayValue = this.state.value.join(" ")

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

									//let value =  self['_'+colData.name]
									let value =  self.state.value[index]

									let picker= <UI.PickerCol
										pickerBodyHeight={self.props.pickerBodyHeight}
										pickerItemHeight={self.props.pickerItemHeight}

										style={colData.styles && colData.styles.area}

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
