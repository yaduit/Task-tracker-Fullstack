import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import ProtectedRoute from './components/protectedRoute.jsx'
import Dashboard from './pages/dashboard.jsx'

function App() {
  return (
    <div>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
