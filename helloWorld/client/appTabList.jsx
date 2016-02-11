//const StoreListCheckBox = (props) => <input type="checkbox"/>
const StoreListCheckBox = React.createClass({
    render() {
        return (
            <input type="checkbox"/>
        )
    }
})

//const StoreListNameAddress = (props) => <div>{props.rowData.name} <br/> {props.rowData.address}</div>;
const StoreListNameAddress = React.createClass({
    render() {
        return (
            <div>{this.props.rowData.name} <br/> {this.props.rowData.address}</div>
        )
    }
})


//const StoreListEditLink = (props) => <a href={'/store/'+props.rowData._id}>Edit</a>
const StoreListEditLink = React.createClass({
    render() {
        return (
            <a href={'/store/'+this.props.rowData._id}>Edit</a>
        )
    }
})

AppTabList = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        Meteor.subscribe("stores");
        return {
            stores: Stores.find().fetch()
        }
    },

    render() {
        let columnMetaData = [
            {
                columnName: 'checkbox',
                displayName: '',
                customComponent: StoreListCheckBox,
                width: 6
            },
            {
                columnName: 'name',
                displayName: 'Name / Address',
                customComponent: StoreListNameAddress
            },
            {
                columnName: 'city',
                displayName: 'City'
            },
            {
                columnName: 'neighbourhood',
                displayName: 'Neighbourhood'
            },
            {
                columnName: 'edit',
                displayName: '  ',
                customComponent: StoreListEditLink,
                width: 8
            }
        ];

        return (
            <RC.Div>
                <Griddle results={this.data.stores}
                    resultsPerPage={10}
                    enableSort={false}
                    columns={['checkbox', 'name','city', 'neighbourhood', 'edit']}
                    columnMetadata={columnMetaData}
                    useGriddleStyles={true}
                    useFixedLayout={false}
                />
            </RC.Div>
        )
    }
})
