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

                swimmers: PageStore.getSwimmers().fetch(),

                currentSwimmer: PageStore.currentSwimmer.get(),

                //should wait for currentSwimmer
                avaiableDays: PageStore.avaiableDays.get(),
                avaiableTimes: PageStore.avaiableTimes.get(),
                currentDay: PageStore.currentDay.get(),
                currentTime: PageStore.currentTime.get(),
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

            debugger

            //todo validation info in ui
            if (!this.data.currentSwimmer || !this.data.currentDay || !this.data.currentTime) {

                alert('please select a class')
                return;
            }

            Dispatcher.dispatch({
                actionType: "CRAddWaitingListPage_CLASS_SELECT",
                selectedClass: formData
            });

        },

        render() {

            let swimmers = this.data.swimmers.map(function (v, i) {
                return {text: v['name'], value: v._id}
            })


            let currentSwimmerValue = this.data.currentSwimmer
                && {value:this.data.currentSwimmer._id,
                    text:this.data.currentSwimmer.name}


            return <div>

                <RC.Card key={Math.random()} className="padding">

                    <p>
                        Pick a time and you will be on our waiting list
                    </p>

                </RC.Card>

                <RC.Form ref="myForm" key={Math.random()} onSubmit={this.formSubmit}>
                    <RC.List theme="inset">


                        <RC.Select2
                            ref="swimmer"
                            options={swimmers}
                            value={currentSwimmerValue}
                            name="swimmer"
                            changeHandler={this.swimmerChange}
                            label="Swimmer"
                            />

                        <RC.Item uiColor="brand1">
                            Level: {this.data.currentSwimmer && this.data.currentSwimmer.level}
                        </RC.Item>

                        <RC.Select2
                            ref="day"
                            options={this.data.avaiableDays}
                            value={this.data.currentDay}
                            name="day"
                            changeHandler={this.dayChange}
                            label="Day"
                            />

                        <RC.Select2
                            ref="time"
                            options={this.data.avaiableTimes}
                            value={this.data.currentTime}
                            name="time"
                            changeHandler={this.timeChange}
                            label="Time"
                            />
                        <RC.Button name="button" type="submit"
                                   onClick={this.formSubmit}
                                   theme="full" buttonColor="brand">
                            Add Waiting List
                        </RC.Button>


                    </RC.List>
                </RC.Form>
            </div>
        }
    })

}
