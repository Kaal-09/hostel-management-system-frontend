import React from "react"
import { FaMapMarkerAlt, FaUserCircle, FaClipboardList, FaInfoCircle } from "react-icons/fa"
import { getStatusColor, getPriorityColor } from "../../utils/adminUtils"
import Modal from "../common/Modal"

const ComplaintDetailModal = ({ selectedComplaint, setShowDetailModal }) => {
  if (!selectedComplaint) return null

  return (
    <Modal title="Complaint Details" onClose={() => setShowDetailModal(false)} width={800}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-gray-100">
          <div>
            <span className="text-xs text-gray-500">{selectedComplaint.id}</span>
            <h2 className="text-xl font-bold text-gray-800">{selectedComplaint.title}</h2>
          </div>

          <div className="flex items-center space-x-3 mt-3 sm:mt-0">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedComplaint.status)}`}>{selectedComplaint.status}</span>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityColor(selectedComplaint.priority)}`}>{selectedComplaint.priority}</span>
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-700">{selectedComplaint.category}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-5 rounded-xl">
            <h4 className="text-sm font-medium text-[#1360AB] flex items-center mb-4">
              <FaMapMarkerAlt className="mr-2" /> Location Details
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Hostel:</span>
                <span className="font-medium">{selectedComplaint.hostel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Room Number:</span>
                <span className="font-medium">{selectedComplaint.roomNumber}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl">
            <h4 className="text-sm font-medium text-[#1360AB] flex items-center mb-4">
              <FaUserCircle className="mr-2" /> Reported By
            </h4>
            <div className="flex items-center">
              {selectedComplaint.reportedBy?.image ? (
                <img src={selectedComplaint.reportedBy.image} alt={selectedComplaint.reportedBy.name} className="h-12 w-12 rounded-full object-cover mr-4" />
              ) : (
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-medium mr-4">{selectedComplaint.reportedBy?.name?.charAt(0) || "U"}</div>
              )}
              <div>
                <div className="font-medium">{selectedComplaint.reportedBy?.name}</div>
                <div className="text-sm text-gray-500">Email: {selectedComplaint.reportedBy?.email}</div>
                <div className="text-sm text-gray-500">{selectedComplaint.reportedBy?.phone}</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-[#1360AB] flex items-center mb-3">
            <FaClipboardList className="mr-2" /> Description
          </h4>
          <div className="bg-gray-50 p-5 rounded-xl text-gray-700">{selectedComplaint.description}</div>
        </div>

        {selectedComplaint.images && selectedComplaint.images.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-[#1360AB] flex items-center mb-3">
              <FaInfoCircle className="mr-2" /> Images
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {selectedComplaint.images.map((image, index) => (
                <div key={index} className="relative h-40 rounded-lg overflow-hidden">
                  <img src={image} alt={`Complaint ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h4 className="text-sm font-medium text-[#1360AB] flex items-center mb-3">
            <FaInfoCircle className="mr-2" /> Resolution Notes
          </h4>
          {selectedComplaint.resolutionNotes ? <div className="bg-gray-50 p-5 rounded-xl text-gray-700">{selectedComplaint.resolutionNotes}</div> : <div className="bg-gray-50 p-5 rounded-xl text-gray-500 italic">No resolution notes yet.</div>}
        </div>

        <div className="flex flex-wrap justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
          <div>Created: {new Date(selectedComplaint.createdDate).toLocaleString()}</div>
          {selectedComplaint.lastUpdated !== selectedComplaint.createdDate && <div>Last Updated: {new Date(selectedComplaint.lastUpdated).toLocaleString()}</div>}
        </div>
      </div>
    </Modal>
  )
}

export default ComplaintDetailModal
