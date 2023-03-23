import React, { useState, useEffect } from 'react';
import socket from '../../services/socketService';
import NewRoomDialog from '../NewRoomDialog/NewRoomDialog';
import Room from '../Room/Room';
import RoomButton from '../RoomButton/RoomButton';
import './styles.scss';

const Rooms = () => {
	// Keep state of rooms
	const [rooms, setRooms] = useState({});
	// Keep state of room keys
	const [roomKeys, setRoomKeys] = useState([]);
	// Keep state of new room dialog
	const [newRoomDialogOpen, setNewRoomDialogOpen] = useState(false);


	useEffect(() => {
		// create interval so that room list updates every 2 seconds
		const interval = setInterval(() => {
			// Get the initial room list
			socket.emit('rooms');
			socket.on('roomlist', (allRooms) => {
				setRooms(allRooms);
				setRoomKeys(Object.keys(allRooms));
			});
		}, 2000);

		return () => {
			clearInterval(interval);
			socket.off('rooms');
		};
	}, []);

	// useEffect(() => {

	// 	return () => {
	// 	};
	// }, []);
	// console.log('rooms in room component:');
	// console.log(rooms);
	const toggleNewRoomDialog = () => {
		setNewRoomDialogOpen(!newRoomDialogOpen);
	};

	const mapRooms = roomKeys.map((key) => <Room key={key} name={key} room={rooms[key]} />);

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
				roomNames={roomKeys}
			/>
		</div>
	);
};

export default Rooms;
