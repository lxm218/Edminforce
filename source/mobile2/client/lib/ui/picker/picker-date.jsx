/**
 * Created  on 3/20/16.
 */



var today = new Date();

var getDays = function(max) {
	var days = [];
	for(var i=1; i<= (max||31);i++) {
		days.push(i < 10 ? "0"+i : i);
	}
	return days;
};

var getDaysByMonthAndYear = function(month, year) {
	var int_d = new Date(year, parseInt(month)+1-1, 1);
	var d = new Date(int_d - 1);
	return getDays(d.getDate());
};

var formatNumber = function (n) {
	return n < 10 ? "0" + n : n;
};

var initMonthes = ('01 02 03 04 05 06 07 08 09 10 11 12').split(' ');

var initYears = (function () {
	var arr = [];
	for (var i = 1950; i <= 2030; i++) { arr.push(i); }
	return arr;
})();

let COLS_DATA = [
	// Years
	{
		values: initYears
	},
	// Months
	{
		values: initMonthes
	},
	// Days
	{
		values: getDays()
	},

	// Space divider
	{
		divider: true,
		content: '  '
	},
	// Hours
	{
		values: (function () {
			var arr = [];
			for (var i = 0; i <= 23; i++) { arr.push(i); }
			return arr;
		})(),
	},
	// Divider
	{
		divider: true,
		content: ':'
	},
	// Minutes
	{
		values: (function () {
			var arr = [];
			for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
			return arr;
		})(),
	}
]




UI.PickerDate = React.createClass({

	getInitialState: function() {

		return{
			value:[]
		}
	},
	getDefaultProps(){

		return{

			pickerAreaHeight:300,
			pickerHeaderHeight:36,
			pickerBodyHeight:300-36,
			pickerItemHeight:36,
		}

	},


	close(){

	},
	confirm(){


	},

	onColValueChange(){




	},


	render(){

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


		return <div>
			<label>
				时间
				<input  ref={(c) => this._input = c}
						value ={displayValue}
						type="text"
						readOnly={this.props.readonly}
						onClick={this.openOnInput}/>
			</label>

			{
				this.state.opened
				&& <UI.Portal className="picker-modal">

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
