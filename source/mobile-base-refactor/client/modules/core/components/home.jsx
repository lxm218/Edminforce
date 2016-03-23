EdminForce.Components.Home = ({actions}) => (
    <RC.List style={{padding: "30px"}}>
        <RC.Item style={{border: "none", padding: 0}}>
            <RC.Button bgColor="brand2" bgColorHover="dark" onClick={actions.goToPrograms}>Programs</RC.Button>
        </RC.Item>
        <RC.Item style={{border: "none", padding: 0}}>
            <RC.Button bgColor="brand2" bgColorHover="dark" onClick={actions.goToAccount}>Customer Portal</RC.Button>
        </RC.Item>
        <RC.Item style={{border: "none", padding: 0}}>
            <RC.Button bgColor="brand2" bgColorHover="dark" onClick={actions.goToContact}>Contact Us</RC.Button>
        </RC.Item>
    </RC.List>
)