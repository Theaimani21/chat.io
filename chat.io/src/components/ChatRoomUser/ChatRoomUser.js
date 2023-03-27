import React from 'react';
import { useSelector } from 'react-redux';
import './styles.scss';

const ChatRoomUser = ({user, isOp}) => {

  const currentUser = useSelector((state) => state.chatIo.user); 

  let classes = 'online-user';

  if (user === currentUser ) {
    classes = 'online-user isUser';
  }

  
  return (
    <div>
      {/* {isOp ? <p>Room Op</p> : <></>} */}
      {/* <h5>{user}</h5> */}
      <h5 className={classes}>{user}</h5>
    </div>
  )
}

export default ChatRoomUser;