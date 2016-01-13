

KUI.Student_index = KUI.Class.define('ui.Student-index', {

    getMeteorData : function(){
        var cls = KG.get('EF-Student').getDB();

        return cls.find({}).fetch();
    },

    initStyle : function(){


        return {
            h3 : {
                position : 'relative',
                top : '-10px',
                textAlign : 'center',
                marginBottom : '50px'
            },
            a : {
                marginTop : '50px'
            }
        };
    },

    getEachTr : function(){
        return <tbody>
        {
            _.map(this.data, (item, index)=>{
                return <tr key={index}>
                    <td>
                        {item._id}
                    </td>
                    <td>
                        {item.name}
                    </td>
                    <td>
                        {item.accountID}
                    </td>

                </tr>;
            })
        }
        </tbody>;

    },

    getRender : function(style){

        return (
            <RB.Table striped bordered condensed hover>
                <thead><tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>AccountID</th>
                </tr></thead>
                {
                    this.getEachTr()
                }
            </RB.Table>

        );

    }

}, 'Base');