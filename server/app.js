import express, { urlencoded } from 'express';
import morgan from 'morgan';
import connect from './db/db.js';
import userRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';

connect();

const app = express();


// we use morgan  to show the logs means detail of our request in our terminal.
app.use(morgan('dev')); 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/users',userRoutes);

app.get('/' , (req,res) => {
    res.send('hello world');
});

export default app;