'use client'
import React from 'react'
import Conversation from '../Conversation/page'
import Useconversation from '@/app/hooks/useconversation/page';
import { getRandomEmoji } from '@/app/utils/page';

const Conversations = () => {

  const {loading, conversations} = Useconversation();
  console.log(conversations)
  return (
    <div className='py-2 px-2 flex flex-col scrollable mt-4'>
      {conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === conversations.length - 1}
				/>
      ))}
      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  )
}

export default Conversations
