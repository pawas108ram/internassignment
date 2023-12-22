import React from 'react'
import { priorityOptions } from '../types/priorityTypes';
import PriorityCard from './PriorityCard';
import clsx from 'clsx';


const PriorityLayout = ({ ticketData, users }: { ticketData: any[], users: any[] }) => {
    
  return (
      <div className={clsx('grid lg:grid-cols-5 gap-4 lg:p-4 md:p-3 sm:p-2  w-full sm:grid-cols-1 md:grid-cols-3 ')}>
          {priorityOptions.map((priorityOption, index) => (
              <PriorityCard key={priorityOption.value} priorityOption={priorityOption} ticketData={ticketData} users={users} />
         ))}
        
      
    </div>
  )
}

export default PriorityLayout
