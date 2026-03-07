import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../contexts/useAuth.js"
import { Button, Input, Card, Container } from "../components/ui"
import ErrorMessage from "../components/feedback/errorMessage.jsx"

const Register = () => {

  const { register } = useAuth()

  const navigate = useNavigate()

  const [formData, setFormData] = useState({ name: "", email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})

  const validateForm = () => {
    const errs = {}
    if (!formData.name.trim()) errs.name = "Name is required"
    if (!formData.email) errs.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Email is invalid"
    if (!formData.password) errs.password = "Password is required"
    else if (formData.password.length < 6) errs.password = "Password must be >=6 characters"
    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setError("")
    try {
      setLoading(true)
      await register(formData)
      navigate("/dashboard")
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Container size="sm">
        <Card className="w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Register to start tracking your tasks
            </p>
          </div>

          {error && <ErrorMessage message={error} />}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={e => setFormData(prev => ({...prev, name: e.target.value}))}
              required
              error={fieldErrors.name}
              disabled={loading}
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={e => setFormData(prev => ({...prev, email: e.target.value}))}
              required
              error={fieldErrors.email}
              disabled={loading}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={e => setFormData(prev => ({...prev, password: e.target.value}))}
              required
              error={fieldErrors.password}
              disabled={loading}
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={loading}
              size="lg"
            >
              {loading ? "Creating account..." : "Register"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </Card>
      </Container>
    </div>
  )

}

export default Register