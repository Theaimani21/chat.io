import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './styles.scss';
import socket from '../../services/socketService';
// import Rooms from '../../components/Rooms/Rooms';
import DashSidebar from '../../components/DashSidebar/DashSidebar';
import { useNavigate } from 'react-router-dom';
import { setOnlineUsers } from '../../slices/userSlice';
import ChatBox from '../../components/ChatBox/ChatBox';


const DashboardView = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// Get current user from store
	const currentUser = useSelector((state) => state.user.nickname);
	// Get online users from store
	const onlineUsers = useSelector ((state) => state.user.onlineUsers);
	
	useEffect(() => {
		// check if user is online on server, if not the navigate back to welcome page
		if (currentUser.length < 1 ) {
			console.log('no current user');
			navigate('/');
		}
		else if (onlineUsers.includes(currentUser) === false) {
		console.log('not in sever users');
		navigate('/');
	}
	}, [currentUser, onlineUsers])
	

	useEffect(() => {
		// Interval that updates users every 5 seconds
		const interval = setInterval(() => {
			// Get the initial users list
			socket.emit('users');
			// Get the list of online users
			socket.on('userlist', (users) => {
				dispatch(setOnlineUsers(users));
			});
		}, 2000);

		return () => {
			clearInterval(interval);
			socket.off('userlist');
		};
	}, []);

	

	return (
		<div className="dashboard">
			<DashSidebar />
			<ChatBox />
		</div>
	);
};

export default DashboardView;
