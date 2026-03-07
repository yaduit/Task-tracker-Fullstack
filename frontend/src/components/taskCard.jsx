const TaskCard = ({ task, onDelete, onToggle }) => {

  return (

    <div className="bg-white p-4 rounded shadow flex justify-between items-center">

      <div>

        <h3 className="font-semibold">
          {task.title}
        </h3>

        <p className="text-sm text-gray-500">
          {task.description}
        </p>

        <p className="text-xs mt-1">

          Status:
          <span
            className={`ml-1 ${
              task.status === "completed"
              ? "text-green-600"
              : "text-yellow-600"
            }`}
          >
            {task.status}
          </span>

        </p>

      </div>

      <div className="flex gap-2">

        <button
          onClick={()=>onToggle(task)}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Toggle
        </button>

        <button
          onClick={()=>onDelete(task.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>

      </div>

    </div>

  )

}

export default TaskCard