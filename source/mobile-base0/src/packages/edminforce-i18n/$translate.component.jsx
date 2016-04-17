/**
 * Add a React component to do i18n
 *

 **How it works**

 Drop the <$translate /> component with a label (+ optionally options) parameter.

 JSX:

 ```
 Meteor.startup(function() {
   React.render(<$translate label="messages.welcome" options={{ liked: 'React' }}/>, document.body);
 });
 ```

 en.i18n.json:

 ```
 {
   "messages": {
     "welcome": "I like __liked__ !"
   }
 }
 ```

 fr.i18n.json:

 ```
 {
   "messages": {
     "welcome": "J'aime __liked__ !"
   }
 }
 ```
 */
$translate = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            text: TAPi18n.__(this.props.label, this.props.options || {})
        };
    },
    render() {
        return <span>{this.data.text}</span>
    }
});