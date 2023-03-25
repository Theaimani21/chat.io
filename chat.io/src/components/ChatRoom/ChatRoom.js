import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import socket from '../../services/socketService';
import { setChatHistory } from '../../slices/chatIoSlice';
import ChatRoomMsgContainer from '../ChatRoomMsgContainer/ChatRoomMsgContainer';
import MessageInputBar from '../MessageInputBar/MessageInputBar';
import './styles.scss';

const ChatRoom = () => {
	const dispatch = useDispatch();
    // Get state of current room from store
	const currentChat = useSelector((state) => state.chatIo.currentChat);

	// const [chatRoom, setChatRoom] = useState('');

	// const [users, setUsers] = useState('');

	// const [ops, setOps] = useState('');


	useEffect(() => {
		// create interval so that room list updates every 2 seconds
		const interval = setInterval(() => {
			// Get the initial room list
			socket.on("updateusers", (room, users, ops) => {
				console.log('room: ' + room);
				console.log('users: ');
				console.log(users)
				console.log('ops: ');
				console.log(ops);
			});
			socket.on("updatechat", (room, messageHistory) => {
				console.log('room: ' + room);
				console.log('m histyory: ');
				console.log(messageHistory);
				dispatch(setChatHistory({room: room, history: messageHistory}));
			});
			socket.on("updatetopic", (room, topic, user) => {
				console.log('room: ' + room);
				console.log('topic: ' + topic);
				console.log('user: ' + user);
			});

		}, 2000);

		return () => {
			clearInterval(interval);
			socket.off('rooms');
		};
	}, []);

	
	return (
	<div className="chatbox-container">
		<h2 className='chatbox-heading'>Chat room: {currentChat} </h2>
		<ChatRoomMsgContainer />
		
		<MessageInputBar />
	</div>
)};

export default ChatRoom;
