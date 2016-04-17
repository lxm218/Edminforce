/**
 * Created  on 4/16/16.
 */


RC.Calendar = class extends RC.CSS{

	constructor(p) {
		super(p)
		this.state = {
			opened: false,	//是否已经打开

			value:null,     //Date|| string 当前值
			layoutDate:null,//Date 确定选择界面
		}
	}

	componentWillMount() {
		super.componentWillMount()

		let self =this
		self.params = self.props;

		self.name = self.props.name   //onChange(self,formatedValue, dateValue)



		let  initState={}

		//store in state
		if(this.props.value){
			self.value = self.props.value
			initState.value = self.value
		}else{
			initState.value = self.value = new Date()
		}

		//界面选择
		self.layoutDate = self.value? new Date(self.value) : new Date().setHours(0,0,0,0);

		initState.layoutDate = self.layoutDate

		this.setState(initState)

	}
	componentDidMount() {
		var self = this

		function closeOnHTMLClick(e) {


			if (!self.state.opened) return;

			if (self._input) {
				if (e.target !== self._input) {//???.getDOMNode()
					if ($(e.target).parents('.picker-modal').length === 0) {
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

	}


	getValue(){
		 return this.state.value
	}


	// Format date
	formatDate(date) {
		date = new Date(date);
		var year = date.getFullYear();
		var month = date.getMonth();
		var month1 = month + 1;
		var day = date.getDate();
		var weekDay = date.getDay();
		return this.params.dateFormat
			.replace(/yyyy/g, year)
			.replace(/yy/g, (year + '').substring(2))
			.replace(/mm/g, month1 < 10 ? '0' + month1 : month1)
			.replace(/m/g, month1)
			.replace(/MM/g, this.params.monthNames[month])
			.replace(/M/g, this.params.monthNamesShort[month])
			.replace(/dd/g, day < 10 ? '0' + day : day)
			.replace(/d/g, day)
			.replace(/DD/g, this.params.dayNames[weekDay])
			.replace(/D/g, this.params.dayNamesShort[weekDay]);
	}

	baseStyles(np, ns) {

		let pickerAreaHeight = this.props.height || 300

		return {
			pickerArea:{
				position:'fixed',
				left:0,
				bottom:0,
				width:"100%",
				height:pickerAreaHeight,
				background: "#fff",
				zIndex: 9999999
			},

			inputLabel: {
				padding: "6px 20px 6px 20px",
				display: 'flex',
				justifyContent: "flex-start",
				alignItems: "center",
				borderBottom: "solid 1px rgba(0, 0, 0, 0.14902)"
			},
			inputText: {
				flex: "0 0 30%",
				fontSize: "18px",
				color: "#666666",
			},
			inputElement: {
				border: "none",
				fontSize: "18px",
				color: "#666666",
			},


		}
	}

	open() {

		this.setState({
			opened: true
		})
	}

	close() {
		this.setState({
			opened: false
		})
	}

	openOnInput(e) {

		e.stopPropagation();
		e.preventDefault()


		this.open()

	}
	prevMonth(){
		console.log('prevMonth ')

		let nextDate
		let month = this.month
		let year = this.year
		if (month === 0) {
			nextDate = new Date(year - 1, 11);
		}else {
			nextDate = new Date(year, month - 1, 1);
		}

		this.setState({
			layoutDate:nextDate
		})

	}
	nextMonth(){
		console.log('nextMonth')
		let nextDate
		let month = this.month
		let year = this.year
		if (month === 11) {
			nextDate = new Date(year + 1, 0);
		}else {
			nextDate = new Date(year, month + 1, 1);
		}

		this.setState({
			layoutDate:nextDate
		})


	}
	prevYear(){
		this.setYearMonth(this.year - 1);
	}
	nextYear(){
		this.setYearMonth(this.year + 1);

	}
	setYearMonth(year, month, transition) {
		let p= this
		if (typeof year === 'undefined') year = p.year;
		if (typeof month === 'undefined') month = p.month;

		var targetDate;

		if (year < p.currentYear) {
			targetDate = new Date(year, month + 1, -1).getTime();
		}
		else {
			targetDate = new Date(year, month).getTime();
		}

		p.setState({
			layoutDate:targetDate
		})



	}
	onSelectDate(date, year, month, day){
		//console.log(date, year, month, day)

		let targetDate = new Date(year, month, day)

		this.updateValue(targetDate)

		this.close()

	}
	updateValue(dateValue){

		let self =this

		let formatedValue = self.formatDate(dateValue)


		if (self.params.onChange) {
			self.params.onChange(self,formatedValue, dateValue);
		}

		self.value = formatedValue


		self.setState({
			layoutDate:dateValue,
			value:dateValue
		})

	}



	//renderInput() {}
	//renderWeekHeader(){}
	//renderMonths(layoutDate){}
	//renderPickerArea(){}
	//renderPickerHeader(){
	//	return <UI.PickerHeader
	//		close={self.close.bind(self)}
	//		confirm={self.confirm.bind(self)}
	//		height={self.props.pickerHeaderHeight}/>
	//}
	//renderPickerBody(){}

	render(){
		var self = this
		var p = this

		let styles = this.css.get("styles")

		//styles= Object.assign(styles,{})


		let date = new Date(self.state.layoutDate);
		self.year = date.getFullYear()
		self.month = date.getMonth()
		self.day = date.getDate();

		self.yearText=self.year
		self.monthText=self.params.monthNames[self.month]



		//input的显示值
		let displayValue =  self.formatDate(this.state.value)

		return <div>
			<div style={styles.inputLabel}>
				<div style={styles.inputText}>
					{self.props.label || '选择'}
				</div>

				<input
					name={this.props.name}

					style={styles.inputElement}
					ref={(c) => self._input = c}
					value={displayValue}
					type="text"
					readOnly={self.props.readOnly}
					onClick={self.openOnInput.bind(self)}/>
			</div>



			{
				self.state.opened && <RC.Portal >
					<div  style={styles.pickerArea} className="picker-modal picker-calendar">
						<div className="toolbar">
							<div className="toolbar-inner">

								<div className="picker-calendar-month-picker">
									<a href="#" className="link icon-only picker-calendar-prev-month"
									   onClick={self.prevMonth.bind(self)}
									><i className="fa fa-chevron-left"></i></a>
									<div className="current-month-value"> {self.monthText}</div>
									<a href="#" className="link icon-only picker-calendar-next-month"
									   onClick={self.nextMonth.bind(self)}
									><i className="fa fa-chevron-right"></i></a>
								</div>

								<div className="picker-calendar-year-picker">
									<a href="#" className="link icon-only picker-calendar-prev-year"
									   onClick={self.prevYear.bind(self)}
									><i className="fa fa-chevron-left"></i></a>
									<span className="current-year-value">{self.yearText}</span>
									<a href="#" className="link icon-only picker-calendar-next-year"
									   onClick={self.nextYear.bind(self)}
									><i className="fa fa-chevron-right"></i></a>
								</div>

							</div>
						</div>



						<div className="picker-modal-inner">

							<div className="picker-calendar-week-days">
								{
									p.params.weekHeader && [0,1,2,3,4,5,6].map(function(i){
										var weekDayIndex = (i + p.params.firstDay > 6) ? (i - 7 + p.params.firstDay) : (i + p.params.firstDay);
										var dayName = p.params.dayNamesShort[weekDayIndex];
										return<div
											className={'picker-calendar-week-day ' + ((p.params.weekendDays.indexOf(weekDayIndex) >= 0) ? 'picker-calendar-week-day-weekend' : '')}>
											{dayName}
										</div>
									})
								}

							</div>


							<div className="picker-calendar-months">
								<div className="picker-calendar-months-wrapper"  >

									{/*self.monthHTML(layoutDate, 'prev')*/}

									{self.monthHTML(self.state.layoutDate)}

									{/*self.monthHTML(layoutDate, 'next')*/}
								</div>
							</div>
						</div>



					</div>
				</RC.Portal>
			}

		</div>



	}

	monthHTML (date, offset) {
		let p= this
		let self = this



		date = new Date(date);
		var year = date.getFullYear(),
			month = date.getMonth(),
			day = date.getDate();
		if (offset === 'next') {
			if (month === 11) date = new Date(year + 1, 0);
			else date = new Date(year, month + 1, 1);
		}
		if (offset === 'prev') {
			if (month === 0) date = new Date(year - 1, 11);
			else date = new Date(year, month - 1, 1);
		}
		if (offset === 'next' || offset === 'prev') {
			month = date.getMonth();
			year = date.getFullYear();
		}
		var daysInPrevMonth = p.daysInMonth(new Date(date.getFullYear(), date.getMonth()).getTime() - 10 * 24 * 60 * 60 * 1000),
			daysInMonth = p.daysInMonth(date),
			firstDayOfMonthIndex = new Date(date.getFullYear(), date.getMonth()).getDay();
		if (firstDayOfMonthIndex === 0) firstDayOfMonthIndex = 7;

		var dayDate, currentValues = [], i, j,
			rows = 6, cols = 7,
			monthHTML = '', monthArr=[] //react
			dayIndex = 0 + (p.params.firstDay - 1),
			today = new Date().setHours(0,0,0,0),
			minDate = p.params.minDate ? new Date(p.params.minDate).getTime() : null,
			maxDate = p.params.maxDate ? new Date(p.params.maxDate).getTime() : null;

		//if (p.value && p.value.length) {
		//	for (i = 0; i < p.value.length; i++) {
		//		currentValues.push(new Date(p.value[i]).setHours(0,0,0,0));
		//	}
		//}
		if (p.state.value) {
				currentValues.push(new Date(p.state.value).setHours(0,0,0,0));
		}

		for (i = 1; i <= rows; i++) {
			var rowHTML = ''; var rowArr=[] //react
			var row = i;
			for (j = 1; j <= cols; j++) {
				var col = j;
				dayIndex ++;
				var dayNumber = dayIndex - firstDayOfMonthIndex;
				var addClass = '';
				if (dayNumber < 0) {
					dayNumber = daysInPrevMonth + dayNumber + 1;
					addClass += ' picker-calendar-day-prev';
					dayDate = new Date(month - 1 < 0 ? year - 1 : year, month - 1 < 0 ? 11 : month - 1, dayNumber).getTime();
				}
				else {
					dayNumber = dayNumber + 1;
					if (dayNumber > daysInMonth) {
						dayNumber = dayNumber - daysInMonth;
						addClass += ' picker-calendar-day-next';
						dayDate = new Date(month + 1 > 11 ? year + 1 : year, month + 1 > 11 ? 0 : month + 1, dayNumber).getTime();
					}
					else {
						dayDate = new Date(year, month, dayNumber).getTime();
					}
				}
				// Today
				if (dayDate === today) addClass += ' picker-calendar-day-today';
				// Selected
				if (currentValues.indexOf(dayDate) >= 0) addClass += ' picker-calendar-day-selected';
				// Weekend
				if (p.params.weekendDays.indexOf(col - 1) >= 0) {
					addClass += ' picker-calendar-day-weekend';
				}
				// Disabled
				if ((minDate && dayDate < minDate) || (maxDate && dayDate > maxDate)) {
					addClass += ' picker-calendar-day-disabled';
				}

				dayDate = new Date(dayDate);
				var dayYear = dayDate.getFullYear();
				var dayMonth = dayDate.getMonth();

				rowArr.push(<div
					onClick={self.onSelectDate.bind(self,dayYear + '-' + dayMonth + '-' + dayNumber,dayYear,dayMonth,dayNumber)}
					key={j}
					data-year={dayYear}
					data-month={dayMonth}
					data-day={dayNumber}
					className={"picker-calendar-day " + addClass}
					data-date={dayYear + '-' + dayMonth + '-' + dayNumber}>
					<span>{dayNumber}</span>
				</div>)


			}
			monthArr.push(<div key={i} className="picker-calendar-row">
				{ rowArr}
			</div>)
		}
		monthArr = <div className="picker-calendar-month" data-year={ year} data-month={ month }>
			{monthArr}
		</div>;

		return monthArr;
	}

	daysInMonth (date) {
		var d = new Date(date);
		return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
	}

}

RC.Calendar.defaultProps={

	//name  //表单的name


	//monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月' , '九月' , '十月', '十一月', '十二月'],
	//monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月' , '九月' , '十月', '十一月', '十二月'],
	//dayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
	//dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],

	monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'],
	monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
		'Oct', 'Nov', 'Dec'],
	dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

	firstDay: 1, // First day of the week, Monday
	weekendDays: [0, 6], // Sunday and Saturday
	multiple: false,
	dateFormat: 'yyyy-mm-dd',
	direction: 'horizontal', // or 'vertical'
	minDate: null,
	maxDate: null,
	touchMove: true,
	animate: true,
	closeOnSelect: true,
	monthPicker: true,
	monthPickerTemplate:'',
	yearPicker: true,
	yearPickerTemplate:'',
	weekHeader: true,
	// Common settings
	scrollToInput: true,
	inputReadOnly: true,
	toolbar: true,
	toolbarCloseText: 'Done',
	toolbarTemplate:'',
	/* Callbacks
	 onMonthAdd
	 onChange
	 onOpen
	 onClose
	 onDayClick
	 onMonthYearChangeStart
	 onMonthYearChangeEnd
	 */
}


