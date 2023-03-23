import React from 'react';
import 'styles.scss';
import Chat from '../Chat/Chat';

const Chats = ({ chats }) => (
	<div className="chats">
		{chats.map((c) => (
			<Chat key={c.id} chat={c} />
		))}
	</div>
);

export default Chats;
