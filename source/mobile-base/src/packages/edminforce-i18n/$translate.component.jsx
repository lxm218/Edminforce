/**
 * Add a React component to do i18n
 */
$translate = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            text: TAPi18n.__(this.props.label, this.props.options || {})
        };
    },
    render() {
        return this.data.text;
    }
});