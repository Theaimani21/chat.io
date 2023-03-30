import React from 'react';
import ChatBubble from '../../resources/ChatBubble.png';
import './styles.scss';

const HomeBox = () => {
	return (
		<div className="homebox-container">
			<h1 className="homebox-heading">Welcome to chat.io </h1>
			<img src={ChatBubble} alt="ChatBubbleImage" className="chat-bubble-img" />
			<div className="home-content">
				<h3>
					Start chatting by select a chat room from the sidebar or <br />
					a private chat by selecting an online user.  
				</h3>
			</div>
		</div>
	);
};

export default HomeBox;
