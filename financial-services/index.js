import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import logger from './modules/logger.js'
import cors from 'cors';
import transactionRoutes from './routes/transactionRoutes.js';
import './modules/db.js';
import authenticate from '../user-funcs/modules/authenticate.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  console.log(`Received event ${type}`);
  res.send({ status: 'OK' });
});

app.use(authenticate);

app.use('/', transactionRoutes);


app.listen(port, () => {
  console.log(`Financial Transactions Service listening at http://localhost:${port}`);
});

export default app;
