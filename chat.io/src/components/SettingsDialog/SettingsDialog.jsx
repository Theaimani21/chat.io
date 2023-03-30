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

const SettingsDialog = ({ open, close, action }) => {
	// Get state of current user in room from store
	const roomUsers = useSelector((state) => state.chatIo.chatUsers);

	// Get state of current room from store
	const currentChat = useSelector((state) => state.chatIo.currentChat);

	// State for value of user selected
	const [value, setValue] = useState('');

	// State of errors in selection
	const [error, setError] = useState(false);

	// State of helper text in selection
	const [helperText, setHelperText] = useState('');

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
			setHelperText('You must select a user!');
			setError(true);
		} else {
			// Make the user an op of the room
			socket.emit(action, { user: value, room: currentChat.name }, (isOp) => {
				if (isOp) {
					// add alert if time
					console.log(value + ' is ' + action + 'ed');
				} else {
					// add alert if time
					console.log(value + ' is not ' + action + 'ed');
				}
			});

			// Reset form values
			setHelperText('');
			setValue('');
			setError(false);
			close();
		}
	};

	// Variable for users that can be given op privalages
	let availableUsers;

	if (roomUsers.length > 0) {
		availableUsers = roomUsers.map((user) => (
			<FormControlLabel key={user} value={user} control={<Radio />} label={user} />
		));
	}

	return (
		<Dialog
			open={open}
			onClose={() => {
				setValue('');
				setHelperText('');
				setError(false);
				close();
			}}>
			<DialogTitle>{action.charAt(0).toUpperCase() + action.slice(1)} a user</DialogTitle>
			<DialogContent>
				{roomUsers.length > 0 ? (
					<form className="settings-form" onSubmit={(e) => handleSubmit(e)}>
						<FormControl  error={error} variant="standard">
							<FormLabel id="demo-error-radios">Select a user</FormLabel>
							<RadioGroup
								aria-labelledby="demo-error-radios"
								name="Op User"
								value={value}
								onChange={handleRadioChange}>
								{availableUsers}
							</RadioGroup>
							<FormHelperText error={error}>{helperText}</FormHelperText>
							<Button sx={{ mt: 1 }} type="submit" variant="outlined">
								Submit
							</Button>
						</FormControl>
					</form>
				) : (
					<>
						<Typography>No users available</Typography>
						<Button onClick={() => close()} sx={{ mt: 1 }} variant="outlined">
							Return
						</Button>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
};

SettingsDialog.propTypes = {
	open: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
	action: PropTypes.string.isRequired,
};

export default SettingsDialog;
