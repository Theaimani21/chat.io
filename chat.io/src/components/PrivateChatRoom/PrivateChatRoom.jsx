import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ChatTopBar from '../ChatTopBar/ChatTopBar';
import MessageInputBar from '../MessageInputBar/MessageInputBar';
import MsgHistoryContainer from '../MsgHistoryContainer/MsgHistoryContainer';
import './styles.scss';

const PrivateChatRoom = () => {
	// Get private messages from store
	const privateMessages = useSelector((state) => state.chatIo.privateMessages);

	// Get current chat from store
	const currentChat = useSelector((state) => state.chatIo.currentChat);

	// State of private messages
	const [privMessages, setPrivMessages] = useState([]);

	useEffect(() => {
		// Get index of private messages info
		const privateMsgInfoIndex = privateMessages.findIndex(
			(privMsgInfo) => privMsgInfo.sender === currentChat.name
		);

		// Check if there are any messages
		if (privateMsgInfoIndex !== -1) {
			setPrivMessages([...privateMessages[privateMsgInfoIndex].messages]);
		} else {
			setPrivMessages([]);
		}
	}, [privateMessages, currentChat]);

	return (
		<div className="private-chatbox-container">
			<ChatTopBar />
			<div className="chatbox-inner-container">
				<MsgHistoryContainer chatHistory={privMessages} chatType="priv" />
			</div>
			<MessageInputBar socketAction="privatemsg" />
		</div>
	);
};

export default PrivateChatRoom;
