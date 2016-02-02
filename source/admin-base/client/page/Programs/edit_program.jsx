KUI.Program_edit = class extends RC.CSSMeteorData{

    getMeteorData(){
        let id = this.getProgramId();
        let x = Meteor.subscribe('EF-Program', {
            query : {
                _id : id
            }
        });

        let data = KG.get('EF-Program').getDB().findOne();

        return {
            id : id,
            ready : x.ready(),
            data : data
        };
    }

    getProgramId(){
        return FlowRouter.current().params.id;
    }

    getAddProgram(){

        var p = {
            name : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-9',
                ref : 'pname',
                label : 'Program Name'
            },
            desc : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-9',
                ref : 'pdesc',
                label : 'Program Description'
            }
        };

        const style = {
            marginTop : '40px'
        };

        return (
            <RC.Div style={style}>
                <RB.Row>
                    <RB.Col md={12} mdOffset={0}>
                        <form className="form-horizontal">

                            <RB.Input type="text" {... p.name} />
                            <RB.Input type="textarea" {... p.desc} />

                            <RC.Div style={{textAlign:'right'}}>
                                <KUI.YesButton onClick={this.save.bind(this)} label="Save"></KUI.YesButton>
                            </RC.Div>
                        </form>
                    </RB.Col>
                </RB.Row>
            </RC.Div>
        );
    }

    render(){

        if(!this.data.ready){
            return util.renderLoading();
        }

        util.delay(()=>{
            this.setDefaultValue();
        }, 200);

        return (
            <RC.Div>
                <h3>Edit Program</h3>
                <hr/>
                {this.getAddProgram()}
            </RC.Div>
        );
    }


    setDefaultValue(){
        let name = this.refs.pname,
            desc = this.refs.pdesc;

        name.getInputDOMNode().value = this.data.data.name;
        desc.getInputDOMNode().value = this.data.data.description || '';
    }

    save(){
        let name = this.refs.pname,
            desc = this.refs.pdesc;
        let rs = KG.get('EF-Program').updateById({
            name : name.getValue(),
            description : desc.getValue()
        }, this.getProgramId());

        KG.result.handle(rs, {
            success : function(json){
                console.log(json);
                util.goPath('/program');
            }
        });
    }
};