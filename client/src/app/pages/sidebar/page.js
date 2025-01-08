import React from 'react'
import LogOutButton from './logOutButton/page'
import SearchInput from './searchInput/page'
import Conversations from './conversations/page'

const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col bg-slate-300 rounded-sm shadow-lg'>
      <SearchInput />
      <div className='divder px-3'></div>
      <Conversations />
      <LogOutButton />
    </div>
  )
}

export default Sidebar
