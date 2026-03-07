import "./index.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/useAuth.js";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";
import Dashboard from "./pages/dashboard.jsx";
import AdminDashboard from "./pages/adminDashboard.jsx";
import Loader from "./components/feedback/loader.jsx";

function App() {
  const { user, loading } = useAuth();

  if (loading) return <Loader fullPage />;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;