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
                firstPreference: CRSelectClassPageStore.firstPreference.get(),
                secendPreference: CRSelectClassPageStore.secendPreference.get(),
                thirdPreference: CRSelectClassPageStore.thirdPreference.get()
            }
        },

        render() {
            return <div>
                    <RC.List theme="inset">
                        <RC.Item theme="body">
                            <h2 className="brand">Register for spring 2015</h2>

                            <p>{this.data.firstPreference}</p>
                            <p>{this.data.secendPreference}</p>
                            <p>{this.data.thirdPreference}</p>

                        </RC.Item>

                        <RC.URL href="/SelectClass">
                            <RC.Button name="button" type="submit"
                                       onClick={this.formSubmit}
                                       theme="full" buttonColor="brand">
                                Register more swimmer
                            </RC.Button>

                        </RC.URL>
                        <RC.URL href="/SelectClass">
                            <RC.Button name="button" type="submit"
                                       onClick={this.formSubmit}
                                       theme="full" buttonColor="brand">
                                Register more classes
                            </RC.Button>

                        </RC.URL>

                        <RC.URL href="/SelectClass">
                            <RC.Button name="button" type="submit"
                                       onClick={this.formSubmit}
                                       theme="full" buttonColor="brand">
                                Change selection
                            </RC.Button>

                        </RC.URL>
                        <RC.URL href="/SelectClass">
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
