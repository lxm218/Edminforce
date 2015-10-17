/**
 * Created on 9/14/15.
 */


{
    let PageStore;
    Dependency.autorun(function () {
        PageStore = Dependency.get('classRegister.bookTheSameTimePage.store');
    });


    Cal.CRBookTheSameTimePage = React.createClass({
        mixins: [ReactMeteorData, Cal.Mixins.windowUnload],
        getMeteorData() {

            //todo
            Meteor.subscribe("swimmersByAccountId", Meteor.userId());
            //Meteor.subscribe("appInfo");
            Meteor.subscribe("classes");
            Meteor.subscribe("activeShoppingCart");


            var data = {
                account: Meteor.users.find().fetch(),

                swimmers: PageStore.getSwimmers().fetch(),

                currentSwimmer: PageStore.currentSwimmer.get(),
                currentLevel:PageStore.currentLevel.get(), //计算过后的值

                //当前注册课程信息 来自classesRegiser表
                nowClasses:PageStore.nowClasses.get(),
                registeredClasses:PageStore.registeredClasses.get(),
                historyClasses:PageStore.historyClasses.get(),
                shoppingCartClasses:PageStore.shoppingCartClasses.get(),


                //当前swimmer下一个session的 same time class
                currentSwimmerSameClasses:PageStore.currentSwimmerSameClasses.get(),
                currentSwimmerAvaibleSameClasses:PageStore.currentSwimmerAvaibleSameClasses.get(),

                ////////////test
                //currentSwimmerClasses: PageStore.currentSwimmerClasses.get(),
                currentSwimmerType: PageStore.currentSwimmerType.get(),

                //swimmerClasses: PageStore.swimmerClasses.get(),
                //selectClassView: PageStore.selectClassView,

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

        getselectionView(){

            // 正在游
            // 且有sameclass
            // 且购物车为空
            // 且步骤为1时 显示bookthesametime
            if(this.data.currentSwimmerAvaibleSameClasses.length>0
                && !this.data.shoppingCartClasses.length
                && !this.data.registeredClasses.length){

                if(this.data.currentStep== '1-1'){  //可以直接去结账

                    return <Cal.CRBookTheSameTimeCurrentConfirm />

                }else if(this.data.currentStep== 1){
                    return <Cal.CRBookTheSameTimeCurrent

                        swimmers={this.data.swimmers}
                        currentSwimmer={this.data.currentSwimmer}
                        currentLevel={this.data.currentLevel}

                        currentSwimmerSameClasses={this.data.currentSwimmerSameClasses}
                        currentSwimmerAvaibleSameClasses={this.data.currentSwimmerAvaibleSameClasses}

                        currentStep={this.data.currentStep}
                        />

                }else{ //2 3

                    return <Cal.CRBookTheSameTimeCurrentPreference
                        swimmers={this.data.swimmers}
                        currentSwimmer={this.data.currentSwimmer}
                        currentLevel={this.data.currentLevel}


                        avaiableDays={this.data.avaiableDays}
                        avaiableTimes={this.data.avaiableTimes}

                        currentDay={this.data.currentDay}
                        currentTime={this.data.currentTime}

                        currentStep={this.data.currentStep}
                        />

                }


            }else{


                //brother sister 或者 return back
                return <Cal.CRBookTheSameTimeSibling

                    swimmers={this.data.swimmers}
                    currentSwimmer={this.data.currentSwimmer}
                    currentLevel={this.data.currentLevel}


                    avaiableDays={this.data.avaiableDays}
                    avaiableTimes={this.data.avaiableTimes}

                    currentDay={this.data.currentDay}
                    currentTime={this.data.currentTime}

                    currentStep={this.data.currentStep}
                    />

            }

        },
        onBeforeUnload(e){
            var message = "You may lost data, are you sure leving?";
            e.returnValue = message;
            return message;
        },

        componentWillMount(){

            Dispatcher.dispatch({
                actionType: "componentWillMount_CRBookTheSameTimePage"
            });

            //尝试清除不完整的购物项
            Meteor.call('clear_uncompleted_item_in_cart')

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