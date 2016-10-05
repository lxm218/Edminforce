

KUI.Family_index = class extends KUI.Page{

    constructor(p){
        super(p);

        this.state = {
            query : {
                status : 'Active'
            },
            page : 1,

            refresh : true
        };

        this.m = KG.DataHelper.getDepModule();
    }

    getMeteorData(){
        let query = this.state.query;

        let x = util.data.subscribe(this.m.Customer, {
            query : query,
            pageSize : 10,
            pageNum : this.state.page,
            sort : {
                createTime : -1
            }
        });



        let list = this.m.Customer.getAll({});

        return{
            ready : x.ready(),
            max : util.data.getMaxCount(x),
            list : list
        };
    }

    getSearchBox(){

        let p = {
            sname : {
                labelClassName : 'col-xs-5',
                wrapperClassName : 'col-xs-7',
                ref : 'sname',
                label : 'Search Families'
            },
            status : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-9',
                ref : 'status',
                label : 'Status'
            }
        };

        const sy = {
            td : {
                textAlign : 'left'
            },
            ml : {
                marginLeft : '20px'
            },
            rd : {
                textAlign : 'right'
            }
        };

        let op1 = ['Active', 'Inactive'];

        return (
            <form className="form-horizontal">
                <RB.Row>
                    <RB.Col md={6} mdOffset={0}>
                        <RB.Input type="text" {... p.sname} />

                    </RB.Col>
                    <RB.Col md={6} mdOffset={0}>
                        <RB.Input type="select" {... p.status}>
                            {
                                _.map(op1, (item, index)=>{
                                    return <option key={index} value={item}>{item}</option>;
                                })
                            }
                        </RB.Input>
                    </RB.Col>
                </RB.Row>
                <RC.Div style={sy.rd}>
                    <KUI.YesButton style={sy.ml} onClick={this.search.bind(this)} label="Search"></KUI.YesButton>
                </RC.Div>
            </form>
        );
    }

    search(){
        let name = this.refs.sname.getValue(),
            status = this.refs.status.getValue();

        let query = {};
        if(name){
            query.name = {
                value : name,
                type : 'RegExp'
            };
        }
        if(status){
            query.status = status;
        }

        console.log(query);
        this.setState({
            query : query,
            page : 1
        });
    }

    renderListTable(style){
        let self = this;
        if(!this.data.ready){
            return util.renderLoading();
        }

        const titleArray = [
            {
                title : 'Customer Name',
                key : 'name'
            },
            {
                title : 'Email',
                key : 'email'
            },
            {
                title : 'Phone',
                key : 'phone'
            },
            {
                title : 'Status',
                key : 'status'
            },
            {
                title : 'Action',
                style : {
                    textAlign : 'center'
                },
                reactDom : function(item){
                    const sy = {
                        cursor : 'pointer',
                        position : 'relative',
                        top : '2px'
                    };
                    const ml = {
                        marginLeft : '10px',
                        cursor : 'pointer'
                    };

                    var del = function(){
                        self.deleteById(item._id)
                    };

                    return (
                        <RC.Div style={{textAlign:'center'}}>
                            <RC.URL href={`/family/profile/${item._id}`}><KUI.Icon icon="edit" font="18px" color="#1ab394" style={sy}></KUI.Icon></RC.URL>
                            {<KUI.Icon onClick={del} icon="trash-o" font="18px" color="#cdcdcd" style={ml}></KUI.Icon>}
                        </RC.Div>

                    );
                }
            }

        ];

        let list = this.data.list,
            total = Math.ceil(this.data.max/util.const.PageSize);

        return <KUI.PageTable
            style={style.table}
            list={list}
            total={total}
            onSelectPage={this.selectPage.bind(this)}
            page={this.state.page}
            title={titleArray}
            ref="table"></KUI.PageTable>;
    }

    selectPage(page){

        this.setState({
            page : page
        });
    }

    baseStyles(){

        return {
            table : {

            }
        };
    }


    render(){

        let style = this.css.get('styles');

        return (
            <RC.Div>
                {this.getSearchBox()}
                <hr/>
                <p>Search Result: {this.data.max} matches</p>
                {this.renderListTable(style)}
                <RC.Div style={{textAlign:'right'}}>
                    <KUI.YesButton href="/family/add" label="Add Family"></KUI.YesButton>
                </RC.Div>
            </RC.Div>
        );
    }

    deleteById(id){
        let self = this;
        this.m.Customer.callMeteorMethod('checkCanBeDelete', [id], {
            success : function(flag){
                if(!flag){
                    swal('This customer can\'t be deleted ', '', 'error');
                }
                else{
                    swal({
                        title : 'Delete this customer?',
                        text : '',
                        type : 'warning',
                        showCancelButton : true,
                        closeOnCancel : true,
                        closeOnConfirm : false,
                        confirmButtonText : 'Confirm',
                        confirmButtonColor : '#1ab394'
                    }, function(f){
                        if(!f) return false;
                        self.m.Customer.getDB().update({_id : id}, {
                            $set : {
                                status : 'Inactive'
                            }
                        })
                        self.setState({
                            refresh : !self.state.refresh
                        })
                        //self.m.Customer.getDB().remove({_id : id})
                        swal.close();
                    });
                }
            }

        })
    }


}
