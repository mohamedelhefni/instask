interface InfoSectionProps {
    title: string
    data: Object
}

export function InfoSection({ title, data }: InfoSectionProps) {
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