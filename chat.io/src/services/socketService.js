import { io } from 'socket.io-client';
const URL = 'http://localhost:8180';

export default io(URL);