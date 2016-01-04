
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

        var path = FlowRouter.current().path,
            index = 0;
        _.each(list, function(item, i){
            var reg = new RegExp('^'+item.href);
            if(reg.test(path)){
                index = i;

                return false;
            }
        });



        return (
            <RB.Nav bsStyle="pills" stacked activeKey={index} onSelect={this.clickToHref}>
                {
                    _.map(list, (item, index)=>{
                        return <RB.NavItem href={item.href} eventKey={index} key={index}>{item.name}</RB.NavItem>;
                    })
                }
            </RB.Nav>
        );
    },

    clickToHref : function(key){

    }

}, 'Base');