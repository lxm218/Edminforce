/**
 * Created on 5/15/16.
 */

KUI.Class_calendar = class extends RC.CSSMeteorData {


	constructor(p){
		super(p);

		this.state = {

		};
	}


	baseStyles(){
		return {

		};
	}

	getMeteorData(){
		return {

		}
	}

	componentDidMount(){

		$(this.refs.calendar).fullCalendar({

		})

	}

	render(){

		return <div ref="calendar">


		</div>
	}

}