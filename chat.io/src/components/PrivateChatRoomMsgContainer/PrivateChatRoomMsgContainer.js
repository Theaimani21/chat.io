import React from 'react';
import { useSelector } from 'react-redux';
import ChatMsg from '../ChatMsg/ChatMsg';
import './styles.scss';

const PrivateChatRoomMsgContainer = () => {

  // Get private messages from store
	const privateMessages = useSelector((state) => state.chatIo.privateMessages);

  // Get current chat from store
	const currentChat = useSelector((state) => state.chatIo.currentChat);

	let privMessages;

	const privateMsgInfoIndex = privateMessages.findIndex((privMsgInfo) => (privMsgInfo.sender === currentChat))

	if (privateMessages.length > 0 && privateMsgInfoIndex !== -1) {

		privMessages = privateMessages[privateMsgInfoIndex].messages.map((msg) => (
			<ChatMsg key={msg.timestamp} nick={msg.sender} timestamp={msg.timestamp} msg={msg.msg} />
		));
	} 
	else {
		privMessages = <h5>No messages yet</h5>;
	}

	return <div className="chat-content">{privMessages}</div>;
};

export default PrivateChatRoomMsgContainer;
