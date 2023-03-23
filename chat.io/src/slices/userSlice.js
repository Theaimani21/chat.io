import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: { nickname: '', onlineUsers: [] },
	reducers: {
		setUser: (state, action) => {
			state.nickname = action.payload;
		},
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload
        }
	},
});

export const { setUser, setOnlineUsers } = userSlice.actions;
export default userSlice.reducer;
