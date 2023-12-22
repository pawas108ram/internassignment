"use client";
import { MouseEventHandler, use, useEffect, useRef, useState } from "react";
import { groupingFilterType } from "./types/groupingType";
import { orderingFilterType } from "./types/orderingType";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { FaAngleDown } from "react-icons/fa";
import { motion } from "framer-motion";
import { ThemeType } from "./types/theme";
import { IoMoonSharp } from "react-icons/io5";
import { FiSun } from "react-icons/fi";
import PriorityLayout from "./components/PriorityLayout";
import StatusLayout from "./components/StatusLayout";
import UserLayout from "./components/UserLayout";
import clsx from "clsx";
import { setLocalTheme, useThemeContext } from "./context/ThemeContextProvider";


export default function Home() {
  const [grouping, setGrouping] = useState<groupingFilterType>("PRIORITY");
  const [ordering, setOrdering] = useState<orderingFilterType>("PRIORITY");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const { theme, setTheme } = useThemeContext();
  const [tickets, setTickets] = useState<any[] | null>(null);
  const [users, setUsers] = useState<any[] | null>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const dropwDownRef2 = useRef<HTMLDivElement>(null);
 
  


  useEffect(() => {
    if (ordering === "PRIORITY" && tickets?.length) {
      setTickets((prev) => [...prev!].sort((a, b) => b.priority - a.priority));
    }
    if (ordering === "TITLE" && tickets?.length) {
      setTickets((prev) =>
        [...prev!].sort((a, b) => a.title.localeCompare(b.title))
      );
    }
  }, [ordering, tickets?.length]);

  useEffect(() => {
   
    const handleClickInside = (e: MouseEvent) => {
      if (dropDownRef.current?.contains(e.target as Node)) {
        if (!dropwDownRef2.current?.contains(e.target as Node)) {
          setShowFilters((prev)=>!prev)
        }
      } else {
        setShowFilters(false);
      }
    }
    document.addEventListener("click", handleClickInside);
    return () => {
      document.removeEventListener("click", handleClickInside);
    };
  },[dropDownRef])

  
  
  

 
  

  useEffect(() => {
    (async () => {
      const res = await fetch(
        "https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers"
      );
      const data = await res.json();
      console.log(data);
      setTickets(data.tickets);
      setUsers(data.users);
    })();
  }, []);

  return (
    <>
      {tickets && users ? (
        <div
          className={clsx(
            " w-full min-h-screen flex flex-col lg:gap-4 sm:gap-2 md:gap-3 ",
            theme === "DARK" ?"bg-[#010409] text-white":"bg-gray-200 text-black"
          )}
        >
          <div
            className={clsx(
              "flex flex-row items-center p-4 shadow justify-between",
              theme === "DARK" ?"bg-[#161B22]":" bg-white"
            )}
          >
            <div ref={dropDownRef} className="relative ">
            <button 
  
  className={clsx(
    "flex flex-row items-center rounded p-2 gap-2 relative shadow-md ",
    theme === "DARK" ? "bg-[#161B22] border-[#4A4A4A] shadow-[#4A4A4A]" : "bg-white"
  )}
>
  <HiOutlineAdjustmentsHorizontal />
  <span>Display</span>
  <motion.span
    animate={showFilters ? "up" : "down"}
    variants={{
      up: {
        rotate: 180,
      },
      down: {
        rotate: 0,
      },
    }}
    className="cursor-pointer"
  >
    <FaAngleDown />
  </motion.span>
</button>
              {showFilters && (
                <div ref={dropwDownRef2}
                
                
                    
                    className={clsx(
                      "flex flex-col  rounded shadow-md p-4 absolute top-12 gap-3 z-[9999999]  ",
                      theme === "DARK" ? "bg-[#161B22] text-white ":"bg-white"
                    )}
                  >
                    <div  className="flex flex-row items-center justify-between">
                      <span
                        className={clsx(
              
                          theme === "DARK" ? "text-white/80":"text-black/60"
                        )}
                      >
                        Grouping
                      </span>
                      <select
                        name="grouping"
                        id="grouping"
                        className={clsx(
                          "w-28 rounded form-select p-1",
                          theme === "DARK" && "bg-[#161B22] text-white/80"
                        )}
                        onChange={(e: any) => setGrouping(e.currentTarget.value)}
                        value={grouping}
                      >
                        <option value="PRIORITY">Priority</option>
                        <option value="STATUS">Status</option>
                        <option value="USER">User</option>
                      </select>
                    </div>
                    <div className="flex flex-row items-center gap-4 justify-between">
                      <span
                        className={clsx(
                          "text-black/60",
                          theme === "DARK" && "text-white/80"
                        )}
                      >
                        Ordering
                      </span>
                      <select
                        name="ordering"
                        id="ordering"
                        className={clsx(
                          "w-28 rounded form-select p-1",
                          theme === "DARK" && "bg-[#161B22] text-white/80"
                        )}
                        onChange={(e: any) => setOrdering(e.currentTarget.value)}
                        value={ordering}
                      >
                        <option value="PRIORITY">Priority</option>
                        <option value="TITLE">Title</option>
                      </select>
                    </div>
                  </div>
                )}
            </div>
            <button
              onClick={() => {
                setTheme((prev) => (prev === "LIGHT" ? prev = "DARK" : prev = "LIGHT"))
                setLocalTheme(theme==="LIGHT" ? "DARK" : "LIGHT");
               
              }
              }
            >
              {theme === "LIGHT" ? <IoMoonSharp /> : <FiSun />}
            </button>
          </div>

          
            {grouping === "PRIORITY" && (
              <PriorityLayout ticketData={tickets} users={users} />
            )}
            {grouping === "STATUS" && (
              <StatusLayout ticketData={tickets} users={users} />
            )}
            {grouping === "USER" && (
              <UserLayout ticketData={tickets} users={users} />
            )}
          
        </div>
      ) : (
        <div
          className={clsx(
            "flex flex-row items-center justify-center animate-pulse min-h-screen w-full lg:text-4xl sm:text-lg md:text-2xl font-semibold",
            theme === "DARK" ?"bg-black text-white ":"bg-gray-200 text-black "
          )}
          >
            
          Loading....
        </div>
      )}
    </>
  );
}
