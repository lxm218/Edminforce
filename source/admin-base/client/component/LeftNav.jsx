let LIST = {
    'Home' : '/home',
    'Families' : '/family',
    'Students' : '/student',
    'Programs' : '/program',
    'Registrations' : '/registration/register',
    'Teachers' : '/teachers',
    'Emails' : '/email',
    'Reports' : '/report',
    'Calendar' : '/classCalendar',
    'Daily Roser' : '/dailyroser',
    'Log' : '/requestlog'
};

KUI.LeftNav = KUI.Class.define('ui.LeftNav', {

    initStyle : function(){

        return {
            bg : {
                background : '#2f4050'
            }
        };

    },
    getRender : function(style){


        let config = Meteor.settings.public.LeftNav || [
                'Home', 'Families', 'Students', 'Programs', 'Registrations',
                'Teachers', 'Emails', 'Reports', 'Calendar', 'Log'
            ];
        let list = [],
            hh = {};
        _.each(config, (key)=>{
            list.push({
                name : key,
                href : LIST[key]
            });
            hh[key] = true;
        });

        let tmp = [];
        _.each(LIST, (href, key)=>{
            if(!hh[key]){
                tmp.push({
                    name : key,
                    href : href
                });
            }
        });
        Session.set('OtherLeftNav', tmp);

        let path = FlowRouter.current().path;
        _.each(list, function(item, i){
            var reg = new RegExp('^'+item.href);
            if(reg.test(path)){
                item.active = true;

                return false;
            }
        });

        let navStyle={
            display:this.props.showLeftNav?'block':'none'
        };

        return (
            <nav className="navbar-default navbar-static-side" role="navigation" style={navStyle}>
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