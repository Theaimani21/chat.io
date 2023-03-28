import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../services/socketService';
import { useNavigate } from 'react-router-dom';
import { resetAllChatInfo, setChatTopic } from '../../slices/chatIoSlice';
import ActionButton from '../ActionButton/ActionButton';
import ChatRoomSettingsMenu from '../ChatRoomSettingsMenu/ChatRoomSettingsMenu';
import { MdExitToApp } from 'react-icons/md';
import './styles.scss';

const ChatRoomTopBar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const currentChat = useSelector((state) => state.chatIo.currentChat);
	const chatTopic = useSelector((state) => state.chatIo.chatTopic);
	const availableRooms = useSelector((state) => state.chatIo.availableRooms);

	// Get state of room ops from store
	const roomOps = useSelector((state) => state.chatIo.chatOps);

	// Get state of current user from store
	const user = useSelector((state) => state.chatIo.user);

	useEffect(() => {
		socket.on('updatetopic', (room, topic, user) => {
			// Update topic state in store
			dispatch(setChatTopic({ room: currentChat, topic: topic, user: user }));
		});

		return () => {
			socket.off('updatetopic');
		};
	});

	// Leave current room and reset state in store
	const handleLeaveRoom = () => {
		if (currentChat.length > 0 && availableRooms.includes(currentChat)) {
			// Notify chat server that user has left room
			socket.emit('partroom', currentChat);
		}

		// Reset all chat info store states
		dispatch(resetAllChatInfo());

		// Navitage to home
		navigate('/dashboard/home');
	};

	return (
		<div className="chat-topbar-container">
			{availableRooms.includes(currentChat) ? (
				<>
					<div className="chat-topbar">
						<h2 className="chatbox-heading">{currentChat}</h2>
						{roomOps.includes(user) ? <ChatRoomSettingsMenu /> : <></>}
						<ActionButton onClick={() => handleLeaveRoom()} classes="leave-room">
							Leave Room <MdExitToApp className="leave-icon" />
						</ActionButton>
					</div>
					<p className="chatbox-topic">{chatTopic}</p>
				</>
			) : (
				<>
					<div className="chat-topbar">
						<h2 className="chatbox-heading">{currentChat}</h2>
						<ActionButton onClick={() => handleLeaveRoom()} classes="leave-room">
							Leave Room <MdExitToApp className="leave-icon" />
						</ActionButton>
					</div>
				</>
			)}
		</div>
	);
};

export default ChatRoomTopBar;
