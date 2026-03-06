import express from express
import cors from cors
import dotenv from dotenv
import cookieParser from 'cookie-parser'

dotenv.config();

const app = express();

app.use(cors({
    
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req,res)=>{
    res.send('API running ...')
});

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
});