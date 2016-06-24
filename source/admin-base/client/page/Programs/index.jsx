
KUI.Program_index = class extends RC.CSSMeteorData{

    constructor(p){
        super(p);

        this.state = {
            showAddBox : false,
            programTitle : '',
            programDescription : ''
        };

    }

    getMeteorData(){
        let x = Meteor.subscribe('EF-Program');

        let list = KG.get('EF-Program').getDB().find({}, {
            sort : {
                displayOrder : 1
            }
        }).fetch();

        return {
            list : list,
            ready : x.ready()
        };
    }

    baseStyles(){
        return {
            table : {
                marginTop : '20px'
            },

            rd : {
                textAlign : 'right'
            }
        };
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
                placeholder : 'Display Order'
            }
        };

        const style = {
            marginTop : '40px',
            display : this.state.showAddBox ? 'block' : 'none'
        };

        return (
            <RC.Div style={style}>
                <hr />
                <RB.Row>
                    <RB.Col md={12} mdOffset={0}>
                        <form className="form-horizontal">

                            <RB.Input type="text" {... p.name} />
                            <RB.Input type="text" {... p.sort} />
                            <RB.Input {... p.desc} >
                                <div ref="html"></div>

                            </RB.Input>

                            <RC.Div style={this.css.get('styles').rd}>
                                <KUI.YesButton onClick={this.save.bind(this)} label="Save"></KUI.YesButton>
                            </RC.Div>
                        </form>
                    </RB.Col>
                </RB.Row>
            </RC.Div>
        );
    }

    render(){
        let self = this;

        let style = this.css.get('styles');

        const titleArray = [
            {
                title : 'Programs',
                key : 'name',
                style : {
                    width : '70%'
                }
            },

            //{
            //    title : 'Description',
            //    reactDom(item){
            //        return decodeURIComponent(item.description)
            //    },
            //    style : {
            //        width : '50%'
            //    }
            //},
            {
                title : 'Action',
                style : {
                    textAlign : 'center'
                },
                reactDom : function(item){
                    const sy = {
                        cursor : 'pointer',
                        marginLeft : '12px',
                        position : 'relative',
                        top : '2px'
                    };
                    const ml = {
                        marginLeft : '10px',
                        cursor : 'pointer'
                    };
                    const ml1 = {
                        position : 'relative',
                        top : '1px',
                        cursor : 'pointer'
                    };

                    var del = function(){
                        if(!util.user.checkPermission('program', 'delete')){
                            return swal(util.const.NoOperatorPermission, '', 'error');
                        }

                        util.dialog.confirm({
                            msg : 'Delete this Program?',
                            YesFn : function(){
                                let rs = KG.get('EF-Program').removeById(item._id, function(flag, err){
                                    if(!flag){
                                        alert(err);
                                    }

                                });

                            }
                        });
                    };

                    let showModal = ()=>{
                        self.setState({
                            programTitle : item.name,
                            programDescription : decodeURIComponent(item.description)
                        });

                        self.refs.modal.show();
                    };

                    return (
                        <RC.Div style={{textAlign:'center'}}>
                            <KUI.Icon onClick={showModal} icon="fa fa-eye" font="18px" color="#1ab394" style={ml1}></KUI.Icon>
                            <RC.URL href={`/program/edit/${item._id}`}><KUI.Icon icon="edit" font="18px" color="#1ab394" style={sy}></KUI.Icon></RC.URL>

                            <KUI.Icon onClick={del} icon="trash-o" font="18px" color="#cdcdcd" style={ml}></KUI.Icon>
                        </RC.Div>

                    );
                }
            }
        ];

        var list = this.data.list;

        _.map(list, (item)=> {
            item.createTime = h.getDateFromProps(item.createTime, 'YYYY-MM-DD HH:mm:ss');

            return item;

        });


        return (
            <RC.Div>
                <KUI.ProgramTopTab select={0} />

                <KUI.Table
                    style={style.table}
                    list={list}
                    title={titleArray}
                    ref="table"></KUI.Table>

                <RC.Div style={style.rd}>
                    <KUI.YesButton onClick={this.showAddBox.bind(this)} label="Add Program"></KUI.YesButton>
                </RC.Div>

                {this.getAddProgram()}

                {this.renderModal()}
            </RC.Div>
        );

    }

    showAddBox(){
        if(!util.user.checkPermission('program', 'view')){
            return swal(util.const.NoOperatorPermission, '', 'error');
        }

        this.setState({
            showAddBox : true
        });
    }
    resetAddBox(){
        this.refs.pname.getInputDOMNode().value = '';
        $(this.refs.html).summernote('code', '');

        this.setState({
            showAddBox : false
        });
    }

    save(){
        let self = this;

        let name = this.refs.pname.getValue(),
            sort = parseInt(this.refs.sort.getValue(), 10),
            desc = $(this.refs.html).summernote('code');

        console.log(sort);
        if(_.isNaN(sort) || !_.isNumber(sort)){
            util.toast.showError('sort is must number');
            return false;
        }

        let rs = KG.get('EF-Program').insert({
            name : name,
            displayOrder : sort,
            description : encodeURIComponent(desc)
        });

        KG.result.handle(rs, {
            success : function(){
                alert('insert success');
                self.resetAddBox();
            }
        });
    }

    componentDidMount(){
        super.componentDidMount();
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
    }

    renderModal(){
        let html = decodeURIComponent(this.state.programDescription);

        return (
            <KUI.Modal onHide={this.hideModal.bind(this)}
                       title={this.state.programTitle}
                       ref="modal" >
                <div dangerouslySetInnerHTML={{__html:html}}></div>
            </KUI.Modal>
        );
    }

    hideModal(){
        this.refs.modal.hide();
    }
};
