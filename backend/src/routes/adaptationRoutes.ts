import express from 'express';
import { adaptTextController } from '../controllers/adaptationController';

const router = express.Router();

// POST endpoint for text adaptation
router.post('/adapt', adaptTextController);

export default router;