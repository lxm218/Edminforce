KUI.Program_edit = class extends KUI.Page{

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
                //labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-12',
                ref : 'pname',
                placeholder : 'Program Name'
            },
            desc : {
                //labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-12',
                ref : 'pdesc'
                //label : 'Program Description'
            },
            sort : {
                wrapperClassName : 'col-xs-6',
                ref : 'sort',
                placeholder : 'sort number'
            }
        };

        const style = {
            //marginTop : '40px'
        };

        return (
            <RC.Div style={style}>
                <RB.Row>
                    <RB.Col md={12} mdOffset={0}>
                        <form className="form-horizontal">

                            <RB.Input type="text" {... p.name} />
                            <RB.Input type="text" {... p.sort} />
                            <RB.Input {... p.desc} >
                                <div ref="html"></div>

                            </RB.Input>

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


        return (
            <RC.Div>
                <h3>Edit Program</h3>
                <hr/>
                {this.getAddProgram()}
            </RC.Div>
        );
    }


    setDefaultValue(){
        let name = this.refs.pname;
        let desc = this.data.data.description ? decodeURIComponent(this.data.data.description) : '';


        name.getInputDOMNode().value = this.data.data.name;
        this.refs.sort.getInputDOMNode().value = this.data.data.displayOrder || 0;
        $(this.refs.html).summernote('code', desc);
    }

    save(){
        let name = this.refs.pname,
            sort = parseInt(this.refs.sort.getValue(), 10),
            desc = $(this.refs.html).summernote('code');

        if(_.isNaN(sort) || !_.isNumber(sort)){
            util.toast.showError('sort is must number');
            return false;
        }

        let rs = KG.get('EF-Program').updateById({
            name : name.getValue(),
            displayOrder : sort,
            description : encodeURIComponent(desc)
        }, this.getProgramId());

        KG.result.handle(rs, {
            success : function(json){
                console.log(json);
                util.goPath('/program');
            }
        });
    }


    runOnceAfterDataReady(){
        $(this.refs.html).summernote({
            height : 280,
            resize : false,
            placeholder : 'Program Description',
            //disableDragAndDrop : false,
            toolbar : [
                ['style', ['bold', 'italic', 'underline', 'hr']],
                ['font', ['strikethrough']],
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']]
            ]
        });
        this.setDefaultValue();
    }
};