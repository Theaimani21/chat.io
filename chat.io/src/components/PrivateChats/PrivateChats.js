import React, { useState, useEffect } from 'react';
import socket from '../../services/socketService';
import './styles.scss';

const PrivateChats = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		// Get the initial users list
		socket.emit('users');
		// Get the list of online users
		socket.on('userlist', (users) => setUsers(users));

		return () => {
			socket.off('users');
		};
	}, []);

	const mapUsers = users.map((user) => <h4 key={user}>{user}</h4>);

	return (
		<div className="priv-msg-container">
			<h2 className="priv-msg-heading">Private message</h2>
            {mapUsers}
		</div>
	);
};

export default PrivateChats;
