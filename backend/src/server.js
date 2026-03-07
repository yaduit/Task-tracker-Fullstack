import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/authRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req,res)=>{
    res.send('API running ...')
});

app.use('/auth', authRoutes);
app.use('/task', taskRoutes);

export default app