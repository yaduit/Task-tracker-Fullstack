import { useState } from "react";
import { Card, Input, Button } from "../ui";

const TaskForm = ({ onSubmit, disabled = false }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) {
      errors.title = "Title is required";
    } else if (formData.title.length < 3) {
      errors.title = "Title must be at least 3 characters";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      ...formData,
      status: "pending"
    });

    setFormData({ title: "", description: "" });
  };

  return (
    <Card className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Create New Task
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Task Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          required
          error={errors.title}
          disabled={disabled}
        />

        <Input
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description (optional)"
          disabled={disabled}
        />

        <Button type="submit" variant="primary" disabled={disabled}>
          {disabled ? "Working..." : "Create Task"}
        </Button>
      </form>
    </Card>
  );
};

export default TaskForm;