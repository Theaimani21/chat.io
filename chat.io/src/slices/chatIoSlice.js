import { createSlice } from '@reduxjs/toolkit';

const initialStateOptions = {
	user: '',
	onlineUsers: [],
	currentChat: '',
	chatHistory: [],
	privateMessage: {},
}

const chatIoSlice = createSlice({
	name: 'chatIo',
	initialState: initialStateOptions,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
        setOnlineUsers: (state, action) => {
			// console.log('updating online users in slice')
            state.onlineUsers = action.payload
        },
		setCurrentChat: (state, action) => {
			state.currentChat = action.payload;
		},
		setChatHistory: (state, action) => {
			console.log('from store: ')
			console.log(action.payload);
			if (action.payload.room === state.currentChat) {
				state.chatHistory = action.payload.history
			}
			// state.chatHistory =
		}
	},
});

export const { setUser, setOnlineUsers, setCurrentChat, setChatHistory } = chatIoSlice.actions;
export default chatIoSlice.reducer;
