import { ReactNode, useState } from "react";
import { Event } from "../types/types";
import { TableRow } from "./TableRow";

interface TableProps {
    headers: string[]
    children: ReactNode
}


export function Table({ headers, children: child }: TableProps) {


    return <>
        <div className="w-full flex flex-col items-start" >
            <div className="w-full grid grid-cols-3 text-gray-500 px-3 py-2 font-bold">
                {headers.map((header: string, idx: number) => (
                    <h4 key={idx}>{header.toUpperCase()}</h4>
                ))}
            </div>

            <div className="w-full flex flex-col items-center bg-white ">
                {child}
            </div>
        </div >
    </>
}