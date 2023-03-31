import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import './styles.scss';

const ChatRoomUser = ({ user }) => {
	// Current user from store state
	const currentUser = useSelector((state) => state.chatIo.user);

	// Classes for room user
	let classes = 'online-user';

	// Check if user is the current user
	if (user === currentUser) {
		// Set classes to current user classes
		classes = 'online-user isUser';
	}

	return (
		<h5 className={classes} data-testid="chat-room-user-test">
			{user}
		</h5>
	);
};

ChatRoomUser.propTypes = {
	user: PropTypes.string.isRequired,
};

export default ChatRoomUser;
