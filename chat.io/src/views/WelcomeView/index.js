import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './styles.scss';
import emojiPng from '../../resources/DrunkEmoji.png';
import ActionButton from '../../components/ActionButton/ActionButton';
import socket from '../../services/socketService';
import { setUser, setOnlineUsers } from '../../slices/chatIoSlice';

const WelcomeView = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [nick, setNick] = useState('');
	const [failedMessage, setFailedMessage] = useState('');

	// Validate user nickname
	const validateNick = () => {
		let errorMessage = '';

		const trimedNick = nick.trim();

		if (trimedNick === '') {
			errorMessage = 'You must enter a nickname, please try again!';
		}

		if (errorMessage.length > 0) {
			setFailedMessage(errorMessage);
			return false;
		}
		return true;
	};

	const onChooseNickname = () => {
		setFailedMessage('');

		// Validate nickname and if it's valid add user to socket
		if (validateNick()) {
			socket.emit('adduser', nick.trim(), function (available) {
				if (available) {
					dispatch(setUser(nick.trim()));
					// Get the initial users list
					socket.emit('users');
					// Add online users to redux state
					socket.on('userlist', (users) => {
						dispatch(setOnlineUsers(users));
						socket.off('userlist');
						// Navigate to home page
						navigate('/dashboard/home');
					});
				} else {
					setFailedMessage('Nickname not valid, please try again!');
				}
			});
		}
	};

	return (
		<div className="welcome-view-container container">
			<h1>Welcome to chat.io</h1>
			<div
				className="default-avatar"
				style={{
					backgroundImage: `url('${emojiPng}')`,
				}}></div>
			<div className="input-container">
				<label htmlFor="nickname">Choose your nickname</label>
				<input
					autoFocus
					id="nickname"
					name="nickname"
					type="text"
					placeholder="Enter your nickname..."
					value={nick}
					onChange={(e) => setNick(e.target.value)}
				/>
				<ActionButton onClick={() => onChooseNickname()} classes="enter-chatIo">
					Enter
				</ActionButton>
				<p className="error-message">{failedMessage}</p>
			</div>
		</div>
	);
};

export default WelcomeView;
