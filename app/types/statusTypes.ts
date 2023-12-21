type statusFilterType = 'Backlog' | 'In progress' | 'Done' | 'Todo' | 'Cancelled'
import { LuCircleDotDashed } from "react-icons/lu"
import { GoDot } from "react-icons/go"
import { AiFillPieChart } from "react-icons/ai"
import { FaCheck } from "react-icons/fa6"
import { MdCancel } from "react-icons/md"

import { IconType } from "react-icons"
import React from "react"
interface statusOptionType {
    label: string,
    value: statusFilterType,
    icon?: IconType
}


export function getIconForStatus(label:statusFilterType)  {
  const iconMap = {
    'Backlog': LuCircleDotDashed ,
    'In progress': AiFillPieChart,
    'Done': FaCheck ,
    'Todo': GoDot ,
    'Cancelled': MdCancel,
    // Add more statuses and corresponding icons as needed
  };

  // Return the icon for the given status, or a default icon if not found
  return iconMap[label] || MdCancel;
}





export const statusOptions:statusOptionType[] = [
    { label: 'Backlog', value: 'Backlog', icon: LuCircleDotDashed },
    { label: 'Todo', value: 'Todo',icon:GoDot },
    { label: 'In Progress', value: 'In progress',icon:AiFillPieChart  },
    { label: 'Done', value: 'Done',icon:FaCheck  },
   
    { label: 'Cancelled', value: 'Cancelled',icon:MdCancel  },
]