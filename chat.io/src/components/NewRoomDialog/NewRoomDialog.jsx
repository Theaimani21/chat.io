import React, { useState } from 'react';
import PropTypes from 'prop-types';
import socket from '../../services/socketService';
import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setChatHistory, setCurrentChat } from '../../slices/chatIoSlice';

const NewRoomDialog = ({ open, close }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Current chat from store state
	const currentChat = useSelector((state) => state.chatIo.currentChat);

	// Current rooms from store state
	const availableRooms = useSelector((state) => state.chatIo.availableRooms);

	// State for room name from input
	const [roomName, setRoomName] = useState('');

	// State for room password from input
	const [roomPass, setRoomPass] = useState('');

	// Keep state of validation errors
	const [formErrors, setFormErrors] = useState('');

	// Validate room name
	const validateRoom = () => {
		// Array for errors
		const errors = [];

		// Check length of room name
		if (roomName.trim().length < 1) {
			errors.push('Invalid room name');
		}
		// Check if room exists
		else if (availableRooms.includes(roomName)) {
			errors.push('Room name id already taken');
		}

		if (errors.length > 0) {
			setFormErrors(errors[0]);
			return false;
		}
		return true;
	};

	const handleAddRoom = () => {
		setFormErrors('');

		if (validateRoom()) {
			const roomInfo = {
				room: roomName,
			};

			// Add the password if it has been set
			if (roomPass.length > 0) {
				roomInfo['pass'] = roomPass;
			}

			socket.emit('joinroom', roomInfo, (fn) => {
				if (fn) {
					// Reset form fields
					setRoomName('');
					setRoomPass('');
					// Close modal
					close();
					if (currentChat.type === 'room' && availableRooms.includes(currentChat.name)) {
						socket.emit('partroom', currentChat.name);
					}
					dispatch(setCurrentChat({ name: roomInfo.room, type: 'room' }));
					dispatch(setChatHistory({ room: roomInfo.room, history: [] }));
					navigate('/dashboard/chatRoom');
				} else {
					setFormErrors('Could not create room try again');
				}
			});
		}
	};

	const handleClose = () => {
		// reset dialog states
		setRoomName('');
		setRoomPass('');
		setFormErrors('');
		// close dialog
		close();
	};

	return (
		<Dialog open={open} onClose={() => handleClose()}>
			<DialogTitle>Add new room </DialogTitle>
			<DialogContent>
				<DialogContentText>
					To create a new room, enter the name of the room and password if you would like to
					password protect it.
				</DialogContentText>
				<TextField
					autoFocus
					required
					margin="dense"
					id="roomName"
					label="Enter room name"
					type="text"
					fullWidth
					onChange={(e) => setRoomName(e.target.value)}
				/>
				<DialogContentText color={'error'}>{formErrors}</DialogContentText>
				<TextField
					margin="dense"
					id="newRoomPassword"
					label="Room password"
					type="password"
					fullWidth
					onChange={(e) => setRoomPass(e.target.value)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => handleClose()}>Cancel</Button>
				<Button onClick={() => handleAddRoom()}>Create room</Button>
			</DialogActions>
		</Dialog>
	);
};

NewRoomDialog.propTypes = {
	open: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
};

export default NewRoomDialog;
