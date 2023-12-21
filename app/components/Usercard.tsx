import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { HiDotsHorizontal } from 'react-icons/hi'
import { createInitials } from '../libs/nameShortener'
import clsx from 'clsx'
import { getRandomColor } from '../libs/randomColorGenerator'
import TicketCard from './TicketCard'
import { useThemeContext } from '../context/ThemeContextProvider'

const Usercard = ({ user, ticketData }: { user: any, ticketData: any[] }) => {
    const [userTicketData, setUserTicketData] = useState<any[]>([])
    useEffect(() => {
        setUserTicketData(ticketData.filter((ticket) => ticket.userId === user.id))
    }, [ticketData, user.id])
    const { theme } = useThemeContext();
  return (
    <div className='flex flex-col gap-3 col-span-1'>
           <div className='flex flex-row items-center justify-between '>
              <div className='flex flex-row items-center gap-2'>
              {user && <span className={clsx('rounded-full flex flex-row items-center justify-center h-6 w-6 text-xs relative ', getRandomColor())}>
                  {createInitials(user.name)}
                  <span className={clsx('p-1 rounded-full absolute -bottom-0.5 -right-0.5', user.available ? 'bg-yellow-500' : 'bg-gray-500')}></span>
              </span>}
                  <span>{user.name}</span>
                  <span className={clsx(theme==='DARK' ? 'text-white/40':"text-black/40")}>{userTicketData.length}</span>
              </div>
              <div className={clsx('flex flex-row items-center gap-1',theme==="DARK" ? 'text-white/40':"text-black/50")}>
                  <FaPlus size={12} />
                  <HiDotsHorizontal size={12} />
              </div>
          </div>
          <div className='flex flex-col gap-2 items-center '>
              {userTicketData.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket}  showPriority={true} />))}
          </div>
      
      
    </div>
  )
}

export default Usercard
