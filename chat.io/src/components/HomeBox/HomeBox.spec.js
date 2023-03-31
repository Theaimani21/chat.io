import HomeBox from './HomeBox';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setUser } from '../../slices/chatIoSlice';
import store from '../../store';

describe('HomeBox component tests', () => {
	// Set the user to Tester A
	store.dispatch(setUser('Tester A'));

	it('should render correctly with user nick', () => {
		render(
			<Provider store={store}>
				<HomeBox />
			</Provider>
		);
		const homeBox = screen.getByTestId('home-box-test');

		expect(homeBox).toHaveTextContent('Welcome Tester A');
		expect(homeBox).toHaveTextContent('You are online!');
		expect(homeBox).toHaveTextContent(
			'Start chatting by selecting an active chat room or an online user from the sidebar.'
		);
	});
});
