import './styles.scss';

const ChatBox = () => (
	<div className="chatbox-container">
		<h2 className='chatbox-heading'>Chat: </h2>
		<div className="chat-content">
			<h3>Select a chat from sidebar</h3>
		</div>
		<input className='chat-input' type="text" id="chat" placeholder="Enter message"></input>
	</div>
);

export default ChatBox;
