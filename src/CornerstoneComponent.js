export class CornerstoneComponent extends EventTarget {
	constructor(container, component, initialProps = {}) {
		super();

		this.container = container;
		this.component = component;
		this.props = initialProps;
	}

	render(props) {
		this.props = props;
		this.dispatchEvent(new Event('render'));
	}
}
