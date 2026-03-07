import { useState } from "react"

const TaskForm = ({ onSubmit }) => {

  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")

  const handleSubmit = (e) => {

    e.preventDefault()

    if(!title) return

    onSubmit({
      title,
      description,
      status:"pending"
    })

    setTitle("")
    setDescription("")

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow mb-6"
    >

      <h2 className="font-semibold mb-3">
        Create Task
      </h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>

    </form>

  )

}

export default TaskForm