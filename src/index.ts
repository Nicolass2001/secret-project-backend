import express from 'express';
import indexRoutes from './routes/index';
import authRoutes from './routes/auth';
import accountRoutes from './routes/account';
import cors from 'cors';
import { env } from './configs/config';

const app = express();
const port = env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/account', accountRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
