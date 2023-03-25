import React, {useState} from 'react';
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

const NewRoomDialog = ({ open, onClose, roomNames }) => {
	const [roomName, setRoomName] = useState('');
	const [roomPass, setRoomPass] = useState('');

	// Keep state of validation errors
	const [formErrors, setFormErrors] = useState('');


	const validateRoom = () => {
		// array for errors
		const errors = [];

		if (roomName.trim().length < 1) {
			errors.push('Invalid room name');
		}
		else if (roomNames.includes(roomName)) {
			errors.push('Room name id already taken');
		}

		if (errors.length > 0) {
			setFormErrors(errors[0]);
			return false;
		}
		return true;
	}

	const handleAddRoom = () => {
		setFormErrors('');

		if (validateRoom()) {
			const roomInfo = {
				room: roomName
			};

			// add the password if it has been set
			if (roomPass.length > 0 ) {
				roomInfo['pass'] = roomPass;
			}

			socket.emit('joinroom', roomInfo, (fn) => {
				if (fn) {
					console.log('room created');
					// console.log(joinObj);
					// Reset form fields
					setRoomName('');
					setRoomPass('');
					// Close modal
					onClose();
				} else {
					// Spurning um að breyta þessu þannig að það birtist annað staðar í forminu
					setFormErrors('Could not create room try again');
				}
			})
		}

	}

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Add new room </DialogTitle>
			<DialogContent>
				<DialogContentText>
					To create a new room, enter the name of the room and password 
					if you would like to password protect it.
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
				<DialogContentText>
					{formErrors}
				</DialogContentText>
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
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={() => handleAddRoom()}>Create room</Button>
			</DialogActions>
		</Dialog>
	);
};

export default NewRoomDialog;
