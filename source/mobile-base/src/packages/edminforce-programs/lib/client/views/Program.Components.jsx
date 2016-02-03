{
    let {
        ProgramsCollapse
        }= EdminForce.Components;

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.ProgramsList = class extends RC.CSSMeteorData {

        constructor(p) {
            super(p);
        }

        getMeteorData() {
            let programSub = Meteor.subscribe('EF-Program');
            let list = EdminForce.Collections.program.find({}, {
                sort: {
                    createTime: -1
                }
            }).fetch();

            console.log(list);

            return {
                list: list,
                ready: programSub.ready()
            };
        }

        render() {

            // Fill with your UI
            return (
                <RC.Div style={{padding: "10px"}}>
                    <RC.Loading isReady={this.data.isReady}>
                        {
                            this.data.list.map(function (program) {
                                return <ProgramsCollapse key={program._id} program={program}/>
                            })
                        }
                    </RC.Loading>
                </RC.Div>
            );
        }
    }

}