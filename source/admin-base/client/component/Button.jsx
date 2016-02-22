//TODO will change to es6 and extend RC.CSS
KUI.YesButton = KUI.Class.define('ui.YesButton', {

    getInitialState(){
        return {
            loading : false
        };
    },

    initStyle : function(){
        return this.props.style || {};
    },

    click : function(e){
        e.preventDefault();

        if(this.props.href){
            FlowRouter.go(this.props.href);
            return false;
        }

        this.props.onClick.apply(this, arguments);
    },

    getRender : function(style){

        let loading = this.state.loading;

        return (
            <button disabled={loading} onClick={this.click} type="button" style={style} className="btn btn-w-m btn-primary">
                {loading?this.renderLoadingState():null}
                {this.props.label}
            </button>
        );
    },

    loading(f){
        f = f || false;
        this.setState({
            loading : f
        });
    },

    renderLoadingState(){



        let sy = {
            display:'inline-block',
            width : '14px',
            height : '14px',
            position : 'relative',
            //marginRight : '5px',
            top : '2px',
            left : '-8px'
        };
        let sy1 = {
            background : '#eee'
        };
        return (
            <div style={sy} className="sk-spinner sk-spinner-cube-grid">
                {
                    _.map(_.range(9), (i)=>{
                        return <div key={i} style={sy1} className="sk-cube"></div>;
                    })
                }

            </div>
        );
    }

}, 'Base');

KUI.NoButton = KUI.Class.define('ui.NoButton', {


    getRender : function(style){

        return (
            <button onClick={this.click} type="button" style={style} className="btn btn-outline btn-primary">{this.props.label}</button>
        );
    }

}, 'ui.YesButton');