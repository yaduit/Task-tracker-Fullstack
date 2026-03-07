const UserCard = ({ user }) => {

  return (

    <div className="bg-white p-4 rounded shadow flex justify-between">

      <div>

        <h3 className="font-semibold">{user.name}</h3>

        <p className="text-sm text-gray-500">{user.email}</p>

      </div>

      <span
        className={`text-xs px-2 py-1 rounded ${
          user.role === "admin"
            ? "bg-red-500 text-white"
            : "bg-gray-300"
        }`}
      >
        {user.role}
      </span>

    </div>

  )

}

export default UserCard