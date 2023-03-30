import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSentPrivateMessage } from '../../slices/chatIoSlice';
import socket from '../../services/socketService';
import ActionButton from '../ActionButton/ActionButton';
import { MdSend } from 'react-icons/md';
import PropTypes from 'prop-types';
import './styles.scss';

const MessageInputBar = ({ socketAction }) => {
	const dispatch = useDispatch();

	// State of message to send
	const [message, setMessage] = useState('');

	// Get current room from store state
	const currentChat = useSelector((state) => state.chatIo.currentChat);

	const handleSendMsg = () => {
		if (message.length > 0) {
			if (socketAction === 'sendmsg') {
				// Data for sending message to chatIo server
				const msgData = {
					roomName: currentChat.name,
					msg: message,
				};

				// Send message to chatIo server
				socket.emit('sendmsg', msgData);

				// Reset state of input
				setMessage('');
			} else if (socketAction === 'privatemsg') {
				// Data for sending message to chatIo server
				const msgData = {
					nick: currentChat.name,
					message: message,
				};
				// Create a time stamp
				const timestamp = new Date().toString();

				// Send message to chatIo server
				socket.emit('privatemsg', msgData, (msgSent) => {
					if (msgSent) {
						console.log('message was sent');
						// Update store with new message
						dispatch(
							addSentPrivateMessage({
								msg: message,
								timestamp: timestamp,
								recipient: currentChat.name,
							})
						);
						// Reset state of input
						setMessage('');
					} else {
						console.log('message was not sent');
					}
				});
			}
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

MessageInputBar.propTypes = {
	socketAction: PropTypes.string.isRequired,
};

export default MessageInputBar;
