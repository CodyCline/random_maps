import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Button } from './button';

let container:any = null;
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	// cleanup on exiting
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});


it("renders with or without a name", () => {
	const message = "HELLO"
	act(() => {
		render(<Button></Button>, container);
	});
	expect(container.textContent).toBe("");

	act(() => {
		render(<Button>{message}</Button>, container);
	})
	expect(container.textContent).toBe(message);
});
