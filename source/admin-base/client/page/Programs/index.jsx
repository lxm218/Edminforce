
KUI.Program_index = class extends RC.CSSMeteorData{

    constructor(p){
        super(p);

        this.state = {
            showAddBox : false
        };

    }

    getMeteorData(){
        //let listC = Meteor.subscribe('EF-Program', {});

        let list = KG.get('EF-Program').getDB().find({}, {
            sort : {
                createTime : -1
            }
        }).fetch();

        return {
            list : list,
            isReady : false
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
            marginTop : '40px',
            display : this.state.showAddBox ? 'block' : 'none'
        };

        return (
            <RC.Div style={style}>
                <RB.Row>
                    <RB.Col md={12} mdOffset={0}>
                        <form className="form-horizontal">

                            <RB.Input type="text" {... p.name} />
                            <RB.Input type="textarea" {... p.desc} />

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

        let style = this.css.get('styles');

        const titleArray = [
            {
                title : 'Programs',
                key : 'name',
                style : {
                    width : '30%'
                }
            },
            {
                title : 'Description',
                key : 'description',
                style : {
                    width : '50%'
                }
            },
            {
                title : 'Create Time',
                key : 'createTime',
                style : {
                    width : '20%'
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
                <RC.TabsSlider bgColor="#f9f9f9" cursorColor="brand1" initialTab={0}>
                    <RC.URL href="/program">Program</RC.URL>
                    <RC.URL href="/program/session">Session</RC.URL>
                </RC.TabsSlider>

                <KUI.Table
                    style={style.table}
                    list={list}
                    title={titleArray}
                    ref="table"></KUI.Table>

                <RC.Div style={style.rd}>
                    <KUI.YesButton onClick={this.showAddBox.bind(this)} label="Add Program"></KUI.YesButton>
                </RC.Div>

                <hr />

                {this.getAddProgram()}
            </RC.Div>
        );

    }

    showAddBox(){
        this.setState({
            showAddBox : true
        });
    }
    resetAddBox(){
        this.refs.pname.getInputDOMNode().value = '';
        this.refs.pdesc.getInputDOMNode().value = '';

        this.setState({
            showAddBox : false
        });
    }

    save(){
        let self = this;

        let name = this.refs.pname.getValue(),
            desc = this.refs.pdesc.getValue();

        let rs = KG.get('EF-Program').insert({
            name : name,
            description : desc
        });

        KG.result.handle(rs, {
            success : function(){
                alert('insert success');
                self.resetAddBox();
            }
        });
    }
};