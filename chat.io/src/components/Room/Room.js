import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RoomButton from '../RoomButton/RoomButton';
import socket from '../../services/socketService';
import './styles.scss';
import PasswordDialog from '../PasswordDialog/PasswordDialog';
import { setCurrentChat, setChatHistory, resetAllChatInfo } from '../../slices/chatIoSlice';
import { useNavigate } from 'react-router-dom';

const Room = ({ roomName }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const availableRooms = useSelector((state) => state.chatIo.availableRooms);
	const currentChat = useSelector((state) => state.chatIo.currentChat);

	// State of if password dialog is open
	const [passDialogOpen, setPassDialogOpen] = useState(false);

	// State of room password input
	const [roomPassword, setRoomPassword] = useState('');

	// State if room is password protected
	const [passwordProtected, setPasswordProtected] = useState(false);

	// State of error message in password dialog
	const [errorMessage, setErrorMessage] = useState('');

	const handleJoinRoom = () => {
		// Check if user is already in a room
		if (currentChat.length > 0) {
			handleLeaveRoom();
		}

		// Room info object to sent to chat io socket
		const roomInfo = {
			room: roomName,
		};

		setPassDialogOpen(false);

		if (passwordProtected) {
			roomInfo['pass'] = roomPassword;
		}

		socket.emit('joinroom', roomInfo, (hasJoined, reason) => {
			if (hasJoined) {
				// Reset states
				setPassDialogOpen(false);
				setPasswordProtected(false);
				setRoomPassword('');
				setErrorMessage('');

				// Change redux store state current room to the joined room
				dispatch(setCurrentChat(roomInfo.room));

				// navigate to chat room
				navigate('chatRoom');
			} else if (reason === 'wrong password') {
				// Add error message to dialog if the user has already added a password
				if ('pass' in roomInfo) {
					setErrorMessage('Wrong password');
				}
				// Reset password
				setRoomPassword('');
				setPasswordProtected(true);
				setPassDialogOpen(true);
			} else if (reason === 'banned') {
				setRoomPassword('');

				console.log('banned from this room, creat an alert for this!');
			}
		});
	};

	// Leave current room and reset state in store
	const handleLeaveRoom = () => {
		if (currentChat.length > 0 && availableRooms.includes(currentChat)) {
			// Notify chat server that user has left room
			socket.emit('partroom', currentChat);
		}

		// Reset all chat info store states 
    dispatch(resetAllChatInfo());

	};

	return (
		<>
			<RoomButton onClick={() => handleJoinRoom()}>{roomName}</RoomButton>
			<PasswordDialog
				open={passDialogOpen}
				cancel={() => setPassDialogOpen(!passDialogOpen)}
				submit={() => handleJoinRoom()}
				password={roomPassword}
				setPassword={(p) => setRoomPassword(p)}
				errorMessage={errorMessage}
			/>
		</>
	);
};

export default Room;
