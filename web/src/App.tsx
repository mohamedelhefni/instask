import { HeadBar } from "./components/HeadBar";
import { Table } from "./components/Table";

function App() {
  return (
    <div className="App">
      <div className="bg-white flex flex-col items-center justify-center min-h-screen py-10 px-10">
        <div className="container max-w-5xl ">
          <div className="w-full bg-gray-200/30   rounded-md shadow">
            <HeadBar />
            <Table />
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
