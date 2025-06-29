import { createContext, useState, useContext, useEffect } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { authApi } from "../services/apiService"

export const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return children
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await authApi.verify()
        setUser(userData)
      } catch (err) {
        console.error("Auth verification failed", err)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (credentials) => {
    setLoading(true)
    setError(null)

    try {
      const data = await authApi.login(credentials)
      setUser(data.user)
      return data.user
    } catch (err) {
      setError(err.message || "Login failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const loginWithGoogle = async (token) => {
    setLoading(true)
    setError(null)
    try {
      const data = await authApi.loginWithGoogle(token)
      setUser(data.user)
      return data.user
    } catch (err) {
      setError(err.message || "Login failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch (err) {
      console.error("Logout error", err)
    } finally {
      setUser(null)
    }
  }

  const getHomeRoute = () => {
    if (!user) return "/login"

    switch (user.role) {
      case "student":
        return "/api/v0/student/dashboard"
      case "warden":
        return "/warden/dashboard"
      case "guard":
        return "/guard/dashboard"
      case "maintenance":
        return "/maintainance/dashboard"
      case "admin":
        return "/admin"
      default:
        return "/login"
    }
  }

  const value = {
    user,
    loading,
    error,
    login,
    loginWithGoogle,
    logout,
    getHomeRoute,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
