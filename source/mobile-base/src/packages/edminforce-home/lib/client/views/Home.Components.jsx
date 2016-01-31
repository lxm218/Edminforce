{

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.Home = class extends RC.CSS{

        goToPrograms(){
            FlowRouter.go('/programs');
        }

        //
        getTemplate(){
            return <RC.List>
                <RC.Item>
                    <RC.Button bgColor="brand2" bgColorHover="dark" onClick={this.goToPrograms}><$translate label="programs"/></RC.Button>
                </RC.Item>
                <RC.Item>
                    <RC.Button bgColor="brand2" bgColorHover="dark"><$translate label="customer_portal"/></RC.Button>
                </RC.Item>
                <RC.Item>
                    <RC.Button bgColor="brand2" bgColorHover="dark"><$translate label="contact_us"/></RC.Button>
                </RC.Item>
            </RC.List>
        }

        render () {

            // Fill with your UI
            return (
                <div>
                {this.getTemplate()}
                </div>
            );
        }
    };

}