
KUI.LeftNav = KUI.Class.define('ui.LeftNav', {

    initStyle : function(){

        return {

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
                href : '/class/'
            },
            {
                name : 'Registrations',
                href : 'registration/'
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



        return (
            <RB.Nav bsStyle="pills" stacked activeKey={0}>
                {
                    _.map(list, (item, index)=>{
                        return <RB.NavItem eventKey={index} key={index} href={item.href}>{item.name}</RB.NavItem>;
                    })
                }
            </RB.Nav>
        );
    }

}, 'Base');