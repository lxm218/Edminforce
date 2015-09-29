/**
 * Created on 9/16/15.
 */

{
    let CRSelectClassPageStore;
    Dependency.autorun(function () {
        CRSelectClassPageStore = Dependency.get('classRegister.SelectClassPage.store');
    });

    Cal.CRSelectClassReadyPage = React.createClass({

        mixins: [ReactMeteorData],
        getMeteorData() {
            return {
                selectedClassesMap: CRSelectClassPageStore.selectedClasses.get()
            }
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
                            {swimmer?<p>
                                    {swimmer.name}
                                </p>:''

                            }
                            {
                                class1?<p>
                                    {class1.name}
                                </p>:''
                            }
                            {
                                class2?<p>
                                    {class2.name}
                                </p>:''
                            }
                            {
                                class3?<p>
                                    {class3.name}
                                </p>:''
                            }


                        </RC.Item>

                        <RC.URL href="/classRegister/SelectClass">
                            <RC.Button name="button" type="submit"
                                       onClick={this.formSubmit}
                                       theme="full" buttonColor="brand">
                                Select More
                            </RC.Button>

                        </RC.URL>


                        <RC.URL href="#">
                            <RC.Button name="button" type="submit"
                                       onClick={this.formSubmit}
                                       theme="full" buttonColor="dark">
                                Change selection
                            </RC.Button>

                        </RC.URL>
                        <RC.URL href="/classRegister/RegBillingPage">
                            <RC.Button name="button" type="submit"
                                       onClick={this.formSubmit}
                                       theme="full" buttonColor="brand">
                                Checkout
                            </RC.Button>

                        </RC.URL>

                    </RC.List>
            </div>
        }
    })
}
