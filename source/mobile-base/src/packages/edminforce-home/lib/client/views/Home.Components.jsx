{

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.Home = class extends RC.CSS{

        goToPrograms(){
            FlowRouter.go('/programs');
        }

        goToAccount(){
            if(!Meteor.user()){
                FlowRouter.go('/login');
            }else{
                FlowRouter.go('/account');
            }
        }

        goToContact(){
            FlowRouter.go('/contact');
        }

        //
        getTemplate(){
            return(
            <RC.List style={{padding: "30px"}}>
                <RC.Item style={{border: "none", padding: 0}}>
                    <RC.Button bgColor="brand2" bgColorHover="dark" onClick={this.goToPrograms}><$translate label="programs"/></RC.Button>
                </RC.Item>
                <RC.Item style={{border: "none", padding: 0}}>
                    <RC.Button bgColor="brand2" bgColorHover="dark" onClick={this.goToAccount}><$translate label="customer_portal"/></RC.Button>
                </RC.Item>
                <RC.Item style={{border: "none", padding: 0}}>
                    <RC.Button bgColor="brand2" bgColorHover="dark" onClick={this.goToContact}><$translate label="contact_us"/></RC.Button>
                </RC.Item>
            </RC.List>
            )
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