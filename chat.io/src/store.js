import { configureStore } from '@reduxjs/toolkit';
import chatIoReducer from './slices/chatIoSlice';

export default configureStore({
	reducer: {
		chatIo: chatIoReducer,
	},
});
