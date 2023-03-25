import React from 'react';
import { useSelector } from 'react-redux';
import PrivateChats from '../PrivateChats/PrivateChats';
import Rooms from '../Rooms/Rooms';
import './styles.scss';

const DashSidebar = () => {

  const user = useSelector((state) => state.chatIo.user)
  
  return (
    <div className="sidebar-container">
      <h1>User: {user}</h1>
        <Rooms />
        <PrivateChats />
    </div>
  )
}

export default DashSidebar;