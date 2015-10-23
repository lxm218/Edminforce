Cal.Header = React.createClass({
    render() {
        return <nav className="nav-height transition" id="app-header">

            <div className="transition" id="app-header-outer">

                {
                    /*

                     <div className="transition" className="app-header-nav-wrap">

                     <a href="#" className="nav-height-button float-r transition">
                     Report
                     </a>
                     <a href="#" className="nav-height-button float-r transition">
                     Coach
                     </a>
                     <a href="#" className="nav-height-button float-r transition">
                     Programs
                     </a>

                     <a href="/admin/CustomerPage" className="nav-height-button float-r transition">
                     Customers
                     </a>
                     <a href="#" className="nav-height-button float-r transition">
                     Home
                     </a>
                     </div >

                    * */

                }



            </div>

            <div className="boxed nav-height transition" id="app-header-inner">
                <figure className="menu transition" onClick={this.props.toggleNavFunc}>
                    <span className="hamburger"/>
                </figure>


            </div>
        </nav>
    }
})
