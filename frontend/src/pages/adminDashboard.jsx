import { useEffect, useState } from "react"

import Navbar from "../components/navbar.jsx"
import Loader from "../components/loader.jsx"
import TaskCard from "../components/taskCard.jsx"
import UserCard from "../components/userCard.jsx"

import {
  getAllUsers,
  getAllTasks
} from "../services/adminService"

const AdminDashboard = () => {

  const [users,setUsers] = useState([])
  const [tasks,setTasks] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    fetchAdminData()

  },[])

  const fetchAdminData = async () => {

    try{

      const usersData = await getAllUsers()
      const tasksData = await getAllTasks()

      setUsers(usersData)
      setTasks(tasksData)

    }catch(err){

      console.error("Admin fetch failed")

    }finally{

      setLoading(false)

    }

  }

  if(loading){
    return <Loader/>
  }

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar/>

      <div className="max-w-6xl mx-auto p-6">

        <h1 className="text-2xl font-bold mb-6">
          Admin Dashboard
        </h1>

        {/* USERS */}

        <div className="mb-10">

          <h2 className="text-xl font-semibold mb-4">
            Users
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            {users.map(user => (

              <UserCard
                key={user.id}
                user={user}
              />

            ))}

          </div>

        </div>

        {/* TASKS */}

        <div>

          <h2 className="text-xl font-semibold mb-4">
            All Tasks
          </h2>

          <div className="space-y-4">

            {tasks.map(task => (

              <TaskCard
                key={task.id}
                task={task}
                onDelete={()=>{}}
                onToggle={()=>{}}
              />

            ))}

          </div>

        </div>

      </div>

    </div>

  )

}

export default AdminDashboard