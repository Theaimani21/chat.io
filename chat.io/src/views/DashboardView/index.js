import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';
import socket from '../../services/socketService';
import AngelEmoji from '../../resources/AngelEmoji.png';
import CowboyEmoji from '../../resources/CowboyEmoji.png';
import DizzyEmoji from '../../resources/DizzyEmoji.png';
import DrunkEmoji from '../../resources/DrunkEmoji.png';
import MoneyEmoji from '../../resources/MoneyEmoji.png';
import NerdEmoji from '../../resources/NerdEmoji.png';
import SmirkEmoji from '../../resources/SmirkEmoji.png';
import SunglassesEmoji from '../../resources/SunglassesEmoji.png';
import ThinkingEmoji from '../../resources/ThinkingEmoji.png';
import DashSidebar from '../../components/DashSidebar/DashSidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { addBannedRoom, resetAllChatInfo, setUserEmoji } from '../../slices/chatIoSlice';
import { setOnlineUsers } from '../../slices/chatIoSlice';
import AlertPopUp from '../../components/AlertPopUp/AlertPopUp';

const DashboardView = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Get current chatIo from store
	const currentUser = useSelector((state) => state.chatIo.user);
	// Get online chatIo from store
	const onlineUsers = useSelector((state) => state.chatIo.onlineUsers);

	// state of kicked and banned alert
	const [alertState, setAlertState] = useState(false);
	const [alertMsg, setAlertMsg] = useState('');

	// Give user a unique emoji
	useEffect(() => {
		// Emoji array
		const emojis = [
			AngelEmoji,
			CowboyEmoji,
			DizzyEmoji,
			DrunkEmoji,
			MoneyEmoji,
			NerdEmoji,
			SmirkEmoji,
			SunglassesEmoji,
			ThinkingEmoji,
		];
		// select a random index
		const index = Math.floor(Math.random() * 9);
		const userEmoji = emojis[index];
		// Update store state of userEmoji
		dispatch(setUserEmoji(userEmoji));
	}, []);

	// Navigate back to welcome page if no user
	useEffect(() => {
		// check if user is online on server, if not the navigate back to welcome page
		if (currentUser.length < 1) {
			navigate('/');
		} else if (onlineUsers.includes(currentUser) === false) {
			navigate('/');
		}
	}, [currentUser, onlineUsers]);

	useEffect(() => {
		// Interval that updates users every 5 seconds
		const interval = setInterval(() => {
			// Get the initial users list
			socket.emit('users');
			// Get the list of online users
			socket.on('userlist', (users) => {
				dispatch(setOnlineUsers(users));
			});
		}, 2000);

		return () => {
			clearInterval(interval);
			socket.off('userlist');
		};
	}, []);

	// Update room users and room ops
	useEffect(() => {
		socket.on('kicked', (room, user, kicker) => {
			if (user === currentUser) {
				navigate('/dashboard/home');
				// reset the all chat info
				dispatch(resetAllChatInfo());

				// Notify user with alert
				setAlertMsg('You have been kicked from ' + room + ' by ' + kicker);
				setAlertState(true);
			}
		});
		return () => {
			socket.off('kicked');
		};
	});

	// Update room users and room ops
	useEffect(() => {
		socket.on('banned', (room, user, banner) => {
			if (user === currentUser) {
				navigate('/dashboard/home');
				// Add room to banned room list state in store
				dispatch(addBannedRoom(room));

				// reset the all chat info
				dispatch(resetAllChatInfo());

				// Notify user with alert
				setAlertMsg('You have been banned from ' + room + ' by ' + banner);
				setAlertState(true);
			}
		});
		return () => {
			socket.off('banned');
		};
	});

	// Close the kicked/banned alert
	const handleAlertClose = () => {
		setAlertState(false);
		setAlertMsg('');
	};

	return (
		<div className="dashboard">
			<DashSidebar />
			<Outlet />
			<AlertPopUp msg={alertMsg} open={alertState} close={handleAlertClose} severity="error" />
		</div>
	);
};

export default DashboardView;
