import React from 'react';
import PropTypes from 'prop-types';
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
	return (
		<div className={classes}>
			<h5 className="msg-sender">{nick === user ? 'You' : nick}</h5>
			<h4 className="msg">{msg}</h4>
			<p className="msg-date">{formattedDate}</p>
		</div>
	);
};

ChatMsg.propTypes = {
	nick: PropTypes.string.isRequired,
	timestamp: PropTypes.string.isRequired,
	msg: PropTypes.string.isRequired,
};

export default ChatMsg;
