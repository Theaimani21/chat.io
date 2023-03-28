import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import './styles.scss';

const ChatRoomUser = ({ user }) => {
	const currentUser = useSelector((state) => state.chatIo.user);

	let classes = 'online-user';

	if (user === currentUser) {
		classes = 'online-user isUser';
	}

	return (
		<h5 className={classes}>{user}</h5>
	);
};

ChatRoomUser.propTypes = {
	user: PropTypes.string.isRequired,
};

export default ChatRoomUser;
