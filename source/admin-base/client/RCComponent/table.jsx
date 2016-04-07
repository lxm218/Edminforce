
KUI.Pagination = class extends RC.CSS{

    constructor(p){
        super(p);

        let self = this;
        this.state = {
            total : p.total,
            activePage : p.page,
            onSelect : function(e, se){
                self.setState({
                    activePage : se.eventKey
                });
                self.props.onSelectPage(se.eventKey);
            }
        };


    }

    componentWillUpdate(np, ns){
        super.componentWillUpdate(np, ns);

        if(np.page && np.total){
            this.setState({
                total : np.total,
                activePage : np.page
            });
        }
    }


    render(){

        let s = this.state;

        let p = {
            prev : true,
            next : true,
            first : false,
            last : false,
            boundaryLinks : true,
            items : s.total,
            activePage : s.activePage,
            onSelect : s.onSelect,

            style : {
                margin:0
            }
        };

        p.maxButtons = s.total > 4 ? 4 : s.total;
        if(s.total > 4){
            p.ellipsis = true;
            p.first = true;
            p.last = true;
        }



        return (
            <RB.Pagination {... p} />
        );
    }

};


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

        let sy = _.extend({
            marginBottom:'15px'
        }, this.props.style||{});


        return (
            <RB.Table style={sy} striped bordered condensed hover>
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
                                    return <td key={i}>{one.reactDom(item, index)}</td>;
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