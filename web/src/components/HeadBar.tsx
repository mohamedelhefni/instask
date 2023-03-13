import { Dispatch, useMemo, useState } from "react";
import { BsFilter } from "react-icons/bs";
import { IoDownload } from "react-icons/io5";
import { downloadCSV } from "../utils/csv";
import { Event } from "../types/types";
import { debounce } from "../utils/debounce";
interface HeadBarProps {
    isLiveLoading: boolean
    setIsLiveLoading: Dispatch<React.SetStateAction<boolean>>
    setSearchName: Dispatch<React.SetStateAction<string>>
    events: Event[]
}

export function HeadBar({ isLiveLoading, setIsLiveLoading, events, setSearchName }: HeadBarProps) {
    function searchResults(e: any) {
        setSearchName(e.target.value)
    }

    const debouncedResults = useMemo(() => {
        return debounce(searchResults, 300);
    }, []);

    return <>
        <div className="flex items-center justify-center w-full  p-4 ">
            <input onChange={debouncedResults} type="text" className="w-full  bg-transparent p-2 rounded-l-md border border-r-0 focus:outline-none focus:bg-white " placeholder="Search name,email or action..." />
            <div className="flex items-center border rounded-r-md ">
                <button className="transition p-2.5  text-sm text-gray-800 border-r  hover:bg-gray-200 flex items-center gap-1">
                    <BsFilter size={20} />
                    <span>FILTER</span>
                </button>
                <button onClick={() => {
                    downloadCSV(events)
                }} className="transition p-2.5  text-sm text-gray-800 hover:bg-gray-200 flex items-center gap-1">
                    <IoDownload size={20} />
                    <span>EXPORT</span>
                </button>
                <button onClick={() => { setIsLiveLoading(!isLiveLoading) }} className="transition p-2.5  text-sm text-gray-800 border-l  hover:bg-gray-200 flex items-center gap-1">
                    <div className={`w-3 h-3 ${isLiveLoading ? 'bg-green-300 ' : 'bg-red-300'} rounded-full`}></div>
                    <span>LIVE</span>
                </button>
            </div>
        </div>

    </>
}