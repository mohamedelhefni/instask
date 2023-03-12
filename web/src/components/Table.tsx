import { useState } from "react";
import { Event } from "../types/types";
import { TableRow } from "./TableRow";

interface TableProps {
    headers: string[]
    events: Event[]
}


export function Table({ headers, events }: TableProps) {

    let [activeRecord, setActiveRecord] = useState<number>(-1);
    document.body.addEventListener("click", () => {
        setActiveRecord(-1)
    })
    return <>
        <div className="w-full flex flex-col items-start" >
            <div className="w-full grid grid-cols-3 text-gray-500 px-3 py-2 font-bold">
                {headers.map((header: string, idx: number) => (
                    <h4 key={idx}>{header.toUpperCase()}</h4>
                ))}
            </div>
            <div className="w-full flex flex-col items-center bg-white ">
                {events.map((event: Event, idx: number) =>
                (
                    <TableRow key={idx} id={idx} activeRecord={activeRecord} setActiveRecord={setActiveRecord} event={event} />
                ))}
            </div>
        </div>
    </>
}