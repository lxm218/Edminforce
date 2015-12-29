KUI.Header = KUI.Class.define('ui.Header', {


    getRender : function(){

        return (<RB.Navbar>
            <RB.Navbar.Header>
                <RB.Navbar.Brand>
                    <a href="/">Admin-Base</a>
                </RB.Navbar.Brand>
                <RB.Navbar.Toggle />

            </RB.Navbar.Header>
            <RB.Navbar.Collapse>
                <RB.Nav pullRight>
                    <RB.NavItem eventKey={1} href="#">Link Right</RB.NavItem>
                    <RB.NavItem eventKey={2} href="#">Link Right</RB.NavItem>
                </RB.Nav>
            </RB.Navbar.Collapse>
        </RB.Navbar>);
    }
}, 'Base');