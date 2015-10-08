/**
 * Created on 10/6/15.
 */


{


    let bookTheSameTimePageStore;
    Dependency.autorun(function () {
        bookTheSameTimePageStore = Dependency.get('classRegister.bookTheSameTimePage.store');
    });


    Cal.CRBookTheSameTimeSelectClassReadyPage = React.createClass({

        mixins: [ReactMeteorData],
        getMeteorData() {

            selectedClasses = bookTheSameTimePageStore.selectedClasses.get()



            return {
                selectedClassesMap: selectedClasses
            }
        },

        //actions
        selectMore(e){
            e.preventDefault();


            //Dispatcher.dispatch({
            //    actionType: "GOTO_CRBookTheSameTimePage"
            //});
            //
            //var href = "/classRegister/register"
            //FlowRouter.go(href);
        },

        render() {

            let swimmer = this.data.selectedClassesMap.get('swimmer')
            let class1 = this.data.selectedClassesMap.get('class1')
            let class2 = this.data.selectedClassesMap.get('class2')
            let class3 = this.data.selectedClassesMap.get('class3')


            return <div>
                <RC.List theme="inset">
                    <RC.Item theme="body">
                        <h2 className="brand">Register for spring 2015</h2>
                        {swimmer ? <p>
                            {swimmer.name}
                        </p> : ''

                        }
                        {
                            class1 ? <p>
                                {class1.name}
                            </p> : ''
                        }
                        {
                            class2 ? <p>
                                {class2.name}
                            </p> : ''
                        }
                        {
                            class3 ? <p>
                                {class3.name}
                            </p> : ''
                        }


                    </RC.Item>

                    <RC.URL href="/classRegister/BookTheSameTimePage">
                        <RC.Button name="button" type="submit"
                                   theme="full" buttonColor="brand">
                            Select More
                        </RC.Button>

                    </RC.URL>


                    <RC.URL href="/classRegister/RegBillingPage">
                        <RC.Button name="button" type="submit"
                                   theme="full" buttonColor="brand">
                            Checkout
                        </RC.Button>

                    </RC.URL>

                </RC.List>
            </div>
        }
    })
}
