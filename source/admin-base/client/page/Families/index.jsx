

KUI.Family_index = class extends KUI.Page{

    constructor(p){
        super(p);

        this.state = {
            query : {}
        };
    }

    getMeteorData(){
        let x = Meteor.subscribe('EF-Customer');

        let query = this.state.query;

        let list = KG.get('EF-Customer').getAll(query, {
            sort : {
                createTime : -1
            }
        });

        return {
            ready : x.ready(),
            list : list
        };
    }

    getSearchBox(){

        let p = {
            sname : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-9',
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

        return (
            <RC.Div>

            </RC.Div>
        );
    }

    renderListTable(style){

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
                        //marginLeft : '10px',
                        cursor : 'pointer'
                    };

                    var del = function(){

                    };

                    return (
                        <RC.Div style={{textAlign:'center'}}>
                            <RC.URL href={`/family/profile/${item._id}`}><KUI.Icon icon="edit" font="18px" color="#1ab394" style={sy}></KUI.Icon></RC.URL>
                            {/*<KUI.Icon onClick={del} icon="trash-o" font="18px" color="#cdcdcd" style={ml}></KUI.Icon>*/}
                        </RC.Div>

                    );
                }
            }

        ];

        let list = this.data.list;

        return <KUI.Table
            style={style.table}
            list={list}
            title={titleArray}
            ref="table"></KUI.Table>;
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
                <p>Search Result</p>
                {this.renderListTable(style)}
            </RC.Div>
        );
    }


}