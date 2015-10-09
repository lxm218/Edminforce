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
            Meteor.subscribe("swimmersByAccountId", Meteor.userId());
            //Meteor.subscribe("appInfo");
            Meteor.subscribe("classes");
            Meteor.subscribe("activeShopingCart");


            var data = {
                account: Meteor.users.find().fetch(),

                swimmers: PageStore.getSwimmers().fetch(),

                currentSwimmer: PageStore.currentSwimmer.get(),

                ////////////test
                currentSwimmerClasses: PageStore.currentSwimmerClasses.get(),
                currentSwimmerType: PageStore.currentSwimmerType.get(),

                swimmerClasses: PageStore.swimmerClasses.get(),
                selectClassView: PageStore.selectClassView,

                //should wait for currentSwimmer
                avaiableDays: PageStore.avaiableDays.get(),
                avaiableTimes: PageStore.avaiableTimes.get(),
                currentDay: PageStore.currentDay.get(),
                currentTime: PageStore.currentTime.get(),

                currentStep: PageStore.currentStep.get(),

                //一次选课流程的所有信息
                selectedClasses: PageStore.selectedClasses.get()

            }

            debugger
            return data;

        },

        //formSubmit (e) {
        //    //两种步骤不同 无法合并
        //
        //},

        getCardView(){


            let swimmers = this.data.swimmers.map(function (v, i) {
                return {text: v['name'], value: v._id}
            })

            let swimmer = this.data.selectedClasses.get('swimmer')
            let class1 = this.data.selectedClasses.get('class1')
            let class2 = this.data.selectedClasses.get('class2')
            let class3 = this.data.selectedClasses.get('class3')


            return <RC.Card key={Math.random()} className="padding">


                <h4 className="brand">Register for spring 2015</h4>

                <div className="row">
                    <div className="col">
                        {swimmer && swimmer.name}
                    </div>
                    <div className="col">

                        {class1 && class1.name}
                        <br/>
                        {class2 && class2.name}
                        <br/>
                        {class3 && class3.name}

                    </div>
                </div>

            </RC.Card>

        },

        getselectionView(){


            if (this.data.currentSwimmerType == 'swimmer-ongoing') {


                if(this.data.currentStep== '1-1'){  //可以直接去结账

                    return <Cal.CRBookTheSameTimeCurrentConfirm />

                }else if(this.data.currentStep== 1){
                    return <Cal.CRBookTheSameTimeCurrent

                        swimmers={this.data.swimmers}
                        currentSwimmer={this.data.currentSwimmer}

                        currentSwimmerClasses={this.data.currentSwimmerClasses}

                        currentStep={this.data.currentStep}
                        />

                }else{ //2 3

                    return <Cal.CRBookTheSameTimeCurrentPreference
                        swimmers={this.data.swimmers}
                        currentSwimmer={this.data.currentSwimmer}

                        avaiableDays={this.data.avaiableDays}
                        avaiableTimes={this.data.avaiableTimes}

                        currentDay={this.data.currentDay}
                        currentTime={this.data.currentTime}

                        currentStep={this.data.currentStep}
                        />

                }

            } else if (this.data.currentSwimmerType == 'swimmer-sibling') {

                    return <Cal.CRBookTheSameTimeSibling

                        swimmers={this.data.swimmers}
                        currentSwimmer={this.data.currentSwimmer}

                        avaiableDays={this.data.avaiableDays}
                        avaiableTimes={this.data.avaiableTimes}

                        currentDay={this.data.currentDay}
                        currentTime={this.data.currentTime}

                        currentStep={this.data.currentStep}
                        />

            }

        },

        componentWillMount(){

            Dispatcher.dispatch({
                actionType: "componentWillMount_CRBookTheSameTimePage"
            });

        },

        render() {


            //let currentSwimmerValue = this.data.currentSwimmer
            //    && {
            //        value: this.data.currentSwimmer._id,
            //        text: this.data.currentSwimmer.name
            //    }
            //console.log(this.data.currentSwimmerClasses)
            //
            //debugger


            return <div>



                {this.getCardView()}


                {this.getselectionView()}


            </div>
        }

    })

}