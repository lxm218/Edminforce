

KUI.ProgramTopTab = class extends RC.CSS{

    render(){

        let sy={
            marginBottom : '20px'
        }
        let initTab = this.props.select;

        return <RC.TabsSlider style={sy} bgColor="#f9f9f9" cursorColor="brand1" initialTab={initTab}>
            <RC.URL href="/program">Program</RC.URL>
            <RC.URL href="/program/session">Session</RC.URL>
            <RC.URL href="/program/class">Class</RC.URL>
            <RC.URL href="/program/coupon">Coupon</RC.URL>
        </RC.TabsSlider>
    }
};