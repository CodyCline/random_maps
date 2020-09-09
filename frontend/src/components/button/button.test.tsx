import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Button } from './button';

test("renders props, fires events", () => {
	const buttonText = "Hello"
	render(<Button>{buttonText}</Button>);
	fireEvent.click(screen.getByText(buttonText));
	expect(screen.getByText(buttonText)).toBeInTheDocument();
});

