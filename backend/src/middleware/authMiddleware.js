import jwt from "jsonwebtoken"
import pool from "../config/db.js"

export const protect = async (req, res, next) => {
  try {

    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // "role" is a reserved word in PostgreSQL; unquoted references return the
    // session role (i.e. the current database user) instead of the column value.
    // quoting it (or renaming the column) ensures we actually fetch the user’s
    // role from the table. see https://www.postgresql.org/docs/current/sql-keywords-appendix.html
    const user = await pool.query(
      'SELECT id, name, email, "role" AS role FROM users WHERE id = $1',
      [decoded.id]
    )

    if (user.rows.length === 0) {
      return res.status(401).json({ message: "User not found" })
    }

    req.user = user.rows[0]

    next()

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" })
  }
}