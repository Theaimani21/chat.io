import React from 'react';
import { useSelector } from 'react-redux';
import ChatMsg from '../../components/ChatMsg/ChatMsg';
import './styles.scss';

const ChatRoomMsgContainer = () => {
	const chatHistory = useSelector((state) => state.chatIo.chatHistory);

	let chatMessages;

	if (chatHistory.length > 0) {
		chatMessages = chatHistory.map((msg) => (
			<ChatMsg key={msg.timestamp} nick={msg.nick} timestamp={msg.timestamp} msg={msg.message} />
		));
	} else {
		chatMessages = <p className="no-chat-msg">No chat messages yet</p>;
	}

	return <div className="chat-content">{chatMessages}</div>;
};

export default ChatRoomMsgContainer;
