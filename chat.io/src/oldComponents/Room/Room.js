import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ActionButton from '../../components/ActionButton/ActionButton';
import socket from '../../services/socketService';
import './styles.scss';
import PasswordDialog from '../../components/PasswordDialog/PasswordDialog';
import { setCurrentChat, resetAllChatInfo, addBannedRoom } from '../../slices/chatIoSlice';
import { useNavigate } from 'react-router-dom';

const Room = ({ roomName }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// State of available room from store
	const availableRooms = useSelector((state) => state.chatIo.availableRooms);
	// State of curren room from store
	const currentChat = useSelector((state) => state.chatIo.currentChat);
	// State of banned rooms from store
	const bannedRooms = useSelector((state) => state.chatIo.bannedRooms);

	// State of if password dialog is open
	const [passDialogOpen, setPassDialogOpen] = useState(false);

	// State of room password input
	const [roomPassword, setRoomPassword] = useState('');

	// State if room is password protected
	const [passwordProtected, setPasswordProtected] = useState(false);

	// State of error message in password dialog
	const [errorMessage, setErrorMessage] = useState('');

	// State of classed to send to action button
	const [buttonClasses, setButtonClasses] = useState('join-room');

	// State of classed to send to action button
	const [buttonDisabled, setButtonDisabled] = useState(false);

	// Disable or enable button, depending on if user is banned or currently in room
	useEffect(() => {
		// If room is banned 
		if (bannedRooms.includes(roomName)) {
			setButtonClasses('join-room banned');
			setButtonDisabled(true);
		} 
		// If user is in room
		else if (currentChat.name === roomName && currentChat.type === 'room') {
			setButtonClasses('join-room in-room');
			setButtonDisabled(true);
		} else {
			setButtonClasses('join-room');
			setButtonDisabled(false);
		}
	}, [currentChat, bannedRooms]);

	const handleJoinRoom = () => {
		// Check if user is already in a room
		if (currentChat.type === 'room') {
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
				dispatch(setCurrentChat({ name: roomInfo.room, type: 'room' }));

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
				// navigate to home dashboard
				navigate('/dashboard/home');
			} else if (reason === 'banned') {
				setRoomPassword('');
				setPasswordProtected(false);
				// // If room is not already in the banned rooms list state, then add it
				// if (!bannedRooms.includes(roomInfo.room)) {
				// 	dispatch(addBannedRoom(roomInfo.room));
				// 	// disable the button
				// 	setButtonClasses('join-room banned');
				// 	setButtonDisabled(true);
				// }

				console.log('banned from this room, creat an alert for this!');
			}
		});
	};

	// Leave current room and reset state in store
	const handleLeaveRoom = () => {
		if (currentChat.type === 'room') {
			if (availableRooms.includes(currentChat.name)) {
				// Notify chat server that user has left room
				socket.emit('partroom', currentChat.name);
			}
		}

		// Reset all chat info store states
		dispatch(resetAllChatInfo());
	};

	return (
		<>
			<ActionButton
				onClick={() => handleJoinRoom()}
				disabled={buttonDisabled}
				classes={buttonClasses}>
				{roomName}
			</ActionButton>
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

Room.propTypes = {
	roomName: PropTypes.string.isRequired,
};

export default Room;
