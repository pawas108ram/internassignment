import { IconType } from 'react-icons';
import { TbAntennaBars1, TbAntennaBars2, TbAntennaBars3, TbAntennaBars4, TbAntennaBars5 } from "react-icons/tb"

type IconMap = Record<string, IconType>;

export function getIconNameForPriority(value:number) {
    const iconMap:IconMap = {
      "0": TbAntennaBars1,
      "1": TbAntennaBars2,
      "2": TbAntennaBars3,
      "3": TbAntennaBars4,
    "4": TbAntennaBars5,
      
    };
  
    
    return iconMap[value ]  || TbAntennaBars1;
}
  
export const priorityOptions = [
    
        { label: 'No Priority', value: '0', icon: TbAntennaBars1 },
        { label: 'Low', value: '1', icon: TbAntennaBars2 },
        { label: 'Medium', value: '2', icon: TbAntennaBars3 },
        { label: 'High', value: '3', icon: TbAntennaBars4 },
        { label: 'Urgent', value: '4', icon: TbAntennaBars5 },
      
      
];