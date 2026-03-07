import dotenv from 'dotenv'
import app from './server.js'
import './config/db.js'

dotenv.config()
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
});