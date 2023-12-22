import React from 'react'
import Usercard from './Usercard'

const UserLayout = ({ticketData,users}:{ticketData:any[],users:any[]}) => {
  return (
      <div className='grid lg:grid-cols-5 lg:p-4 sm:p-2 md:p-3 gap-4 w-full sm:grid-cols-1 md:grid-cols-3'>
          {users.map((user, ind) => (
             <Usercard key={user.id} user={user} ticketData={ticketData} />
         ))}
    </div>
  )
}

export default UserLayout
