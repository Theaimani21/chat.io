import React from 'react';
// import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import OnlineUser from '../OnlineUser/OnlineUser';

// import socket from '../../services/socketService';
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
	// Assign online users to private chat online users
	onlineUsers = privUsers.map((user) => <h4 key={user}>{user}</h4>);
	onlineUsers = privUsers.map((user) => <OnlineUser key={user} recipientName={user} />);

	return (
		<div className="priv-msg-container">
			<h2 className="sidebar-heading">Online users</h2>
			{onlineUsers}
		</div>
	);
};

export default OnlineUsers;
