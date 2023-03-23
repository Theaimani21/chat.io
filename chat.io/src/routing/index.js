import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import WelcomeView from '../views/WelcomeView';
import DashboardView from '../views/DashboardView';
import App from '../App';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="/" element={<WelcomeView/>} />
            <Route path="/dashboard" element={<DashboardView />} />
		</Route>
	)
);

export default router;
