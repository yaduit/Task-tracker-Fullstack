import { useEffect, useState } from "react";
import Navbar from "../components/navbar.jsx";
import TaskCard from "../components/tasks/taskCard.jsx";
import UserCard from "../components/users/userCard.jsx";
import { Container } from "../components/ui";
import Loader from "../components/feedback/loader.jsx";
import ErrorMessage from "../components/feedback/errorMessage.jsx";
import {
  getAllUsers,
  getAllTasks
} from "../services/adminService";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'tasks'

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const [usersData, tasksData] = await Promise.all([
        getAllUsers(),
        getAllTasks()
      ]);
      setUsers(usersData);
      setTasks(tasksData);
      setError("");
    } catch (err) {
      setError("Failed to load admin data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    totalUsers: users.length,
    totalTasks: tasks.length,
    pendingTasks: tasks.filter(t => t.status === "pending").length,
    completedTasks: tasks.filter(t => t.status === "completed").length
  };

  if (loading) return <Loader fullPage />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <Container size="lg" className="py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users and monitor tasks</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Total Tasks</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalTasks}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Pending Tasks</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pendingTasks}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Completed Tasks</p>
            <p className="text-2xl font-bold text-green-600">{stats.completedTasks}</p>
          </div>
        </div>

        {error && <ErrorMessage message={error} onRetry={fetchAdminData} />}

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('users')}
              className={`
                py-2 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              Users ({users.length})
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`
                py-2 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'tasks'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              All Tasks ({tasks.length})
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'users' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-4">
            {tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={() => {}}
                onToggle={() => {}}
                readOnly
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default AdminDashboard;