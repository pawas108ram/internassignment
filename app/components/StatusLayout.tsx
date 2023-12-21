import React from 'react'
import StatusCard from './StatusCard'
import { statusOptions } from '../types/statusTypes'

const StatusLayout = ({ticketData,users}:{ticketData:any[],users:any[]}) => {
  return (
      <div className='grid lg:grid-cols-5 gap-4 lg:p-4 sm:p-1 md:p-2 w-full sm:grid-cols-1 md:grid-cols-3 '>
          {statusOptions.map((statusOption, index) => (
              <StatusCard key={statusOption.value} statusOption={statusOption} ticketData={ticketData} users={users} />
            ))}
      
    </div>
  )
}

export default StatusLayout
