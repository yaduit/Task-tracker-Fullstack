import api from "../api/axios.js"

export const getAllUsers = async () => {
  const res = await api.get("/admin/users")
  return res.data
}

export const getAllTasks = async () => {
  const res = await api.get("/admin/tasks")
  return res.data
}