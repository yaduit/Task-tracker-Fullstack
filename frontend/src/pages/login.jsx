import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/useAuth.js"

const Login = () => {

  const { login } = useAuth()

  const navigate = useNavigate()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")

  const handleSubmit = async (e) => {

    e.preventDefault()

    try{

      await login({email,password})

      navigate("/dashboard")

    }catch(err){

      setError("Invalid credentials")

    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form 
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>

      </form>

    </div>

  )

}

export default Login