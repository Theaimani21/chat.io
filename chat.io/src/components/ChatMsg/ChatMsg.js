import React from 'react';
import { useSelector } from 'react-redux';
import './styles.scss';

const ChatMsg = ({ nick, timestamp, msg }) => {
	const user = useSelector((state) => state.chatIo.user);

	let classes = 'msg-container msg-from-other';

	if (nick === user) {
		classes = 'msg-container msg-from-user';
	}

	const dateOpt = {
		weekday: 'long',
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	};

	const date = new Date(timestamp);

	const formattedDate = date.toLocaleDateString('is-IS', dateOpt);
	// {nick === user ? You : {nick}}
	return (
		<div className={classes}>
			<h5 className='msg-sender'>{nick === user ? 'You' : nick}</h5>
			<h4 className='msg'>{msg}</h4>
			<p className='msg-date'>{formattedDate}</p>
		</div>
	);
};

export default ChatMsg;
