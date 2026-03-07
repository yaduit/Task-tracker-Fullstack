import { useState, useEffect } from "react"
import { AuthContext } from "./authContext"
import api from "../api/axios"

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await api.get("/auth/me")
      // some endpoints return { user: {...} } while /me returns the object directly
      // normalize so that callers can always read `user.role` safely.
      const payload = res.data.user || res.data
      setUser(payload)
    } catch (err) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (data) => {
    const res = await api.post("/auth/login", data)
    setUser(res.data.user)
  }

  const register = async (data) => {
    const res = await api.post("/auth/register", data)
    setUser(res.data.user)
  }

  const logout = async () => {
    await api.post("/auth/logout")
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}