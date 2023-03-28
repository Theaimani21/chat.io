import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import socket from '../../services/socketService';
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Radio,
	RadioGroup,
	FormControl,
	FormControlLabel,
	FormHelperText,
	FormLabel,
	Typography,
} from '@mui/material';
import './styles.scss';

const BanUserDialog = ({ open, close }) => {
	// Get state of current user in room from store
	const roomUsers = useSelector((state) => state.chatIo.chatUsers);

	// Get state of current room from store
	const currentRoom = useSelector((state) => state.chatIo.currentChat);

	// State for value of user selected
	const [value, setValue] = useState('');

	// State of errors in selection
	const [error, setError] = useState(false);

	// State of helper text in selection
	const [helperText, setHelperText] = useState('Choose user to ban');

	// Handle change when user selectes someone
	const handleRadioChange = (event) => {
		setValue(event.target.value);
		setHelperText(' ');
		setError(false);
	};

	// Handle submit ban user
	const handleSubmit = (event) => {
		event.preventDefault();

		// If nothing has been selected the show error message
		if (value === '') {
			setHelperText('Please select a user');
			setError(true);
		} else {
			// Ban the user from the room
			socket.emit('ban', { user: value, room: currentRoom }, (isBanned) => {
				if (isBanned) {
					// add alert if time
					console.log(value + ' is banned from room');
				} else {
					// add alert if time
					console.log(value + ' is not banned from room');
				}
			});

			// Reset form values
			setHelperText('Choose user to ban');
			setValue('');
			setError(false);
			close();
		}
	};

	// Variable for users that can be banned
	let banableUsers;

	if (roomUsers.length > 0) {
		banableUsers = roomUsers.map((user) => (
			<FormControlLabel key={user} value={user} control={<Radio />} label={user} />
		));
	}

	return (
		<Dialog
			open={open}
			onClose={() => {
				setValue('');
				setHelperText('Choose user to ban');
				close();
			}}>
			<DialogTitle>Ban user from room</DialogTitle>
			<DialogContent>
				{roomUsers.length > 0 ? (
					<form onSubmit={(e) => handleSubmit(e)}>
						<FormControl sx={{ m: 1 }} error={error} variant="standard">
							<FormLabel id="demo-error-radios">Select a user to be banned</FormLabel>
							<RadioGroup
								aria-labelledby="demo-error-radios"
								name="Ban User"
								value={value}
								onChange={handleRadioChange}>
								{banableUsers}
							</RadioGroup>
							<FormHelperText>{helperText}</FormHelperText>
							<Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
								Ban user
							</Button>
						</FormControl>
					</form>
				) : (
					<>
						<Typography>No users available</Typography>
						<Button onClick={() => close()} sx={{ mt: 2 }} variant="outlined">
							Return
						</Button>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
};

BanUserDialog.propTypes = {
	open: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
};

export default BanUserDialog;
