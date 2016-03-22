/**
 * Created  on 3/19/16.
 */
UI.PickerCol = class extends RC.CSS {

	constructor(p) {
		super(p)

		this.state = {
			translate:0,		//偏移,
		}
	}

	componentWillMount(){
		super.componentWillMount()

		this.calculDimensions()

		this.initValue()

	}

	initValue(){

		if(this.props.value){
			let index  = this.values.indexOf(this.props.value)
			if(index!= -1){
				this.setValueByIndex(index)
			}
		}else{
			this.setValueByIndex(0)  //第一个值
		}

	}

	setValueByIndex(index){

		let newTranslate = - index * this.itemHeight + this._maxTranslate;


		this._currentTranslate = newTranslate

		this.setState({
			translate:parseInt(newTranslate,10)
		})


		///update value
		this.value = this.props.colData.values[index]
		this.displayValue = this.props.colData.displayValues?
			this.props.colData.displayValues[index]:this.value

		this.activeIndex = this.index

	}
	setValueByTranslate(){



	}


	//componentDidMount(){
	//},
	//componentWillUnmount(){
	//},

	calculDimensions(){
		this.colHeight = this.props.pickerBodyHeight
		this.itemHeight = this.props.pickerItemHeight
		this.itemsHeight = this.props.colData.values.length * this.props.pickerItemHeight
		this._minTranslate = this.colHeight / 2 - this.itemsHeight + this.itemHeight / 2; //最大向上偏移
		this._maxTranslate = this.colHeight / 2 - this.itemHeight / 2; //最大向下偏移


		this.order = this.props.order  //该列在父级中的位置

		this.colData = this.props.colData



		//todo 做一些判断
		Object.assign(this,this.colData)
		//this.values = this.props.colData.values
		//this.displayValues = this.props.colData.displayValues


		//todo check
		this.picker = this.props.picker
		this.picker.cols[this.order] = this


		console.log(this.itemHeight,this.props.colData.values.length,this.props.pickerItemHeight)

	}

	onTouchStart(e){
		console.log('onTouchStart')

		if (this._isMoved || this._isTouched) return;
		e.preventDefault();
		this._isTouched = true;
		this._touchStartY = this._touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
		this._touchStartTime = (new Date()).getTime();

		this._allowItemClick = true;

		this._startTranslate = this.state.translate

	}
	onTouchMove(e){
		console.log('onTouchMove')
		if (!this._isTouched) return;
		e.preventDefault();

		this._allowItemClick = false;
		this._touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;


		if (!this._isMoved) {
			this._isMoved = true
		}
		var diff = this._touchCurrentY - this._touchStartY;
		this._currentTranslate = this._startTranslate + diff;

		this._returnTo = undefined;

		if(this._currentTranslate < this._minTranslate) {

			this._currentTranslate = this._minTranslate //- Math.pow(this._minTranslate - this._currentTranslate, 0.8);
			this._returnTo ="min"
		}
		if (this._currentTranslate > this._maxTranslate) {

			this._currentTranslate = this._maxTranslate //+ Math.pow(this._currentTranslate - this._maxTranslate, 0.8);
			this._returnTo="max"
		}

		// Transform wrapper
		//col.wrapper.transform('translate3d(0,' + currentTranslate + 'px,0)');
		this.setState({
			translate:this._currentTranslate
		})

	}
	onTouchEnd(e){
		console.log('onTouchEnd')
		if (!this._isTouched || !this._isMoved) {
			this._isTouched = this._isMoved = false;
			return;
		}
		this._isTouched = this._isMoved = false;


		if (this._returnTo) {
			if (this._returnTo === 'min') {
				this.setState({
					translate:this._minTranslate
				})
			}
			else {
				this.setState({
					translate:this._maxTranslate
				})
			}
		}

		//保存旧值
		this._previousActiveIndex = this._activeIndex

		var newTranslate = this._currentTranslate
		newTranslate = Math.max(Math.min(newTranslate, this._maxTranslate), this._minTranslate);

		this._activeIndex = -Math.floor((newTranslate - this._maxTranslate)/this.itemHeight);



		/////////////set value by index
		newTranslate = - this._activeIndex * this.itemHeight + this._maxTranslate;


		this._currentTranslate = newTranslate

		this.setState({
			translate:parseInt(newTranslate,10)
		})

		console.log('activeIndex',this._activeIndex)


		///update value
		this.value = this.props.colData.values[this._activeIndex]
		this.displayValue = this.props.colData.displayValues?
			this.props.colData.displayValues[this._activeIndex]:this.value

		this.activeIndex = this._activeIndex

		//////////end value by index

		if(this._previousActiveIndex != this._activeIndex){
			if(this.props.onChange){
				debugger
				this.props.onChange(this ,this.value, this.displayValue,this)  //列级回调
			}
		}

	}

	baseStyles(np,ns){


		return {
			area:{
				textAlign: "center",
				//overflow: "hidden",
				position: "relative",
				height:this.itemsHeight,

				textOverflow: "ellipsis",

				//fontSize: "1.2rem",
				//lightWeight:1.5,
				transform:'translate3d(0,' + this.state.translate + 'px,0)'
			},
			item:{
				padding: "0 10px",
				height:this.itemHeight,
				lineHeight:this.itemHeight+'px',
			}

		}
	}

	render(){

		this.calculDimensions()

		//let styles = this.css.get("styles")


		let styles ={
			area:{
				textAlign: "center",

					position: "relative",
					height:this.itemsHeight,

					//whiteSpace: "nowrap",
					//overflow: "hidden",
					//textOverflow: "ellipsis",

					//fontSize: "1.2rem",
					//lightWeight:1.5,
					transform:'translate3d(0,' + this.state.translate + 'px,0)'
			},
			item:{
				padding: "0 10px",
				height:this.itemHeight,
				lineHeight:this.itemHeight+'px',

				whiteSpace: "nowrap",
				overflow: "hidden",
				textOverflow: "ellipsis",
			}
		}

		styles.area= Object.assign(styles.area,this.props.style)

		//event 会自动 removed?
		return <div
			style={styles.area}
			onTouchStart={this.onTouchStart.bind(this)}
			onTouchMove={this.onTouchMove.bind(this)}
			onTouchEnd={this.onTouchEnd.bind(this)}
		>
			{
				this.props.colData && this.props.colData.values.map(function(value, index){

					return  <div
						style={styles.item}
						data-picker-value={value}>
						{value}
					</div>

				})
			}

		</div>

	}
}