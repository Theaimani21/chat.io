import React from 'react';
import ChatRoomTopBar from '../ChatRoomTopBar/ChatRoomTopBar';
import PrivateChatRoomMsgContainer from '../PrivateChatRoomMsgContainer/PrivateChatRoomMsgContainer';
import PrivateMessageInputBar from '../PrivateMessageInputBar/PrivateMessageInputBar';
import './styles.scss';

const PrivateChatRoom = () => {
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
