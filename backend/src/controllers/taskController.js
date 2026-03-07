import pool from "../config/db.js"

export const createTask = async(req,res)=>{

 const {title,description,status} = req.body

 const task = await pool.query(
   "INSERT INTO tasks(title,description,status,user_id) VALUES($1,$2,$3,$4) RETURNING *",
   [title,description,status,req.user.id]
 )

 res.status(201).json(task.rows[0])
}

export const getTasks = async(req,res)=>{

 if(req.user.role === "admin"){

  const tasks = await pool.query("SELECT * FROM tasks")

  return res.json(tasks.rows)

 }

 const tasks = await pool.query(
   "SELECT * FROM tasks WHERE user_id=$1",
   [req.user.id]
 )

 res.json(tasks.rows)
}

export const updateTask = async(req,res)=>{

 const {id} = req.params

 const {title,description,status} = req.body

 const task = await pool.query(
   "UPDATE tasks SET title=$1,description=$2,status=$3 WHERE id=$4 RETURNING *",
   [title,description,status,id]
 )

 res.json(task.rows[0])
}

export const deleteTask = async(req,res)=>{

 const {id} = req.params

 await pool.query(
   "DELETE FROM tasks WHERE id=$1",
   [id]
 )

 res.json({message:"Task deleted"})
}