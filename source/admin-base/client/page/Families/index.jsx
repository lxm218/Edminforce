

KUI.Family_index = class extends KUI.Page{

    constructor(p){
        super(p);

        this.state = {
            query : {}
        };
    }

    getMeteorData(){
        let x = Meteor.subscribe('EF-Customer');

        let query = {};

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
            }
            //{
            //    title : 'Action',
            //
            //}

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