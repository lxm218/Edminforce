
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
        this.props.actions.bookTrial(programId);
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
                {programs}
            </RC.Div>
        );
    }
}