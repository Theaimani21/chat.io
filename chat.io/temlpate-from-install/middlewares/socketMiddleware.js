// import * as constants from '../../constants';
// import { setupLisners } from './lisners';
// import io from 'socket.io-client';

// const socket = io('http://localhost:8080', { 
//     autoConnect: false
// });

// const socketMiddleware = 
//     store => {
//         return next => action => {
//             if (action.type === constants.CONNECT_SOCKET) {
//                 const { sessionID } = action.payload;
//                 socket.auth = { sessionID };
//                 socket.connect();
//             }
//             // Give controll to next middleware / reducer
//             return next(action)
//         }
//     }