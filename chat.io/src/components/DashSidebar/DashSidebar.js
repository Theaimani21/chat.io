import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../services/socketService';
import { addPrivateMessage } from '../../slices/chatIoSlice';
import OnlineUsers from '../OnlineUsers/OnlineUsers';
import Rooms from '../Rooms/Rooms';
import './styles.scss';

const DashSidebar = () => {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.chatIo.user);

	// Update private message when reviced private message from server
	useEffect(() => {
		// Listent to private message updates
		socket.on('recv_privatemsg', (sender, message) => {
			const timestamp = new Date().toString();
			// Update private message in store
			dispatch(addPrivateMessage({ sender: sender, msg: message, timestamp: timestamp }));
		});

    return () => {
			socket.off('recv_privatemsg');
		};
	});

	return (
		<div className="sidebar-container">
			<h1>User: {user}</h1>
			<Rooms />
			<OnlineUsers />
		</div>
	);
};

export default DashSidebar;
