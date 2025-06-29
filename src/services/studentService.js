const API_BASE_URL = "http://localhost:5000/api"

export const fetchStudentProfile = async (userId) => {
  if (!userId) {
    console.error("Error: User ID is undefined!")
    return { error: true, message: "User ID is required" }
  }
  console.log("userId is: ", userId)

  try {
    const response = await fetch(`${API_BASE_URL}/student/profile/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`)
    }

    const result = await response.json()
    return result.data
  } catch (error) {
    console.error("Failed to fetch student profile:", error)
    return { error: true, message: error.message }
  }
}

export const submitComplaint = async (complaintData) => {
  try {
    console.log(complaintData)

    const response = await fetch(`${API_BASE_URL}/complaint/student/complaints`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(complaintData),
    })

    if (!response.ok) {
      throw new Error("Failed to submit complaint")
    }

    return await response.json()
  } catch (error) {
    console.error("Error submitting complaint:", error)
    throw error
  }
}
