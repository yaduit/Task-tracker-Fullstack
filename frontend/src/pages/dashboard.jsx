import { useEffect, useState } from "react"

import Navbar from "../components/navbar.jsx"
import TaskForm from "../components/taskForm.jsx"
import TaskCard from "../components/taskCard.jsx"
import Loader from "../components/loader.jsx"

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "../services/taskService"

const Dashboard = () => {

  const [tasks,setTasks] = useState([])
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState("")

  useEffect(()=>{

    fetchTasks()

  },[])

  const fetchTasks = async () => {

    try{

      const data = await getTasks()

      setTasks(data)

    }catch(err){

      setError("Failed to load tasks")

    }finally{

      setLoading(false)

    }

  }

  const handleCreate = async (task) => {

    try{

      const newTask = await createTask(task)

      setTasks(prev=>[...prev,newTask])

    }catch{

      alert("Failed to create task")

    }

  }

  const handleDelete = async (id) => {

    try{

      await deleteTask(id)

      setTasks(prev=>prev.filter(t=>t.id !== id))

    }catch{

      alert("Delete failed")

    }

  }

  const handleToggle = async (task) => {

    const updated = {
      ...task,
      status: task.status === "pending"
      ? "completed"
      : "pending"
    }

    try{

      const res = await updateTask(task.id, updated)

      setTasks(prev =>
        prev.map(t =>
          t.id === task.id ? res : t
        )
      )

    }catch{

      alert("Update failed")

    }

  }

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-3xl mx-auto p-6">

        <TaskForm onSubmit={handleCreate} />

        {loading && <Loader />}

        {error && (
          <p className="text-red-500">{error}</p>
        )}

        {!loading && tasks.length === 0 && (
          <p className="text-gray-500">
            No tasks yet. Create one.
          </p>
        )}

        <div className="space-y-4">

          {tasks.map(task => (

            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />

          ))}

        </div>

      </div>

    </div>

  )

}

export default Dashboard