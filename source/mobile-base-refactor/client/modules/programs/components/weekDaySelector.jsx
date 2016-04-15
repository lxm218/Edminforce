
EdminForce.Components.WeekDaySelector = (props) => (
    <RC.Div>
        <div style={{textAlign:"center"}}>
            <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                       onClick={props.onSelectDay.bind(null, "Mon")}>Mon</RC.Button>
            <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                       onClick={props.onSelectDay.bind(null, "Tue")}>Tue</RC.Button>
            <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                       onClick={props.onSelectDay.bind(null, "Wed")}>Wed</RC.Button>
            <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                       onClick={props.onSelectDay.bind(null, "Thu")}>Thu</RC.Button>
            <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                       onClick={props.onSelectDay.bind(null, "Fri")}>Fri</RC.Button>
            <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                       onClick={props.onSelectDay.bind(null, "Sat")}>Sat</RC.Button>
            <RC.Button theme="inline" bgColor="brand2" bgColorHover="dark"
                       onClick={props.onSelectDay.bind(null, "Sun")}>Sun</RC.Button>
        </div>
    </RC.Div>
);

