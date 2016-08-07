/**
 * Created  on 3/19/16.
 */

RC.Portal = React.createClass({
	render: () => null,
	portalElement: null,
	componentDidMount() {
		var p = this.props.portalId && document.getElementById(this.props.portalId);
		if (!p) {
			var p = document.createElement('div');
			p.id = this.props.portalId;
			document.body.appendChild(p);
		}
		this.portalElement = p;
		this.componentDidUpdate();
	},
	componentWillUnmount() {
		document.body.removeChild(this.portalElement);
	},
	componentDidUpdate() {
		React.render(
			<div
				style={{


				}}

				{...this.props}>
				{this.props.children}
			</div>
			, this.portalElement);
	}
});