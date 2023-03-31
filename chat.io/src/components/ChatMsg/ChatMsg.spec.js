import ChatMsg from './ChatMsg';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setUser } from '../../slices/chatIoSlice';
import store from '../../store';

describe('ChatMsg component tests', () => {
	// Set the user to Tester A
	store.dispatch(setUser('Tester A'));

	it('should render correctly with sender, timestamp and message', () => {
		const testTimestamp = new Date().toLocaleString();

		const dateOpt = {
			weekday: 'long',
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		};

		const formattedDate = new Date(testTimestamp).toLocaleDateString('is-IS', dateOpt);

		render(
			<Provider store={store}>
				<ChatMsg nick={'Tester X'} timestamp={testTimestamp} msg={'Hello this is a test.'} />
			</Provider>
		);
		const chatMsg = screen.getByTestId('chat-msg-test');

		expect(chatMsg).toHaveTextContent('Tester X');
		expect(chatMsg).toHaveTextContent('Hello this is a test.');
		expect(chatMsg).toHaveTextContent(formattedDate);
		expect(chatMsg).toHaveClass('msg-container');
	});

	it('should render with correct classes (from other user)', () => {
		const testTimestamp = new Date().toLocaleString();

		render(
			<Provider store={store}>
				<ChatMsg nick={'Tester B'} timestamp={testTimestamp} msg={'Hello this is a test.'} />
			</Provider>
		);
		const chatMsg = screen.getByTestId('chat-msg-test');

		expect(chatMsg).toHaveClass('msg-container');
		expect(chatMsg).toHaveClass('msg-from-other');
	});

	it('should render with correct classes (from user)', () => {
		const testTimestamp = new Date().toLocaleString();

		render(
			<Provider store={store}>
				<ChatMsg nick={'Tester A'} timestamp={testTimestamp} msg={'Hello this is a test.'} />
			</Provider>
		);
		const chatMsg = screen.getByTestId('chat-msg-test');

		expect(chatMsg).toHaveClass('msg-container');
		expect(chatMsg).toHaveClass('msg-from-user');
	});
});
