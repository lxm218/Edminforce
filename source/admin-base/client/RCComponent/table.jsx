

KUI.Table = class extends RC.CSS{
    static propTypes : {
        title : React.PropTypes.array,
        list : React.PropTypes.object
    }


    constructor(prop){
        super(prop);


        this.state = {
            list : this.props.list
        };
    }

    componentWillUpdate(np, ns){
        super.componentWillUpdate(np, ns);

        if(np.list){
            this.setState({
                list : np.list
            });
        }
    }



    render(){
        return (
            <RB.Table style={this.props.style} striped bordered condensed hover>
                {this.renderThead()}
                {
                    this.renderTBody()
                }
            </RB.Table>
        );
    }

    renderThead(){

        return (
            <thead><tr>
                {
                    _.map(this.props.title, (item, index)=>{
                        return <th key={index}>{item.title}</th>;
                    })
                }
            </tr></thead>
        );
    }

    renderTBody(){

        let eachTD = (item, index)=>{
            return (
                <tr key={index}>
                    {
                        _.map(this.props.title, (one, i)=>{
                            let key = one.key;
                            return (
                                <td key={i}>{item[key]}</td>
                            );
                        })
                    }
                </tr>
            );


        };

        return (
            <tbody>
            {
                _.map(this.state.list, (item, index)=>{
                    return eachTD(item, index);
                })
            }

            </tbody>
        );
    }
};