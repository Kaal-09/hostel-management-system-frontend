import React, { useState } from "react"
import { FiUser, FiMail, FiLock, FiHome } from "react-icons/fi"
import { FaExclamationTriangle } from "react-icons/fa"
import { adminApi } from "../../../services/apiService"
import { useAdmin } from "../../../contexts/AdminProvider"
import Modal from "../../common/Modal"

const AddSecurityModal = ({ show, onClose, onSuccess }) => {
  const { hostelList } = useAdmin()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    hostelId: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError(null)

      const response = await adminApi.addSecurity(formData)

      if (!response) {
        setError("Failed to add security personnel. Please try again.")
        return
      }

      alert("Security personnel added successfully!")

      setFormData({
        name: "",
        email: "",
        password: "",
        hostelId: "",
      })

      if (onSuccess) onSuccess()
      onClose()
    } catch (error) {
      console.error("Error adding security personnel:", error)
      setError("Failed to add security personnel. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!show) return null

  return (
    <Modal title="Add New Security" onClose={onClose} width={500}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 text-red-800 rounded-lg flex items-start">
            <FaExclamationTriangle className="mt-0.5 mr-2 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div>
          <label className="block text-gray-700 font-medium mb-2">Security Name</label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-400">
              <FiUser />
            </div>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#1360AB]" placeholder="Enter security staff name" required />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Email Address</label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-400">
              <FiMail />
            </div>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#1360AB]" placeholder="security@example.com" required />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-400">
              <FiLock />
            </div>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#1360AB]" placeholder="Enter a strong password" required />
            <div className="text-xs text-gray-500 mt-1 ml-1">Password should be at least 8 characters</div>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Assign Hostel</label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-400">
              <FiHome />
            </div>
            <select name="hostelId" value={formData.hostelId} onChange={handleChange} className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#1360AB] appearance-none bg-white">
              <option value="">Select a hostel (optional)</option>
              {hostelList.map((hostel) => (
                <option key={hostel._id} value={hostel._id}>
                  {hostel.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-end space-y-3 space-y-reverse sm:space-y-0 sm:space-x-3 pt-4 mt-5 border-t border-gray-100">
          <button type="button" className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors" onClick={onClose}>
            Cancel
          </button>

          <button type="submit" disabled={loading} className="px-5 py-2.5 bg-[#1360AB] text-white rounded-lg hover:bg-[#0d4d8a] transition-colors font-medium flex items-center justify-center">
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                Adding...
              </>
            ) : (
              "Add Security"
            )}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddSecurityModal
