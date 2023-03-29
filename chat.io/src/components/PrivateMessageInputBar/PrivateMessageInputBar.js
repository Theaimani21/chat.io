import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../services/socketService';
import { addSentPrivateMessage } from '../../slices/chatIoSlice';
import ActionButton from '../ActionButton/ActionButton';
import { MdSend } from 'react-icons/md';
import './styles.scss';

const PrivateMessageInputBar = () => {
	const dispatch = useDispatch();

	const [message, setMessage] = useState('');

	// Get current room from store state
	const currentChat = useSelector((state) => state.chatIo.currentChat);

	const handleSendMsg = () => {
		if (message.length > 0) {
			// Data for sending message to chatIo server
			const msgData = {
				nick: currentChat.name,
				message: message,
			};

			const timestamp = new Date().toString();

			// Send message to chatIo server
			socket.emit('privatemsg', msgData, (msgSent) => {
				if (msgSent) {
					console.log('message was sent');
					// Update store with new message
					dispatch(
						addSentPrivateMessage({ msg: message, timestamp: timestamp, recipient: currentChat.name })
					);
				} else {
					console.log('message was not sent');
				}
			});

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
			<ActionButton onClick={() => handleSendMsg()} classes="send-msg">
				Send <MdSend className="send-icon" />
			</ActionButton>
		</div>
	);
};

export default PrivateMessageInputBar;
