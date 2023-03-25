import React from 'react';
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

export default PasswordDialog;
