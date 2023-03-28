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

	const currentChat = useSelector((state) => state.chatIo.currentChat);

	const availableRooms = useSelector((state) => state.chatIo.availableRooms);

	const [roomName, setRoomName] = useState('');
	const [roomPass, setRoomPass] = useState('');

	// Keep state of validation errors
	const [formErrors, setFormErrors] = useState('');

	// Validate room name
	const validateRoom = () => {
		// array for errors
		const errors = [];

		if (roomName.trim().length < 1) {
			errors.push('Invalid room name');
		} else if (availableRooms.includes(roomName)) {
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

			// add the password if it has been set
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
					if (currentChat.length > 0 && availableRooms.includes(currentChat)) {
						socket.emit('partroom', currentChat);
					}
					dispatch(setCurrentChat(roomInfo.room));
					dispatch(setChatHistory({ room: roomInfo.room, history: [] }));
					// ------- might have to update topic as well
					navigate('/dashboard/chatRoom');
				} else {
					// Spurning um að breyta þessu þannig að það birtist annað staðar í forminu
					setFormErrors('Could not create room try again');
				}
			});
		}
	};

	return (
		<Dialog open={open} onClose={() => close()}>
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
				<DialogContentText>{formErrors}</DialogContentText>
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
				<Button onClick={() => close()}>Cancel</Button>
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
