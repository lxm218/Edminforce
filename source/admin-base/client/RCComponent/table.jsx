

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
                        return <th key={index} style={item.style}>{item.title}</th>;
                    })
                }
            </tr></thead>
        );
    }

    renderTBody(){
        var self = this;
        let eachTD = (item, index)=>{
            return (
                <tr key={index}>
                    {
                        _.map(this.props.title, (one, i)=>{

                            // if one.reactDom exist
                            if(one.reactDom){
                                if(_.isFunction(one.reactDom)){
                                    return <td key={i}>{one.reactDom(item)}</td>;
                                }
                                else{
                                    return <td key={i}>{one.reactDom}</td>;
                                }
                            }


                            let key = one.key.split('.');
                            let rs = item, n=0;
                            do{
                                rs = rs[key[n]];
                                n++;
                            }while(key[n]);

                            return (
                                <td key={i}>{rs}</td>
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