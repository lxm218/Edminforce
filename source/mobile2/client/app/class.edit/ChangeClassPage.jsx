/**
 * Created on 9/11/15.
 */


{
    let PageStore;
    Dependency.autorun(function () {
        PageStore = Dependency.get('classEdit.ChangeClass.store');
    });


    Cal.ChangeClassPage = React.createClass({

        mixins: [ReactMeteorData],
        getMeteorData() {

            return {

                swimmer:PageStore.swimmer,
                class:PageStore.class,
                currentLevel:PageStore.currentLevel,

                avaiableDays: PageStore.avaiableDays.get(),
                avaiableTimes: PageStore.avaiableTimes.get(),

                currentDay: PageStore.currentDay.get(),
                currentTime: PageStore.currentTime.get(),

            }
        },

        ////actions
        dayChange(e){
            var value = this.refs.day.getValue()
            value = parseInt(value, 10)

            Dispatcher.dispatch({
                actionType: "ChangeClassPage_DAY_CHANGE",
                day: value
            });


        },
        timeChange(e){
            var value = this.refs.time.getValue()
            value = parseInt(value, 10)
            Dispatcher.dispatch({
                actionType: "ChangeClassPage_TIME_CHANGE",
                time: value
            });

        },
        formSubmit(e){
            e.preventDefault()

            Dispatcher.dispatch({
                actionType: "ChangeClassPage_CLASS_CONFIRM"
            });

        },
        requestSubmit(e){
            e.preventDefault()

            Dispatcher.dispatch({
                actionType: "ChangeClassPage_CLASS_SEND_REQUEST"
            });

        },



        //init store
        componentDidMount(){
            Dispatcher.dispatch({
                actionType: "ChangeClassPage_INIT",
                swimmerId: this.props.swimmerId,
                classId :this.props.classId
            });
        },

        render() {
            return <div>


                <Cal.ClassRegisterDetail
                    title="Class To Change"
                    classId={this.props.classId}
                    swimmerId={this.props.swimmerId}
                    currentLevel={this.data.currentLevel}
                    />

                <RC.Form ref="changeClassForm" onSubmit={this.formSubmit}>
                    <RC.List theme="inset">

                        Please select new day and time

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


                        {/*

                         <RC.Button name="button" type="submit"
                         onClick={this.formSubmit}
                         theme="full" buttonColor="brand">
                         confirm
                         </RC.Button>
                        */}
                        <RC.Button name="button" type="submit"
                                   onClick={this.requestSubmit}
                                   theme="full" buttonColor="brand">
                            Submit Request
                        </RC.Button>


                    </RC.List>
                </RC.Form>


            </div>
        }
    })

}
