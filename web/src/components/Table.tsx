import { BsChevronRight } from "react-icons/bs";
import { GradiantAvatar } from "./GradiantAvatar";
import { Dispatch, useState } from "react";
import { Event } from "../types/types";
import { ReadableDate } from "../utils/date";


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

interface InfoSectionProps {
    title: string
    data: Object
}

function InfoSection({ title, data }: InfoSectionProps) {
    return <div className="flex flex-col gap-1">
        <h4 className=" text-gray-700 font-semibold">
            {title}
        </h4>
        <div className="flex flex-col 1">
            {data && Object.entries(data).map((value: string[], idx: number) => (
                <div key={idx} className="flex items-center flex-wrap  text-sm ">
                    <p className="w-1/3 text-gray-500 capitalize  ">{value[0].replaceAll("_", " ")}</p>
                    <p className="w-2/3  ">{value[1]}</p>
                </div>
            ))}
        </div>
    </div>
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
        <div className="flex  items-center gap-2   ">
            <GradiantAvatar name={name} />
            <span>{name}</span>
        </div>
        <div className="">
            <p>{action}</p>
        </div>
        <div className="date">
            {ReadableDate(date)}
        </div>
    </>
}

function TableRow({ id, activeRecord, setActiveRecord, event }: TableRowProps) {
    let isActive = id == activeRecord;
    return <>
        {/* grid items center, and grow the middle column */}
        <div onClick={(e) => {
            e.stopPropagation()
            setActiveRecord(id)
        }} className={`w-full  transition-all ease-linear      p-3 cursor-pointer ${isActive ? " rounded border bg-white scale-110 " : " grid grid-cols-3  hover:bg-gray-100"}  `} >
            {isActive ? <ActiveRow  {...event} /> : <RegularRow name={event.actor.name} action={event.action.name} date={event.occurred_at} />}
        </div>

    </>
}



export function Table() {
    let data: Event[] = [{
        object: "event",
        action: {
            id: 1,
            name: "user.clicked_activity_log",
            object: "action"
        },
        actor: {
            id: 1,
            name: "Mohamed Elhefni"
        },
        group: "instatus.com",
        occurred_at: new Date(),
        target: {
            id: 1,
            name: "Basem Hossam"
        },
        location: "10.34.32.02",
        metadata: {
            id: 1,
            name: "test",
            x_request_id: "X_REQUEST_FDADF"
        }
    },
    {
        object: "event",
        action: {
            id: 1,
            name: "user.scroll_event_log",
            object: "action"
        },
        actor: {
            id: 1,
            name: "Basem Elhefni"
        },
        group: "instatus.com",
        occurred_at: new Date(),
        target: {
            id: 1,
            name: "Ahemd Hossam"
        },
        location: "10.34.32.02",
        metadata: {
            id: 1,
            name: "test",
            request_id: "blah blah blah"
        }
    },
    {
        object: "event",
        action: {
            id: 1,
            name: "user.searched_activity_log_events",
            object: "action"
        },
        actor: {
            id: 1,
            name: "Farag Mansour"
        },
        group: "instatus.com",
        occurred_at: new Date(),
        target: {
            id: 1,
            name: "Farag Mansour"
        },
        location: "10.34.32.02",
        metadata: {
            id: 1,
            name: "test",
            request_id: "user_FADCXF1232"
        }
    }
    ];
    let [activeRecord, setActiveRecord] = useState<number>(0);
    document.body.addEventListener("click", () => {
        setActiveRecord(-1)
    })
    return <>
        <div className="w-full flex flex-col items-start" >
            <div className="w-full grid grid-cols-3 text-gray-500 px-3 py-2 font-bold">
                <h4>
                    ACTOR
                </h4>
                <h4 >
                    ACTION
                </h4>
                <h4>
                    DATE
                </h4>
            </div>
            <div className="w-full flex flex-col items-center bg-white">
                {data.map((event: Event, idx: number) =>
                (
                    <TableRow key={idx} id={idx} activeRecord={activeRecord} setActiveRecord={setActiveRecord} event={event} />
                ))}
            </div>
        </div>
    </>
}