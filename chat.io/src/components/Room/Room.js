import React, {useState, useEffect } from 'react';
import RoomButton from '../RoomButton/RoomButton';
import './styles.scss';



const Rooms = ({ name, room }) => {


  return (
    <>
      <RoomButton>{name}</RoomButton>
    </>
  )
}

export default Rooms;