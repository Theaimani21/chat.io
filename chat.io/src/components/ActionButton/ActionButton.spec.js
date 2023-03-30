import ActionButton from './ActionButton';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock the socket.io-client library, because we don't really want to communicate with the server
var mockEmit;
jest.mock('socket.io-client', () => {
	mockEmit = jest.fn();
	return jest.fn(() => ({
		emit: mockEmit,
		on: jest.fn(),
		off: jest.fn(),
	}));
});

describe('ActionButton', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should have a right value', () => {
		render(<ActionButton />);
		// const inputElement = screen.getByPlaceholderText('Enter your message..');
		// const button = screen.getByRole('button');

		// fireEvent.change(inputElement, { target: { value: 'A new message' } });
		// fireEvent.click(button);

		// expect(mockEmit).toHaveBeenCalledWith('message', 'A new message');
	});
});
