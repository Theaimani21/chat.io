import ChatRoomUser from './ChatRoomUser';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setUser } from '../../slices/chatIoSlice';
import store from '../../store';

describe('ChatRoomUser component tests', () => {
	// Set user state in store to Tester A
	store.dispatch(setUser('Tester A'));

	it('should render with user and correct classes (other user)', () => {
		render(
			<Provider store={store}>
				<ChatRoomUser user={'Tester X'} />
			</Provider>
		);
		const chatRoomUser = screen.getByTestId('chat-room-user-test');

		expect(chatRoomUser).toHaveClass('online-user');
		expect(chatRoomUser).not.toHaveClass('isUser');
		expect(chatRoomUser).toHaveTextContent('Tester X');
	});

	it('should render with user and correct classes (is user)', () => {
		render(
			<Provider store={store}>
				<ChatRoomUser user={'Tester A'} />
			</Provider>
		);
		const chatRoomUser = screen.getByTestId('chat-room-user-test');

		expect(chatRoomUser).toHaveClass('online-user');
		expect(chatRoomUser).toHaveClass('isUser');
		expect(chatRoomUser).toHaveTextContent('Tester A');
	});
});
