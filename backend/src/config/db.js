import {pool} from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const pool = new pool({
    connectionString: process.env.DATABASE_URL
});

pool.on("connect",()=>{
    console.log("Database connected")
});

pool.on("error", (err)=>{
    console.log("Database error",err)
});

export default pool;