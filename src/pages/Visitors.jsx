import { useState, useEffect } from "react"
import { FaUserFriends, FaFilter } from "react-icons/fa"
import SearchBar from "../components/common/SearchBar"
import FilterTabs from "../components/common/FilterTabs"
import NoResults from "../components/common/NoResults"
import VisitorTable from "../components/visitor/VisitorTable"
import { filterVisitors } from "../utils/securityUtils"
import { securityApi } from "../services/apiService"

const VISITOR_FILTER_TABS = [
  { label: "All", value: "all" },
  { label: "Checked In", value: "Checked In" },
  { label: "Checked Out", value: "Checked Out" },
]

const Visitors = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterDate, setFilterDate] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [visitors, setVisitors] = useState([])

  const handleUpdateVisitor = (updatedVisitor) => {
    setVisitors(visitors.map((visitor) => (visitor.id === updatedVisitor.id ? updatedVisitor : visitor)))
  }

  const fetchVisitors = async () => {
    try {
      const data = await securityApi.getVisitors()
      setVisitors(data)
    } catch (error) {
      console.error("Error fetching visitors:", error)
    }
  }

  useEffect(() => {
    fetchVisitors()
    console.log(filterStatus, filterDate, searchTerm, "Fetching visitors data...")
  }, [filterStatus, filterDate, searchTerm])

  const filteredVisitors = filterVisitors(visitors, filterStatus, filterDate, searchTerm)
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 flex-1">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="p-2.5 mr-3 bg-blue-100 text-[#1360AB] rounded-xl">
            <FaUserFriends size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Visitor Management</h1>
        </div>
        <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center px-4 py-2.5 rounded-xl transition-colors ${showFilters ? "bg-[#1360AB] text-white shadow-md" : "bg-white text-gray-700 border border-gray-200 shadow-sm hover:bg-gray-50"}`}>
          <FaFilter className="mr-2" /> {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Visitors</p>
              <h3 className="text-2xl font-bold text-gray-800">{visitors.length}</h3>
            </div>
            <div className="p-3 bg-blue-100 text-[#1360AB] rounded-lg">
              <FaUserFriends size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Checked In</p>
              <h3 className="text-2xl font-bold text-green-600">{visitors.filter((v) => v.status === "Checked In").length}</h3>
            </div>
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Checked Out</p>
              <h3 className="text-2xl font-bold text-red-600">{visitors.filter((v) => v.status === "Checked Out").length}</h3>
            </div>
            <div className="p-3 bg-red-100 text-red-600 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Today's Visitors</p>
              <h3 className="text-2xl font-bold text-[#1360AB]">
                {
                  visitors.filter((v) => {
                    const today = new Date().toISOString().split("T")[0]
                    const visitorDate = new Date(v.DateTime).toISOString().split("T")[0]
                    return visitorDate === today
                  }).length
                }
              </h3>
            </div>
            <div className="p-3 bg-blue-100 text-[#1360AB] rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="w-full sm:w-auto overflow-x-auto pb-2">
          <FilterTabs tabs={VISITOR_FILTER_TABS} activeTab={filterStatus} setActiveTab={setFilterStatus} />
        </div>
        <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search visitors..." className="w-full sm:w-64 md:w-80" />
      </div>

      {showFilters && (
        <div className="mt-4 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-3 border-b border-gray-100">
            <h3 className="font-bold text-gray-700 flex items-center mb-2 sm:mb-0">
              <FaFilter className="mr-2 text-[#1360AB]" /> Advanced Filters
            </h3>
            <button onClick={() => setFilterDate("")} className="text-sm text-gray-500 hover:text-[#1360AB] flex items-center px-2 py-1 hover:bg-gray-50 rounded-md transition-colors">
              Reset Date Filter
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Filter by Date</label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="w-full p-2.5 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#1360AB] bg-white" />
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredVisitors.length > 0 ? (
        <div className="mt-6">
          <VisitorTable visitors={filteredVisitors} onUpdateVisitor={handleUpdateVisitor} />
        </div>
      ) : (
        <div className="mt-12">
          <NoResults icon={<FaUserFriends className="text-gray-300 text-5xl" />} message="No visitors found" suggestion="Try changing your search or filter criteria" />
        </div>
      )}
    </div>
  )
}

export default Visitors
