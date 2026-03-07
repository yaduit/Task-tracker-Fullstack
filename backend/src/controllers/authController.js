import pool from "../config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

// reusable options used for all auth cookies
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
  maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
};

// basic email pattern, enough for front/back validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const normalizedEmail = email.toLowerCase();

    const existing = await pool.query("SELECT id FROM users WHERE email=$1", [
      normalizedEmail,
    ]);

    if (existing.rows.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    // explicitly specify a default role to avoid unexpected nulls if DB default
    const user = await pool.query(
      'INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING id,name,email,"role" AS role',
      [name, normalizedEmail, hashed, 'user']
    );

    const token = generateToken(user.rows[0].id, user.rows[0].role);

    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      message: 'User registered successfully',
      user: user.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const user = await pool.query(
      'SELECT id,name,email,password,"role" AS role FROM users WHERE email=$1',
      [email.toLowerCase()]
    );

    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const userData = user.rows[0];

    const match = await bcrypt.compare(password, userData.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(userData.id, userData.role);

    res.cookie("token", token, cookieOptions);

    res.json({
      message: "Login successful",
      user: userData,
    });
  } catch (err) {
    console.error(err);
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

    // clear using the same attributes so browser will remove it
    res.cookie("token", "", { ...cookieOptions, expires: new Date(0) });

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
