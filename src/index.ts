import express, { Express } from 'express';
import { PORT } from './secret';
import rootRoutes from './routes';
import { errorMiddleware } from './middlewares/errors';

const app: Express = express();

app.use(express.json());

app.use('/api', rootRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000');
});