import { useSocketContext } from '@/app/context/socketContext/page';
import useConversation from '@/app/zustand/page'
import React, { useEffect } from 'react'

const UseListenMessage = () => {
  const{messages,setMessages}= useConversation();
    const {socket} = useSocketContext();
    
    useEffect(() => {
        socket?.on('newMessage', (newMessage) => {
           // newMessage.shouldShake= true;
           setMessages([...messages, newMessage]);

        })
        return () => socket?.off('newMessage');
    },[socket,messages,setMessages])
}

export default UseListenMessage
