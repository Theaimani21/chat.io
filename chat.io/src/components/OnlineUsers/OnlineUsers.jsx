import React from 'react';
import { useSelector } from 'react-redux';
import Chat from '../Chat/Chat';
import './styles.scss';

const OnlineUsers = () => {

	// Get user from store
	const users = useSelector((state) => state.chatIo.onlineUsers);

	// Get online users from store
	const currUser = useSelector((state) => state.chatIo.user);

	// Variable for private chat online users
	let onlineUsers;
	// Filter out current user
	const privUsers = users.filter((user) => user !== currUser);

	// Check if anyone else is online
	if (privUsers.length > 0) {
		// Map the online users
		onlineUsers = privUsers.map((user) => <Chat key={user} name={user} type="priv" />);
	} else {
		// Show message that nobody else is online
		onlineUsers = <h5>Nobody else is online</h5>;
	}

	return (
		<div className="priv-msg-container">
			<h5 className="priv-msg-subheading">Enter a private chat</h5>
			<div className="priv-msg-list">{onlineUsers}</div>
		</div>
	);
};

export default OnlineUsers;
