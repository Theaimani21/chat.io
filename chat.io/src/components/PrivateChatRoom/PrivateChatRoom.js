import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import socket from '../../services/socketService';
import { setChatHistory, setChatUsersInfo } from '../../slices/chatIoSlice';
import ChatRoomTopBar from '../ChatRoomTopBar/ChatRoomTopBar';
import PrivateChatRoomMsgContainer from '../PrivateChatRoomMsgContainer/PrivateChatRoomMsgContainer';
import PrivateMessageInputBar from '../PrivateMessageInputBar/PrivateMessageInputBar';
import './styles.scss';

const PrivateChatRoom = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();


	// Get state of user from store
	const currentChat = useSelector((state) => state.chatIo.currentChat);

	

	return (
		<div className="private-chatbox-container">
			<ChatRoomTopBar />
			<div className="chatbox-inner-container">
        <PrivateChatRoomMsgContainer />
			</div>
      <PrivateMessageInputBar />
		</div>
	);
};

export default PrivateChatRoom;
