import React from 'react';
import './styles.scss';

const ChatMsg = ({ nick, timestamp, msg }) => {
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

	return (
		<div className="msg-container">
			<h5>{nick}</h5>
			<h4>{msg}</h4>
			<p>{formattedDate}</p>
		</div>
	);
};

export default ChatMsg;
