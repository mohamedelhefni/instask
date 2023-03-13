export function SkeletonLoader() {
    return <>
        <div className="w-full flex flex-col items-start animate-pulse p-4 bg-white">
            {[...Array(10).keys()].map(i => (
                <div key={i} className="grid grid-cols-3 w-full gap-3">
                    <div className="flex items-center gap-2 w-full mb-4 ">
                        <div className="w-8 h-8 rounded-full bg-gray-300 ">
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full w-3/4"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full w-3/4 mb-4 self-center"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full w-3/4 mb-4 self-center"></div>
                </div>
            ))}
            <div className="sr-only">Loading...</div>
        </div>
    </>
}