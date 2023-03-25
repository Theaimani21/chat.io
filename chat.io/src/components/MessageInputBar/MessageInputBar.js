import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import socket from '../../services/socketService';
import Button from '../Button';
import './styles.scss';

const MessageInputBar = () => {
    const [message, setMessage] = useState('');

    //
	const currentRoom = useSelector((state) => state.chatIo.currentChat);

    const handleSendMsg =  () => {
        const msgData = {
            roomName: currentRoom,
            msg: message,
        }

        socket.emit('sendmsg', msgData);
    }

	return (
		<div className="msg-bar-container">
			<input 
                className="chat-input" 
                type="text" 
                id="chat" 
                placeholder="Enter message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={() =>handleSendMsg()}>Send</Button>
		</div>
	);
};

export default MessageInputBar;
