import MessageInputBar from './MessageInputBar';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setUser } from '../../slices/chatIoSlice';
import store from '../../store';

describe('MessageInputBar component tests', () => {
	// Set user state in store to Tester A
	store.dispatch(setUser('Tester A'));

	it('should render with empty value and correct classes', () => {
		render(
			<Provider store={store}>
				<MessageInputBar socketAction={'sendmsg'} />
			</Provider>
		);
		const container = screen.getByTestId('msg-bar-container');
		const input = screen.getByTestId('msg-bar-input');

		expect(container).toHaveClass('msg-bar-container');
		expect(input).toHaveClass('chat-input');
		expect(input.value).toBe('');
	});

	it('should render with correct input value', () => {
		render(
			<Provider store={store}>
				<MessageInputBar socketAction={'sendmsg'} />
			</Provider>
		);
		const input = screen.getByTestId('msg-bar-input');

		expect(input).toHaveClass('chat-input');
		expect(input.value).toBe('');

		fireEvent.change(input, { target: { value: 'Hello testing input bar' } });
		expect(input.value).toBe('Hello testing input bar');
	});
});
