import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../services/socketService';
import { addPrivateMessage } from '../../slices/chatIoSlice';
import AlertPopUp from '../AlertPopUp/AlertPopUp';
import OnlineUsers from '../OnlineUsers/OnlineUsers';
import Rooms from '../Rooms/Rooms';
import './styles.scss';

const DashSidebar = () => {
	const dispatch = useDispatch();

	// State of if alert is open
	const [alertOpen, setAlertOpen] = useState(false);

	// State of alert message
	const [alertMsg, setAlertMsg] = useState('');

	const user = useSelector((state) => state.chatIo.user);

	const userEmoji = useSelector((state) => state.chatIo.userEmoji);

	const currentChat = useSelector((state) => state.chatIo.currentChat);

	// Update private message when reviced private message from server
	useEffect(() => {
		// Listent to private message updates
		socket.on('recv_privatemsg', (sender, message) => {
			const timestamp = new Date().toString();
			// Update private message in store
			dispatch(addPrivateMessage({ sender: sender, msg: message, timestamp: timestamp }));
			// Check if user is in the private chat with sender
			if (sender !== currentChat.name) {
				// Give user an alert that they have a new private message from sender
				setAlertMsg('You have a private message from ' + sender);
				setAlertOpen(true);
			}
		});

		return () => {
			socket.off('recv_privatemsg');
		};
	});

	return (
		<div className="sidebar-container">
			<div className="sidebar-scroll-container">
				<div className="sidebar-header-container">
					<img src={userEmoji} alt="user emoji" className="user-emoji" />
					<h2 className="dash-user-heading">{user}</h2>
				</div>
				<h3 className="sidebar-heading room">Chat Rooms</h3>
				<Rooms />
				<h3 className="sidebar-heading priv">Online users</h3>
				<OnlineUsers />
			</div>
			<AlertPopUp
				open={alertOpen}
				close={() => setAlertOpen(false)}
				msg={alertMsg}
				severity="info"
			/>
		</div>
	);
};

export default DashSidebar;
