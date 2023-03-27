import React from 'react';
import { useSelector } from 'react-redux';
import ChatRoomUser from '../ChatRoomUser/ChatRoomUser';
import './styles.scss';

const ChatRoomUsersBar = () => {

	// Get state of room ops from store
	const roomOps = useSelector((state) => state.chatIo.chatOps);

	// Get state of current user from store
	const roomUsers = useSelector((state) => state.chatIo.chatUsers);

	let onlineUsers;

	if (roomUsers.length > 0) {
		onlineUsers = roomUsers.map((user) => (
			<ChatRoomUser key={user} user={user} isOp={roomOps.includes(user)} />
		));
	} else {
		onlineUsers = <p>No others</p>;
	}

	let onlineRoomOps;
	if (roomOps.length > 0) {
		onlineRoomOps = roomOps.map((user) => (
			<ChatRoomUser key={user} user={user} isOp={roomOps.includes(user)} />
		));
	} else {
		onlineRoomOps = <p>No ops</p>;
	}

	return (
		<div className="room-users-bar">
			<h4 className="room-user-heading">Room Users</h4>
			<h4 className="room-user-subheading">Ops</h4>
			{onlineRoomOps}
			<h4 className="room-user-subheading">Others</h4>
			{onlineUsers}
		</div>
	);
};

export default ChatRoomUsersBar;
