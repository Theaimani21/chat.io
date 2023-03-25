import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import RoomButton from '../RoomButton/RoomButton';
import socket from '../../services/socketService';
import './styles.scss';
import PasswordDialog from '../PasswordDialog/PasswordDialog';
import { setCurrentChat } from '../../slices/chatIoSlice';
import { useNavigate } from 'react-router-dom';

const Room = ({ roomName, room }) => {
	const dispatch = useDispatch();
  const navigate = useNavigate();

	// State of if password dialog is open
	const [passDialogOpen, setPassDialogOpen] = useState(false);

	// State of room password input
	const [roomPassword, setRoomPassword] = useState('');

	// State if room is password protected
	const [passwordProtected, setPasswordProtected] = useState(false);

  // State of error message in password dialog
  const [errorMessage, setErrorMessage] = useState('');
	
	const handleJoinRoom = () => {
		const roomInfo = {
			room: roomName,
		};

    setPassDialogOpen(false);
    
		if (passwordProtected) {
			roomInfo['pass'] = roomPassword;
		}

		socket.emit('joinroom', roomInfo, (hasJoined, reason) => {
      
			if (hasJoined) {

        // Reset states
				setPassDialogOpen(false);
				setPasswordProtected(false);
        setRoomPassword('');
        setErrorMessage('');

        // Change redux store state current room to the joined room
        dispatch(setCurrentChat(roomInfo.room))

        // navigate to chat room 
        navigate('chatRoom');
			} 
      else if (reason === 'wrong password') {
        // Add error message to dialog if the user has already added a password
        if ('pass' in roomInfo) {
          setErrorMessage('Wrong password');
        }
        // Reset password
        setRoomPassword('');
				setPasswordProtected(true);
				setPassDialogOpen(true);
			} else if (reason === 'banned') {
        setRoomPassword('');

				console.log('banned from this room, creat an alert for this!');
			}
		});
	};

	return (
		<>
			<RoomButton onClick={() => handleJoinRoom()}>{roomName}</RoomButton>
			<PasswordDialog
				open={passDialogOpen}
				cancel={() => setPassDialogOpen(!passDialogOpen)}
				submit={() => handleJoinRoom()}
        password={roomPassword}
				setPassword={(p) => setRoomPassword(p)}
        errorMessage={errorMessage}
			/>
		</>
	);
};

export default Room;
