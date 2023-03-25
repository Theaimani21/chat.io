import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import WelcomeView from '../views/WelcomeView';
import DashboardView from '../views/DashboardView';
import ChatRoom from '../components/ChatRoom/ChatRoom';
import App from '../App';
import HomeBox from '../components/HomeBox/HomeBox';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="/" element={<WelcomeView />} />
			<Route path="/dashboard" element={<DashboardView />}>
				<Route path="home" element={<HomeBox />} />
				<Route path="chatRoom" element={<ChatRoom />} />
			</Route>
		</Route>
	)
);

export default router;
