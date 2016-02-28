/**
 * Created on 9/16/15.
 */

{


    let PageStore;
    Dependency.autorun(function () {
        PageStore = Dependency.get('classRegister.AddWaitingList.store');
    });


    Cal.CRAddWaitingListPage = React.createClass({

        mixins: [ReactMeteorData],
        getMeteorData() {

            Meteor.subscribe("swimmersByAccountId", Meteor.userId());
            Meteor.subscribe("classes");


            var data = {
                account: Meteor.users.find().fetch(),

                //swimmers: PageStore.getSwimmers().fetch(),

                currentLevel:PageStore.currentLevel.get(), //next level


                currentSwimmer: PageStore.currentSwimmer.get(),

                //should wait for currentSwimmer
                avaiableDays: PageStore.avaiableDays.get(),
                avaiableTimes: PageStore.avaiableTimes.get(),
                currentDay: PageStore.currentDay.get(),
                currentTime: PageStore.currentTime.get(),

                currentStep: PageStore.currentStep.get(),


                //一次选课流程的所有信息
                selectedClasses: PageStore.selectedClasses.get()
            }

            return data
        },

        swimmerChange(e){
            var value = this.refs.swimmer.getValue()

            var swimmer = _.find(this.data.swimmers, function (v, n) {
                return v._id == value;
            })

            Dispatcher.dispatch({
                actionType: "CRAddWaitingListPage_SWIMMER_CHANGE",
                swimmer: swimmer
            });

        },
        dayChange(e){
            var value = this.refs.day.getValue()
            value = parseInt(value, 10)

            Dispatcher.dispatch({
                actionType: "CRAddWaitingListPage_DAY_CHANGE",
                day: value
            });


        },
        timeChange(e){
            var value = this.refs.time.getValue()
            value = parseInt(value, 10)
            Dispatcher.dispatch({
                actionType: "CRAddWaitingListPage_TIME_CHANGE",
                time: value
            });

        },

        formSubmit (e) {
            e.preventDefault()

            var formData = this.refs.myForm.getFormData()



            //todo validation info in ui
            if (!this.data.currentSwimmer || !this.data.currentDay || !this.data.currentTime) {

                alert('please select a class')
                return;
            }

            Dispatcher.dispatch({
                actionType: "CRAddWaitingListPage_CLASS_SELECT",
                currentStep: this.data.currentStep,
                selectedClass: formData
            });

        },
        componentWillMount(){
             ///PASS  props value to store
            Dispatcher.dispatch({
                actionType: 'CRAddWaitingListPage_PROPS_INIT',
                props: this.props
            });

        },

        render() {

            //let swimmers = this.data.swimmers.map(function (v, i) {
            //    return {text: v['name'], value: v._id}
            //})


            let swimmer = this.data.selectedClasses.get('swimmer')
            let class1 = this.data.selectedClasses.get('class1')
            let class2 = this.data.selectedClasses.get('class2')
            let class3 = this.data.selectedClasses.get('class3')


            let currentSwimmerValue = this.data.currentSwimmer
                && {value:this.data.currentSwimmer._id,
                    text:this.data.currentSwimmer.name}


            return <div>

                <RC.Card key={Math.random()} className="padding">
                    <h4 className="brand">Add Waiting List</h4>

                    {/*swimmer && swimmer.name*/}

                    {
                        class1?<div className="row">
                            <div className="col">
                                Preference 1
                            </div>
                            <div className="col">
                                {class1.name}
                            </div>

                        </div>:'Pick a time and you will be on our waiting list'

                    }

                    {
                        class2?<div className="row">
                            <div className="col">
                                Preference 2
                            </div>
                            <div className="col">
                                {class2 && class2.name}
                            </div>

                        </div>:''
                    }
                    {
                        class3?<div className="row">
                            <div className="col">
                                Preference 3
                            </div>
                            <div className="col ">
                                {class3 && class3.name}
                            </div>

                        </div>:''
                    }

                </RC.Card>


                <RC.Form ref="myForm" key={Math.random()} onSubmit={this.formSubmit}>
                    <RC.List theme="inset">


                        <RC.Item uiColor="brand1">
                            Swimmer: {this.data.currentSwimmer
                                        && this.data.currentSwimmer.name}
                        </RC.Item>

                        <RC.Item uiColor="brand1">
                            Level: {this.data.currentLevel}
                        </RC.Item>



                        {

                            //<RC.Select2
                            //    ref="day"
                            //    options={this.data.avaiableDays}
                            //    value={this.data.currentDay}
                            //    name="day"
                            //    changeHandler={this.dayChange}
                            //    label="Day"
                            ///>
							//
							//
							//
                            //<RC.Select2
                            //ref="time"
                            //options={this.data.avaiableTimes}
                            //value={this.data.currentTime}
                            //name="time"
                            //changeHandler={this.timeChange}
                            //label="Time"
                            ///>
                        }


                        <Cal.SelectDayGrid
                            avaiableDays={this.data.avaiableDays}
                            currentDay={this.data.currentDay}
                            name="dayGrid"
                            changeMessage="CRAddWaitingListPage_DAY_CHANGE"
                        />


                        <Cal.SelectTimeGrid
                            avaiableTimes={this.data.avaiableTimes}
                            currentTime={this.data.currentTime}
                            changeMessage="CRAddWaitingListPage_TIME_CHANGE"
                            name="timeGrid"

                        />

                        {
                            this.data.currentStep == 3?
                                <RC.Button name="button" type="submit" bgColor="brand1"
                                        onClick={this.formSubmit} theme="full" buttonColor="brand">
                                Add Waiting List
                            </RC.Button>:
                                <RC.Button name="button" type="submit" bgColor="brand1"
                                           onClick={this.formSubmit}
                                           theme="full" buttonColor="brand">
                                Next
                            </RC.Button>

                        }


                    </RC.List>
                </RC.Form>
            </div>
        }
    })

}
