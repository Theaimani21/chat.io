import React from 'react';
// import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// import socket from '../../services/socketService';
import './styles.scss';

const PrivateChats = () => {
	// Get user from store
	const users = useSelector((state) => state.user.onlineUsers);
	// Get online users from store
	const currUser = useSelector((state) => state.user.nickname);
	
	// Variable for private chat online users
	let privChatUsers;
	// Filter out current user
	const privUsers = users.filter((user) => user !== currUser);
	// Assign online users to private chat online users
	privChatUsers = privUsers.map((user) => <h4 key={user}>{user}</h4>);

	return (
		<div className="priv-msg-container">
			<h2 className="sidebar-heading">Private message</h2>
			{privChatUsers}
		</div>
	);
};

export default PrivateChats;
