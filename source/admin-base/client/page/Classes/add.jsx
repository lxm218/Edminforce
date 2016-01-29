KUI.Class_comp_add = class extends RC.CSS{

    getProgramData(){
        let m = KG.get('EF-Program');
        return m.getDB().find({}, {sort:{
            createTime : -1
        }}).fetch();
    }
    getSessionData(){
        let m = KG.get('EF-Session');
        return m.getDB().find({}, {
            sort : {
                updateTime : -1
            }
        }).fetch();
    }


    render(){

        let p = {
            name : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-9',
                ref : 'name',
                label : 'Class Name'
            },
            program : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-4',
                ref : 'program',
                label : 'Program'
            },
            session : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-4',
                ref : 'session',
                label : 'Session'
            },
            status : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-4',
                ref : 'status',
                label : 'Status'
            }
        };

        let option = {
            program : this.getProgramData(),
            session : this.getSessionData(),
            status : ['a','b']
        };

        return (
            <form className="form-horizontal">

                <RB.Input type="text" {... p.name} />

                <RB.Input type="select" {... p.program}>
                    {
                        _.map(option.program, (item, index)=>{
                            return <option key={index} value={item._id}>{item.name}</option>;
                        })
                    }
                </RB.Input>
                <RB.Input type="select" {... p.session}>
                    {
                        _.map(option.session, (item, index)=>{
                            return <option key={index} value={item._id}>{item.name}</option>;
                        })
                    }
                </RB.Input>
                <RB.Input type="select" {... p.status}>
                    {
                        _.map(option.status, (item, index)=>{
                            return <option key={index} value={item}>{item}</option>;
                        })
                    }
                </RB.Input>

            </form>
        );
    }
};


KUI.Class_add = class extends RC.CSS{



    render(){


        return (
            <RB.Row>
                <RB.Col md={12} mdOffset={0}>
                    <KUI.Class_comp_add></KUI.Class_comp_add>
                </RB.Col>
            </RB.Row>
        );
    }

};