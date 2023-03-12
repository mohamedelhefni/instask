import { useEffect, useState } from "react";
import { HeadBar } from "./components/HeadBar";
import { Table } from "./components/Table";
import { Event } from "./types/types"

function App() {
  let eventsData: Event[] = [{
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
  }];
  let [events, setEvents] = useState<Event[]>(eventsData);
  let [isLiveLoading, setIsLiveLoading] = useState<boolean>(false);
  let [loadingInterval, setLoadingInterval] = useState<number>();

  useEffect(() => {
    if (isLiveLoading) {
      setLoadingInterval(setInterval(() => { console.log("test") }, 1000))
    } else {
      clearInterval(loadingInterval)
    }
  }, [isLiveLoading])


  return (
    <div className="App">
      <div className="bg-white flex flex-col items-center justify-center min-h-screen py-10 px-20 ">
        <div className="container max-w-5xl ">
          <div className="w-full bg-gray-200/30   rounded-md shadow">
            <HeadBar isLiveLoading={isLiveLoading} setIsLiveLoading={setIsLiveLoading} />
            <Table headers={["actor", "action", "date"]} events={events} />
            <button className="w-full transition text-center text-gray-800 p-4 text-md hover:bg-gray-400/20 ">
              LOAD MORE
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
