import { useEffect, useState } from "react";
import { HeadBar } from "./components/HeadBar";
import { Table } from "./components/Table";
import { Event } from "./types/types"
import { EventsResponse } from "./types/http"
import useSWRInfinite from "swr/infinite";
import { SkeletonLoader } from "./components/SkeletonLoader";
import { TableRow } from "./components/TableRow";



function App() {
  const PAGE_SIZE = 6;
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  let [events, setEvents] = useState<Event[] | []>([]);
  let [isLiveLoading, setIsLiveLoading] = useState<boolean>(false);
  let [loadingInterval, setLoadingInterval] = useState<number>();
  let [searchName, setSearchName] = useState<string>("");
  let [activeRecord, setActiveRecord] = useState<number>(-1);

  const {
    data,
    mutate,
    error,
    size,
    setSize,
    isValidating,
    isLoading
  } = useSWRInfinite<EventsResponse>(
    (index) =>
      `${import.meta.env.VITE_API_ENDPOINT}/events?page=${index + 1}&limit=10${searchName && '&name=' + searchName}`,
    fetcher
  );

  useEffect(() => {
    if (data && data?.[0].events) {
      let mergedEvents = data.map(eventResp => {
        return eventResp.events
      })
      setEvents(mergedEvents.flat());
    }
  }, [data])

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isReachingEnd = !(data && data[data?.length - 1]?.pagination?.next);

  useEffect(() => {
    if (isLiveLoading) {
      setLoadingInterval(setInterval(() => { mutate() }, 3000))
    } else {
      clearInterval(loadingInterval)
    }
  }, [isLiveLoading])



  return (
    <div className="App" onClick={() => setActiveRecord(-1)}>
      <div className="bg-white flex flex-col items-center justify-center min-h-screen py-10 px-20 ">
        <div className="container max-w-5xl ">
          <div className="w-full bg-gray-200/30   rounded-md shadow">

            <HeadBar isLiveLoading={isLiveLoading} setIsLiveLoading={setIsLiveLoading} setSearchName={setSearchName} events={events} />
            <Table headers={["actor", "action", "date"]} >
              {isLoading ? <SkeletonLoader /> :
                (
                  events.length === 0 ? "Search doesn't match any data" : events.map((event: Event, idx: number) =>
                  (
                    <TableRow key={idx} id={idx} activeRecord={activeRecord} setActiveRecord={setActiveRecord} event={event} />
                  ))
                )
              }

            </Table>
            {error && <>
              <div className="w-full bg-white p-3 text-center text-red-600 ">
                {error.message}
              </div>
            </>}
            <button className="w-full transition text-center text-gray-800 p-4 text-md hover:bg-gray-400/20 "
              disabled={isLoadingMore || isReachingEnd}
              onClick={() => setSize(size + 1)}
            >
              {isLoadingMore
                ? "LOADING ..."
                : isReachingEnd
                  ? "NO MORE EVENTS"
                  : "LOADMORE"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
