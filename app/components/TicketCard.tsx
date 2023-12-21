'use client'
import React from 'react'
import { createInitials } from '../libs/nameShortener'
import clsx from 'clsx'
import { getRandomColor } from '../libs/randomColorGenerator'
import { getIconNameForPriority, priorityOptions } from '../types/priorityTypes'
import { getIconForStatus, statusOptions } from '../types/statusTypes';
import { useThemeContext } from '../context/ThemeContextProvider'

const TicketCard = ({ ticket, user ,showPriority}: { ticket: any, user?: any ,showPriority?:boolean}) => {
    const Icon = getIconForStatus(ticket.status)
    const PriorityIcon = showPriority ? getIconNameForPriority(ticket.priority) : undefined;
    const { theme } = useThemeContext();
  return (
      <div className={clsx('bg-white shadow-md w-full p-2 rounded',theme==='DARK' && 'bg-[#161B22] text-white outline outline-white/60 outline-[0.5px]')}>
          <div className='flex flex-row items-center justify-between'>
              <span className={clsx('text-black/50', theme==='DARK' && 'text-white/70')}>{ticket.id}</span>
              {user && <span className={clsx('rounded-full flex flex-row items-center justify-center h-6 w-6 text-xs relative', getRandomColor())}>
                  {createInitials(user.name)}
                  <span className={clsx('p-1 rounded-full absolute -bottom-0.5 -right-0.5', user.available ? 'bg-yellow-500' : 'bg-gray-500')}></span>
              </span>}
            
          </div>
          <div className='flex flex-row items-start gap-2'>
              <Icon />
              <span className={clsx('font-semibold text-base text-black/80',theme==='DARK' && 'text-white/90')}>{ticket.title}</span>
            
             
              
              
          </div>
          <div className="flex flex-row items-center gap-2">
              {showPriority && PriorityIcon &&  <span className='border-gray-200 border-2'><PriorityIcon size={20} /></span>}
              <ul className='flex flex-row items-center flex-wrap list-disc list-inside'>
                  {ticket.tag.map((t: string) => (
                      <li key={t} className='bg-white border-gray-200 border-2 rounded px-1 py-0.5 text-xs text-black/60'>{t}</li>
                    ))}
                       </ul>
          </div>
    </div>
  )
}

export default TicketCard
