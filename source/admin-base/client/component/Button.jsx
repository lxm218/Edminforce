//TODO will change to es6 and extend RC.CSS
KUI.YesButton = KUI.Class.define('ui.YesButton', {
    initStyle : function(){
        return this.props.style || {};
    },

    click : function(){

        this.props.onClick.apply(this, arguments);
    },

    getRender : function(style){

        return (
            <button onClick={this.click} type="button" style={style} className="btn btn-w-m btn-primary">{this.props.label}</button>
        );
    }

}, 'Base');

KUI.NoButton = KUI.Class.define('ui.NoButton', {
    initStyle : function(){
        return this.props.style || {};
    },

    click : function(){
        var arg = [].slice.call(arguments);
        if(this.props.param){
            arg = [this.props.param].concat(arg);
        }
        this.props.onClick.apply(this, arg);
    },

    getRender : function(style){

        return (
            <button onClick={this.click} type="button" style={style} className="btn btn-outline btn-primary">{this.props.label}</button>
        );
    }

}, 'Base');