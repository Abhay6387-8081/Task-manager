import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import taskRoutes from './routes/taskRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js';
import {notFound} from './middleware/notFound.js';
import {errorHandler} from './middleware/errorHandler.js'


const app = express();

app.use(helmet());
app.use(cors({origin:process.env.CLIENT_URL||'http://localhost:5173',credentials:true}));
app.use(express.json());
app.use(cookieParser());

if(process.env.NODE_ENV!=='production'){
    app.use(morgan('dev'));
}

app.get('/api/health',(req,res)=>{
    res.json({success:true,message:'API is running.'});
});
app.use('/api/tasks',taskRoutes)
app.use('/api/dashboard',dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;