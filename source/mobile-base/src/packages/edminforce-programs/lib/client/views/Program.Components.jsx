{
    let {
        ProgramsCollapse
        }= EdminForce.Components;

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.ProgramsList = class extends RC.CSSMeteorData{

        constructor(p){
            super(p);
        }

        getMeteorData(){
            let x = Meteor.subscribe('EF-Program');
            let list =EdminForce.Collections.program.find({}, {
                sort : {
                    createTime : -1
                }
            }).fetch();

            console.log(list);

            return {
                list : list,
                ready : x.ready()
            };
        }

        bookTrial(){
            //TODO Add condition of book trail

            // To show the flow, jump to login page
            FlowRouter.go('/programs/111');
        }

        render() {

            // Fill with your UI
            return (
                <RC.Div style={{padding: "10px"}}>
                    {
                        this.data.list.map(function(program){
                            return <ProgramsCollapse program={program}/>
                        })
                    }
                </RC.Div>
            );
        }
    }

}