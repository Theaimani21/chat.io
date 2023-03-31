import React from 'react';
import { Outlet } from 'react-router-dom';
import './styles/index.scss';

function App() {
	return (
		<div className="page">
			<Outlet />
		</div>
	);
}

export default App;
