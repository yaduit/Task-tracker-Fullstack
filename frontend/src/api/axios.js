import axios from "axios"

const baseURL = import.meta.env.VITE_API_URL

if (!baseURL) {
  throw new Error(
    "VITE_API_URL is not defined. Please check your environment variables."
  )
}

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000
})

export default api