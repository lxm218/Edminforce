/**
 * Created on 9/14/15.
 */


{
    let CRSelectClassPageStore;
    Dependency.autorun(function () {
        CRSelectClassPageStore = Dependency.get('classRegister.SelectClassPage.store');
    });

    //一轮选择中 class重复检测
    function currentClass_in_selectedClasses(currentClass,selectedClasses){
        var classItem;
        for(var i=1;i<=3; i++){
            classItem = selectedClasses.get('class'+i)
            if(classItem && classItem._id == currentClass._id){
                return true
            }
        }
        return false;
    }


    Cal.CRSelectClassPage = React.createClass({
        mixins: [ReactMeteorData],
        getMeteorData() {

            //todo
            Meteor.subscribe("swimmersByAccountId", Meteor.userId());
            //Meteor.subscribe("appInfo");
            Meteor.subscribe("classes");
            Meteor.subscribe("activeShopingCart");


            var data = {
                account: Meteor.users.find().fetch(),

                swimmers: CRSelectClassPageStore.getSwimmers().fetch(),

                currentSwimmer: CRSelectClassPageStore.currentSwimmer.get(),
                currentClass:CRSelectClassPageStore.currentClass.get(),

                //should wait for currentSwimmer
                avaiableDays: CRSelectClassPageStore.avaiableDays.get(),
                avaiableTimes: CRSelectClassPageStore.avaiableTimes.get(),
                currentDay: CRSelectClassPageStore.currentDay.get(),
                currentTime: CRSelectClassPageStore.currentTime.get(),

                currentStep: CRSelectClassPageStore.currentStep.get(),

                //一次选课流程的所有信息
                selectedClasses: CRSelectClassPageStore.selectedClasses.get()

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
                actionType: "CRSelectClassPage_SWIMMER_CHANGE",
                swimmer: swimmer
            });

        },
        dayChange(e){
            var value = this.refs.day.getValue()
            value = parseInt(value, 10)

            Dispatcher.dispatch({
                actionType: "CRSelectClassPage_DAY_CHANGE",
                day: value
            });


        },
        timeChange(e){
            var value = this.refs.time.getValue()
            value = parseInt(value, 10)
            Dispatcher.dispatch({
                actionType: "CRSelectClassPage_TIME_CHANGE",
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

            //check duplicate
            var selectedClasses =this.data.selectedClasses
            var currentClass =this.data.currentClass
            if(currentClass_in_selectedClasses(currentClass,selectedClasses)){
                alert('class duplicated')
                return;
            }


            Dispatcher.dispatch({
                actionType: "CRSelectClassPage_CLASS_SELECT",
                currentStep: this.data.currentStep,
                selectedClass: formData
            });

        },

        goToEdit(num){

            Dispatcher.dispatch({
                actionType: "CRSelectClassPage_CLASS_EDIT",
                currentStep: this.data.currentStep,
                eidtStep: num
            });

        },
        componentWillMount(){

            Dispatcher.dispatch({
                actionType: "componentWillMount_CRSelectClassPage"
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


            //let currentSwimmerValue = this.data.currentSwimmer
            //    && {value:this.data.currentSwimmer._id,
            //        text:this.data.currentSwimmer.name}

            let currentSwimmerValue = this.data.currentSwimmer
                    && this.data.currentSwimmer._id

            //debugger

            return <div>
                <RC.Card key={Math.random()} className="padding">
                    <h4 className="brand">Register for spring 2015</h4>

                    {/*swimmer && swimmer.name*/}

                    {
                        class1?<div className="row">
                            <div className="col">
                                Preference 1
                            </div>
                            <div className="col">
                                {class1.name}
                            </div>
                            <div className="col col-20">
                                <button className="button button-clear"
                                        onClick={this.goToEdit.bind(this,1)}
                                    >Edit</button>
                            </div>
                        </div>:''

                    }

                    {
                        class2?<div className="row">
                            <div className="col">
                                Preference 2
                            </div>
                            <div className="col">
                                {class2 && class2.name}
                            </div>
                            <div className="col col-20">
                                <button className="button button-clear"
                                        onClick={this.goToEdit.bind(this,2)}
                                    >Edit</button>
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
                            <div className="col col-20">
                                <button className="button button-clear"
                                        onClick={this.goToEdit.bind(this,3)}
                                    >Edit</button>
                            </div>
                        </div>:''
                    }

                </RC.Card>

                <RC.Form ref="myForm" key={Math.random()} onSubmit={this.formSubmit}>
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
                            {this.data.currentStep == 1 ? 'Book':'Select'}
                        </RC.Button>


                        {
                            this.data.currentStep == 1 ?
                                <RC.URL href="/classRegister/AddWaitingList">
                                    <RC.Button name="button" type="submit"
                                               theme="full" buttonColor="brand">
                                        Waiting List
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