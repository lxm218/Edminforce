{
    let {
        ProgramsCollapse
        }= EdminForce.Components;

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.ProgramsList = class extends RC.CSSMeteorData {

        constructor(p) {
            super(p);
            this.state = {
                collapse:true
            }
        }

        collapseAll(id){
            this.setState({
                collapse:id
            });
        }

        getMeteorData() {
            let programSub = Meteor.subscribe('EF-Program');
            let list = EdminForce.Collections.program.find({}, {
                sort: {
                    createTime: -1
                }
            }).fetch();
            return {
                list: list,
                isReady: programSub.ready()
            };
        }

        render() {

            // Fill with your UI
            return (
                <RC.Div style={{padding: "10px"}}>
                    <RC.Loading isReady={this.data.isReady}>
                        {
                            this.data.list.map(function (program) {
                                return <ProgramsCollapse key={program._id} program={program} collapse={this.state.collapse} collapseAll={this.collapseAll.bind(this)}/>
                            }.bind(this))
                        }
                    </RC.Loading>
                </RC.Div>
            );
        }
    }

}