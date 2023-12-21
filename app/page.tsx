"use client";
import { useEffect, useRef, useState } from "react";
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
import { useThemeContext } from "./context/ThemeContextProvider";

export default function Home() {
  const [grouping, setGrouping] = useState<groupingFilterType>("PRIORITY");
  const [ordering, setOrdering] = useState<orderingFilterType>("PRIORITY");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const { theme, setTheme } = useThemeContext();
  const [tickets, setTickets] = useState<any[] | null>(null);
  const [users, setUsers] = useState<any[] | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ordering === "PRIORITY" && tickets?.length) {
      setTickets((prev) => [...prev!].sort((a, b) => a.priority - b.priority));
    }
    if (ordering === "TITLE" && tickets?.length) {
      setTickets((prev) =>
        [...prev!].sort((a, b) => a.title.localeCompare(b.title))
      );
    }
  }, [ordering, tickets?.length]);

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [dropdownRef, setShowFilters]);
  

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
            " w-full min-h-screen ",
            theme === "DARK" ?"bg-[#010409] text-white":"bg-gray-200 text-black"
          )}
        >
          <div
            className={clsx(
              "flex flex-row items-center p-4 shadow justify-between",
              theme === "DARK" ?"bg-[#161B22]":" bg-white"
            )}
          >
            <div
              className={clsx(
                "flex flex-row items-center rounded p-2  gap-2 relative shadow-md  ",
                theme === "DARK" ?
                  "bg-[#161B22] border-[#4A4A4A] shadow-[#4A4A4A]":"bg-white "
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
                onClick={() => setShowFilters(!showFilters)}
                className="cursor-pointer"
              >
                <FaAngleDown />
              </motion.span>

              {showFilters && (
                <div ref={dropdownRef}
                  className={clsx(
                    "flex flex-col  rounded shadow-md p-4 absolute top-12 gap-3 z-[9999999] ",
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
                console.log(theme)
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
            "flex flex-row items-center justify-center bg-gray-200 text-black animate-pulse min-h-screen w-full lg:text-4xl sm:text-lg md:text-2xl font-semibold",
            theme === "DARK" && "bg-black text-white "
          )}
        >
          Loading....
        </div>
      )}
    </>
  );
}
