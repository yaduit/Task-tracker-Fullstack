import express from "express"
import pool from "../config/db.js"

import { protect } from "../middleware/authMiddleware.js"
import { adminOnly } from "../middleware/roleMiddleware.js"

const router = express.Router()

/* GET ALL USERS */

router.get(
  "/users",
  protect,
  adminOnly,
  async (req, res) => {

    try {

      const users = await pool.query(
        "SELECT id,name,email,role FROM users"
      )

      res.json(users.rows)

    } catch (error) {

      res.status(500).json({
        message: "Failed to fetch users"
      })

    }

  }
)

/* GET ALL TASKS */

router.get(
  "/tasks",
  protect,
  adminOnly,
  async (req, res) => {

    try {

      const tasks = await pool.query(
        `SELECT tasks.*, users.name 
         FROM tasks
         JOIN users
         ON tasks.user_id = users.id`
      )

      res.json(tasks.rows)

    } catch (error) {

      res.status(500).json({
        message: "Failed to fetch tasks"
      })

    }

  }
)

export default router