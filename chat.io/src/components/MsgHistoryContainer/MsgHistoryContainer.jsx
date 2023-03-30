import React from 'react';
// import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ChatMsg from '../ChatMsg/ChatMsg';
import './styles.scss';

const MsgHistoryContainer = ({ chatHistory, chatType }) => {
	// Get current chat history from store
	// const chatHistory = useSelector((state) => state.chatIo.chatHistory);
	

	// might have to create use effect
	let chatMessages;

	if (chatHistory.length > 0) {
		if (chatType === 'priv') {
      chatMessages = chatHistory.map((msg) => (
        <ChatMsg key={msg.timestamp} nick={msg.sender} timestamp={msg.timestamp} msg={msg.msg} />
      ));
		} else if (chatType === 'room') {
			chatMessages = chatHistory.map((msg) => (
				<ChatMsg key={msg.timestamp} nick={msg.nick} timestamp={msg.timestamp} msg={msg.message} />
			));
		}
	} else {
		chatMessages = <p className="no-chat-msg">No chat messages yet</p>;
	}

	return <div className="chat-content">{chatMessages}</div>;
};

MsgHistoryContainer.propTypes = {
	chatHistory: PropTypes.array.isRequired,
	chatType: PropTypes.string.isRequired,
};

export default MsgHistoryContainer;
