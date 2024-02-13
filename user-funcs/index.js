import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import logger from './modules/logger.js';
import cors from 'cors';
import db from './modules/db.js';
import authenticate from './modules/authenticate.js'
import userRoute from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js'

const app = express();
const port = process.env.user_PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use('/auth', authRouter);

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  console.log(`Received event ${type}`);
  res.send({ status: 'OK' });
});

app.use(authenticate);
app.use('/users', userRoute);

app.listen(port, () => {
  console.log(`User Service listening at http://localhost:${port}`);
});
