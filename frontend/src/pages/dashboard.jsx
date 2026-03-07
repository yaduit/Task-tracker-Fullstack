import { useEffect, useState } from "react";
import Navbar from "../components/navbar.jsx";
import TaskForm from "../components/tasks/taskForm.jsx";
import TaskCard from "../components/tasks/taskCard.jsx";
import { Container } from "../components/ui";
import Loader from "../components/feedback/loader.jsx";
import EmptyState from "../components/feedback/errorMessage.jsx";
import ErrorMessage from "../components/feedback/errorMessage.jsx";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "../services/taskService";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
      setError("");
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (task) => {
    setActionLoading(true);
    try {
      const newTask = await createTask(task);
      setTasks(prev => [newTask, ...prev]);
      setError("");
    } catch {
      setError("Failed to create task");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setActionLoading(true);
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
      setError("");
    } catch {
      setError("Failed to delete task");
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggle = async (task) => {
    const updated = {
      ...task,
      status: task.status === "pending" ? "completed" : "pending"
    };

    setActionLoading(true);
    try {
      const res = await updateTask(task.id, updated);
      setTasks(prev =>
        prev.map(t => t.id === task.id ? res : t)
      );
      setError("");
    } catch {
      setError("Failed to update task");
    } finally {
      setActionLoading(false);
    }
  };

  const pendingTasks = tasks.filter(t => t.status === "pending");
  const completedTasks = tasks.filter(t => t.status === "completed");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <Container size="md" className="py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-gray-600">Manage your tasks and stay organized</p>
        </div>

        <TaskForm onSubmit={handleCreate} disabled={actionLoading} />

        {error && <ErrorMessage message={error} onRetry={fetchTasks} />}

        {loading ? (
          <Loader />
        ) : tasks.length === 0 ? (
          <EmptyState 
            title="No tasks yet"
            message="Get started by creating your first task above."
          />
        ) : (
          <div className="space-y-8">
            {pendingTasks.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  Pending Tasks ({pendingTasks.length})
                </h2>
                <div className="space-y-4">
                  {pendingTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onDelete={handleDelete}
                      onToggle={handleToggle}
                      disabled={actionLoading}
                    />
                  ))}
                </div>
              </div>
            )}

            {completedTasks.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  Completed Tasks ({completedTasks.length})
                </h2>
                <div className="space-y-4 opacity-75">
                  {completedTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onDelete={handleDelete}
                      onToggle={handleToggle}
                      disabled={actionLoading}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Dashboard;