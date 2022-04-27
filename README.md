# Cornerstone React

This utility allows you to easily add as many "mini"-react apps to a cornerstone theme. All react apps are contained
within a single app, and are added throughout the page using React Portals. You can easily update a component with new
props if needed. In addition, all components automatically receive the page's `context`.

## Usage

There are 2 requirements to get started:

1. In your `templates/layouts/base.html` file, add an element to the bottom of the page, right above the closing body
   tag.
   This can be anything, but it must have a unique id. Something like this would
   work: `<div id="cornerstone-react-root"></div>`
2. In your `assets/js/theme/global.js` file, import `createRoot` from the `cornerstone-react` package. At the top of
   the `onReady` method, add the
   following: `createRoot(document.getElementById('cornerstone-react-root'), this.context);`

Now you can start creating react components and add them to any page. For example:

```jsx
// assets/js/components/MyComponent.js
import { useCornerstoneContext } from './CornerstoneContext';

export function ProductName(props) {
	const cornerstoneContext = useCornerstoneContext();

	return <div>{props.label}: {cornerstoneContext.product.name}</div>;
}

// assets/js/theme/common/product-detail.js
import { ProductName } from '../../components/MyComponent.js';

export default class ProductDetails extends ProductDetailsBase {
	constructor($scope, context, productAttributesData = {}) {
		super($scope, context);

		registerComponent(ProductName, { label: 'Product Name' });
	}
}
```

If you need to later update the component, you can do so by calling `render` on the returned `ConerstoneComponent`
instance

```jsx
export default class ProductDetails extends ProductDetailsBase {
	constructor($scope, context, productAttributesData = {}) {
		super($scope, context);

		this.productNameComponent = registerComponent(ProductName, { label: 'Product Name' });
	}

	changeProductNameLabel(newLabel) {
		this.productNameComponent.render({ label: newLabel });
	}
}
```
