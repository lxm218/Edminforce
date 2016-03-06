/**
 * Created on 10/13/15.
 */

Cal.SelectedClassInfoCard = class extends RC.CSS{
    constructor(props) {
        super(props)

    }
    baseStyles(np,ns) {

        return{

        }
    }
    render () {

        let title = this.props.title || 'Register for '+ new Date().getFullYear()
        let swimmer = this.props.swimmer;

        let selectedClasses = this.props.selectedClasses
        let class1 = selectedClasses['class1']
        let class2 = selectedClasses['class2']
        let class3 = selectedClasses['class3']

        let showSwimmer = this.props.showSwimmer

        return <RC.Card  className="padding">
            <h4 className="brand">{title}</h4>

            {
                showSwimmer && swimmer ?

                <Cal.Grid justifyContent="space-between">
                    <Cal.GridItem>
                        Swimmer:
                    </Cal.GridItem>
                    <Cal.GridItem>
                        {swimmer.name}
                    </Cal.GridItem>

                </Cal.Grid> : ''

            }


            {
                class1?<Cal.Grid justifyContent="space-between">
                    <Cal.GridItem >
                        Preference 1
                    </Cal.GridItem>
                    <Cal.GridItem >
                        {class1.name}
                    </Cal.GridItem>

                </Cal.Grid>:''

            }

            {
                class2?<Cal.Grid justifyContent="space-between">
                    <Cal.GridItem >
                        Preference 2
                    </Cal.GridItem>
                    <Cal.GridItem >
                        {class2 && class2.name}
                    </Cal.GridItem>

                </Cal.Grid>:''
            }
            {
                class3?<Cal.Grid justifyContent="space-between">
                    <Cal.GridItem >
                        Preference 3
                    </Cal.GridItem>
                    <Cal.GridItem >
                        {class3 && class3.name}
                    </Cal.GridItem>

                </Cal.Grid>:''
            }

        </RC.Card>
    }

}

Cal.SelectedClassInfoCard.propTypes = {
    title:React.PropTypes.string,
    swimmer:React.PropTypes.object,
    selectedClasses:React.PropTypes.object,
    showSwimmer:React.PropTypes.bool
}