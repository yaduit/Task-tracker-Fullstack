import { useAuth } from "../contexts/useAuth.js"

const Navbar = () => {

  const { user, logout } = useAuth()

  return (

    <div className="bg-gray-800 text-white p-4 flex justify-between">

      <h1 className="font-bold">
        Task Tracker
      </h1>

      <div className="flex items-center gap-4">

        <span>{user?.name}</span>

        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>

      </div>

    </div>

  )

}

export default Navbar