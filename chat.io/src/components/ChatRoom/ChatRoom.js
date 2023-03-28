import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import socket from '../../services/socketService';
import { setChatHistory, setChatUsersInfo, setIsUserRoomOp } from '../../slices/chatIoSlice';
import AlertPopUp from '../AlertPopUp/AlertPopUp';
import ChatRoomMsgContainer from '../ChatRoomMsgContainer/ChatRoomMsgContainer';
import ChatRoomTopBar from '../ChatRoomTopBar/ChatRoomTopBar';
import ChatRoomUsersBar from '../ChatRoomUsersBar/ChatRoomUsersBar';
import RoomMessageInputBar from '../RoomMessageInputBar/RoomMessageInputBar';
import './styles.scss';

const ChatRoom = () => {
	const dispatch = useDispatch();

	// State of user from store
	const currentUser = useSelector((state) => state.chatIo.user);
	// State of if the user is a room op from store
	const isUserRoomOp = useSelector((state) => state.chatIo.isUserRoomOp);

	// State for op alert
	const [opAlertState, setOpAlertState] = useState(false);
	const [opAlertMsg, setOpAlertMsg] = useState('');

	// Alert user if they become a op of a room
	useEffect(() => {
		// if user has become a room op
		if (isUserRoomOp) {
			// Set alert message and send user alert
			setOpAlertMsg('You are now an Op of this room');
			setOpAlertState(true);
		}
	}, [isUserRoomOp]);

	// Update room users and room ops
	useEffect(() => {
		socket.on('updateusers', (room, users, ops) => {
			// Update room users and room ops state in store
			dispatch(setChatUsersInfo({ room: room, users: users, ops: ops }));
			// If user is room op state is set to false and the user is now an op
			if (!isUserRoomOp && Object.keys(ops).includes(currentUser)) {
				// Update the is user room op state on store to true
				dispatch(setIsUserRoomOp({ room: room, isRoomOp: true }));
			}
		});
		return () => {
			socket.off('updateusers');
		};
	});

	// Update message history
	useEffect(() => {
		socket.on('updatechat', (room, messageHistory) => {
			// Update message history state in store
			dispatch(setChatHistory({ room: room, history: messageHistory }));
		});
		return () => {
			socket.off('updatechat');
		};
	});

	// Close op alert
	const handleAlertClose = () => {
		setOpAlertState(false);
		setOpAlertMsg('');
	};

	return (
		<div className="chatbox-container">
			<ChatRoomTopBar />
			<div className="chatbox-inner-container">
				<ChatRoomMsgContainer />
				<ChatRoomUsersBar />
			</div>
			<RoomMessageInputBar />
			<AlertPopUp
				open={opAlertState}
				close={() => handleAlertClose()}
				msg={opAlertMsg}
				severity="success"
			/>
		</div>
	);
};

export default ChatRoom;
