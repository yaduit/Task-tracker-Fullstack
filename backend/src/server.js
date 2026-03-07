import express from express
import cors from cors
import dotenv from dotenv
import cookieParser from 'cookie-parser'

import authRoutes from './routes/authRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

dotenv.config();

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req,res)=>{
    res.send('API running ...')
});

app.use('/auth', authRoutes);
app.use('/task', taskRoutes);

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
});