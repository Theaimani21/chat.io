import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ChatMsg from '../ChatMsg/ChatMsg';
import './styles.scss';

const ChatRoomMsgContainer = () => {

    const chatHistory = useSelector((state) => state.chatIo.chatHistory);
// <p key={msg.timestamp}>User: {msg.nick}, time: {msg.timestamp}, msg: {msg.message}</p>
    const chatMessages = chatHistory.map((msg) => (<ChatMsg key={msg.timestamp} nick={msg.nick} timestamp={msg.timestamp} msg={msg.message}/>));

    // useEffect(() => {
    //     if(chatHistory.length > 0) {
    //         chatMessages.push(<p key={chatHistory[chatHistory.length - 1].timestamp}>hello</p>)
    //     }
    // }, [chatHistory]);

	return (
		<div className="chat-content">
			<h3>Select a chat from sidebar</h3>
            {chatMessages}
            
		</div>
	);
};

export default ChatRoomMsgContainer;
