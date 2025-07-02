import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import adaptationRoutes from './routes/adaptationRoutes';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' })); // Limit payload size

// Routes
app.use('/api/adaptation', adaptationRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
res.status(200).send('Server is running');
});

// Root endpoint
app.get('/', (req, res) => {
res.status(200).send('Adaptive Reader API - Use POST /api/adaptation/adapt to adapt text');
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
console.error(err.stack);
res.status(500).json({
  error: 'Internal Server Error',
  message: process.env.NODE_ENV === 'development' ? err.message : undefined
});
});

// Start server
app.listen(port, () => {
console.log(`Server running on http://localhost:${port}`);
});