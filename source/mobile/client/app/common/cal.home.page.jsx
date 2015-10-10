Cal.Home = React.createClass({
    render() {

        return <div className="padding">


            <RC.Card key={Math.random()} title="Welcome To Our Fremont Facility">

            </RC.Card>

            <RC.List theme="inset">
                <RC.Item theme="body">

                    <RC.URL href="/classRegister/registraionInfoPage">
                        <RC.Button name="button" theme="full" buttonColor="brand">
                            Register Class
                        </RC.Button>
                    </RC.URL>
                </RC.Item>

            </RC.List>

        </div>

    }
})
