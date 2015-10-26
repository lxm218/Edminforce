
RC.LeftNav2 = React.createClass({
    getInitialState() {
        return {
            closing: false,
            isOpen: this.props.openOnInit
        }
    },
    open() {
        if (!this.state.closing)
            this.setState({isOpen: true})
    },
    close() {
        let self = this
        this.setState({closing: true})
        Meteor.setTimeout(function(){
            self.setState({isOpen: false, closing: false})
        }, 400)
    },
    //linkClickHandler(e) {
    //    if (e.target.href)
    //        this.close()
    //},

    ///////////////actions//////
    /*
    *!!! Should not change private state directly
    *!!! must according to store.
    * */
    action_close(){
        Dispatcher.dispatch({actionType:'LEFT_NAV_CLOSE'})
    },
    action_linkClickHandler(e) {
        if (e.target.href){
            Dispatcher.dispatch({actionType:'LEFT_NAV_CLOSE'})
        }
    },

    ////////////////////////////////////////
    //@@@ Sync parent props and private state
    // property is the only entry to update the private status
    componentWillReceiveProps(nextProps){

        if(nextProps.openOnInit==false){
            this.close()
        }else if(nextProps.openOnInit==true){
            this.open()
        }
    },

    render() {
        if (!this.state.isOpen) return null

        return <nav className={"transition left-nav fixed-full "+(this.state.closing ? "out" : "in")}>
            <div className="back abs-full" onClick={this.action_close}/>

            <div className="inner bg-white scroll" onClick={this.action_linkClickHandler}>
                <div onClick={this.props.toggleNavFunc}/>
                <RC.NavList list={this.props.navList} showCurrent={false} />
            </div>

        </nav>
    }
})
