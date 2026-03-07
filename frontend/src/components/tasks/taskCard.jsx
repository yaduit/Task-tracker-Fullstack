import { Card, Button } from "../ui";

const TaskCard = ({ task, onDelete, onToggle, readOnly = false, disabled = false }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800'
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {task.title}
            </h3>
            <span className={`
              text-xs px-2 py-1 rounded-full font-medium ml-2
              ${statusColors[task.status]}
            `}>
              {task.status}
            </span>
          </div>
          
          {task.description && (
            <p className="text-gray-600 text-sm mb-3">
              {task.description}
            </p>
          )}

          {task.user && (
            <p className="text-xs text-gray-500">
              Assigned to: {task.user.name}
            </p>
          )}
        </div>

        {!readOnly && (
          <div className="flex gap-2">
            <Button
              variant={task.status === "pending" ? "secondary" : "outline"}
              size="sm"
              onClick={() => onToggle(task)}
              disabled={disabled}
            >
              {task.status === "pending" ? "Complete" : "Pending"}
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(task.id)}
              disabled={disabled}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;