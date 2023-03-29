import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ActionButton from '../ActionButton/ActionButton';
import socket from '../../services/socketService';
import './styles.scss';
import { setCurrentChat, resetAllChatInfo } from '../../slices/chatIoSlice';
import { useNavigate } from 'react-router-dom';

const OnlineUser = ({ recipientName }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const currentChat = useSelector((state) => state.chatIo.currentChat);

	// Get state of available rooms in store
	const availableRooms = useSelector((state) => state.chatIo.availableRooms);

		// State of classed to send to action button
		const [buttonClasses, setButtonClasses] = useState('priv-room')

		// State of classed to send to action button
		const [buttonDisabled, setButtonDisabled] = useState(false);
	
		// 
		useEffect(() => {
			if (currentChat.name === recipientName && currentChat.type === 'priv' ) {
				setButtonClasses('priv-room in-room');
				setButtonDisabled(true);
			} else {
				setButtonClasses('priv-room');
				setButtonDisabled(false);
			}
		},[currentChat])

	const handleOpenPrivateMessage = () => {
		// Check if user is already in a room
		if (currentChat.type === 'room') {
			// Check if user is in a room
			if (availableRooms.includes(currentChat.name)) {
				// Leave that room
				handleLeaveRoom();
			}
		}
		// Update current chat store state to private chat users name ---------
		dispatch(setCurrentChat({name: recipientName, type: 'priv'}));

		// navigate to private chat
		navigate('privateChat');
	};

	// Leave current room and reset state in store
	const handleLeaveRoom = () => {
		if (availableRooms.includes(currentChat.name)) {
			// Notify chat server that user has left room
			socket.emit('partroom', currentChat.name);
		}

		// Reset all chat info store states
		dispatch(resetAllChatInfo());
	};

	return (
		<>
			<ActionButton onClick={() => handleOpenPrivateMessage()} disabled={buttonDisabled} classes={buttonClasses}>
				{recipientName}
			</ActionButton>
		</>
	);
};

OnlineUser.propTypes = {
	recipientName: PropTypes.string.isRequired,
};

export default OnlineUser;
