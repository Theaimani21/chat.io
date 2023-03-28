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
		onlineUsers = roomUsers.map((user) => <ChatRoomUser key={user} user={user} />);
	} else {
		onlineUsers = <p className="room-nouser-subheading">No others in room</p>;
	}

	let onlineRoomOps;
	if (roomOps.length > 0) {
		onlineRoomOps = roomOps.map((user) => <ChatRoomUser key={user} user={user} />);
	} else {
		onlineRoomOps = <p className="room-nouser-subheading">No ops in room</p>;
	}

	return (
		<div className="room-users-bar">
			<div className="users-bar-scroll">
				<h3 className="room-user-heading">In room</h3>
				<h5 className="room-user-subheading">Ops</h5>
				{onlineRoomOps}
				<h5 className="room-user-subheading second">Others</h5>
				{onlineUsers}
			</div>
		</div>
	);
};

export default ChatRoomUsersBar;
