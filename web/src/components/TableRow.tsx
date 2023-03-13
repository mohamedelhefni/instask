import { Dispatch } from "react"
import { InfoSection } from "./InfoSection";
import { Event } from "../types/types";
import { ReadableDate } from "../utils/date";
import { GradiantAvatar } from "./GradiantAvatar";

interface TableRowProps {
    id: number
    activeRecord: number
    setActiveRecord: Dispatch<React.SetStateAction<number>>
    event: Event
}

interface RegularRowProps {
    name: string
    action: string
    date: Date
}

interface ActiveRowProps {
    event: Event
}

function ActiveRow({ actor, target, action, metadata, occurred_at, location, group }: Event) {
    return <>
        <div className="w-full grid grid-cols-3 gap-x-7 gap-y-5  p-4">
            <InfoSection title="Actor" data={actor} />
            <InfoSection title="Action" data={action} />
            <InfoSection title="Date" data={{ "Readable": ReadableDate(occurred_at) }} />
            <InfoSection title="Target" data={target} />
            <InfoSection title="Metadata" data={metadata} />
            <InfoSection title="Info" data={{ "location": location, "group": group }} />
        </div>
    </>
}

function RegularRow({ name, action, date }: RegularRowProps) {
    return <>
        <div className="flex  items-center gap-2  self-center ">
            <GradiantAvatar name={name} />
            <span>{name}</span>
        </div>
        <div className="self-center">
            <p>{action}</p>
        </div>
        <div className="date self-center">
            {ReadableDate(date)}
        </div>
    </>
}

export function TableRow({ id, activeRecord, setActiveRecord, event }: TableRowProps) {
    let isActive = id == activeRecord;
    return <>
        <div onClick={(e) => {
            e.stopPropagation()
            setActiveRecord(id)
        }} className={`w-full transition-transform duration-150 ease-linear p-3 cursor-pointer ${isActive ? " rounded border bg-white scale-110 " : " grid grid-cols-3  hover:bg-gray-100"}  `} >
            {isActive ? <ActiveRow  {...event} /> : <RegularRow name={event.actor.name} action={event.action.name} date={event.occurred_at} />}
        </div>

    </>
}