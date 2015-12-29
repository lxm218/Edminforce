
KUI.Body = KUI.Class.define('ui.Body', {

    getRender : function(){
        return <div className="transition" id="app-body">
            <div className="wrapper-wide">
                {h.returnComponent(this.props.tmpl)}
            </div>
        </div>
    }
}, 'Base');