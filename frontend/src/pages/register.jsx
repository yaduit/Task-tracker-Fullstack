import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../contexts/useAuth.js"

const Register = () => {

  const { register } = useAuth()

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {

    e.preventDefault()

    setError("")

    if (!name || !email || !password) {
      return setError("All fields are required")
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters")
    }

    try {

      setLoading(true)

      await register({ name, email, password })

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

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-4 text-sm">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-600 ml-1"
          >
            Login
          </Link>

        </p>

      </form>

    </div>

  )

}

export default Register