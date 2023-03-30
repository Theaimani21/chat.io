import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ActionButton from '../ActionButton/ActionButton';
import socket from '../../services/socketService';
import './styles.scss';
import PasswordDialog from '../PasswordDialog/PasswordDialog';
import { setCurrentChat, resetAllChatInfo } from '../../slices/chatIoSlice';
import { useNavigate } from 'react-router-dom';

const Chat = ({ name, type }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// State of available room from store
	const availableRooms = useSelector((state) => state.chatIo.availableRooms);
	// State of curren room from store
	const currentChat = useSelector((state) => state.chatIo.currentChat);
	// State of banned rooms from store
	const bannedRooms = useSelector((state) => state.chatIo.bannedRooms);
	// Store state of if user has been kicked from room
	const iskicked = useSelector((state) => state.chatIo.hasBeenKicked);

	// State of classed to send to action button
	const [buttonClasses, setButtonClasses] = useState('join-room');

	// State of classed to send to action button
	const [buttonDisabled, setButtonDisabled] = useState(false);

	// State of if password dialog is open
	const [passDialogOpen, setPassDialogOpen] = useState(false);

	// State of room password input
	const [roomPassword, setRoomPassword] = useState('');

	// State if room is password protected
	const [passwordProtected, setPasswordProtected] = useState(false);

	// State of error message in password dialog
	const [errorMessage, setErrorMessage] = useState('');

	// Disable or enable button, depending on if user is banned or currently in room
	useEffect(() => {
		// If chat is a room
		if (type === 'room') {
			// If room is banned
			if (bannedRooms.includes(name)) {
				setButtonClasses('join-room banned');
				setButtonDisabled(true);
			}
			// If user is in room
			else if (currentChat.name === name && currentChat.type === 'room') {
				setButtonClasses('join-room in-room');
				setButtonDisabled(true);
			} else {
				setButtonClasses('join-room');
				setButtonDisabled(false);
			}
		}
		// If chat is private
		else if (type === 'priv') {
			if (currentChat.name === name && currentChat.type === 'priv') {
				setButtonClasses('priv-room in-room');
				setButtonDisabled(true);
			} else {
				setButtonClasses('priv-room');
				setButtonDisabled(false);
			}
		}
	}, [currentChat, bannedRooms, iskicked]);

	const handleJoinRoom = () => {
		// Check if user is already in a room
		if (currentChat.type === 'room') {
			// Leave the room
			handleLeaveRoom();
		}
		// Check if entering a room chat
		if (type === 'priv') {
			// Update current chat store state to private chat users name ---------
			dispatch(setCurrentChat({ name: name, type: 'priv' }));

			// navigate to private chat
			navigate('privateChat');
		}
		// Check if entering a private chat
		else {
			// Chat info object to sent to chat io socket
			const roomInfo = {
				room: name,
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
				}
			});
		}
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
				{name}
			</ActionButton>
			<PasswordDialog
				open={passDialogOpen}
				cancel={() => {
					setPassDialogOpen(false);
          setPasswordProtected(false);
					setRoomPassword('');
          setErrorMessage('');
				}}
				submit={() => handleJoinRoom()}
				password={roomPassword}
				setPassword={(p) => setRoomPassword(p)}
				errorMessage={errorMessage}
			/>
		</>
	);
};

Chat.propTypes = {
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
};

export default Chat;
