import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import './styles.scss';

const ChatMsg = ({ nick, timestamp, msg }) => {
	// Get current user from store state
	const user = useSelector((state) => state.chatIo.user);

	// Create chat msg classes
	let classes = 'msg-container msg-from-other';

	// Check if nick is the current user
	if (nick === user) {
		// Change classes to current user classes
		classes = 'msg-container msg-from-user';
	}

	// Date option settings
	const dateOpt = {
		weekday: 'long',
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	};

	// Date string formatted according to date option settings
	const date = new Date(timestamp).toLocaleDateString('is-IS', dateOpt);

	return (
		<div className={classes} data-testid="chat-msg-test">
			<h5 className="msg-sender">{nick === user ? 'You' : nick}</h5>
			<h4 className="msg">{msg}</h4>
			<p className="msg-date">{date}</p>
		</div>
	);
};

ChatMsg.propTypes = {
	nick: PropTypes.string.isRequired,
	timestamp: PropTypes.string.isRequired,
	msg: PropTypes.string.isRequired,
};

export default ChatMsg;
