import api from "../api/axios.js"

export const getTasks = async () => {
  const res = await api.get("/task")
  return res.data
}

export const createTask = async (task) => {
  const res = await api.post("/task", task)
  return res.data
}

export const updateTask = async (id, task) => {
  const res = await api.put(`/task/${id}`, task)
  return res.data
}

export const deleteTask = async (id) => {
  const res = await api.delete(`/task/${id}`)
  return res.data
}