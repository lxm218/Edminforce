/**
 * Created on 9/14/15.
 */


{
    //let CRSelectClassPageStoreClass;
    //Dependency.autorun(function () {
    //    CRSelectClassPageStoreClass = Dependency.get('classRegister.SelectClassPage.storeClass');
    //});

    let CRSelectClassPageStore;
    Dependency.autorun(function () {
        CRSelectClassPageStore = Dependency.get('classRegister.SelectClassPage.store');
    });


    Cal.CRSelectClassPage = React.createClass({
        mixins: [ReactMeteorData,Cal.Mixins.windowUnload],
        getMeteorData() {

            //todo
            Meteor.subscribe("swimmersByAccountId", Meteor.userId());
            //Meteor.subscribe("appInfo");
            Meteor.subscribe("classes");
            Meteor.subscribe("activeShoppingCart");

            //仅在页面加载时才初始化
            //var CRSelectClassPageStore = new CRSelectClassPageStoreClass;


            var data = {
                account: Meteor.users.find().fetch(),

                swimmers: CRSelectClassPageStore.getSwimmers().fetch(),

                currentLevel:CRSelectClassPageStore.currentLevel.get(), //next level


                currentSwimmer: CRSelectClassPageStore.currentSwimmer.get(),
                currentClass:CRSelectClassPageStore.currentClass.get(),

                //should wait for currentSwimmer
                avaiableDays: CRSelectClassPageStore.avaiableDays.get(),
                avaiableTimes: CRSelectClassPageStore.avaiableTimes.get(),
                currentDay: CRSelectClassPageStore.currentDay.get(),
                currentTime: CRSelectClassPageStore.currentTime.get(),

                currentStep: CRSelectClassPageStore.currentStep.get(),

                classesNoSeatByLevel:CRSelectClassPageStore.classesNoSeatByLevel.get(),

                //一次选课流程的所有信息
                selectedClasses: CRSelectClassPageStore.selectedClasses.get()

            }

            //
            return data;

        },

        /////////////////////////////////////////////////////////////////
        ///////////actions///////////
        swimmerChange(e){
            var value = e.target.value//this.refs.swimmer.getValue()

            var swimmer = _.find(this.data.swimmers, function (v, n) {
                return v._id == value;
            })

            console.log(swimmer)
            Dispatcher.dispatch({
                actionType: "CRSelectClassPage_SWIMMER_CHANGE",
                swimmer: swimmer
            });

        },
        //dayChange(e){
        //    var value = e.target.value //this.refs.day.getValue()
        //    value = parseInt(value, 10)
		//
        //    Dispatcher.dispatch({
        //        actionType: "CRSelectClassPage_DAY_CHANGE",
        //        day: value
        //    });
		//
		//
        //},
        //timeChange(e){
        //    var value = e.target.value //this.refs.time.getValue()
        //    value = parseInt(value, 10)
        //    Dispatcher.dispatch({
        //        actionType: "CRSelectClassPage_TIME_CHANGE",
        //        time: value
        //    });
		//
        //},

        formSubmit (e) {
            e.preventDefault()

            var formData = this.refs.myForm.getFormData()



            //todo validation info in ui
            if (!this.data.currentSwimmer || !this.data.currentDay || !this.data.currentTime) {
                alert('please select a class')
                return;
            }
            //no class match
            if(!this.data.currentClass){
                alert('please select a class')
                return
            }

            //check duplicate
            var selectedClasses =this.data.selectedClasses
            var currentClass =this.data.currentClass
            if(App.currentClass_in_selectedClasses(currentClass,selectedClasses)){
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

            /*
             <div className="col col-20">
             <button className="button button-clear"
             onClick={this.goToEdit.bind(this,1)}
             >Edit</button>
             </div>

            */
            Dispatcher.dispatch({
                actionType: "CRSelectClassPage_CLASS_EDIT",
                currentStep: this.data.currentStep,
                eidtStep: num
            });

        },
        goToWaitingList(e){
            e.preventDefault()

            var href="/classRegister/AddWaitingList"
                    +"?swimmerId="+this.data.currentSwimmer._id
                    +"&classLevel="+ this.data.currentLevel

            var classesNoSeat = this.data.classesNoSeatByLevel.length

            if(classesNoSeat==0){

                alert('All classes are available, you can register now')
                return
            }

            FlowRouter.go(href);


        },
        componentWillMount(){

            Dispatcher.dispatch({
                actionType: "componentWillMount_CRSelectClassPage"
            });

            //尝试清除不完整的购物项
            Meteor.call('clear_uncompleted_item_in_cart')

        },
        onBeforeUnload(e){
            var message = "You may lost data, are you sure leving?";
            e.returnValue = message;
            return message;
        },


        getCardView(){


            //let swimmers = this.data.swimmers.map(function (v, i) {
            //    return {text: v['name'], value: v._id}
            //})

            let swimmer = this.data.selectedClasses.get('swimmer')
            let class1 = this.data.selectedClasses.get('class1')
            let class2 = this.data.selectedClasses.get('class2')
            let class3 = this.data.selectedClasses.get('class3')

            return <Cal.SelectedClassInfoCard
              swimmer={swimmer}
              selectedClasses={{'class1':class1,'class2':class2,'class3':class3}}
            />

        },
        render() {

            let swimmers = this.data.swimmers.map(function (v, i) {
                return {text: v['name'], value: v._id}
            })

            //let swimmer = this.data.selectedClasses.get('swimmer')
            //let class1 = this.data.selectedClasses.get('class1')
            //let class2 = this.data.selectedClasses.get('class2')
            //let class3 = this.data.selectedClasses.get('class3')


            //let currentSwimmerValue = this.data.currentSwimmer
            //    && {value:this.data.currentSwimmer._id,
            //        text:this.data.currentSwimmer.name}

            let currentSwimmerValue = this.data.currentSwimmer
                    && this.data.currentSwimmer._id

            //

            return <div>


                {this.getCardView()}

                <RC.Form ref="myForm" key={Math.random()} onSubmit={this.formSubmit} theme="padding">

                        {
                            this.data.currentStep == 1 ?
                                <RC.Select theme="right"
                                    ref="swimmer"
                                    options={swimmers}
                                    value= {currentSwimmerValue}
                                    name="swimmer"
                                    onChange={this.swimmerChange}
                                    label="Swimmer"
                                    />

                                : <RC.Div uiColor="brand1" style={{
                            display:"flex",
                            justifyContent:"space-between",
                            paddingRight:30
                        }}>
                                <span>Swimmer:</span>
                                <span>
                                    {this.data.currentSwimmer && this.data.currentSwimmer.name}
                                </span>
                            </RC.Div>




                        }


                        <RC.Div uiColor="brand1" style={{
                            display:"flex",
                            justifyContent:"space-between",
                            paddingRight:30
                        }}>
                            <span>Level:</span>
                            <span>{this.data.currentLevel}</span>
                        </RC.Div>


                        <Cal.SelectDayGrid
                            avaiableDays={this.data.avaiableDays}
                            currentDay={this.data.currentDay}
                            name="dayGrid"
                            changeMessage="CRSelectClassPage_DAY_CHANGE"
                        />

                        {
                            //<RC.Select theme="right"
                            //           ref="day"
                            //           options={this.data.avaiableDays}
                            //           value={this.data.currentDay}
                            //           name="day"
                            //           onChange={this.dayChange}
                            //           label="Day"
                            ///>

                            //<RC.Select theme="right"
                            //           ref="time"
                            //           options={this.data.avaiableTimes}
                            //           value={this.data.currentTime}
                            //           name="time"
                            //           onChange={this.timeChange}
                            //           label="Time"
                            ///>
                        }

                    <Cal.SelectTimeGrid
                        avaiableTimes={this.data.avaiableTimes}
                        currentTime={this.data.currentTime}
                        changeMessage="CRSelectClassPage_TIME_CHANGE"
                        name="timeGrid"

                    />


                        <RC.Button name="button" type="submit" bgColor="brand1"
                                   onClick={this.formSubmit}
                                   theme="full" buttonColor="brand">
                            {this.data.currentStep == 1 ? 'Book':'Select'}
                        </RC.Button>


                        {
                            this.data.currentStep == 1 ?
                                    <RC.Button name="button" bgColor="brand1"
                                               onClick={this.goToWaitingList}
                                               theme="full" buttonColor="brand">
                                        Waiting List
                                    </RC.Button>
                                : ''
                        }


                </RC.Form>
            </div>
        }

    })

}