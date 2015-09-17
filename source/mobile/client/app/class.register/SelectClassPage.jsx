/**
 * Created on 9/14/15.
 */


{
    let CRSelectClassPageStore;
    Dependency.autorun(function () {
        CRSelectClassPageStore = Dependency.get('classRegister.SelectClassPage.store');
    });


    Cal.CRSelectClassPage = React.createClass({

        mixins: [ReactMeteorData],
        getMeteorData() {
            debugger

            Meteor.subscribe("swimmersByAccountId", 'account1');

            return {
                account: Meteor.users.find().fetch(),
                swimmers: DB.Swimmers.find({accountId: 'account1'}).fetch(),
                currentSwimmer: CRSelectClassPageStore.currentSwimmer.get(),

                //should wait for currentSwimmer
                avaiableDays: CRSelectClassPageStore.avaiableDays.get(),
                avaiableTimes: CRSelectClassPageStore.avaiableTimes.get(),
                currentDay: CRSelectClassPageStore.currentDay.get(),
                currentTime: CRSelectClassPageStore.currentTime.get(),


                currentStep: CRSelectClassPageStore.currentStep.get(),
                firstPreference: CRSelectClassPageStore.firstPreference.get(),
                secendPreference: CRSelectClassPageStore.secendPreference.get(),
                thirdPreference: CRSelectClassPageStore.thirdPreference.get()

            }
        },


        ///////////actions///////////
        swimmerChange(e){
            var value = this.refs.swimmer.getValue()

            //var swimmer = this.data.swimmers.filter(function(v,n){
            //    return v.value == value;
            //})

            var swimmer = _.find(this.data.swimmers, function (v, n) {
                return v._id == value;
            })

            Dispatcher.dispatch({
                actionType: "CRSelectClassPage_SWIMMER_CHANGE",
                swimmer: swimmer});

        },
        dayChange(e){
            var value = this.refs.day.getValue()
            value= parseInt(value,10)

            Dispatcher.dispatch({
                actionType: "CRSelectClassPage_DAY_CHANGE",
                day: value});


        },
        timeChange(e){
            var value = this.refs.time.getValue()
            value= parseInt(value,10)
            Dispatcher.dispatch({
                actionType: "CRSelectClassPage_TIME_CHANGE",
                time: value});

        },

        formSubmit (e) {
            e.preventDefault()

            var formData = this.refs.myForm.getFormData()

            //todo validation info
            if(!formData.swimmer || !formData.day || !formData.time){
                alert('please select a class')
                return ;
            }

            Dispatcher.dispatch({
                actionType: "CRSelectClassPage_CLASS_SELECT",
                currentStep: this.data.currentStep,
                selectedClass: formData
            });

            debugger

        },
        render() {

            let swimmers = this.data.swimmers.map(function (v, i) {
                return {text: v['name'], value: v._id}
            })
            swimmers.unshift({text: 'please select a swimmer'})


            debugger


            return <div>
                <RC.Card>

                    <h2 className="brand">Register for spring 2015</h2>

                    <p>{this.data.firstPreference}</p>

                    <p>{this.data.secendPreference}</p>

                    <p>{this.data.thirdPreference}</p>


                </RC.Card>

                <RC.Form ref="myForm" onSubmit={this.formSubmit}>
                    <RC.List theme="inset">

                        <RC.Select
                            ref="swimmer"
                            options={swimmers}
                            name="swimmer"
                            changeHandler={this.swimmerChange}
                            label="swimmer"
                            />
                        <RC.Item uiColor="brand1">
                            level: {this.data.currentSwimmer && this.data.currentSwimmer.level}
                        </RC.Item>
                        <RC.Select
                            ref="day"
                            options={this.data.avaiableDays}
                            value={this.data.currentDay}
                            name="day"
                            changeHandler={this.dayChange}
                            label="day"
                            />
                        <RC.Select2
                            ref="time"
                            options={this.data.avaiableTimes}
                            value={this.data.currentTime}
                            name="time"
                            changeHandler={this.timeChange}
                            label="time"
                            />

                            <RC.Button name="button" type="submit"
                                       onClick={this.formSubmit}
                                       theme="full" buttonColor="brand">
                                Select
                            </RC.Button>


                        {
                            this.data.currentStep == 1 ?
                                <RC.URL href="/classRegister/AddWaitingList">
                                    <RC.Button name="button" type="submit"
                                               theme="full" buttonColor="brand">
                                        waiting list
                                    </RC.Button>
                                </RC.URL>
                                : ''
                        }


                    </RC.List>
                </RC.Form>
            </div>
        }
    })
}
