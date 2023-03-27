import React, { useState } from 'react';
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

const KickUserDialog = ({ open, close }) => {
	// Get state of current user in room from store
	const roomUsers = useSelector((state) => state.chatIo.chatUsers);

	// Get state of current room from store
	const currentRoom= useSelector((state) => state.chatIo.currentChat);

	// State for value of user selected to be kicked
	const [value, setValue] = useState('');

	// State of errors in selection
	const [error, setError] = useState(false);

	// State of helper text in selection
	const [helperText, setHelperText] = useState('Choose user to kick');

	// Handle change when user selectes someone to kick
	const handleRadioChange = (event) => {
		setValue(event.target.value);
		setHelperText(' ');
		setError(false);
	};

	// Handle submit kick user
	const handleSubmit = (event) => {
		event.preventDefault();

    // If nothing has been selected the show error message
		if (value === '') {
			setHelperText('Please select a user to kick.');
			setError(true);
		} 
    else {
			// Kick the user from the room
			socket.emit('kick', { user: value, room: currentRoom}, (isKicked) => {
				if (isKicked) {
          // add alert if time
					console.log(value + ' was kicked');
				} else {
          // add alert if time
					console.log(value + ' was not kicked');
				}
			});

			// Reset form values
			setHelperText('Choose user to kick');
			setValue('');
			setError(false);
			close();
		}
	};

	// Variable for users that can be kicked
	let kickableUsers;

	if (roomUsers.length > 0) {
		kickableUsers = roomUsers.map((user) => (
			<FormControlLabel key={user} value={user} control={<Radio />} label={user} />
		));
	}
	
	return (
		<Dialog
			open={open}
			onClose={() => {
				setValue('');
				setHelperText('Choose user to kick');
				close();
			}}>
			<DialogTitle>Kick user from room</DialogTitle>
			<DialogContent>
				{roomUsers.length > 0 ? (
					<form onSubmit={(e) => handleSubmit(e)}>
						<FormControl sx={{ m: 1 }} error={error} variant="standard">
							<FormLabel id="demo-error-radios">Select a user to kick out</FormLabel>
							<RadioGroup
								aria-labelledby="demo-error-radios"
								name="Kick User"
								value={value}
								onChange={handleRadioChange}>
								{kickableUsers}
							</RadioGroup>
							<FormHelperText>{helperText}</FormHelperText>
							<Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
								Kick out
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

export default KickUserDialog;
