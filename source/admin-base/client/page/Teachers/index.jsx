KUI.Teachers_index = class extends KUI.Page {

    constructor(p) {
        super(p);
        this.state = {};
    }

    getMeteorData(){
        return{
        };
    }

    componentDidMount() {
        super.componentDidMount();
        $(this.refs.classDate.getInputDOMNode()).datepicker({});
    }

    // getMeteorData(){
    //     let query = this.state.query;
    //     let x = util.data.subscribe(this.m.Customer, {
    //         query : query,
    //         pageSize : 10,
    //         pageNum : this.state.page,
    //         sort : {
    //             createTime : -1
    //         }
    //     });
    //
    //
    //
    //     let list = this.m.Customer.getAll({});
    //
    //     return{
    //         ready : x.ready(),
    //         max : util.data.getMaxCount(x),
    //         list : list
    //     };
    // }

    // renderListTable(style) {
    //     if (!this.data.ready) {
    //         return util.renderLoading();
    //     }
    //
    //     const titleArray = [
    //         {
    //             title: 'Customer Name',
    //             key: 'name'
    //         },
    //         {
    //             title: 'Email',
    //             key: 'email'
    //         },
    //         {
    //             title: 'Phone',
    //             key: 'phone'
    //         },
    //         {
    //             title: 'Status',
    //             key: 'status'
    //         },
    //         {
    //             title: 'Action',
    //             style: {
    //                 textAlign: 'center'
    //             },
    //             reactDom: function (item) {
    //                 const sy = {
    //                     cursor: 'pointer',
    //                     position: 'relative',
    //                     top: '2px'
    //                 };
    //                 const ml = {
    //                     //marginLeft : '10px',
    //                     cursor: 'pointer'
    //                 };
    //
    //                 var del = function () {
    //
    //                 };
    //
    //                 return (
    //                     <RC.Div style={{textAlign:'center'}}>
    //                         <RC.URL href={`/family/profile/${item._id}`}><KUI.Icon icon="edit" font="18px"
    //                                                                                color="#1ab394"
    //                                                                                style={sy}></KUI.Icon></RC.URL>
    //                         {/*<KUI.Icon onClick={del} icon="trash-o" font="18px" color="#cdcdcd" style={ml}></KUI.Icon>*/}
    //                     </RC.Div>
    //
    //                 );
    //             }
    //         }
    //
    //     ];
    //
    //     let list = this.data.list,
    //         total = Math.ceil(this.data.max / util.const.PageSize);
    //
    //     return <KUI.PageTable
    //         style={style.table}
    //         list={list}
    //         total={total}
    //         onSelectPage={this.selectPage.bind(this)}
    //         page={this.state.page}
    //         title={titleArray}
    //         ref="table"></KUI.PageTable>;
    // }
    //
    // selectPage(page) {
    //
    //     this.setState({
    //         page: page
    //     });
    // }
    //
    // baseStyles() {
    //
    //     return {
    //         table: {}
    //     };
    // }

    save() {

    }
    cancel() {

    }

    render() {
        let style = this.css.get('styles');

        let p = {
            teacher : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'teacher',
                label : 'Teacher'
            },

            classDate: {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'classDate',
                label : 'Date'
            },

            class : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'class',
                label : 'Class'
            }
        };


        return (
            <RC.Div>
                <h3 style={{"textAlign": "left"}}>Class Attendance</h3>
                <RB.Row >
                    <div className="form-horizontal">
                        <RB.Col md={6} mdOffset={0}>
                            <RB.Input type="select" {... p.teacher}>
                            </RB.Input>
                            <RB.Input type="text" {... p.classDate}>
                            </RB.Input>
                        </RB.Col>
                        <RB.Col md={6} mdOffset={0}>
                            <RB.Input type="select" {... p.class}>
                            </RB.Input>
                        </RB.Col>
                    </div>
                </RB.Row>

                <RC.Div style={{textAlign:'right'}}>
                    <KUI.YesButton style={{marginRight: 20}} onClick={this.save.bind(this)} label="Save"></KUI.YesButton>
                    <KUI.NoButton onClick={this.cancel.bind(this)} label="Cancel"></KUI.NoButton>
                </RC.Div>
            </RC.Div>
        );
    }
}