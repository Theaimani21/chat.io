import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import socket from '../../services/socketService';
import Button from '../Button';
import './styles.scss';

const RoomMessageInputBar = () => {
	const [message, setMessage] = useState('');

	// Get current room from store state
	const currentRoom = useSelector((state) => state.chatIo.currentChat);

	const handleSendMsg = () => {
		if (message.length > 0) {
			// Data for sending message to chatIo server
			const msgData = {
				roomName: currentRoom,
				msg: message,
			};

			// Send message to chatIo server
			socket.emit('sendmsg', msgData);

			// Reset state of input
			setMessage('');
		}
	};

	return (
		<div className="msg-bar-container">
			<input
				className="chat-input"
				type="text"
				id="chat"
				placeholder="Enter message"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>
			<Button onClick={() => handleSendMsg()}>Send</Button>
		</div>
	);
};

export default RoomMessageInputBar;
