import pool from "../config/db.js";

const allowedStatus = ["pending", "in_progress", "completed"];
export const createTask = async (req, res) => {
  try {
    let { title, description, status } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    title = title.trim();
    description = description?.trim();

    if (status && !allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid task status" });
    }
    const task = await pool.query(
      "INSERT INTO tasks(title,description,status,user_id) VALUES($1,$2,$3,$4) RETURNING *",
      [title, description || null, status || "pending", req.user.id],
    );

    return res.status(201).json(task.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const tasks = await pool.query("SELECT * FROM tasks");

      return res.json(tasks.rows);
    }

    const tasks = await pool.query("SELECT * FROM tasks WHERE user_id=$1", [
      req.user.id,
    ]);

    return res.json(tasks.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, status } = req.body;
    if (!title && !description && !status) {
      return res.status(400).json({
        message: "At least one field must be updated",
      });
    }

    if (status && !allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid task status" });
    }

    const existingTask = await pool.query("SELECT * FROM tasks WHERE id=$1", [
      id,
    ]);

    if (existingTask.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    const task = existingTask.rows[0];

    if (task.user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedTask = await pool.query(
      "UPDATE tasks SET title=$1, description=$2, status=$3 WHERE id=$4 RETURNING *",
      [
        title || task.title,
        description || task.description,
        status || task.status,
        id,
      ],
    );

    return res.json(updatedTask.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const existingTask = await pool.query("SELECT * FROM tasks WHERE id=$1", [
      id,
    ]);
    if (existingTask.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    const task = existingTask.rows[0];

    if (task.user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await pool.query("DELETE FROM tasks WHERE id=$1", [id]);

    return res.json({ message: "Task deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
