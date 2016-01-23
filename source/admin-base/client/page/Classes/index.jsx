

KUI.Classes_index = KUI.Class.define('ui.Classes_index', {

    getMeteorData : function(){
        var cls = KG.get('EF-Class').getDB();

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
                        {item.teacher}
                    </td>
                    <td>
                        {item.schedule}
                    </td>
                    <td>
                        {item.length}
                    </td>
                </tr>;
            })
        }
        </tbody>;

    },

    getRender : function(style){
        console.log(KG.user.current);

        return (
            <RB.Table striped bordered condensed hover>
                <thead>


                </thead>
                {
                    this.getEachTr()
                }
            </RB.Table>

        );

    }

}, 'Base');