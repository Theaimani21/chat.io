import React from 'react';
// import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chat from '../Chat/Chat';
// import OnlineUser from '../OnlineUser/OnlineUser';
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
	// onlineUsers = privUsers.map((user) => <OnlineUser key={user} recipientName={user} />);
	onlineUsers = privUsers.map((user) => <Chat key={user} name={user} type='priv' />);

	return (
		<div className="priv-msg-container">
			<h5 className="priv-msg-subheading">Enter a private chat</h5>

			<div className="priv-msg-list">{onlineUsers}</div>
		</div>
	);
};

export default OnlineUsers;
