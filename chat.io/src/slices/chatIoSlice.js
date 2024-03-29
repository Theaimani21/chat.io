import { createSlice } from '@reduxjs/toolkit';
import AngelEmoji from '../resources/AngelEmoji.png';

const initialStateOptions = {
	user: '',
	userEmoji: AngelEmoji,
	onlineUsers: [],
	availableRooms: [],
	privateMessages: [],
	currentChat: { name: '', type: 'none' },
	chatHistory: [],
	chatTopic: '',
	roomUsers: [],
	roomOps: [],
	isUserRoomOp: false,
	bannedRooms: [],
};

const chatIoSlice = createSlice({
	name: 'chatIo',
	initialState: initialStateOptions,
	reducers: {
		setUser: (state, action) => {
			// Update current user to new user
			state.user = action.payload;
		},
		setUserEmoji: (state, action) => {
			// Update current userEmoji to new Emoji
			state.userEmoji = action.payload;
		},
		setOnlineUsers: (state, action) => {
			// Update online user list to new online user list
			state.onlineUsers = action.payload;
		},
		setAvailableRooms: (state, action) => {
			// Update available room list to new available room list
			state.availableRooms = action.payload;
		},
		setCurrentChat: (state, action) => {
			// Create the new current chat info object
			const newChatinfo = { name: action.payload.name, type: action.payload.type };
			// Update current chat to new chat info
			state.currentChat = newChatinfo;
		},
		setChatHistory: (state, action) => {
			// Check if the action room is the current room
			if (action.payload.room === state.currentChat.name) {
				// Update the chat history list with the new chat history
				state.chatHistory = action.payload.history;
			}
		},
		setChatTopic: (state, action) => {
			// Check if the action room is the current room
			if (action.payload.room === state.currentChat.name) {
				// Update the chat topic str with the new chat topic and username
				state.chatTopic = action.payload.topic;
			}
		},
		setChatUsersInfo: (state, action) => {
			// Check if the action room is the current room
			if (action.payload.room === state.currentChat.name) {
				// Update the chat users with the new chat users names
				state.roomUsers = Object.keys(action.payload.users);
				// Update the chat ops with the new chat ops names
				state.roomOps = Object.keys(action.payload.ops);
			}
		},
		addPrivateMessage: (state, action) => {
			const newMsg = {
				msg: action.payload.msg,
				sender: action.payload.sender,
				timestamp: action.payload.timestamp,
			};

			// Get the index of senders private messages info
			const index = state.privateMessages.findIndex(
				(msgInfo) => msgInfo.sender === action.payload.sender
			);

			if (index >= 0) {
				// Get the senders private messages list
				const privMsglist = state.privateMessages[index].messages;
				// Add the new message to senders private messages list
				privMsglist.push(newMsg);

				// Update the state of senders private messages list
				state.privateMessages[index].messages = privMsglist;
			} else {
				// Create new private sender info object
				const newPrivMsgInfo = { sender: action.payload.sender, messages: [newMsg] };
				// Get state of privateMessages and add new private sender info object
				const updatedPivMessages = state.privateMessages;
				updatedPivMessages.push(newPrivMsgInfo);

				// Update state of privateMessages
				state.privateMessages = updatedPivMessages;
			}
		},
		addSentPrivateMessage: (state, action) => {
			// payload => msg, timestamp, recipient
			const newMsg = {
				msg: action.payload.msg,
				sender: state.user,
				timestamp: action.payload.timestamp,
			};

			// Get the index of recipient private messages info
			const index = state.privateMessages.findIndex(
				(msgInfo) => msgInfo.sender === action.payload.recipient
			);

			if (index >= 0) {
				// Get the senders private messages list
				const privMsglist = state.privateMessages[index].messages;
				// Add the new message to senders private messages list
				privMsglist.push(newMsg);

				// Update the state of senders private messages list
				state.privateMessages[index].messages = privMsglist;
			} else {
				// Create new private sender info object
				const newPrivMsgInfo = { sender: action.payload.recipient, messages: [newMsg] };
				// Get state of privateMessages and add new private sender info object
				const updatedPivMessages = state.privateMessages;
				updatedPivMessages.push(newPrivMsgInfo);

				// Update state of privateMessages
				state.privateMessages = updatedPivMessages;
			}
		},
		resetAllChatInfo: (state) => {
			// Reset chat history to initial state
			state.chatHistory = [];
			// Reset chat topic to initial state
			state.chatTopic = '';
			// Reset current chat to initial state
			state.currentChat = { name: '', type: 'none' };
			// Reset is user room op to false
			state.isUserRoomOp = false;
		},
		setIsUserRoomOp: (state, action) => {
			// Check if the action room is the current room
			if (action.payload.room === state.currentChat.name) {
				// Update the is user room op to isRoomOp value
				state.isUserRoomOp = action.payload.isRoomOp;
			}
		},
		addBannedRoom: (state, action) => {
			// Update banned rooms array by adding the new banned room
			state.bannedRooms = [...state.bannedRooms, action.payload];
		},
	},
});

export const {
	setUser,
	setUserEmoji,
	setOnlineUsers,
	setAvailableRooms,
	setCurrentChat,
	setChatHistory,
	setChatTopic,
	setChatUsersInfo,
	addPrivateMessage,
	addSentPrivateMessage,
	resetAllChatInfo,
	setIsUserRoomOp,
	addBannedRoom,
} = chatIoSlice.actions;
export default chatIoSlice.reducer;
