import ActionButton from './ActionButton';
import { render, screen, fireEvent } from '@testing-library/react';

describe('ActionButton component tests', () => {
	it('should have a right lable', () => {
		render(<ActionButton onClick={() => {}}>Click Me</ActionButton>);

		const button = screen.getByRole('button');

		expect(button.textContent).toBe('Click Me');
	});

	it('should have a right classes', () => {
		render(
			<ActionButton onClick={() => {}} classes="create-room">
				Click Me
			</ActionButton>
		);

		const button = screen.getByRole('button');

		expect(button).toHaveClass('chat-btn create-room');
	});

	it('should have be disabled', () => {
		render(
			<ActionButton onClick={() => {}} disabled={true}>
				Click Me
			</ActionButton>
		);

		const button = screen.getByRole('button');

		expect(button).toBeDisabled();
	});

	it('should call given function', () => {
		const mockCallBack = jest.fn();

		render(<ActionButton onClick={mockCallBack}>Click Me</ActionButton>);

		const button = screen.getByRole('button');

		fireEvent.click(button);

		expect(mockCallBack.mock.calls.length).toEqual(1);
	});

	it('should not call given function', () => {
		const mockCallBack = jest.fn();

		render(
			<ActionButton onClick={mockCallBack} disabled={true}>
				Click Me
			</ActionButton>
		);

		const button = screen.getByRole('button');

		fireEvent.click(button);

		expect(mockCallBack.mock.calls.length).toEqual(0);
	});
});
