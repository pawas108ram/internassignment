import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { HiDotsHorizontal } from 'react-icons/hi'
import TicketCard from './TicketCard'
import clsx from 'clsx'
import { useThemeContext } from '../context/ThemeContextProvider'

const StatusCard = ({ statusOption, ticketData, users }: { statusOption: any, ticketData: any[], users: any[] }) => {
    const [statusTicketData, setStatusTicketData] = useState<any[]>([])
    useEffect(() => {
        setStatusTicketData(ticketData.filter((ticket) => ticket.status === statusOption.value))
    }, [ticketData, statusOption.value])
    const {theme}=useThemeContext();
  return (
      <div className='flex flex-col gap-3 col-span-1'>
           <div className='flex flex-row items-center justify-between '>
              <div className='flex flex-row items-center gap-1'>
                  <statusOption.icon as Icon />
                  <span>{statusOption.label}</span>
                  <span className={clsx('text-black/40',theme==='DARK' && 'text-white/40')}>{statusTicketData.length}</span>
              </div>
              <div className={clsx('flex flex-row items-center gap-1 text-black/50',theme==="DARK" && 'text-white/40')}>
                  <FaPlus size={12} />
                  <HiDotsHorizontal size={12} />
              </div>
          </div>
          <div className='flex flex-col gap-2 items-center '>
              {statusTicketData.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} user={users.find((user) => user.id === ticket.userId)} showPriority={true} />))}
          </div>
      
      
    </div>
  )
}

export default StatusCard
