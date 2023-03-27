import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RoomButton from '../RoomButton/RoomButton';
import socket from '../../services/socketService';
import './styles.scss';
import { setCurrentChat, setChatHistory, setChatTopic, resetAllChatInfo } from '../../slices/chatIoSlice';
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

		// Reset chat hitsory and chat topic store state
		// dispatch(setChatHistory({ room: '', history: [] }));
		// dispatch(setChatTopic({ room: '', topic: '' }));
    dispatch(resetAllChatInfo());

	};

	return (
		<>
			<RoomButton onClick={() => handleOpenPrivateMessage()}>{recipientName}</RoomButton>
		</>
	);
};

export default OnlineUser;
