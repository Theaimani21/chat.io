import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
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

const AddOpDialog = ({ open, close }) => {
	// Get state of current user in room from store
	const roomUsers = useSelector((state) => state.chatIo.chatUsers);

	// Get state of current room from store
	const currentRoom = useSelector((state) => state.chatIo.currentChat);

	// State for value of user selected 
	const [value, setValue] = useState('');

	// State of errors in selection
	const [error, setError] = useState(false);

	// State of helper text in selection
	const [helperText, setHelperText] = useState('Choose user to grant op');

	// Handle change when user selectes someone
	const handleRadioChange = (event) => {
		setValue(event.target.value);
		setHelperText(' ');
		setError(false);
	};

	// Handle submit op user
	const handleSubmit = (event) => {
		event.preventDefault();

    // If nothing has been selected the show error message
		if (value === '') {
			setHelperText('Please select a user');
			setError(true);
		} 
    else {
			// Make the user an op of the room
			socket.emit('op', { user: value, room: currentRoom}, (isOp) => {
				if (isOp) {
          // add alert if time
					console.log(value + ' is an op');
				} else {
          // add alert if time
					console.log(value + ' is not an op');
				}
			});

			// Reset form values
			setHelperText('Choose user to grant op');
			setValue('');
			setError(false);
			close();
		}
	};

	// Variable for users that can be given op privalages
	let opableUsers;

	if (roomUsers.length > 0) {
		opableUsers = roomUsers.map((user) => (
			<FormControlLabel key={user} value={user} control={<Radio />} label={user} />
		));
	}
	
	return (
		<Dialog
			open={open}
			onClose={() => {
				setValue('');
				setHelperText('Choose user to op');
				close();
			}}>
			<DialogTitle>Add room Op</DialogTitle>
			<DialogContent>
				{roomUsers.length > 0 ? (
					<form onSubmit={(e) => handleSubmit(e)}>
						<FormControl sx={{ m: 1 }} error={error} variant="standard">
							<FormLabel id="demo-error-radios">Select a user to give Op privileges</FormLabel>
							<RadioGroup
								aria-labelledby="demo-error-radios"
								name="Op User"
								value={value}
								onChange={handleRadioChange}>
								{opableUsers}
							</RadioGroup>
							<FormHelperText>{helperText}</FormHelperText>
							<Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
								Grant
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

AddOpDialog.propTypes = {
	open: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired
}

export default AddOpDialog;
