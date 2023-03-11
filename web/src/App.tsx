import { BsFilter } from "react-icons/bs";
import { IoDownload } from "react-icons/io5";
import { BsChevronRight } from "react-icons/bs";

function App() {

  return (
    <div className="App">
      <div className="bg-white flex flex-col items-center justify-center min-h-screen py-10">
        <div className="container">
          <div className="w-full bg-gray-200/30   rounded-md shadow">
            {/* input */}
            <div className="flex items-center justify-center w-full  p-4 ">
              <input type="text" className="w-full  bg-transparent p-2 rounded-l-md border border-r-0 focus:outline-none focus:bg-white " placeholder="Search name,email or action..." />
              <div className="flex items-center border rounded-r-md ">
                <button className="transition p-2.5  text-sm text-gray-800 border-r  hover:bg-gray-200 flex items-center gap-1">
                  <BsFilter size={20} />
                  <span>FILTER</span>
                </button>
                <button className="transition p-2.5  text-sm text-gray-800 hover:bg-gray-200 flex items-center gap-1">
                  <IoDownload size={20} />
                  <span>EXPORT</span>
                </button>
                <button className="transition p-2.5  text-sm text-gray-800 border-l  hover:bg-gray-200 flex items-center gap-1">
                  <div className="w-3 h-3 bg-rose-300 rounded-full"></div>
                  <span>LIVE</span>
                </button>
              </div>
            </div>
            <table className="w-full text-left ">
              <thead className=" text-gray-500">
                <tr className="">
                  <th className="p-4">ACTOR</th>
                  <th className="p-4">ACTION</th>
                  <th className="p-4">DATE</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="bg-white  w-full h-full">
                {[...Array(10).keys()].map((i: number) =>
                (
                  <tr className="transition cursor-pointer hover:bg-gray-100" >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center  font-bold  w-8 h-8 rounded-full text-white bg-gradient-to-r from-orange-500 to-pink-800 ">
                          A
                        </div>
                        <span>ali@instatus.com</span>
                      </div>
                    </td>
                    <td className="p-4">user.searched_activit_log_events</td>
                    <td className="p-4">Aug 7, 5:38 PM</td>
                    <td className="p-4">
                      <BsChevronRight className="text-gray-300 " size={20} />
                    </td>
                  </tr>

                )
                )}
              </tbody>
            </table>
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
