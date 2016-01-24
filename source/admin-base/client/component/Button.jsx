
KUI.YesButton = KUI.Class.define('ui.YesButton', {
    initStyle : function(){
        return this.props.style || {};
    },

    click : function(){

        this.props.onClick.apply(this, arguments);
    },

    getRender : function(style){

        return (
            <button onClick={this.click} type="button" style={style.main} className="btn btn-w-m btn-primary">{this.props.label}</button>
        );
    }

}, 'Base');