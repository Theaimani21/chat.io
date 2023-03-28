import React from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';

const PasswordDialog = ({ open, cancel, submit, password, setPassword, errorMessage }) => {
	return (
		<Dialog open={open} onClose={cancel}>
			<DialogTitle>Password required to join room </DialogTitle>
			<DialogContent>
				<DialogContentText>Please enter password</DialogContentText>
				<DialogContentText>{errorMessage}</DialogContentText>
				<TextField
					required
					autoFocus
					margin="dense"
					id="joinRoomPassword"
					label="Room password"
					type="password"
					fullWidth
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={cancel}>Cancel</Button>
				<Button onClick={() => submit()}>Join room</Button>
			</DialogActions>
		</Dialog>
	);
};

PasswordDialog.propTypes = {
	open: PropTypes.bool.isRequired,
	cancel: PropTypes.func.isRequired,
	submit: PropTypes.func.isRequired,
	password: PropTypes.string.isRequired,
	setPassword: PropTypes.func.isRequired,
	errorMessage: PropTypes.string.isRequired,
};

export default PasswordDialog;
