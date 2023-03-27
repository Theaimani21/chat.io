import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import socket from '../../services/socketService';
import { setChatHistory, setChatUsersInfo } from '../../slices/chatIoSlice';
import ChatRoomMsgContainer from '../ChatRoomMsgContainer/ChatRoomMsgContainer';
import ChatRoomTopBar from '../ChatRoomTopBar/ChatRoomTopBar';
import ChatRoomUsersBar from '../ChatRoomUsersBar/ChatRoomUsersBar';
import RoomMessageInputBar from '../RoomMessageInputBar/RoomMessageInputBar';
import './styles.scss';

const ChatRoom = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Get state of user from store
	const currentUser = useSelector((state) => state.chatIo.user);

	// Update room users and room ops
	useEffect(() => {
		socket.on('updateusers', (room, users, ops) => {
			// Update room users and room ops state in store
			dispatch(setChatUsersInfo({ room: room, users: users, ops: ops }));
		});
		return () => {
			socket.off('updateusers');
		};
	});

	// Update message history
	useEffect(() => {
		socket.on('updatechat', (room, messageHistory) => {
			// Update message history state in store
			dispatch(setChatHistory({ room: room, history: messageHistory }));
		});
		return () => {
			socket.off('updatechat');
		};
	});

	// Update room users and room ops
	useEffect(() => {
		socket.on('kicked', (room, user, kicker) => {

			if (user === currentUser) {
				navigate('/dashboard/home');
				// **************************** ADD a notification ********************************
			}
		});
		return () => {
			socket.off('kicked');
		};
	});

	// Update room users and room ops
	useEffect(() => {
		socket.on('banned', (room, user, banner) => {

			if (user === currentUser) {
				navigate('/dashboard/home');
				// **************************** ADD a notification ********************************
			}
		});
		return () => {
			socket.off('banned');
		};
	});

	return (
		<div className="chatbox-container">
			<ChatRoomTopBar />
			<div className="chatbox-inner-container">
				<ChatRoomMsgContainer />
				<ChatRoomUsersBar />
			</div>
			<RoomMessageInputBar />
		</div>
	);
};

export default ChatRoom;
