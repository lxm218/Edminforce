Cal.Home = React.createClass({
    render() {

        return <div className="padding">


            <RC.Card key={Math.random()} title="Welcom Our Fremont Facility">

            </RC.Card>

            <RC.List theme="inset">
                <RC.Item theme="body">
                    <p>
                        Register for swim class.
                    </p>
                    <RC.URL href="/classRegister/registraionInfoPage">
                        <RC.Button name="button" theme="full" buttonColor="brand">
                            Register Class
                        </RC.Button>
                    </RC.URL>
                </RC.Item>

            </RC.List>

            <RC.List theme="inset">
                <RC.Item theme="body">
                    <p>
                        Already a member or want to become a member?
                    </p>
                        <RC.Button name="button"
                                   className="button button-dark"
                                   theme="full" buttonColor="dark">
                            Membership
                        </RC.Button>
                </RC.Item>

            </RC.List>


        </div>


        //return <RC.List className="padding">
        //    <RC.Item theme="text-wrap">
        //        <p>Test home page</p>
        //    </RC.Item>
        //    <RC.URL href="/auth">
        //        <RC.Button name="button" theme="full" buttonColor="brand">
        //            Authentication Module
        //        </RC.Button>
        //    </RC.URL>
        //
        //    <RC.Item theme="divider">用户信息编辑模块</RC.Item>
        //
        //    <RC.Item theme="divider">课程编辑模块</RC.Item>
        //
        //
        //    <RC.URL href="/classEdit/swimmerList">
        //        <RC.Button name="button" theme="full" buttonColor="brand">
        //            Your Swimmers
        //        </RC.Button>
        //    </RC.URL>
        //
        //
        //    <RC.Item theme="divider">课程注册模块</RC.Item>
        //    <RC.URL href="/classRegister/registraionInfoPage">
        //        <RC.Button name="button" theme="full" buttonColor="brand">
        //            Register Class
        //        </RC.Button>
        //    </RC.URL>
        //
        //    <RC.URL href="/classRegister/BookTheSameTimePage">
        //        <RC.Button name="button" theme="full" buttonColor="brand">
        //            Book The Same Time
        //        </RC.Button>
        //    </RC.URL>
        //
        //
        //</RC.List>

    }
})
