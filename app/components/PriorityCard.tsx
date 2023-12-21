'use client'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { HiDotsHorizontal } from 'react-icons/hi'
import TicketCard from './TicketCard'
import { useThemeContext } from '../context/ThemeContextProvider'
import clsx from 'clsx'

const PriorityCard = ({ priorityOption, ticketData,users }: { priorityOption: any, ticketData: any[],users:any[] }) => {
    const [priorityTicketData, setPriorityTicketData] = useState<any[]>([])
    useEffect(() => {
        setPriorityTicketData(ticketData.filter((ticket) => ticket.priority === parseInt(priorityOption.value)))
    }, [ticketData, priorityOption.value])
    const { theme } = useThemeContext();
  return (
      <div className='flex flex-col gap-3 col-span-1'>
          <div className='flex flex-row items-center justify-between '>
              <div className='flex flex-row items-center gap-1'>
                  <priorityOption.icon as Icon />
                  <span>{priorityOption.label}</span>
                  <span className={clsx('text-black/40',theme==='DARK' && 'text-white/40')}>{priorityTicketData.length}</span>
              </div>
              <div className={clsx('flex flex-row items-center gap-1 text-black/50',theme==="DARK" && 'text-white/40')}>
                  <FaPlus size={12} />
                  <HiDotsHorizontal size={12} />
              </div>
          </div>
          <div className='flex flex-col gap-2 items-center '>
              {priorityTicketData.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} user={users.find((user)=>user.id===ticket.userId)} />))}
          </div>
      
    </div>
  )
}

export default PriorityCard
