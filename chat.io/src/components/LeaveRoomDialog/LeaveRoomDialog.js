import React from 'react';
import { useSelector } from 'react-redux';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import './styles.scss';


const LeaveRoomDialog = ({ open, submit, cancel }) => {
	// Get current room state
	const currentRoom = useSelector((state) => state.chatIo.currentChat);

	return (
		<div>
			<Dialog open={open} onClose={cancel}>
				<DialogTitle>You are in room: {currentRoom} </DialogTitle>
				<DialogContent>
					<DialogContentText>
						Would you like to leave to chat you are currently in?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={cancel}>Cancel</Button>
					<Button onClick={submit} autoFocus>
						Leave room
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default LeaveRoomDialog;
