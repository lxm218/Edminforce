
KUI.LeftNav = KUI.Class.define('ui.LeftNav', {

    initStyle : function(){

        return {
            bg : {
                background : '#2f4050'
            }
        };

    },
    getRender : function(style){
        let list = [
            {
                name : 'Home',
                href : '/home/'
            },
            {
                name : 'Families',
                href : '/family/'
            },
            {
                name : 'Students',
                href : '/student/'
            },
            {
                name : 'Classes',
                href : '/classes/'
            },
            {
                name : 'Registrations',
                href : '/registration/'
            },
            {
                name : 'Email',
                href : '/email/'
            },
            {
                name : 'Reports',
                href : '/report/'
            }
        ];

        let path = FlowRouter.current().path;
        _.each(list, function(item, i){
            var reg = new RegExp('^'+item.href);
            if(reg.test(path)){
                item.active = true;

                return false;
            }
        });

        return (
            <nav className="navbar-default navbar-static-side" role="navigation">
                <div className="sidebar-collapse">
                    <ul className="nav metismenu" id="side-menu" style={style.bg}>

                        {
                            _.map(list, function(item, index){
                                return (
                                    <li key={index} className={item.active?'active':''}>
                                        <a href={item.href}>
                                            <i className="fa fa-th-large"></i>
                                            <span className="nav-label">{item.name}</span>
                                        </a>
                                    </li>
                                );
                            })
                        }

                    </ul>

                </div>
            </nav>

        );


    },



    clickToHref : function(key){

    }

}, 'Base');