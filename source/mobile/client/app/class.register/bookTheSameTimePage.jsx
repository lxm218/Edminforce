/**
 * Created on 9/14/15.
 */


{
    let PageStore;
    Dependency.autorun(function () {
        PageStore = Dependency.get('classRegister.bookTheSameTimePage.store');
    });


    Cal.CRBookTheSameTimePage = React.createClass({
        mixins: [ReactMeteorData],
        getMeteorData() {

            //todo
            Meteor.subscribe("swimmersByAccountId", 'account1');
            //Meteor.subscribe("appInfo");
            Meteor.subscribe("classes");
            Meteor.subscribe("activeShopingCart");


            var data = {
                account: Meteor.users.find().fetch(),

                swimmers: PageStore.getSwimmers().fetch(),

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

            //debugger
            return data;

        },

        /////////////////////////////////////////////////////////////////
        ///////////actions///////////
        swimmerChange(e){
            var value = this.refs.swimmer.getValue()

            var swimmer = _.find(this.data.swimmers, function (v, n) {
                return v._id == value;
            })

            Dispatcher.dispatch({
                actionType: "BookTheSameTime_SWIMMER_CHANGE",
                swimmer: swimmer
            });

        },
        dayChange(e){
            var value = this.refs.day.getValue()
            value = parseInt(value, 10)

            Dispatcher.dispatch({
                actionType: "BookTheSameTime_DAY_CHANGE",
                day: value
            });


        },
        timeChange(e){
            var value = this.refs.time.getValue()
            value = parseInt(value, 10)
            Dispatcher.dispatch({
                actionType: "BookTheSameTime_TIME_CHANGE",
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
                actionType: "BookTheSameTime_CLASS_SELECT",
                currentStep: this.data.currentStep,
                selectedClass: formData
            });

        },
        render() {

            let swimmers = this.data.swimmers.map(function (v, i) {
                return {text: v['name'], value: v._id}
            })

            let swimmer = this.data.selectedClasses.get('swimmer')
            let class1 = this.data.selectedClasses.get('class1')
            let class2 = this.data.selectedClasses.get('class2')
            let class3 = this.data.selectedClasses.get('class3')


            let currentSwimmerValue = this.data.currentSwimmer
                && {value:this.data.currentSwimmer._id,
                    text:this.data.currentSwimmer.name}

            //debugger

            return <div>
                <RC.Card key={Math.random()}>


                    <h2 className="brand">Register for spring 2015</h2>

                    <p>
                        {swimmer && swimmer.name}
                    </p>

                    <p>
                        {class1 && class1.name}
                    </p>

                    <p>
                        {class2 && class2.name}
                    </p>

                    <p>
                        {class3 && class3.name}
                    </p>


                </RC.Card>

                <RC.Form ref="myForm" onSubmit={this.formSubmit}>
                    <RC.List theme="inset">

                        {
                            this.data.currentStep == 1 ?
                                <RC.Select2
                                    ref="swimmer"
                                    options={swimmers}
                                    value= {currentSwimmerValue}
                                    name="swimmer"
                                    changeHandler={this.swimmerChange}
                                    label="Swimmer"
                                    />

                                : <RC.Item uiColor="brand1">
                                Swimmer: {this.data.currentSwimmer && this.data.currentSwimmer.name}
                            </RC.Item>
                        }


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
                            Book The Same Time
                        </RC.Button>


                    </RC.List>
                </RC.Form>
            </div>
        }

    })

}