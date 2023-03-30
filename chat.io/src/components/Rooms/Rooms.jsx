import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../services/socketService';
import { setAvailableRooms } from '../../slices/chatIoSlice';
import NewRoomDialog from '../NewRoomDialog/NewRoomDialog';
import ActionButton from '../ActionButton/ActionButton';
import './styles.scss';
import Chat from '../Chat/Chat';

const Rooms = () => {
	const dispatch = useDispatch();

	// Get state of available rooms in store
	const availableRooms = useSelector((state) => state.chatIo.availableRooms);

	// Keep state of new room dialog
	const [newRoomDialogOpen, setNewRoomDialogOpen] = useState(false);

	// might also want to call when user joins from main page loggin
	useEffect(() => {
		// Create interval so that room list updates every 0.5 seconds
		const interval = setInterval(() => {
			// Get the initial room list
			socket.emit('rooms');
			socket.on('roomlist', (allRooms) => {
				// Update state of available rooms in store
				dispatch(setAvailableRooms(Object.keys(allRooms)));
			});
		}, 250);

		return () => {
			clearInterval(interval);
			socket.off('rooms');
		};
	}, []);

	const toggleNewRoomDialog = () => {
		setNewRoomDialogOpen(!newRoomDialogOpen);
	};

	const mapRooms = availableRooms.map((key) => <Chat key={key} name={key} type='room'  />);

	return (
		<div className="rooms-container">
			<ActionButton onClick={() => setNewRoomDialogOpen(true)} classes={'create-room'}>Create room</ActionButton>
			<h5 className="rooms-subheading">Join an active room</h5>
			<div className="rooms-list">{mapRooms}</div>
			<NewRoomDialog open={newRoomDialogOpen} close={() => toggleNewRoomDialog()} />
		</div>
	);
};

export default Rooms;
