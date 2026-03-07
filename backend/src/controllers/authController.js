import pool from "../config/db.js"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/generateToken.js"

export const registerUser = async(req,res)=>{

 try{

  const {name,email,password} = req.body

  if(!name || !email || !password){
    return res.status(400).json({message:"All fields required"})
  }

  const normalizedEmail = email.toLowerCase()

  const existing = await pool.query(
    "SELECT id FROM users WHERE email=$1",
    [normalizedEmail]
  )

  if(existing.rows.length > 0){
    return res.status(409).json({message:"User already exists"})
  }

  const hashed = await bcrypt.hash(password,10)

  const user = await pool.query(
    "INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING id,name,email,role",
    [name,normalizedEmail,hashed]
  )

  const token = generateToken(user.rows[0].id,user.rows[0].role)

  res.cookie("token",token,{httpOnly:true})

  res.status(201).json({
    user:user.rows[0]
  })

 }catch(err){
  res.status(500).json({message:"Server error"})
 }
}

export const loginUser = async(req,res)=>{

 try{

  const {email,password} = req.body

  const user = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email.toLowerCase()]
  )

  if(user.rows.length === 0){
    return res.status(401).json({message:"Invalid credentials"})
  }

  const userData = user.rows[0]

  const match = await bcrypt.compare(password,userData.password)

  if(!match){
    return res.status(401).json({message:"Invalid credentials"})
  }

  const token = generateToken(userData.id,userData.role)

  res.cookie("token",token,{httpOnly:true})

  res.json({
    user:{
      id:userData.id,
      name:userData.name,
      email:userData.email,
      role:userData.role
    }
  })

 }catch(err){
  res.status(500).json({message:"Server error"})
 }
}