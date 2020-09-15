import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Marker } from './marker';

let container: any = <div/>;
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	// cleanup on exiting
	unmountComponentAtNode(container);
	container.remove();
});


it("renders a marker with title, coordinates", () => {
	const testText = "Random Location"
	act(() => {
		render(<Marker text={testText} lat={39.8131} lng={39.1132} />, container);
	});
    expect(container.textContent).toBe(testText);
});
