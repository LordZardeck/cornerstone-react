import React from 'react';
import * as ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { CornerstoneContext } from './CornerstoneContext';
import { CornerstoneComponent } from './CornerstoneComponent';

class CornerstoneRootComponent {
	constructor() {
		/** @type {CornerstoneComponent[]} */
		this.children = [];
		this.context = {};
		this.reactRoot = null;
	}

	/**
	 * @param {Element} container
	 * @param component
	 * @param {object} initialProps
	 */
	static registerComponent(container, component, initialProps = {}) {
		const cornerstoneComponent = new CornerstoneComponent(container, component, initialProps);

		CornerstoneRootComponent.instance.children.push(cornerstoneComponent);
		CornerstoneRootComponent.instance.render();
		cornerstoneComponent.addEventListener('render', () => CornerstoneRootComponent.instance.onChildRender());

		return cornerstoneComponent;
	}

	static createRoot(container, context) {
		CornerstoneRootComponent.instance.reactRoot = createRoot(container);
		CornerstoneRootComponent.instance.context = context;
		CornerstoneRootComponent.instance.render();
	}

	render() {
		this.reactRoot.render(
			React.createElement(
				CornerstoneContext.Provider,
				{ value: this.context },
				this.children.map((child) =>
					ReactDOM.createPortal(React.createElement(child.component, child.props, null), child.container),
				),
			),
		);
	}

	onChildRender() {
		if (!this.reactRoot) return;

		this.render();
	}
}

CornerstoneRootComponent.instance = new CornerstoneRootComponent();

export default CornerstoneRootComponent;
