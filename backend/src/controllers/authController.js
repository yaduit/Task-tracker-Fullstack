import pool from "../config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const normalizedEmail = email.toLowerCase();

    const existing = await pool.query("SELECT id FROM users WHERE email=$1", [
      normalizedEmail,
    ]);

    if (existing.rows.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await pool.query(
      "INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING id,name,email,role",
      [name, normalizedEmail, hashed],
    );

    const token = generateToken(user.rows[0].id, user.rows[0].role);

    res.cookie("token", token, { httpOnly: true });

    res.status(201).json({message: 'User registered sucessfully',
      user: user.rows[0],
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }
    const user = await pool.query("SELECT * FROM users WHERE email=$1", [
      email.toLowerCase(),
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const userData = user.rows[0];

    const match = await bcrypt.compare(password, userData.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(userData.id, userData.role);

    res.cookie("token", token, { httpOnly: true });

    res.json({message: "Login successfull",
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {

    const token = req.cookies?.token

    if (!token) {
      return res.status(400).json({
        message: "User already logged out"
      })
    }

    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      expires: new Date(0)
    })

    return res.status(200).json({
      message: "Logged out successfully"
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: "Internal server error"
    })
  }
};
