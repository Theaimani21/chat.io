import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../services/socketService';
import { useNavigate } from 'react-router-dom';
import { resetAllChatInfo, setChatTopic } from '../../slices/chatIoSlice';
import ActionButton from '../ActionButton/ActionButton';
import ChatRoomSettingsMenu from '../ChatRoomSettingsMenu/ChatRoomSettingsMenu';
import { MdExitToApp } from 'react-icons/md';
import './styles.scss';

const ChatTopBar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Get state of user from store
	const currentChat = useSelector((state) => state.chatIo.currentChat);

	// Get state of room topic from store
	const chatTopic = useSelector((state) => state.chatIo.chatTopic);

	// Get state of available rooms from store
	const availableRooms = useSelector((state) => state.chatIo.availableRooms);

	// Get state of room ops from store
	const roomOps = useSelector((state) => state.chatIo.roomOps);

	// Get state of current user from store
	const user = useSelector((state) => state.chatIo.user);

	// Listen to topic updates and update topic in store
	useEffect(() => {
		socket.on('updatetopic', (room, topic, user) => {
			// Update topic state in store
			dispatch(setChatTopic({ room: currentChat.name, topic: topic, user: user }));
		});

		return () => {
			socket.off('updatetopic');
		};
	});

	// Leave current room and reset state in store
	const handleLeaveRoom = () => {
		if (currentChat.type === 'room' && availableRooms.includes(currentChat.name)) {
			// Notify chat server that user has left room
			socket.emit('partroom', currentChat.name);
		}
		// Reset all chat info store states
		dispatch(resetAllChatInfo());
		// Navitage to home
		navigate('/dashboard/home');
	};

	return (
		<div className="chat-topbar-container">
			{currentChat.type === 'room' ? (
				<>
					<div className="chat-topbar">
						<h2 className="chatbox-heading">{currentChat.name}</h2>
						<h5 className="chatbox-topic">{chatTopic}</h5>
						<div className="chatbox-action-container">
							{roomOps.includes(user) ? <ChatRoomSettingsMenu /> : <></>}
							<ActionButton onClick={() => handleLeaveRoom()} classes="leave-room">
								Leave Room <MdExitToApp className="leave-icon" />
							</ActionButton>
						</div>
					</div>
				</>
			) : (
				<>
					<div className="chat-topbar">
						<h2 className="chatbox-heading">{currentChat.name}</h2>
						<div className="chatbox-action-container">
							<ActionButton onClick={() => handleLeaveRoom()} classes="leave-room">
								Leave private Chat <MdExitToApp className="leave-icon" />
							</ActionButton>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ChatTopBar;
