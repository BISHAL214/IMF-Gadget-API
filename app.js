import express from 'express';
import authRoutes from './src/routes/authRoute.js';
import gadgetRoutes from './src/routes/gadgetRoute.js';
import { errorHandler } from './src/middlewares/errorMiddleware.js';

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/gadgets', gadgetRoutes);

app.use(errorHandler);
export default app;