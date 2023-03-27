import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../services/socketService';
import { setAvailableRooms } from '../../slices/chatIoSlice';
import NewRoomDialog from '../NewRoomDialog/NewRoomDialog';
import Room from '../Room/Room';
import RoomButton from '../RoomButton/RoomButton';
import './styles.scss';

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

	const mapRooms = availableRooms.map((key) => <Room key={key} roomName={key} />);

	return (
		<div className="rooms-container">
			<h2 className="sidebar-heading">Chat Rooms</h2>
			<h4 className="rooms-subheading">Create a new room</h4>
			<RoomButton onClick={() => setNewRoomDialogOpen(true)}>Create room</RoomButton>
			<h4 className="rooms-subheading">Join an active room</h4>
			<div className="rooms-list">{mapRooms}</div>
			<NewRoomDialog
				open={newRoomDialogOpen}
				onClose={() => toggleNewRoomDialog()}
			/>
		</div>
	);
};

export default Rooms;
