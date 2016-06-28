
EdminForce.Components.Programs = class extends RC.CSS {
    constructor(p) {
        super(p);
        this.state = {
            expandedProgramId: null
        }

        this.onBookTrial = this.onBookTrial.bind(this);
        this.onToggleExpand = this.onToggleExpand.bind(this);
    }

    onToggleExpand(programId) {
        this.setState({
            expandedProgramId: this.state.expandedProgramId == programId ? null : programId
        });
    }

    onBookTrial(programId) {
        this.props.actions.showTrialClasses(programId);
    }

    render() {
        let programs = this.props.programs.map( (program) => (
            <EdminForce.Components.ProgramCollapse
                key={program._id}
                program={program}
                expand={this.state.expandedProgramId === program._id}
                toggleExpand={this.onToggleExpand}
                bookTrial={this.onBookTrial}/>
        ));
        return (
            <RC.Div style={{padding: "10px"}}>
                {EdminForce.utils.renderError(this.props.error)}
                <RC.VerticalAlign center={true} className="padding" height="80px" key="title">
                    <p>Please click the following programs to check which one matches best with your age group and skills.</p>
                </RC.VerticalAlign>
                {programs}
            </RC.Div>
        );
    }
}