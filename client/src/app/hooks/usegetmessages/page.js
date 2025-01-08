import useConversation from '@/app/zustand/page';
import React, { useEffect, useState } from 'react';

const UseGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:9000/messages/${selectedConversation._id}`,
          {
            credentials: 'include',
          }
        );
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        console.log('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { loading, messages };
};

export default UseGetMessages;
