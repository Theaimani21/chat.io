import React from 'react';
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

	const currentRoom = useSelector((state) => state.chatIo.currentChat);

	// Get state of available rooms in store
	const availableRooms = useSelector((state) => state.chatIo.availableRooms);

	const handleOpenPrivateMessage = () => {
		// Check if user is already in a room
		if (currentRoom.length > 0) {
			// Check if user is in a room
			if (availableRooms.includes(currentRoom)) {
				// Leave that room
				handleLeaveRoom();
			}
		}
		// Update current chat store state to private chat users name ---------
		dispatch(setCurrentChat(recipientName));

		// navigate to private chat
		navigate('privateChat');
	};

	// Leave current room and reset state in store
	const handleLeaveRoom = () => {
		if (availableRooms.includes(currentRoom)) {
			// Notify chat server that user has left room
			socket.emit('partroom', currentRoom);
		}

		// Reset all chat info store states
		dispatch(resetAllChatInfo());
	};

	return (
		<>
			<ActionButton onClick={() => handleOpenPrivateMessage()} classes={'priv-room'}>
				{recipientName}
			</ActionButton>
		</>
	);
};

OnlineUser.propTypes = {
	recipientName: PropTypes.string.isRequired,
};

export default OnlineUser;
