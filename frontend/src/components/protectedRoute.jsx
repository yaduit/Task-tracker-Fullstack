import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/useAuth.js"

const ProtectedRoute = ({ children, adminOnly }) => {

  const { user, loading } = useAuth()

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  if(adminOnly && user.role !== "admin"){
    return <Navigate to="/dashboard"/>
  }

  return children
}

export default ProtectedRoute