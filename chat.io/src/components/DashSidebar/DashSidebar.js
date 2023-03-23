import React from 'react';
import PrivateChats from '../PrivateChats/PrivateChats';
import Rooms from '../Rooms/Rooms';

const DashSidebar = () => {
  return (
    <div>
        <Rooms />
        <PrivateChats />
    </div>
  )
}

export default DashSidebar;